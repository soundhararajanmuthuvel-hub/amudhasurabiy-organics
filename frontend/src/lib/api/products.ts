import { Product, MOCK_PRODUCTS } from "./mockData";
import { API_BASE, USE_MOCK, getApiHeaders } from "./client";

export async function getProducts(): Promise<Product[]> {
  if (USE_MOCK) {
    return Promise.resolve(MOCK_PRODUCTS);
  }
  const res = await fetch(`${API_BASE}/products`, {
    headers: getApiHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return Array.isArray(data) ? data : data.products || MOCK_PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (USE_MOCK) {
    const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return Promise.resolve(product || null);
  }
  const res = await fetch(`${API_BASE}/products/${slug}`, {
    headers: getApiHeaders(),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch product");
  const data = await res.json();
  return data.product || data;
}
