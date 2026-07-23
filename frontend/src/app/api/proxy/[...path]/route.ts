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
    const rawBaseUrl =
      process.env.BACKEND_API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "http://localhost:5000";
    const backendBase = rawBaseUrl.replace(/\/$/, "");

    const search = request.nextUrl.search || "";
    const targetUrl = `${backendBase}/api/website/${subpath}${search}`;

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
      process.env.NEXT_PUBLIC_WEBSITE_API_KEY ||
      "blovit_live_mrxfusiy_04ux73qg";
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
