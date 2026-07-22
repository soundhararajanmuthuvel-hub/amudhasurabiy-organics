import { setMockUser } from "./mockData";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export interface User {
  phone: string;
  name: string;
  rewardPoints: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export async function requestOtp(phone: string): Promise<{ success: boolean; message: string }> {
  if (USE_MOCK) {
    console.log(`[Mock OTP API] Requested OTP for ${phone}. Use code: 123456`);
    return Promise.resolve({ success: true, message: "OTP sent successfully (Use 123456)" });
  }
  const res = await fetch(`${API_BASE}/auth/otp/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  });
  if (!res.ok) throw new Error("Failed to request OTP");
  return res.json();
}

export async function verifyOtp(phone: string, code: string): Promise<AuthResponse> {
  if (USE_MOCK) {
    if (code === "123456") {
      const mockUser: User = { phone, name: "Valued Customer", rewardPoints: 100 };
      setMockUser(mockUser);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("blovit_token", "mock-jwt-token-12345");
      }
      return Promise.resolve({
        token: "mock-jwt-token-12345",
        user: mockUser
      });
    } else {
      throw new Error("Invalid OTP code. Please enter 123456");
    }
  }
  const res = await fetch(`${API_BASE}/auth/otp/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, otp: code }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to verify OTP");
  }
  const data = await res.json();
  if (typeof window !== "undefined") {
    window.localStorage.setItem("blovit_token", data.token);
  }
  return data;
}

export function logout(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("blovit_token");
  }
  setMockUser(null);
}
