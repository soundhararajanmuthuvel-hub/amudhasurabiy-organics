import { Address, getMockAddresses, saveMockAddress } from "./mockData";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem("blovit_token");
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

export async function getAddresses(): Promise<Address[]> {
  if (USE_MOCK) {
    return Promise.resolve(getMockAddresses());
  }
  const res = await fetch(`${API_BASE}/account/addresses`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch addresses");
  return res.json();
}

export async function createAddress(data: Omit<Address, "id">): Promise<Address> {
  if (USE_MOCK) {
    const saved = saveMockAddress(data);
    return Promise.resolve(saved);
  }
  const res = await fetch(`${API_BASE}/account/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save address");
  return res.json();
}
