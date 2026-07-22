import { MOCK_COUPONS } from "./mockData";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export interface CouponValidationResult {
  valid: boolean;
  discount: number;
  type: "percentage" | "fixed";
  value: number;
  message: string;
}

export async function validateCoupon(code: string, subtotal: number): Promise<CouponValidationResult> {
  if (USE_MOCK) {
    const coupon = MOCK_COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      return Promise.resolve({
        valid: false,
        discount: 0,
        type: "percentage",
        value: 0,
        message: "Invalid coupon code."
      });
    }

    if (subtotal < coupon.minSubtotal) {
      return Promise.resolve({
        valid: false,
        discount: 0,
        type: coupon.type,
        value: coupon.value,
        message: `Min order value of ₹${coupon.minSubtotal} required for this coupon.`
      });
    }

    let discount = 0;
    if (coupon.type === "percentage") {
      discount = Math.round((subtotal * coupon.value) / 100);
    } else {
      discount = coupon.value;
    }

    return Promise.resolve({
      valid: true,
      discount,
      type: coupon.type,
      value: coupon.value,
      message: `${coupon.type === "percentage" ? coupon.value + "%" : "₹" + coupon.value} coupon applied successfully.`
    });
  }

  const res = await fetch(`${API_BASE}/coupons/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, subtotal }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to validate coupon");
  }
  return res.json();
}
