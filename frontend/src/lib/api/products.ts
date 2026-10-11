import { Product, MOCK_PRODUCTS } from "./mockData";
import { USE_MOCK, apiFetch } from "./client";
import { cleanProductText } from "@/lib/utils/cleanText";

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

  const slugStr = String(raw.slug || raw.id || "").toLowerCase();
  const nameStr = String(raw.name || "").toLowerCase();

  // Primary supplied packaging photograph matching
  if (slugStr.includes("abc") || nameStr.includes("abc")) {
    imageUrl = "/images/abc-malt.png";
  } else if (slugStr.includes("beet") || nameStr.includes("beet")) {
    imageUrl = "/images/beetroot-malt.png";
  } else if (slugStr.includes("banana") || slugStr.includes("nendr") || nameStr.includes("banana") || nameStr.includes("nendr")) {
    imageUrl = "/images/nendran-banana-malt.png";
  }

  // Build complete gallery images array
  let imagesList: string[] = [];

  if (slugStr.includes("abc") || nameStr.includes("abc")) {
    imagesList = ["/images/abc-malt.png"];
  } else if (slugStr.includes("beet") || nameStr.includes("beet")) {
    imagesList = ["/images/beetroot-malt.png"];
  } else if (slugStr.includes("banana") || slugStr.includes("nendr") || nameStr.includes("banana") || nameStr.includes("nendr")) {
    imagesList = ["/images/nendran-banana-malt.png"];
  } else if (Array.isArray(raw.images) && raw.images.length > 0) {
    const rawBaseUrl = process.env.BACKEND_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    imagesList = raw.images
      .filter((img): img is string => typeof img === "string" && Boolean(img.trim()))
      .map((img) => (img.startsWith("/") && !img.startsWith("/images/") ? `${rawBaseUrl.replace(/\/$/, "")}${img}` : img));
  }

  if (imagesList.length === 0) {
    imagesList = [imageUrl];
  }

  // Authoritative default copy per product
  let defaultTagline = "Nature's goodness in every sip.";
  let defaultDescription = "A delicious blend of apple, beetroot and carrot in one convenient malt drink. Simply mix, sip and enjoy goodness in your everyday routine.";
  let defaultPrice = 250;
  let defaultComparePrice = 299;
  let defaultSku = "BLV-ABC-200G";

  if (slugStr.includes("beet") || nameStr.includes("beet")) {
    defaultTagline = "Naturally vibrant. Delightfully simple.";
    defaultDescription = "Bring the goodness of beetroot to your daily drink with Blovit Beetroot Malt. An easy-to-prepare blend for a colourful, delicious everyday moment.";
    defaultPrice = 200;
    defaultComparePrice = 249;
    defaultSku = "BLV-BTR-200G";
  } else if (slugStr.includes("banana") || slugStr.includes("nendr") || nameStr.includes("banana") || nameStr.includes("nendr")) {
    defaultTagline = "The comforting goodness of Nendran banana.";
    defaultDescription = "Enjoy the familiar taste of Nendran banana in a convenient malt drink. Easy to prepare and perfect for adding a little natural goodness to your day.";
    defaultPrice = 260;
    defaultComparePrice = 320;
    defaultSku = "BLV-NEN-200G";
  }

  // Clean raw incoming text to remove HTML tags, entities, metadata & duplicates
  const rawTagline = typeof raw.tagline === "string" ? cleanProductText(raw.tagline) : "";
  const rawDesc = typeof raw.description === "string" ? cleanProductText(raw.description) : "";
  const rawShortDesc = typeof raw.shortDescription === "string" ? cleanProductText(raw.shortDescription) : "";

  const finalTagline = rawTagline || defaultTagline;
  const finalDescription = rawDesc || rawShortDesc || defaultDescription;

  const actualPrice = Number(raw.price || defaultPrice);
  const actualOriginalPrice = Number(raw.originalPrice || raw.compareAtPrice || defaultComparePrice);
  const actualSku = typeof raw.sku === "string" && raw.sku.trim() ? raw.sku.trim() : defaultSku;

  const benefitsList = Array.isArray(raw.benefits)
    ? (raw.benefits.map((b) => cleanProductText(b)).filter(Boolean))
    : [
        "Naturally Sweetened with Unbleached Jaggery",
        "Zero Chemical Preservatives or Synthetic Additives",
        "Convenient 2-Minute Warm Milk or Water Preparation"
      ];

  const ingredientsList = Array.isArray(raw.ingredients)
    ? (raw.ingredients.map((i) => cleanProductText(i)).filter(Boolean))
    : [
        "Sprouted Finger Millet (Ragi)",
        "Almonds",
        "Cashews",
        "Cardamom",
        "Unbleached Cane Jaggery (Nattu Sakkarai)"
      ];

  const healthGoalsList = Array.isArray(raw.healthGoals)
    ? (raw.healthGoals.map((g) => cleanProductText(g)).filter(Boolean))
    : ["Daily Energy", "Family Wellness", "Natural Nutrition"];

  const nutritionFactsObj = typeof raw.nutritionFacts === "object" && raw.nutritionFacts !== null
    ? (raw.nutritionFacts as Record<string, string>)
    : { Energy: "388 kcal", Protein: "6.8g", Iron: "11.5mg" };

  return {
    id: String(raw.id || raw._id || raw.productId || raw.slug),
    name: (typeof raw.name === "string" && cleanProductText(raw.name)) || "Blovit Natural Malt",
    slug: (typeof raw.slug === "string" && raw.slug) || String(raw.id || "product"),
    price: actualPrice,
    originalPrice: actualOriginalPrice,
    tagline: finalTagline,
    description: finalDescription,
    imageUrl: imageUrl,
    images: imagesList,
    benefits: benefitsList,
    ingredients: ingredientsList,
    nutritionFacts: nutritionFactsObj,
    usageInstructions: (typeof raw.usageInstructions === "string" && cleanProductText(raw.usageInstructions)) || "Mix 2 tablespoons with 200ml warm milk or water.",
    isBestseller: Boolean(raw.isBestseller || raw.featured),
    category: (typeof raw.category === "string" && cleanProductText(raw.category)) || "Natural Malts",
    healthGoals: healthGoalsList,
    rating: Number(raw.rating || 4.9),
    reviewCount: Number(raw.reviewCount || 42),
    sku: actualSku,
    weight: typeof raw.weight === "string" ? cleanProductText(raw.weight) : "200 g",
    inStock: raw.inStock !== undefined ? Boolean(raw.inStock) : true,
    variants: [
      {
        weight: typeof raw.weight === "string" ? cleanProductText(raw.weight) : "200 g",
        price: actualPrice,
        originalPrice: actualOriginalPrice,
        sku: actualSku,
        inStock: raw.inStock !== false,
      }
    ],
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

    const mapped = rawList
      .map((item) => mapBackendProduct(item as Record<string, unknown>))
      .filter((p) => ["abc-malt", "beetroot-malt", "nendram-banana-malt"].includes(p.slug) || p.name.toLowerCase().includes("blovit"));
    console.log(`[getProducts] Mapped ${mapped.length} products from AO ERP backend.`);
    return mapped.length > 0 ? mapped : MOCK_PRODUCTS;
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
