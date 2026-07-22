export interface Customer {
  id: string;
  customerCode: string;
  fullName: string;
  mobileNumber: string;
  email?: string;
  city: string;
  state: string;
  rewardPoints: number;
  walletBalance: number;
  referralCode: string;
  isEmailVerified: boolean;
  isVerified: boolean;
  createdAt: string;
}

export interface CustomerAuth {
  customerId: string;
  passwordHash: string;
  lastLogin?: string;
  failedAttempts: number;
  lockedUntil?: string;
  isVerified: boolean;
}

export interface RegisterPayload {
  fullName: string;
  mobile: string;
  email?: string;
  city: string;
  state: string;
  password: string;
  referralCode?: string;
  acceptTerms: boolean;
}

export interface LoginPayload {
  mobile: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  customer: Customer;
}

export type ReferralStatus =
  | "PENDING"
  | "FIRST_ORDER_PENDING"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "REWARDED";

export interface ReferralRecord {
  id: string;
  referrerId?: string;
  referredCustomerName: string;
  referredCustomerMobile: string;
  status: ReferralStatus;
  discountAmount?: number;
  couponCode?: string;
  createdAt: string;
  approvedAt?: string;
  rewardedAt?: string;
}

export interface ReferralMetrics {
  invitedCount: number;
  pendingCount: number;
  approvedCount: number;
  totalEarned: number;
  availableBalance: number;
  withdrawnBalance: number;
}

export interface WalletTransaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  createdAt: string;
}

export interface RewardWallet {
  balance: number;
  transactions: WalletTransaction[];
}

export interface ForgotPasswordStep1Response {
  found: boolean;
  hasEmail: boolean;
  emailHint?: string;
  message?: string;
}

export interface ForgotPasswordStep2Response {
  method: "email" | "manual";
  message: string;
}

export interface GuestShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email?: string;
}

export interface GuestCheckoutItem {
  productId: string;
  name: string;
  qty: number;
  price: number;
}

export interface GuestCheckoutPayload {
  cartId: string;
  shippingAddress: GuestShippingAddress;
  referralCode?: string;
  items: GuestCheckoutItem[];
  subtotal: number;
  shippingCharge: number;
  discount: number;
  walletDeduction?: number;
}

export interface GuestCheckoutResponse {
  success: boolean;
  orderNumber: string;
  orderId: string;
  guestToken?: string;
}

export interface GuestConvertPayload {
  guestOrderNumber: string;
  guestPhone: string;
  password: string;
}

export interface LoginHistoryItem {
  id: string;
  device: string;
  location: string;
  ipAddress: string;
  timestamp: string;
  isCurrent?: boolean;
}

export interface SecuritySettings {
  loginHistory: LoginHistoryItem[];
  activeSessions: number;
}
