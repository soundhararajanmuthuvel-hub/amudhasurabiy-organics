import type { ReferralMetrics, ReferralRecord } from "@/lib/types/customer";
import {
  getMockCustomerById,
  mockGetMyReferralCode,
  mockGetMyReferrals,
  mockGetReferralMetrics,
  mockSubmitReferral,
} from "@/lib/auth/mockAuthStore";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem("blovit_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function getCustomerIdFromToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = window.localStorage.getItem("blovit_token");
  if (!token) return null;
  if (token.startsWith("mock-jwt-")) {
    return token.replace("mock-jwt-", "");
  }
  try {
    const customer = JSON.parse(localStorage.getItem("blovit_customer") || "null");
    return customer?.id || null;
  } catch {
    return null;
  }
}

export async function submitReferral(
  referralCode: string,
  newCustomerId: string
): Promise<{ success: boolean; status: "PENDING" }> {
  if (USE_MOCK) {
    const customer = getMockCustomerById(newCustomerId);
    if (!customer) throw new Error("Customer not found.");
    return mockSubmitReferral(referralCode, customer);
  }

  const res = await fetch(`${API_BASE}/referrals/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ referralCode, newCustomerId }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to submit referral.");
  }
  return res.json();
}

export async function getMyReferrals(): Promise<ReferralRecord[]> {
  if (USE_MOCK) {
    const customerId = getCustomerIdFromToken();
    if (!customerId) return [];
    return mockGetMyReferrals(customerId);
  }

  const res = await fetch(`${API_BASE}/referrals/my-referrals`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch referrals.");
  return res.json();
}

export async function getReferralMetrics(): Promise<ReferralMetrics> {
  if (USE_MOCK) {
    const customerId = getCustomerIdFromToken();
    if (!customerId) {
      return {
        invitedCount: 12,
        pendingCount: 3,
        approvedCount: 8,
        totalEarned: 800,
        availableBalance: 500,
        withdrawnBalance: 300,
      };
    }
    return mockGetReferralMetrics(customerId);
  }

  const res = await fetch(`${API_BASE}/referrals/metrics`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch referral metrics.");
  return res.json();
}

export async function getMyReferralCode(): Promise<string> {
  if (USE_MOCK) {
    const customerId = getCustomerIdFromToken();
    if (!customerId) return "AMU-DINE01";
    const code = mockGetMyReferralCode(customerId);
    return code || "AMU-DINE01";
  }

  const res = await fetch(`${API_BASE}/referrals/my-code`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch referral code.");
  const data = await res.json();
  return data.referralCode;
}

export function getReferralShareUrl(referralCode: string): string {
  const base = typeof window !== "undefined" ? window.location.origin : "https://amudhasurabiy.com";
  return `${base}/create-account/?ref=${encodeURIComponent(referralCode)}`;
}

export function getWhatsAppShareUrl(referralCode: string): string {
  const shareUrl = getReferralShareUrl(referralCode);
  const text = encodeURIComponent(
    `Join me on Amudhasurabiy Organics — pure natural nutrition from Kumbakonam! Earn ₹100 reward credit when you complete your first order. Use my referral code ${referralCode}: ${shareUrl}`
  );
  return `https://api.whatsapp.com/send?text=${text}`;
}
