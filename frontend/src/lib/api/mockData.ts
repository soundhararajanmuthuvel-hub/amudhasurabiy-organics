export interface ProductVariant {
  weight: string;
  price: number;
  originalPrice: number;
  sku: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  tagline?: string;
  imageUrl: string;
  images?: string[];
  benefits: string[];
  ingredients: string[];
  nutritionFacts: Record<string, string>;
  usageInstructions: string;
  isBestseller?: boolean;
  whoIsItFor?: string[];
  healthGoals?: string[];
  certifications?: string[];
  videoUrl?: string;
  rating?: number;
  reviewCount?: number;
  originalPrice: number;
  category: string;
  sku?: string;
  weight?: string;
  inStock?: boolean;
  variants?: ProductVariant[];
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  category: "ABC Malt" | "Beetroot Malt" | "Nendran Banana" | "Breakfast" | "Smoothies" | "Kids Nutrition" | "Traditional";
  prepTime: string;
  imageUrl: string;
  description: string;
  ingredients: string[];
  steps: string[];
  recommendedProductId: string;
  nutrition: Record<string, string>;
}

export interface Address {
  id: string;
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  weight?: string;
  sku?: string;
  imageUrl?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  total: number;
  shippingCharge: number;
  discount: number;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  shippingAddress?: Address;
  paymentMethod?: string;
  estimatedDelivery?: string;
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  category: 'Referral' | 'Festival' | 'Welcome' | 'Flat' | 'Percentage' | 'Free Shipping';
  value: number;
  minSubtotal: number;
  message: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "abc-malt",
    name: "Blovit ABC Malt",
    slug: "abc-malt",
    sku: "BLV-ABC-200G",
    weight: "200 g",
    inStock: true,
    price: 250,
    originalPrice: 299,
    category: "Natural Malts",
    tagline: "Nature's goodness in every sip.",
    description: "A delicious blend of apple, beetroot and carrot in one convenient malt drink. Simply mix, sip and enjoy goodness in your everyday routine.",
    imageUrl: "/images/abc-malt.png",
    images: ["/images/abc-malt.png"],
    benefits: [
      "Real Apple, Beetroot & Carrot Blend",
      "Naturally Sweetened with Unbleached Jaggery",
      "Zero Chemical Preservatives or Synthetic Additives",
      "Convenient 2-Minute Warm Milk or Water Preparation"
    ],
    ingredients: [
      "Apple Powder",
      "Beetroot Powder",
      "Carrot Powder",
      "Sprouted Finger Millet (Ragi)",
      "Almonds",
      "Cashews",
      "Cardamom",
      "Unbleached Cane Jaggery (Nattu Sakkarai)"
    ],
    nutritionFacts: {
      "Energy": "388 kcal",
      "Carbohydrates": "82.4g",
      "Protein": "6.8g",
      "Fat": "1.2g",
      "Iron": "11.5mg",
      "Vitamin C": "18.2mg"
    },
    usageInstructions: "Mix 2 tablespoons (approx. 15g–20g) of Blovit ABC Malt in a cup (200ml) of warm milk or water. Stir thoroughly until fully dissolved. Serve warm or chilled.",
    isBestseller: true,
    whoIsItFor: ["Children", "Teenagers", "Working Adults", "Seniors"],
    healthGoals: ["Daily Energy", "Family Wellness", "Natural Nutrition"],
    certifications: ["FSSAI Licensed (22421543000120)"],
    rating: 4.9,
    reviewCount: 148,
    variants: [
      { weight: "200 g", price: 250, originalPrice: 299, sku: "BLV-ABC-200G", inStock: true }
    ]
  },
  {
    id: "beetroot-malt",
    name: "Blovit Beetroot Malt",
    slug: "beetroot-malt",
    sku: "BLV-BTR-200G",
    weight: "200 g",
    inStock: true,
    price: 200,
    originalPrice: 249,
    category: "Natural Malts",
    tagline: "Naturally vibrant. Delightfully simple.",
    description: "Bring the goodness of beetroot to your daily drink with Blovit Beetroot Malt. An easy-to-prepare blend for a colourful, delicious everyday moment.",
    imageUrl: "/images/beetroot-malt.png",
    images: ["/images/beetroot-malt.png"],
    benefits: [
      "Made with Farm-Fresh Beetroot",
      "Naturally Sweetened with Country Jaggery",
      "Zero Added Refined White Sugar",
      "Simple & Comforting Everyday Malt Drink"
    ],
    ingredients: [
      "Beetroot Powder",
      "Sprouted Finger Millet (Ragi)",
      "Almonds",
      "Cashews",
      "Cardamom",
      "Unbleached Cane Jaggery (Nattu Sakkarai)"
    ],
    nutritionFacts: {
      "Energy": "392 kcal",
      "Carbohydrates": "84.5g",
      "Protein": "5.9g",
      "Fat": "0.9g",
      "Iron": "14.2mg",
      "Calcium": "120mg"
    },
    usageInstructions: "Add 2 tablespoons of Blovit Beetroot Malt into 200ml of hot milk or warm water. Stir briskly until smooth.",
    isBestseller: false,
    whoIsItFor: ["Children", "Adults", "Seniors"],
    healthGoals: ["Daily Energy", "Family Wellness", "Natural Nutrition"],
    certifications: ["FSSAI Licensed (22421543000120)"],
    rating: 4.85,
    reviewCount: 96,
    variants: [
      { weight: "200 g", price: 200, originalPrice: 249, sku: "BLV-BTR-200G", inStock: true }
    ]
  },
  {
    id: "nendram-banana-malt",
    name: "Blovit Nendran Banana Malt",
    slug: "nendram-banana-malt",
    sku: "BLV-NEN-200G",
    weight: "200 g",
    inStock: true,
    price: 260,
    originalPrice: 320,
    category: "Natural Malts",
    tagline: "The comforting goodness of Nendran banana.",
    description: "Enjoy the familiar taste of Nendran banana in a convenient malt drink. Easy to prepare and perfect for adding a little natural goodness to your day.",
    imageUrl: "/images/nendran-banana-malt.png",
    images: ["/images/nendran-banana-malt.png"],
    benefits: [
      "Wholesome Kerala Nendran Banana Flavour",
      "Convenient & Quick Preparation",
      "Naturally Sweetened with Cane Jaggery",
      "Zero Chemical Preservatives or Artificial Flavours"
    ],
    ingredients: [
      "Sun-Dried Kerala Nendran Banana Powder",
      "Sprouted Finger Millet (Ragi)",
      "Almonds",
      "Cashews",
      "Cardamom",
      "Unbleached Cane Jaggery (Nattu Sakkarai)"
    ],
    nutritionFacts: {
      "Energy": "412 kcal",
      "Carbohydrates": "86.1g",
      "Protein": "7.2g",
      "Fat": "2.1g",
      "Potassium": "340mg",
      "Calcium": "98mg"
    },
    usageInstructions: "Mix 2 tablespoons of Blovit Nendran Banana Malt with 200ml of warm milk or boiling water. Stir well until smooth.",
    isBestseller: true,
    whoIsItFor: ["Toddlers & Growing Kids", "Adults", "Seniors"],
    healthGoals: ["Kids Growth & Nutrition", "Daily Energy", "Natural Nutrition"],
    certifications: ["FSSAI Licensed (22421543000120)"],
    rating: 4.92,
    reviewCount: 162,
    variants: [
      { weight: "200 g", price: 260, originalPrice: 320, sku: "BLV-NEN-200G", inStock: true }
    ]
  }
];

