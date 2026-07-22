const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem("blovit_token");
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

export async function syncCart(items: { productId: string; qty: number }[]): Promise<{ success: boolean; syncedCount: number }> {
  if (USE_MOCK) {
    console.log("[Mock API] Syncing cart items:", items);
    return Promise.resolve({ success: true, syncedCount: items.length });
  }
  const res = await fetch(`${API_BASE}/cart/sync`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error("Failed to sync cart");
  return res.json();
}
