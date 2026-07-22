import type { RewardWallet } from "@/lib/types/customer";
import { mockApplyWallet, mockGetWallet } from "@/lib/auth/mockAuthStore";

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

export async function getRewardWallet(): Promise<RewardWallet> {
  if (USE_MOCK) {
    const customerId = getCustomerIdFromToken();
    if (!customerId) {
      return {
        balance: 500,
        transactions: [
          {
            id: "tx_demo_01",
            type: "credit",
            amount: 500,
            description: "Referral Reward Credited (AO ERP Approved)",
            createdAt: "2026-06-12T14:30:00.000Z",
          },
        ],
      };
    }
    return mockGetWallet(customerId);
  }

  const res = await fetch(`${API_BASE}/wallet/my-wallet`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch wallet.");
  return res.json();
}

export async function applyRewardWallet(amount: number): Promise<RewardWallet> {
  if (USE_MOCK) {
    const customerId = getCustomerIdFromToken();
    if (!customerId) throw new Error("Please log in to use reward wallet.");
    return mockApplyWallet(customerId, amount);
  }

  const res = await fetch(`${API_BASE}/wallet/apply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ amount }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to apply wallet balance.");
  }

  return res.json();
}