export const MOCK_RECIPES: Recipe[] = [
  {
    id: "abc-energy-smoothie",
    slug: "abc-energy-smoothie",
    title: "Blovit ABC Radiance Morning Smoothie",
    category: "ABC Malt",
    prepTime: "5 mins",
    imageUrl: "/images/abc-malt.png",
    description: "A refreshing, antioxidant-rich breakfast smoothie combining Blovit ABC Malt, chilled almond milk, and fresh fruit slices.",
    ingredients: [
      "2 tbsp Blovit ABC Malt",
      "1 cup chilled almond milk or cow's milk",
      "1/2 banana",
      "1 tsp honey (optional)",
      "Crushed ice"
    ],
    steps: [
      "Add Blovit ABC Malt powder and chopped banana into a blender.",
      "Pour in chilled almond milk.",
      "Blend on high speed for 45 seconds until smooth and frothy.",
      "Serve cold garnished with sliced almonds."
    ],
    recommendedProductId: "abc-malt",
    nutrition: { "Energy": "210 kcal", "Iron": "4.2mg", "Protein": "5.5g" }
  },
  {
    id: "beetroot-warm-latte",
    slug: "beetroot-warm-latte",
    title: "Warm Beetroot Spiced Health Drink",
    category: "Beetroot Malt",
    prepTime: "7 mins",
    imageUrl: "/images/beetroot-malt.png",
    description: "A comforting bedtime health latte designed to boost blood circulation, relax muscles, and replenish hemoglobin.",
    ingredients: [
      "2 tbsp Blovit Beetroot Malt",
      "1.5 cups whole milk or oat milk",
      "Pinch of nutmeg powder",
      "1 tsp palm jaggery if extra sweetness desired"
    ],
    steps: [
      "Heat milk in a saucepan until warm but not boiling.",
      "Whisk in Blovit Beetroot Malt powder until dissolved.",
      "Simmer on low flame for 2 minutes.",
      "Pour into a mug and sprinkle nutmeg on top."
    ],
    recommendedProductId: "beetroot-malt",
    nutrition: { "Energy": "185 kcal", "Iron": "5.1mg", "Calcium": "140mg" }
  },
  {
    id: "nendran-toddler-porridge",
    slug: "nendran-toddler-porridge",
    title: "Nendran Banana Weight-Gainer Porridge",
    category: "Kids Nutrition",
    prepTime: "10 mins",
    imageUrl: "/images/nendran-banana-malt.png",
    description: "A creamy, nutrient-packed warm porridge ideal for toddlers transitioning to healthy solid nutrition.",
    ingredients: [
      "3 tbsp Blovit Nendran Banana Malt",
      "1 cup warm water or milk",
      "1/2 tsp pure desi ghee",
      "Chopped nuts (for older kids)"
    ],
    steps: [
      "In a small pan, blend Blovit Nendran Banana Malt with room temperature water to avoid lumps.",
      "Place on low heat and stir continuously for 5 minutes until thickened.",
      "Add ghee and stir gently.",
      "Cool slightly before feeding your child."
    ],
    recommendedProductId: "nendram-banana-malt",
    nutrition: { "Energy": "240 kcal", "Potassium": "180mg", "Protein": "4.8g" }
  }
];

