import type { Customer, ReferralMetrics, ReferralRecord } from "@/lib/types/customer";
import {
  getMockCustomerById,
  mockGetMyReferralCode,
  mockGetMyReferrals,
  mockGetReferralMetrics,
  mockSubmitReferral,
} from "@/lib/auth/mockAuthStore";
import { API_BASE, USE_MOCK, getApiHeaders } from "./client";

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
  newCustomerId?: string
): Promise<{ success: boolean; status: "PENDING" }> {
  if (USE_MOCK) {
    const id = newCustomerId || getCustomerIdFromToken() || "guest";
    const customer: Customer = getMockCustomerById(id) || {
      id,
      customerCode: "CUST-001",
      fullName: "Customer",
      mobileNumber: "9999999999",
      city: "Kumbakonam",
      state: "Tamil Nadu",
      rewardPoints: 50,
      walletBalance: 0,
      isEmailVerified: true,
      isVerified: true,
      createdAt: new Date().toISOString(),
      referralCode: "REF123",
    };
    return mockSubmitReferral(referralCode, customer);
  }

  const res = await fetch(`${API_BASE}/referrals/submit`, {
    method: "POST",
    headers: getApiHeaders(),
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
    headers: getApiHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch referrals.");
  const data = await res.json();
  return Array.isArray(data) ? data : data.referrals || [];
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
    headers: getApiHeaders(),
  });
  if (!res.ok) {
    return {
      invitedCount: 0,
      pendingCount: 0,
      approvedCount: 0,
      totalEarned: 0,
      availableBalance: 0,
      withdrawnBalance: 0,
    };
  }
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
    headers: getApiHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch referral code.");
  const data = await res.json();
  return data.referralCode || data.code || "";
}

export function getReferralShareUrl(referralCode: string): string {
  const base = typeof window !== "undefined" ? window.location.origin : "https://amudhasurabiy.com";
  return `${base}/create-account/?ref=${encodeURIComponent(referralCode)}`;
}

export function getWhatsAppShareUrl(referralCode: string): string {
  const shareUrl = getReferralShareUrl(referralCode);
  const text = encodeURIComponent(
    `Join me on Amudhasurabiy Organics — pure natural nutrition from Kumbakonam! Get your special discount coupon code when you sign up using my referral code ${referralCode}: ${shareUrl}`
  );
  return `https://api.whatsapp.com/send?text=${text}`;
}
