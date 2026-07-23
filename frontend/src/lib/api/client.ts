export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

// Client-side requests route through local Next.js server proxy at /api/proxy
// Next.js server attaches WEBSITE_API_KEY securely before forwarding to backend ERP.
export const API_BASE = typeof window !== "undefined"
  ? "/api/proxy"
  : `${(process.env.BACKEND_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000").replace(/\/$/, "")}/api/website`;

export function getApiHeaders(extraHeaders: Record<string, string> = {}): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...extraHeaders,
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("blovit_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
}
