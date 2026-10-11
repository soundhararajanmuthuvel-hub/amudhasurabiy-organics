import { API_BASE, USE_MOCK, getApiHeaders } from "./client";

export interface RazorpayOrder {
  orderId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export async function createRazorpayOrder(
  cartId: string,
  items?: unknown[],
  shippingInfo?: Record<string, unknown>
): Promise<RazorpayOrder> {
  if (Array.isArray(items)) {
    const hasUnavailableSize = items.some((item: unknown) => {
      if (!item || typeof item !== "object") return false;
      const it = item as Record<string, unknown>;
      const w = String(it.weight || "").toLowerCase().replace(/\s+/g, "");
      const n = String(it.name || "").toLowerCase();
      const sku = String(it.sku || "").toLowerCase();
      return w.includes("500") || w.includes("1kg") || w.includes("1000") || n.includes("500g") || n.includes("1kg") || sku.includes("500g") || sku.includes("1kg");
    });

    if (hasUnavailableSize) {
      throw new Error("Only 200 g packs are currently available for purchase. 500 g and 1 kg packs are not available.");
    }
  }

  if (USE_MOCK) {
    console.log("[Mock Razorpay API] Creating order for cartId:", cartId);
    return Promise.resolve({
      orderId: `local_${Math.random().toString(36).substring(2, 15)}`,
      razorpayOrderId: `order_mock_${Math.random().toString(36).substring(2, 15)}`,
      amount: 0,
      currency: "INR",
      keyId: "rzp_test_mock",
    });
  }
  const res = await fetch(`${API_BASE}/orders/create-order`, {
    method: "POST",
    headers: getApiHeaders(),
    body: JSON.stringify({ cartId, items, shippingInfo }),
  });
  if (!res.ok) throw new Error("Failed to create Razorpay order");
  return res.json();
}

export async function verifyRazorpayPayment(
  orderId: string,
  paymentId: string,
  signature: string
): Promise<{ success: boolean; orderNumber: string }> {
  if (USE_MOCK) {
    console.log("[Mock Razorpay API] Verifying payment details:", { orderId, paymentId, signature });
    return Promise.resolve({
      success: true,
      orderNumber: `BLV-${Math.floor(10000 + Math.random() * 90000)}`,
    });
  }
  const res = await fetch(`${API_BASE}/orders/verify`, {
    method: "POST",
    headers: getApiHeaders(),
    body: JSON.stringify({ orderId, paymentId, signature }),
  });
  if (!res.ok) throw new Error("Failed to verify Razorpay payment");
  return res.json();
}
