import { API_BASE, USE_MOCK, getApiHeaders } from "./client";

export interface StateShippingRule {
  state: string;
  baseCharge: number;
  freeShippingThreshold: number;
  pincodePrefixes: number[];
}

export const SHIPPING_RULES_CONFIG: Record<string, StateShippingRule> = {
  "TN": { state: "Tamil Nadu", baseCharge: 60, freeShippingThreshold: 499, pincodePrefixes: [60, 61, 62, 63, 64] },
  "KL": { state: "Kerala", baseCharge: 80, freeShippingThreshold: 799, pincodePrefixes: [67, 68, 69] },
  "KA": { state: "Karnataka", baseCharge: 90, freeShippingThreshold: 799, pincodePrefixes: [56, 57, 58, 59] },
  "ROI": { state: "Rest of India", baseCharge: 110, freeShippingThreshold: 999, pincodePrefixes: [] }
};

export interface ShippingCalculation {
  shippingCharge: number;
  freeShippingThreshold: number;
  isFreeShippingEligible: boolean;
  message: string;
  stateName: string;
}

export async function calculateShipping(pincode: string, subtotal: number): Promise<ShippingCalculation> {
  if (USE_MOCK) {
    const cleaned = pincode.trim().replace(/\D/g, "");
    if (cleaned.length < 6) {
      const defaultRule = SHIPPING_RULES_CONFIG["ROI"];
      return Promise.resolve({
        shippingCharge: defaultRule.baseCharge,
        freeShippingThreshold: defaultRule.freeShippingThreshold,
        isFreeShippingEligible: subtotal >= defaultRule.freeShippingThreshold,
        message: "Enter 6-digit PIN code...",
        stateName: defaultRule.state
      });
    }

    const prefixNum = parseInt(cleaned.substring(0, 2), 10);
    let matchedRule = SHIPPING_RULES_CONFIG["ROI"];

    for (const ruleKey of ["TN", "KL", "KA"]) {
      if (SHIPPING_RULES_CONFIG[ruleKey].pincodePrefixes.includes(prefixNum)) {
        matchedRule = SHIPPING_RULES_CONFIG[ruleKey];
        break;
      }
    }

    const isFree = subtotal >= matchedRule.freeShippingThreshold;
    return Promise.resolve({
      shippingCharge: isFree ? 0 : matchedRule.baseCharge,
      freeShippingThreshold: matchedRule.freeShippingThreshold,
      isFreeShippingEligible: isFree,
      message: isFree
        ? `Free shipping unlocked for ${matchedRule.state}!`
        : `₹${matchedRule.baseCharge} shipping to ${matchedRule.state} (Free on orders above ₹${matchedRule.freeShippingThreshold})`,
      stateName: matchedRule.state
    });
  }

  const res = await fetch(`${API_BASE}/shipping/calculate`, {
    method: "POST",
    headers: getApiHeaders(),
    body: JSON.stringify({ pincode, subtotal }),
  });
  if (!res.ok) throw new Error("Failed to calculate shipping");
  return res.json();
}
