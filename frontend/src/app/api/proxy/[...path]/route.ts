import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function handleProxy(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30-second timeout
  let targetUrl = "";

  try {
    const resolvedParams = await params;
    const rawSubpath = resolvedParams.path ? resolvedParams.path.join("/") : "";
    const cleanSubpath = rawSubpath.replace(/\/$/, ""); // Strip trailing slash to match Express routes

    let rawBaseUrl =
      process.env.BACKEND_API_BASE_URL ||
      process.env.AO_ERP_API_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "http://localhost:5000";

    // Normalize base URL without duplicate /api or trailing slashes
    rawBaseUrl = rawBaseUrl.replace(/\/$/, "").replace(/\/api\/website$/, "").replace(/\/api$/, "");

    const search = request.nextUrl.search || "";
    targetUrl = `${rawBaseUrl}/api/website/${cleanSubpath}${search}`;

    console.log("[AO ERP Proxy] Incoming Path:", rawSubpath);
    console.log("[AO ERP Proxy] Final Target URL:", targetUrl);

    const headers: Record<string, string> = {};

    // Forward relevant incoming request headers
    const contentType = request.headers.get("content-type");
    if (contentType) headers["Content-Type"] = contentType;

    const auth = request.headers.get("authorization");
    if (auth) headers["Authorization"] = auth;

    const cookie = request.headers.get("cookie");
    if (cookie) headers["Cookie"] = cookie;

    // Attach server-only secret API Key if present in environment (NEVER hardcoded in source)
    const apiKey =
      process.env.WEBSITE_API_KEY ||
      process.env.STOREFRONT_API_KEY ||
      process.env.BLO_WEBSITE_API_KEY;
    if (apiKey) {
      headers["X-API-Key"] = apiKey;
    }

    const init: RequestInit = {
      method: request.method,
      headers,
      signal: controller.signal,
      cache: "no-store",
      redirect: "follow",
    };

    if (request.method !== "GET" && request.method !== "HEAD" && request.method !== "OPTIONS") {
      const bodyText = await request.text();
      if (bodyText) {
        init.body = bodyText;

        // Server-Side Pack Size Enforcement:
        // Reject unavailable 500 g and 1 kg variants submitted through API requests
        try {
          const parsed = JSON.parse(bodyText);
          const candidateItems = Array.isArray(parsed?.items)
            ? parsed.items
            : (Array.isArray(parsed?.cart?.items) ? parsed.cart.items : []);

          for (const item of candidateItems) {
            const itemWeight = String(item?.weight || item?.variant || "").toLowerCase().replace(/\s+/g, "");
            const itemName = String(item?.name || item?.title || "").toLowerCase();
            const itemSku = String(item?.sku || "").toLowerCase();

            if (
              itemWeight.includes("500") ||
              itemWeight.includes("1kg") ||
              itemWeight.includes("1000") ||
              itemName.includes("500g") ||
              itemName.includes("500 g") ||
              itemName.includes("1kg") ||
              itemName.includes("1 kg") ||
              itemSku.includes("500g") ||
              itemSku.includes("1kg")
            ) {
              console.warn("[AO ERP Proxy] Blocked unavailable variant order submission:", item);
              return NextResponse.json(
                {
                  success: false,
                  error: "UNAVAILABLE_PACK_SIZE",
                  message: "Only 200 g packs are currently available for purchase. 500 g and 1 kg packs are not available.",
                },
                { status: 400 }
              );
            }
          }
        } catch {
          // Non-JSON or standard payload without items, pass through
        }
      }
    }

    const backendRes = await fetch(targetUrl, init);
    clearTimeout(timeoutId);

    const resContentType = backendRes.headers.get("content-type") || "";
    const bodyText = await backendRes.text();

    console.log("[AO ERP Proxy] HTTP Status:", backendRes.status);

    if (backendRes.redirected) {
      console.warn("[AO ERP Proxy] Backend redirected to:", backendRes.url);
    }

    // Verify content-type contains application/json or valid JSON structure
    const isJson = resContentType.includes("application/json") || bodyText.trim().startsWith("{") || bodyText.trim().startsWith("[");

    if (!isJson) {
      console.error("[AO ERP Proxy Error] Non-JSON response received from upstream backend");
      return NextResponse.json(
        {
          success: false,
          error: "Upstream service temporarily unavailable",
          status: backendRes.status,
        },
        { status: 502 }
      );
    }

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", "application/json; charset=utf-8");

    const setCookie = backendRes.headers.get("set-cookie");
    if (setCookie) responseHeaders.set("Set-Cookie", setCookie);

    return new NextResponse(bodyText, {
      status: backendRes.status,
      headers: responseHeaders,
    });
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === "AbortError") {
      return NextResponse.json(
        { message: "504 Gateway Timeout: AO ERP Backend did not respond within 30 seconds." },
        { status: 504 }
      );
    }

    console.error("[AO ERP Proxy Exception]", err, "Target URL:", targetUrl);
    return NextResponse.json(
      {
        success: false,
        error: "API Proxy Error: Failed to connect to AO ERP Backend.",
        targetUrl,
        message: err instanceof Error ? err.message : String(err),
      },
      { status: 502 }
    );
  }
}

export {
  handleProxy as GET,
  handleProxy as POST,
  handleProxy as PUT,
  handleProxy as PATCH,
  handleProxy as DELETE,
  handleProxy as OPTIONS,
};
