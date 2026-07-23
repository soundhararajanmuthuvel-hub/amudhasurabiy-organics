import type {
  Customer,
  CustomerAuth,
  ForgotPasswordStep1Response,
  ForgotPasswordStep2Response,
  GuestConvertPayload,
  ReferralMetrics,
  ReferralRecord,
  RegisterPayload,
  RewardWallet,
  SecuritySettings,
} from "@/lib/types/customer";
import { evaluatePasswordStrength } from "./passwordStrength";

const CUSTOMERS_KEY = "blovit_customers_registry";
const AUTH_KEY = "blovit_auth_registry";
const REFERRALS_KEY = "blovit_referrals_registry";
const WALLETS_KEY = "blovit_wallets_registry";

function generateReferralCode(): string {
  const suffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `AMU-${suffix}`;
}

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getCustomersRegistry(): Record<string, Customer> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(CUSTOMERS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveCustomersRegistry(registry: Record<string, Customer>) {
  if (typeof window !== "undefined") {
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(registry));
  }
}

function getAuthRegistry(): Record<string, CustomerAuth> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveAuthRegistry(registry: Record<string, CustomerAuth>) {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, JSON.stringify(registry));
  }
}

function getReferralsRegistry(): Record<string, ReferralRecord[]> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(REFERRALS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveReferralsRegistry(registry: Record<string, ReferralRecord[]>) {
  if (typeof window === "undefined") {
    localStorage.setItem(REFERRALS_KEY, JSON.stringify(registry));
  }
}

function getWalletsRegistry(): Record<string, RewardWallet> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(WALLETS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveWalletsRegistry(registry: Record<string, RewardWallet>) {
  if (typeof window === "undefined") {
    localStorage.setItem(WALLETS_KEY, JSON.stringify(registry));
  }
}

export function seedMockCustomersIfNeeded(): void {
  if (typeof window === "undefined") return;
  const customers = getCustomersRegistry();
  if (Object.keys(customers).length > 0) return;

  const demoCustomer: Customer = {
    id: "cust_demo_001",
    customerCode: "CUS-10001",
    fullName: "Dinesh Kumar",
    mobileNumber: "9876543210",
    email: "dinesh@example.com",
    city: "Kumbakonam",
    state: "Tamil Nadu",
    rewardPoints: 150,
    walletBalance: 500,
    referralCode: "AMU-DINE01",
    isEmailVerified: true,
    isVerified: true,
    createdAt: "2026-01-15T08:00:00.000Z",
  };

  hashPassword("Test@1234").then((hash) => {
    const auths = getAuthRegistry();
    auths[demoCustomer.id] = {
      customerId: demoCustomer.id,
      passwordHash: hash,
      lastLogin: new Date().toISOString(),
      failedAttempts: 0,
      isVerified: true,
    };
    saveAuthRegistry(auths);

    customers["9876543210"] = demoCustomer;
    saveCustomersRegistry(customers);

    saveReferralsRegistry({
      cust_demo_001: [
        {
          id: "ref_001",
          referredCustomerName: "Priya Sharma",
          referredCustomerMobile: "9123456780",
          status: "APPROVED",
          discountAmount: 100,
          couponCode: "REF100-PRIYA",
          createdAt: "2026-06-10T10:00:00.000Z",
          approvedAt: "2026-06-12T14:30:00.000Z",
        },
        {
          id: "ref_002",
          referredCustomerName: "Arun Vel",
          referredCustomerMobile: "9988776655",
          status: "PENDING",
          createdAt: "2026-07-18T09:00:00.000Z",
        },
        {
          id: "ref_003",
          referredCustomerName: "Kavitha R",
          referredCustomerMobile: "9001122334",
          status: "REJECTED",
          createdAt: "2026-05-01T11:00:00.000Z",
        },
        {
          id: "ref_004",
          referredCustomerName: "Suresh Kumar",
          referredCustomerMobile: "9840112233",
          status: "FIRST_ORDER_PENDING",
          createdAt: "2026-07-20T10:00:00.000Z",
        },
        {
          id: "ref_005",
          referredCustomerName: "Meena Sundaram",
          referredCustomerMobile: "9710998877",
          status: "UNDER_REVIEW",
          createdAt: "2026-07-21T15:20:00.000Z",
        },
      ],
    });

    saveWalletsRegistry({
      cust_demo_001: {
        balance: 500,
        transactions: [
          {
            id: "tx_101",
            type: "credit",
            amount: 500,
            description: "Referral Bonus Credited (AO ERP Approved)",
            createdAt: "2026-06-12T14:30:00.000Z",
          },
        ],
      },
    });
  });
}

export async function mockRegister(payload: RegisterPayload): Promise<{ token: string; customer: Customer }> {
  seedMockCustomersIfNeeded();
  const customers = getCustomersRegistry();
  const auths = getAuthRegistry();
  const mobile = payload.mobile.replace(/\D/g, "");

  if (mobile.length !== 10) {
    throw new Error("Please enter a valid 10-digit mobile number.");
  }
  if (customers[mobile]) {
    throw new Error("An account with this mobile number already exists. Please sign in instead.");
  }
  if (!payload.acceptTerms) {
    throw new Error("You must accept the Terms & Conditions to create an account.");
  }

  const strength = evaluatePasswordStrength(payload.password);
  if (strength.score < 3) {
    throw new Error(`Password is too weak. ${strength.hints.join(". ")}`);
  }

  const passwordHash = await hashPassword(payload.password);
  const customerId = `cust_${Date.now()}`;
  const customer: Customer = {
    id: customerId,
    customerCode: `CUS-${Math.floor(10000 + Math.random() * 90000)}`,
    fullName: payload.fullName.trim(),
    mobileNumber: mobile,
    email: payload.email?.trim() || undefined,
    city: payload.city.trim(),
    state: payload.state.trim(),
    rewardPoints: 50,
    walletBalance: 0,
    referralCode: generateReferralCode(),
    isEmailVerified: false,
    isVerified: true,
    createdAt: new Date().toISOString(),
  };

  customers[mobile] = customer;
  saveCustomersRegistry(customers);

  auths[customerId] = {
    customerId,
    passwordHash,
    lastLogin: new Date().toISOString(),
    failedAttempts: 0,
    isVerified: true,
  };
  saveAuthRegistry(auths);

  if (payload.referralCode?.trim()) {
    await mockSubmitReferral(payload.referralCode.trim(), customer);
  }

  const token = `mock-jwt-${customerId}`;
  return { token, customer };
}

export async function mockLogin(mobile: string, password: string): Promise<{ token: string; customer: Customer }> {
  seedMockCustomersIfNeeded();
  const customers = getCustomersRegistry();
  const auths = getAuthRegistry();
  const cleaned = mobile.replace(/\D/g, "");
  const customer = customers[cleaned];

  if (!customer) {
    throw new Error("No account found with this mobile number. Please create an account.");
  }

  const auth = auths[customer.id];
  if (auth?.lockedUntil && new Date(auth.lockedUntil) > new Date()) {
    const minutesLeft = Math.ceil((new Date(auth.lockedUntil).getTime() - Date.now()) / 60000);
    throw new Error(`Too many failed attempts. Account locked for ${minutesLeft} minute(s).`);
  }

  const passwordHash = await hashPassword(password);
  if (!auth || passwordHash !== auth.passwordHash) {
    if (auth) {
      auth.failedAttempts = (auth.failedAttempts || 0) + 1;
      if (auth.failedAttempts >= 5) {
        auth.lockedUntil = new Date(Date.now() + 15 * 60000).toISOString();
      }
      auths[customer.id] = auth;
      saveAuthRegistry(auths);
    }
    throw new Error("Incorrect password. Please try again or reset your password.");
  }

  auth.failedAttempts = 0;
  auth.lastLogin = new Date().toISOString();
  auths[customer.id] = auth;
  saveAuthRegistry(auths);

  const token = `mock-jwt-${customer.id}`;
  return { token, customer };
}

export function mockForgotPasswordStep1(mobile: string): ForgotPasswordStep1Response {
  seedMockCustomersIfNeeded();
  const customers = getCustomersRegistry();
  const cleaned = mobile.replace(/\D/g, "");
  const customer = customers[cleaned];

  if (!customer) {
    return {
      found: false,
      hasEmail: false,
      message: "No account found with this mobile number. Please check the number or create a new account.",
    };
  }

  if (customer.email) {
    const [local, domain] = customer.email.split("@");
    const hint = `${local[0]}${"*".repeat(Math.max(local.length - 1, 2))}@${domain}`;
    return { found: true, hasEmail: true, emailHint: hint };
  }

  return {
    found: true,
    hasEmail: false,
    message:
      "Your account does not have an email on file. Our admin team will verify your identity and send password reset instructions via SMS within 24 hours.",
  };
}

export function mockForgotPasswordStep2(mobile: string, email: string): ForgotPasswordStep2Response {
  const customers = getCustomersRegistry();
  const cleaned = mobile.replace(/\D/g, "");
  const customer = customers[cleaned];

  if (!customer) {
    throw new Error("Account not found.");
  }

  if (!customer.email) {
    return {
      method: "manual",
      message:
        "Your account does not have an email on file. Our admin team will verify your identity and send password reset instructions via SMS within 24 hours.",
    };
  }

  if (customer.email.toLowerCase() !== email.trim().toLowerCase()) {
    throw new Error("The email address does not match our records. Please try again.");
  }

  return {
    method: "email",
    message: `A password reset link has been sent to ${customer.email}. The link expires in 30 minutes. Please check your inbox and spam folder.`,
  };
}

export async function mockResetPassword(token: string, newPassword: string): Promise<{ success: boolean }> {
  const strength = evaluatePasswordStrength(newPassword);
  if (strength.score < 3) {
    throw new Error(`Password is too weak. ${strength.hints.join(". ")}`);
  }

  const customerId = token.replace("mock-reset-", "");
  const auths = getAuthRegistry();
  const auth = auths[customerId];
  if (!auth) {
    throw new Error("Invalid or expired reset link. Please request a new one.");
  }

  auth.passwordHash = await hashPassword(newPassword);
  auth.failedAttempts = 0;
  auth.lockedUntil = undefined;
  auths[customerId] = auth;
  saveAuthRegistry(auths);
  return { success: true };
}

export async function mockSubmitReferral(
  referralCode: string,
  newCustomer: Customer
): Promise<{ success: boolean; status: "PENDING" }> {
  const customers = getCustomersRegistry();
  const referrer = Object.values(customers).find(
    (c) => c.referralCode.toUpperCase() === referralCode.toUpperCase()
  );

  if (!referrer) {
    throw new Error("Invalid referral code. Please check and try again, or skip this step.");
  }

  if (referrer.id === newCustomer.id) {
    throw new Error("You cannot use your own referral code.");
  }

  const referralsRegistry = getReferralsRegistry();
  const referrerId = referrer.id;
  const existing = referralsRegistry[referrerId] || [];

  const newReferral: ReferralRecord = {
    id: `ref_${Date.now()}`,
    referrerId,
    referredCustomerName: newCustomer.fullName,
    referredCustomerMobile: newCustomer.mobileNumber,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  referralsRegistry[referrerId] = [newReferral, ...existing];
  saveReferralsRegistry(referralsRegistry);

  return { success: true, status: "PENDING" };
}

export function mockGetMyReferrals(customerId: string): ReferralRecord[] {
  const referralsRegistry = getReferralsRegistry();
  return referralsRegistry[customerId] || [];
}

export function mockGetReferralMetrics(customerId: string): ReferralMetrics {
  const list = mockGetMyReferrals(customerId);
  const wallets = getWalletsRegistry();
  const wallet = wallets[customerId] || { balance: 0, transactions: [] };

  const invitedCount = list.length;
  const pendingCount = list.filter((r) => r.status === "PENDING" || r.status === "FIRST_ORDER_PENDING" || r.status === "UNDER_REVIEW").length;
  const approvedCount = list.filter((r) => r.status === "APPROVED" || r.status === "REWARDED").length;
  const totalEarned = list.reduce((sum, r) => sum + (r.discountAmount || 0), 0) || 500;

  return {
    invitedCount: Math.max(invitedCount, 12),
    pendingCount: Math.max(pendingCount, 3),
    approvedCount: Math.max(approvedCount, 8),
    totalEarned: Math.max(totalEarned, 800),
    availableBalance: wallet.balance,
    withdrawnBalance: 300,
  };
}

export function mockGetMyReferralCode(customerId: string): string | null {
  const customers = getCustomersRegistry();
  const customer = Object.values(customers).find((c) => c.id === customerId);
  return customer?.referralCode || null;
}

export function getMockCustomerById(customerId: string): Customer | null {
  const customers = getCustomersRegistry();
  return Object.values(customers).find((c) => c.id === customerId) || null;
}

export function mockGetWallet(customerId: string): RewardWallet {
  seedMockCustomersIfNeeded();
  const wallets = getWalletsRegistry();
  return wallets[customerId] || { balance: 500, transactions: [] };
}

export function mockApplyWallet(customerId: string, amount: number): RewardWallet {
  const wallets = getWalletsRegistry();
  const current = wallets[customerId] || { balance: 500, transactions: [] };

  if (amount > current.balance) {
    throw new Error("Insufficient wallet balance.");
  }

  const updatedBalance = current.balance - amount;
  const newTx = {
    id: `tx_${Date.now()}`,
    type: "debit" as const,
    amount,
    description: "Applied at checkout",
    createdAt: new Date().toISOString(),
  };

  const updated: RewardWallet = {
    balance: updatedBalance,
    transactions: [newTx, ...current.transactions],
  };

  wallets[customerId] = updated;
  saveWalletsRegistry(wallets);
  return updated;
}

export async function mockConvertGuestToAccount(payload: GuestConvertPayload): Promise<{ token: string; customer: Customer }> {
  seedMockCustomersIfNeeded();
  const mobile = payload.guestPhone.replace(/\D/g, "");
  const registerResult = await mockRegister({
    fullName: "Guest Customer",
    mobile,
    city: "Kumbakonam",
    state: "Tamil Nadu",
    password: payload.password,
    acceptTerms: true,
  });

  return registerResult;
}

export function mockGetSecuritySettings(): SecuritySettings {
  return {
    loginHistory: [
      {
        id: "sess_1",
        device: "Chrome on macOS (Current)",
        location: "Kumbakonam, Tamil Nadu",
        ipAddress: "49.207.21.14",
        timestamp: "Active now",
        isCurrent: true,
      },
      {
        id: "sess_2",
        device: "Safari on iPhone 15",
        location: "Chennai, Tamil Nadu",
        ipAddress: "157.48.92.110",
        timestamp: "Yesterday, 18:42",
      },
    ],
    activeSessions: 2,
  };
}
