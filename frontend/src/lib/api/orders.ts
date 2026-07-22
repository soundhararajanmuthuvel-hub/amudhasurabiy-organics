import { Order, getMockOrders, createMockOrder, OrderItem } from "./mockData";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem("blovit_token");
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

export async function getOrders(): Promise<Order[]> {
  if (USE_MOCK) {
    return Promise.resolve(getMockOrders());
  }
  const res = await fetch(`${API_BASE}/account/orders`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function getOrderById(id: string): Promise<Order | null> {
  if (USE_MOCK) {
    const orders = getMockOrders();
    const order = orders.find(o => o.id === id);
    return Promise.resolve(order || null);
  }
  const res = await fetch(`${API_BASE}/account/orders/${id}`, {
    headers: getAuthHeaders(),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch order");
  return res.json();
}

export async function placeMockOrder(
  items: OrderItem[],
  total: number,
  shippingCharge: number,
  discount: number
): Promise<Order> {
  if (USE_MOCK) {
    const order = createMockOrder(items, total, shippingCharge, discount);
    return Promise.resolve(order);
  }
  throw new Error("Only available in mock mode");
}
