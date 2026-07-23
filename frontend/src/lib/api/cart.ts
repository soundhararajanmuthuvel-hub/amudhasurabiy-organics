import { API_BASE, USE_MOCK, getApiHeaders } from "./client";

export async function syncCart(items: { productId: string; qty: number }[]): Promise<{ success: boolean; syncedCount: number }> {
  if (USE_MOCK) {
    console.log("[Mock API] Syncing cart items:", items);
    return Promise.resolve({ success: true, syncedCount: items.length });
  }
  const res = await fetch(`${API_BASE}/account/cart/sync`, {
    method: "POST",
    headers: getApiHeaders(),
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error("Failed to sync cart");
  return res.json();
}
