import { Address, getMockAddresses, saveMockAddress } from "./mockData";
import { API_BASE, USE_MOCK, getApiHeaders } from "./client";

export async function getAddresses(): Promise<Address[]> {
  if (USE_MOCK) {
    return Promise.resolve(getMockAddresses());
  }
  const res = await fetch(`${API_BASE}/account/addresses`, {
    headers: getApiHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch addresses");
  const data = await res.json();
  return Array.isArray(data) ? data : data.addresses || [];
}

export async function createAddress(data: Omit<Address, "id">): Promise<Address> {
  if (USE_MOCK) {
    const saved = saveMockAddress(data);
    return Promise.resolve(saved);
  }
  const res = await fetch(`${API_BASE}/account/addresses`, {
    method: "POST",
    headers: getApiHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save address");
  const result = await res.json();
  return result.address || result;
}
