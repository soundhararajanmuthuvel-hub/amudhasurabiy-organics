import { getMockWishlist, toggleMockWishlist } from "./mockData";
import { API_BASE, USE_MOCK, getApiHeaders } from "./client";

export async function getWishlist(): Promise<string[]> {
  if (USE_MOCK) {
    return Promise.resolve(getMockWishlist());
  }
  const res = await fetch(`${API_BASE}/account/wishlist`, {
    headers: getApiHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch wishlist");
  const data = await res.json();
  return Array.isArray(data) ? data : data.wishlist || [];
}

export async function toggleWishlist(productId: string): Promise<string[]> {
  if (USE_MOCK) {
    const list = toggleMockWishlist(productId);
    return Promise.resolve(list);
  }
  const res = await fetch(`${API_BASE}/account/wishlist`, {
    method: "POST",
    headers: getApiHeaders(),
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) throw new Error("Failed to toggle wishlist");
  const data = await res.json();
  return Array.isArray(data) ? data : data.wishlist || [];
}
