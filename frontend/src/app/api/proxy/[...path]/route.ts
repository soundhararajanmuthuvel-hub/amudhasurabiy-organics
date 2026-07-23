import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function handleProxy(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30-second timeout

  try {
    const resolvedParams = await params;
    const subpath = resolvedParams.path ? resolvedParams.path.join("/") : "";
    let rawBaseUrl =
      process.env.BACKEND_API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "http://localhost:5000";

    // Normalize base URL without duplicate /api or trailing slashes
    rawBaseUrl = rawBaseUrl.replace(/\/$/, "").replace(/\/api\/website$/, "").replace(/\/api$/, "");

    const search = request.nextUrl.search || "";
    const targetUrl = `${rawBaseUrl}/api/website/${subpath}${search}`;

    console.log("[AO ERP Proxy] Incoming Path:", subpath);
    console.log("[AO ERP Proxy] Target URL:", targetUrl);

    const headers: Record<string, string> = {};

    // Forward relevant incoming request headers
    const contentType = request.headers.get("content-type");
    if (contentType) headers["Content-Type"] = contentType;

    const auth = request.headers.get("authorization");
    if (auth) headers["Authorization"] = auth;

    const cookie = request.headers.get("cookie");
    if (cookie) headers["Cookie"] = cookie;

    // Attach server-only secret API Key (NEVER exposed to browser)
    const apiKey =
      process.env.WEBSITE_API_KEY ||
      process.env.BLO_WEBSITE_API_KEY ||
      "blovit_live_sec_99382174620091823746";
    headers["X-API-Key"] = apiKey;

    const init: RequestInit = {
      method: request.method,
      headers,
      signal: controller.signal,
      cache: "no-store",
    };

    if (request.method !== "GET" && request.method !== "HEAD" && request.method !== "OPTIONS") {
      const bodyText = await request.text();
      if (bodyText) init.body = bodyText;
    }

    const backendRes = await fetch(targetUrl, init);
    clearTimeout(timeoutId);

    const responseHeaders = new Headers();
    const resContentType = backendRes.headers.get("content-type");
    if (resContentType) responseHeaders.set("Content-Type", resContentType);

    const setCookie = backendRes.headers.get("set-cookie");
    if (setCookie) responseHeaders.set("Set-Cookie", setCookie);

    const bodyBuffer = await backendRes.arrayBuffer();

    // Log diagnostic check for Step 4
    console.log("[AO ERP Proxy] Response Status:", backendRes.status);
    console.log("[AO ERP Proxy] Content-Type:", resContentType);

    return new NextResponse(bodyBuffer, {
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

    console.error("[AO ERP Proxy Error]", err);
    return NextResponse.json(
      { message: "API Proxy Error: Failed to connect to AO ERP Backend." },
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
