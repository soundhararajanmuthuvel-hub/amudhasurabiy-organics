import { MOCK_PRODUCTS, Product } from "./mockData";

export interface AIRecommendationRequest {
  customerId?: string;
  recentlyViewed?: string[];
  healthGoals?: string[];
}

export interface AISearchResult {
  products: Product[];
  intent: string;
  explanation: string;
}

export const getAIRecommendations = async (req: AIRecommendationRequest): Promise<Product[]> => {
  // Simulates AI recommendation response
  return MOCK_PRODUCTS;
};

export const getAIRelatedProducts = async (productId: string): Promise<Product[]> => {
  return MOCK_PRODUCTS.filter((p) => p.id !== productId);
};

export const getAISearchIntent = async (query: string): Promise<AISearchResult> => {
  const q = query.toLowerCase().trim();
  let intent = "general_search";
  let explanation = "Showing matching natural nutrition products.";
  let products = MOCK_PRODUCTS;

  if (q.includes("iron") || q.includes("blood") || q.includes("anemia") || q.includes("hemoglobin")) {
    intent = "increase_iron";
    explanation = "Recommended for boosting iron levels, hemoglobin count, and managing anemia.";
    products = MOCK_PRODUCTS.filter((p) => p.id === "beetroot-malt" || p.id === "abc-malt");
  } else if (q.includes("kid") || q.includes("child") || q.includes("weight") || q.includes("toddler")) {
    intent = "kids_growth";
    explanation = "Formulated with sprouted grains and Kerala Nendran Bananas for healthy weight gain and child nutrition.";
    products = MOCK_PRODUCTS.filter((p) => p.id === "nendram-banana-malt" || p.id === "abc-malt");
  } else if (q.includes("energy") || q.includes("stamina") || q.includes("workout") || q.includes("daily")) {
    intent = "daily_energy";
    explanation = "Rich in potassium, magnesium, and natural complex carbs for clean daily energy.";
    products = MOCK_PRODUCTS.filter((p) => p.id === "nendram-banana-malt" || p.id === "beetroot-malt");
  }

  return {
    products,
    intent,
    explanation,
  };
};
