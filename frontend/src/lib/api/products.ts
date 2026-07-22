import { Product, MOCK_PRODUCTS } from "./mockData";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function getProducts(): Promise<Product[]> {
  if (USE_MOCK) {
    return Promise.resolve(MOCK_PRODUCTS);
  }
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (USE_MOCK) {
    const product = MOCK_PRODUCTS.find(p => p.slug === slug);
    return Promise.resolve(product || null);
  }
  const res = await fetch(`${API_BASE}/products/${slug}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
