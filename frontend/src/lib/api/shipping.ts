import { API_BASE, USE_MOCK, getApiHeaders } from "./client";

export interface StateShippingRule {
  state: string;
  baseCharge: number;
  freeShippingThreshold: number;
  pincodePrefixes: number[];
  estimatedDelivery: string;
}

export const SHIPPING_RULES_CONFIG: Record<string, StateShippingRule> = {
  "TN": { 
    state: "Tamil Nadu", 
    baseCharge: 60, 
    freeShippingThreshold: 499, 
    pincodePrefixes: [60, 61, 62, 63, 64],
    estimatedDelivery: "1 - 2 business days"
  },
  "KL": { 
    state: "Kerala", 
    baseCharge: 80, 
    freeShippingThreshold: 799, 
    pincodePrefixes: [67, 68, 69],
    estimatedDelivery: "2 - 3 business days"
  },
  "KA": { 
    state: "Karnataka", 
    baseCharge: 90, 
    freeShippingThreshold: 799, 
    pincodePrefixes: [56, 57, 58, 59],
    estimatedDelivery: "2 - 3 business days"
  },
  "AP_TS": { 
    state: "Andhra Pradesh & Telangana", 
    baseCharge: 90, 
    freeShippingThreshold: 899, 
    pincodePrefixes: [50, 51, 52, 53],
    estimatedDelivery: "3 - 4 business days"
  },
  "MH": { 
    state: "Maharashtra", 
    baseCharge: 100, 
    freeShippingThreshold: 999, 
    pincodePrefixes: [40, 41, 42, 43, 44],
    estimatedDelivery: "3 - 4 business days"
  },
  "DL_NCR": { 
    state: "Delhi NCR", 
    baseCharge: 110, 
    freeShippingThreshold: 999, 
    pincodePrefixes: [11, 12, 20],
    estimatedDelivery: "4 - 5 business days"
  },
  "ROI": { 
    state: "Rest of India", 
    baseCharge: 110, 
    freeShippingThreshold: 999, 
    pincodePrefixes: [],
    estimatedDelivery: "4 - 6 business days"
  }
};

export interface ShippingCalculation {
  shippingCharge: number;
  freeShippingThreshold: number;
  isFreeShippingEligible: boolean;
  message: string;
  stateName: string;
  isServiceable: boolean;
  estimatedDelivery: string;
  dispatchTime: string;
}

export async function calculateShipping(pincode: string, subtotal: number): Promise<ShippingCalculation> {
  const cleaned = pincode.trim().replace(/\D/g, "");
  
  if (USE_MOCK) {
    if (cleaned.length < 6) {
      const defaultRule = SHIPPING_RULES_CONFIG["ROI"];
      return Promise.resolve({
        shippingCharge: defaultRule.baseCharge,
        freeShippingThreshold: defaultRule.freeShippingThreshold,
        isFreeShippingEligible: subtotal >= defaultRule.freeShippingThreshold,
        message: "Enter 6-digit PIN code...",
        stateName: defaultRule.state,
        isServiceable: true,
        estimatedDelivery: defaultRule.estimatedDelivery,
        dispatchTime: "Dispatched in 24 hours from Kumbakonam"
      });
    }

    const prefixNum = parseInt(cleaned.substring(0, 2), 10);
    let matchedRule = SHIPPING_RULES_CONFIG["ROI"];

    for (const ruleKey of Object.keys(SHIPPING_RULES_CONFIG)) {
      if (ruleKey !== "ROI" && SHIPPING_RULES_CONFIG[ruleKey].pincodePrefixes.includes(prefixNum)) {
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
      stateName: matchedRule.state,
      isServiceable: true,
      estimatedDelivery: matchedRule.estimatedDelivery,
      dispatchTime: "Dispatched in 24 hours from Kumbakonam"
    });
  }

  const res = await fetch(`${API_BASE}/shipping/calculate`, {
    method: "POST",
    headers: getApiHeaders(),
    body: JSON.stringify({ pincode, subtotal }),
  });
  if (!res.ok) {
    // Fallback gracefully to client calculation on network failure
    const prefixNum = parseInt(cleaned.substring(0, 2), 10) || 60;
    let matchedRule = SHIPPING_RULES_CONFIG["ROI"];
    for (const ruleKey of Object.keys(SHIPPING_RULES_CONFIG)) {
      if (ruleKey !== "ROI" && SHIPPING_RULES_CONFIG[ruleKey].pincodePrefixes.includes(prefixNum)) {
        matchedRule = SHIPPING_RULES_CONFIG[ruleKey];
        break;
      }
    }
    const isFree = subtotal >= matchedRule.freeShippingThreshold;
    return {
      shippingCharge: isFree ? 0 : matchedRule.baseCharge,
      freeShippingThreshold: matchedRule.freeShippingThreshold,
      isFreeShippingEligible: isFree,
      message: isFree
        ? `Free shipping unlocked for ${matchedRule.state}!`
        : `₹${matchedRule.baseCharge} shipping to ${matchedRule.state} (Free on orders above ₹${matchedRule.freeShippingThreshold})`,
      stateName: matchedRule.state,
      isServiceable: true,
      estimatedDelivery: matchedRule.estimatedDelivery,
      dispatchTime: "Dispatched in 24 hours from Kumbakonam"
    };
  }
  return res.json();
}
