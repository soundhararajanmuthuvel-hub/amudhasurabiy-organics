import type {
  AuthResponse,
  Customer,
  ForgotPasswordStep1Response,
  ForgotPasswordStep2Response,
  LoginPayload,
  RegisterPayload,
} from "@/lib/types/customer";
import {
  mockForgotPasswordStep1,
  mockForgotPasswordStep2,
  mockLogin,
  mockRegister,
  mockResetPassword,
} from "@/lib/auth/mockAuthStore";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export type { Customer, AuthResponse, RegisterPayload, LoginPayload };

class AuthApiError extends Error {
  status: number;
  retryAfterMinutes?: number;

  constructor(message: string, status: number, retryAfterMinutes?: number) {
    super(message);
    this.name = "AuthApiError";
    this.status = status;
    this.retryAfterMinutes = retryAfterMinutes;
  }
}

async function handleAuthResponse(res: Response): Promise<never> {
  const data = await res.json().catch(() => ({}));
  if (res.status === 429) {
    const minutes = data.retryAfterMinutes ?? 15;
    throw new AuthApiError(
      `Too many failed attempts. Account locked. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`,
      429,
      minutes
    );
  }
  throw new AuthApiError(data.message || "Something went wrong. Please try again.", res.status);
}

function persistSession(token: string, customer: Customer) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("blovit_token", token);
    window.localStorage.setItem("blovit_customer", JSON.stringify(customer));
  }
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  if (USE_MOCK) {
    const result = await mockRegister(payload);
    persistSession(result.token, result.customer);
    return { token: result.token, customer: result.customer };
  }

  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: payload.fullName,
      mobile: payload.mobile,
      email: payload.email,
      city: payload.city,
      state: payload.state,
      password: payload.password,
      referralCode: payload.referralCode,
    }),
  });

  if (!res.ok) await handleAuthResponse(res);
  const data: AuthResponse = await res.json();
  persistSession(data.token, data.customer);
  return data;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  if (USE_MOCK) {
    const result = await mockLogin(payload.mobile, payload.password);
    persistSession(result.token, result.customer);
    return { token: result.token, customer: result.customer };
  }

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) await handleAuthResponse(res);
  const data: AuthResponse = await res.json();
  persistSession(data.token, data.customer);
  return data;
}

export async function forgotPassword(mobile: string): Promise<ForgotPasswordStep1Response> {
  if (USE_MOCK) {
    return mockForgotPasswordStep1(mobile);
  }

  const res = await fetch(`${API_BASE}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile }),
  });

  if (!res.ok) await handleAuthResponse(res);
  return res.json();
}

export async function verifyForgotPasswordEmail(
  mobile: string,
  email: string
): Promise<ForgotPasswordStep2Response> {
  if (USE_MOCK) {
    return mockForgotPasswordStep2(mobile, email);
  }

  const res = await fetch(`${API_BASE}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile, email }),
  });

  if (!res.ok) await handleAuthResponse(res);
  return res.json();
}

export async function resetPassword(token: string, newPassword: string): Promise<{ success: boolean }> {
  if (USE_MOCK) {
    return mockResetPassword(token, newPassword);
  }

  const res = await fetch(`${API_BASE}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });

  if (!res.ok) await handleAuthResponse(res);
  return res.json();
}

export async function changePassword(oldPassword: string, newPassword: string): Promise<{ success: boolean }> {
  if (USE_MOCK) {
    return { success: true };
  }

  const token = typeof window !== "undefined" ? localStorage.getItem("blovit_token") : "";
  const res = await fetch(`${API_BASE}/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  if (!res.ok) await handleAuthResponse(res);
  return res.json();
}

export function logout(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("blovit_token");
    window.localStorage.removeItem("blovit_customer");
    window.localStorage.removeItem("blovit_user");
  }
}

export { AuthApiError };
