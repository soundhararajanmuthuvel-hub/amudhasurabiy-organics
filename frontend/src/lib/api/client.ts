import { apiFetch, API_BASE, USE_MOCK } from "@/lib/api";

export { API_BASE, USE_MOCK, apiFetch };

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
