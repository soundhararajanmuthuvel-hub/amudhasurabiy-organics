export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
export const API_BASE = `${rawBaseUrl.replace(/\/$/, "")}/api/website`;

export const WEBSITE_API_KEY = process.env.NEXT_PUBLIC_WEBSITE_API_KEY || "blovit_website_secret_key_2026";

export function getApiHeaders(extraHeaders: Record<string, string> = {}): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-API-Key": WEBSITE_API_KEY,
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
