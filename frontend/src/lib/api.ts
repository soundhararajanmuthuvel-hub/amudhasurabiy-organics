export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export const API_BASE = typeof window !== "undefined"
  ? "/api/proxy"
  : `${(process.env.BACKEND_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000").replace(/\/$/, "")}/api/website`;

export interface ApiFetchOptions extends RequestInit {
  timeoutMs?: number;
  retries?: number;
}

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function apiFetch<T>(endpoint: string, options: ApiFetchOptions = {}): Promise<T> {
  const { timeoutMs = 10000, retries = 2, headers: customHeaders, ...restOptions } = options;
  
  // Normalize endpoint with leading and trailing slashes for Next.js trailingSlash config
  let cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  if (!cleanEndpoint.includes("?") && !cleanEndpoint.endsWith("/")) {
    cleanEndpoint = `${cleanEndpoint}/`;
  }
  
  const url = `${API_BASE}${cleanEndpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((customHeaders as Record<string, string>) || {}),
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("blovit_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  } else {
    // Attach secret X-API-Key when server component fetches directly from backend
    const apiKey =
      process.env.WEBSITE_API_KEY ||
      process.env.STOREFRONT_API_KEY ||
      process.env.BLO_WEBSITE_API_KEY;
    if (apiKey) {
      headers["X-API-Key"] = apiKey;
    }
  }

  let attempt = 0;
  const maxAttempts = (restOptions.method === "GET" || !restOptions.method) ? Math.max(1, retries + 1) : 1;

  while (attempt < maxAttempts) {
    attempt++;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, {
        ...restOptions,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timer);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new ApiError(errorData.message || `API Request failed with status ${res.status}`, res.status, errorData);
      }

      return (await res.json()) as T;
    } catch (err: unknown) {
      clearTimeout(timer);
      const isLastAttempt = attempt >= maxAttempts;

      if (isLastAttempt) {
        if (err instanceof ApiError) throw err;
        if (err instanceof Error && err.name === "AbortError") {
          throw new ApiError(`Request timeout after ${timeoutMs}ms`, 504);
        }
        throw new ApiError(err instanceof Error ? err.message : "Network error", 500);
      }

      // Exponential backoff before retry
      await new Promise((resolve) => setTimeout(resolve, attempt * 300));
    }
  }

  throw new ApiError("Failed to complete request after retries", 500);
}
