import type { AuthResponse, GuestCheckoutPayload, GuestCheckoutResponse, GuestConvertPayload } from "@/lib/types/customer";
import { createMockOrder } from "./mockData";
import { mockConvertGuestToAccount } from "@/lib/auth/mockAuthStore";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function guestCheckout(payload: GuestCheckoutPayload): Promise<GuestCheckoutResponse> {
  const hasUnavailableSize = payload.items.some((item) => {
    const n = String(item.name || "").toLowerCase();
    const pid = String(item.productId || "").toLowerCase();
    return n.includes("500g") || n.includes("500 g") || n.includes("1kg") || n.includes("1 kg") || pid.includes("500g") || pid.includes("1kg");
  });

  if (hasUnavailableSize) {
    throw new Error("Only 200 g packs are currently available for purchase. 500 g and 1 kg packs are not available.");
  }

  if (USE_MOCK) {
    const items = payload.items.map((item) => ({
      productId: item.productId,
      name: item.name,
      quantity: item.qty,
      price: item.price,
    }));

    const totalToPay = Math.max(
      0,
      payload.subtotal - payload.discount - (payload.walletDeduction || 0) + payload.shippingCharge
    );

    const order = createMockOrder(
      items,
      totalToPay,
      payload.shippingCharge,
      payload.discount
    );

    return {
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
      guestToken: `guest-token-${order.orderNumber}`,
    };
  }

  const res = await fetch(`${API_BASE}/checkout/guest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cartId: payload.cartId,
      shippingAddress: payload.shippingAddress,
      referralCode: payload.referralCode,
      items: payload.items,
      subtotal: payload.subtotal,
      shippingCharge: payload.shippingCharge,
      discount: payload.discount,
      walletDeduction: payload.walletDeduction,
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Guest checkout failed.");
  }
  return res.json();
}

export async function convertGuestToAccount(payload: GuestConvertPayload): Promise<AuthResponse> {
  if (USE_MOCK) {
    const res = await mockConvertGuestToAccount(payload);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("blovit_token", res.token);
      window.localStorage.setItem("blovit_customer", JSON.stringify(res.customer));
    }
    return res;
  }

  const res = await fetch(`${API_BASE}/checkout/convert-guest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to create account from guest order.");
  }

  const data: AuthResponse = await res.json();
  if (typeof window !== "undefined") {
    window.localStorage.setItem("blovit_token", data.token);
    window.localStorage.setItem("blovit_customer", JSON.stringify(data.customer));
  }
  return data;
}
