import { Order, getMockOrders, createMockOrder, OrderItem } from "./mockData";
import { API_BASE, USE_MOCK, getApiHeaders } from "./client";

export async function getOrders(): Promise<Order[]> {
  if (USE_MOCK) {
    return Promise.resolve(getMockOrders());
  }
  const res = await fetch(`${API_BASE}/account/orders`, {
    headers: getApiHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  const data = await res.json();
  return Array.isArray(data) ? data : data.orders || [];
}

export async function getOrderById(id: string): Promise<Order | null> {
  if (USE_MOCK) {
    const orders = getMockOrders();
    const order = orders.find((o) => o.id === id);
    return Promise.resolve(order || null);
  }
  const res = await fetch(`${API_BASE}/account/orders/${id}`, {
    headers: getApiHeaders(),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch order");
  const data = await res.json();
  return data.order || data;
}

export async function placeMockOrder(
  items: OrderItem[],
  total: number,
  shippingCharge: number,
  discount: number,
  shippingAddress?: any,
  paymentMethod?: string
): Promise<Order> {
  const order = createMockOrder(items, total, shippingCharge, discount, shippingAddress, paymentMethod);
  return Promise.resolve(order);
}
