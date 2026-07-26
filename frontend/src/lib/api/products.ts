import { Product, MOCK_PRODUCTS } from "./mockData";
import { USE_MOCK, apiFetch } from "./client";

export function mapBackendProduct(raw: Record<string, unknown>): Product {
  const defaultImage = "/images/abc-malt.png";
  let imageUrl = defaultImage;

  if (typeof raw.imageUrl === "string" && raw.imageUrl.trim()) {
    imageUrl = raw.imageUrl;
  } else if (Array.isArray(raw.images) && raw.images.length > 0 && typeof raw.images[0] === "string") {
    imageUrl = raw.images[0];
  } else if (typeof raw.images === "string" && raw.images.trim()) {
    imageUrl = raw.images;
  }

  // Convert relative /uploads paths to absolute backend URL
  if (imageUrl.startsWith("/")) {
    const rawBaseUrl = process.env.BACKEND_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    if (!imageUrl.startsWith("/images/")) {
      imageUrl = `${rawBaseUrl.replace(/\/$/, "")}${imageUrl}`;
    }
  }

  // Build complete gallery images array
  const rawBaseUrl = process.env.BACKEND_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  let imagesList: string[] = [];

  if (Array.isArray(raw.images) && raw.images.length > 0) {
    imagesList = raw.images
      .filter((img): img is string => typeof img === "string" && Boolean(img.trim()))
      .map((img) => (img.startsWith("/") && !img.startsWith("/images/") ? `${rawBaseUrl.replace(/\/$/, "")}${img}` : img));
  }

  if (imagesList.length === 0) {
    imagesList = [imageUrl];
  }

  const benefitsList = Array.isArray(raw.benefits)
    ? (raw.benefits.filter((b): b is string => typeof b === "string"))
    : (typeof raw.benefits === "string" ? [raw.benefits] : ["100% Organic", "No Added Sugar", "Rich in Iron & Calcium"]);

  const ingredientsList = Array.isArray(raw.ingredients)
    ? (raw.ingredients.filter((i): i is string => typeof i === "string"))
    : (typeof raw.ingredients === "string" ? [raw.ingredients] : ["Sprouted Ragi", "Cardamom", "Almond Powder"]);

  const healthGoalsList = Array.isArray(raw.healthGoals)
    ? (raw.healthGoals.filter((g): g is string => typeof g === "string"))
    : ["Weight Management", "Kids Growth & Weight", "Increase Iron"];

  const nutritionFactsObj = typeof raw.nutritionFacts === "object" && raw.nutritionFacts !== null
    ? (raw.nutritionFacts as Record<string, string>)
    : { Energy: "380 kcal", Protein: "12g", Iron: "8.5mg" };

  return {
    id: String(raw.id || raw._id || raw.productId || raw.slug),
    name: (typeof raw.name === "string" && raw.name) || "Blovit Natural Malt",
    slug: (typeof raw.slug === "string" && raw.slug) || String(raw.id || "product"),
    price: Number(raw.price || 0),
    originalPrice: Number(raw.originalPrice || raw.compareAtPrice || raw.price || 0),
    description: (typeof raw.description === "string" && raw.description) || (typeof raw.shortDescription === "string" && raw.shortDescription) || "100% Natural Organic Malt Health Drink",
    imageUrl: imageUrl,
    images: imagesList,
    benefits: benefitsList,
    ingredients: ingredientsList,
    nutritionFacts: nutritionFactsObj,
    usageInstructions: (typeof raw.usageInstructions === "string" && raw.usageInstructions) || "Mix 2 tbsp with warm milk or water.",
    isBestseller: Boolean(raw.isBestseller || raw.featured),
    category: (typeof raw.category === "string" && raw.category) || "General Health",
    healthGoals: healthGoalsList,
    rating: Number(raw.rating || 4.9),
    reviewCount: Number(raw.reviewCount || 42),
  };
}

export async function getProducts(): Promise<Product[]> {
  if (USE_MOCK) {
    return Promise.resolve(MOCK_PRODUCTS);
  }

  try {
    const res = await apiFetch<Record<string, unknown>>("/products");
    const rawList = Array.isArray(res)
      ? res
      : (Array.isArray(res?.data) ? res.data : (Array.isArray(res?.products) ? res.products : []));

    if (!Array.isArray(rawList) || rawList.length === 0) {
      console.warn("[getProducts] Backend returned empty product list, using fallback.");
      return MOCK_PRODUCTS;
    }

    const mapped = rawList.map((item) => mapBackendProduct(item as Record<string, unknown>));
    console.log(`[getProducts] Mapped ${mapped.length} products from AO ERP backend.`);
    return mapped;
  } catch (err) {
    console.error("[getProducts] Error fetching products from proxy, falling back to mock data:", err);
    return MOCK_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (USE_MOCK) {
    const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return Promise.resolve(product || null);
  }

  try {
    const res = await apiFetch<Record<string, unknown>>(`/products/${slug}`);
    const rawProduct = (res.product || res.data || res) as Record<string, unknown>;
    if (!rawProduct || (typeof rawProduct === "object" && Object.keys(rawProduct).length === 0)) {
      const mockFallback = MOCK_PRODUCTS.find((p) => p.slug === slug);
      return mockFallback || null;
    }
    return mapBackendProduct(rawProduct);
  } catch (err) {
    console.error(`[getProductBySlug] Error fetching product ${slug}:`, err);
    const mockFallback = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return mockFallback || null;
  }
}
