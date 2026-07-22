import { getMockWishlist, toggleMockWishlist } from "./mockData";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem("blovit_token");
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

export async function getWishlist(): Promise<string[]> {
  if (USE_MOCK) {
    return Promise.resolve(getMockWishlist());
  }
  const res = await fetch(`${API_BASE}/account/wishlist`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch wishlist");
  return res.json();
}

export async function toggleWishlist(productId: string): Promise<string[]> {
  if (USE_MOCK) {
    const list = toggleMockWishlist(productId);
    return Promise.resolve(list);
  }
  const res = await fetch(`${API_BASE}/account/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) throw new Error("Failed to toggle wishlist");
  return res.json();
}