export const MOCK_COUPONS: Coupon[] = [
  { code: "WELCOME100", category: "Welcome", type: "fixed", value: 100, minSubtotal: 300, message: "₹100 OFF Welcome Coupon Applied!" },
  { code: "FIRST10", category: "Percentage", type: "percentage", value: 10, minSubtotal: 200, message: "10% OFF First Order Discount Applied!" },
  { code: "REF100", category: "Referral", type: "fixed", value: 100, minSubtotal: 250, message: "₹100 Referral Reward Applied!" },
  { code: "KUMBAKONAM20", category: "Festival", type: "percentage", value: 20, minSubtotal: 500, message: "20% Harvest Festival Discount Applied!" },
  { code: "ORGANIC50", category: "Flat", type: "fixed", value: 50, minSubtotal: 400, message: "₹50 Flat Discount Applied!" },
  { code: "FREESHIP", category: "Free Shipping", type: "fixed", value: 60, minSubtotal: 300, message: "Free Shipping Discount Applied!" }
];

const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  }
};

export const getMockAddresses = (): Address[] => {
  return getLocalStorage("blovit_addresses", [
    {
      id: "addr_1",
      name: "Dinesh Kumar",
      line1: "42, Kamaraj Road",
      line2: "Near Railway Station",
      city: "Kumbakonam",
      state: "Tamil Nadu",
      pincode: "612001",
      phone: "917010602115"
    }
  ]);
};

export const saveMockAddress = (addr: Omit<Address, "id">): Address => {
  const current = getMockAddresses();
  const newAddr: Address = {
    ...addr,
    id: `addr_${Date.now()}`
  };
  setLocalStorage("blovit_addresses", [...current, newAddr]);
  return newAddr;
};

export const getMockWishlist = (): string[] => {
  return getLocalStorage("blovit_wishlist", ["abc-malt"]);
};

export const toggleMockWishlist = (productId: string): string[] => {
  const current = getMockWishlist();
  let updated;
  if (current.includes(productId)) {
    updated = current.filter(id => id !== productId);
  } else {
    updated = [...current, productId];
  }
  setLocalStorage("blovit_wishlist", updated);
  return updated;
};

export const getMockOrders = (): Order[] => {
  return getLocalStorage("blovit_orders", [
    {
      id: "ord_1",
      orderNumber: "BLV-10024",
      createdAt: "2026-07-20T14:32:00.000Z",
      total: 510,
      shippingCharge: 60,
      discount: 50,
      status: "Delivered",
      items: [
        {
          productId: "abc-malt",
          name: "Blovit ABC Malt",
          quantity: 2,
          price: 250
        }
      ]
    }
  ]);
};

export const createMockOrder = (
  items: OrderItem[],
  total: number,
  shippingCharge: number,
  discount: number,
  shippingAddress?: Address,
  paymentMethod?: string
): Order => {
  const current = getMockOrders();
  const newOrder: Order = {
    id: `ord_${Date.now()}`,
    orderNumber: `BLV-${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: new Date().toISOString(),
    total,
    shippingCharge,
    discount,
    status: "Confirmed",
    items,
    shippingAddress,
    paymentMethod: paymentMethod || "Razorpay / UPI",
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
  };
  setLocalStorage("blovit_orders", [newOrder, ...current]);
  return newOrder;
};
