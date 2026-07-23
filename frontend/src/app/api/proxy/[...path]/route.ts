import { NextRequest, NextResponse } from "next/server";

async function handleProxy(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
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

    const contentType = request.headers.get("content-type");
    if (contentType) headers["Content-Type"] = contentType;

    const auth = request.headers.get("authorization");
    if (auth) headers["Authorization"] = auth;

    // Attach server-only secret API key (never exposed to browser)
    const apiKey =
      process.env.WEBSITE_API_KEY ||
      process.env.NEXT_PUBLIC_WEBSITE_API_KEY ||
      "blovit_website_secret_key_2026";
    headers["X-API-Key"] = apiKey;

    const init: RequestInit = {
      method: request.method,
      headers,
    };

    if (request.method !== "GET" && request.method !== "HEAD") {
      const bodyText = await request.text();
      if (bodyText) init.body = bodyText;
    }

    const res = await fetch(targetUrl, init);
    const dataText = await res.text();

    return new NextResponse(dataText, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/json",
      },
    });
  } catch (err) {
    console.error("[Next Proxy Error]", err);
    return NextResponse.json(
      { message: "API Proxy error connecting to ERP backend." },
      { status: 500 }
    );
  }
}

export {
  handleProxy as GET,
  handleProxy as POST,
  handleProxy as PUT,
  handleProxy as DELETE,
  handleProxy as PATCH,
};
