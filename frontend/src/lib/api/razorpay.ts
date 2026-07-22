const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem("blovit_token");
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

export async function createRazorpayOrder(cartId: string): Promise<RazorpayOrder> {
  if (USE_MOCK) {
    console.log("[Mock Razorpay API] Creating order for cartId:", cartId);
    return Promise.resolve({
      id: `order_mock_${Math.random().toString(36).substring(2, 15)}`,
      amount: 0, // Calculated dynamically during frontend checkout script
      currency: "INR"
    });
  }
  const res = await fetch(`${API_BASE}/razorpay/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ cartId }),
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
      orderNumber: `BLV-${Math.floor(10000 + Math.random() * 90000)}`
    });
  }
  const res = await fetch(`${API_BASE}/razorpay/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ orderId, paymentId, signature }),
  });
  if (!res.ok) throw new Error("Failed to verify Razorpay payment");
  return res.json();
}
