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
    weight: "200g",
    inStock: true,
    price: 250,
    originalPrice: 299,
    category: "Natural Malts",
    description: "Premium Apple, Beetroot, and Carrot health drink powder. An organic formulation crafted to improve hemoglobin levels, enhance natural skin radiance, and provide clean daily energy.",
    imageUrl: "/images/abc-malt.png",
    images: ["/images/abc-malt.png", "/images/beetroot-malt.png"],
    benefits: [
      "Natural Immunity & Hemoglobin Booster",
      "Enhances Skin Glow & Clears Toxins",
      "Promotes Healthy Digestion & Gut Flora",
      "Instant Source of Clean Daily Energy"
    ],
    ingredients: [
      "Dehydrated Organic Apple Powder",
      "Dehydrated Farm Beetroot Powder",
      "Dehydrated Carrot Powder",
      "Sprouted Finger Millet (Ragi)",
      "Premium Almonds & Cashews",
      "Green Cardamom Extract",
      "Organic Palm Sugar (Nattu Sakkarai)"
    ],
    nutritionFacts: {
      "Energy": "388 kcal",
      "Carbohydrates": "82.4g",
      "Protein": "6.8g",
      "Fat": "1.2g",
      "Iron": "11.5mg",
      "Vitamin C": "18.2mg"
    },
    usageInstructions: "Mix 2 tablespoons (approx. 15g) of Blovit ABC Malt in a glass of hot milk or warm water. Stir thoroughly until fully dissolved. Serve hot or chilled.",
    isBestseller: true,
    whoIsItFor: ["Children (3+ Yrs)", "Teenagers", "Working Adults", "Women", "Seniors"],
    healthGoals: ["Increase Iron", "Kids Growth & Nutrition", "Daily Energy", "Family Wellness", "Natural Nutrition"],
    certifications: ["FSSAI Licensed (22421543000120)", "100% Organic Ingredients", "No Added Chemicals", "ISO Quality Checked"],
    rating: 4.9,
    reviewCount: 148,
    variants: [
      { weight: "200g", price: 250, originalPrice: 299, sku: "BLV-ABC-200G", inStock: true },
      { weight: "500g", price: 580, originalPrice: 699, sku: "BLV-ABC-500G", inStock: true },
      { weight: "1kg", price: 1100, originalPrice: 1350, sku: "BLV-ABC-1KG", inStock: true }
    ]
  },
  {
    id: "beetroot-malt",
    name: "Blovit Beetroot Malt",
    slug: "beetroot-malt",
    sku: "BLV-BTR-200G",
    weight: "200g",
    inStock: true,
    price: 200,
    originalPrice: 249,
    category: "Natural Malts",
    description: "Packed with the natural goodness of iron-rich beetroots, sprouted grains, and premium nuts. Specially designed to boost stamina, improve circulation, and manage anemia naturally.",
    imageUrl: "/images/beetroot-malt.png",
    benefits: [
      "Combats Anemia & Boosts Iron Counts",
      "Improves Stamina & Physical Endurance",
      "Supports Healthy Blood Pressure & Circulation",
      "Rich in Antioxidants & Essential Minerals"
    ],
    ingredients: [
      "Fresh Farm Beetroot Juice Extract",
      "Sprouted Finger Millet (Ragi)",
      "Premium Almonds & Cashews",
      "Organic Cardamom",
      "Raw Palm Jaggery Powder"
    ],
    nutritionFacts: {
      "Energy": "392 kcal",
      "Carbohydrates": "84.5g",
      "Protein": "5.9g",
      "Fat": "0.9g",
      "Iron": "14.2mg",
      "Calcium": "120mg"
    },
    usageInstructions: "Add 2 spoonfuls of Blovit Beetroot Malt into a tumbler of boiling milk or warm water. Stir briskly until smooth.",
    isBestseller: false,
    whoIsItFor: ["Teenagers", "Women & Mothers", "Active Athletes", "Seniors"],
    healthGoals: ["Increase Iron", "Daily Energy", "Family Wellness", "Natural Nutrition"],
    certifications: ["FSSAI Licensed (22421543000120)", "No Preservatives", "Lab Tested", "Made in Tamil Nadu"],
    rating: 4.85,
    reviewCount: 96,
    variants: [
      { weight: "200g", price: 200, originalPrice: 249, sku: "BLV-BTR-200G", inStock: true },
      { weight: "500g", price: 470, originalPrice: 599, sku: "BLV-BTR-500G", inStock: true },
      { weight: "1kg", price: 890, originalPrice: 1150, sku: "BLV-BTR-1KG", inStock: true }
    ]
  },
  {
    id: "nendram-banana-malt",
    name: "Blovit Nendran Banana Malt",
    slug: "nendram-banana-malt",
    sku: "BLV-NEN-200G",
    weight: "200g",
    inStock: true,
    price: 260,
    originalPrice: 320,
    category: "Natural Malts",
    description: "An authentic, highly nutritious health mix prepared from raw Kerala Nendran Bananas. Rich in potassium and fibers, it is an excellent natural weight gainer for growing toddlers and energy drink for all ages.",
    imageUrl: "/images/nendran-banana-malt.png",
    benefits: [
      "Excellent Natural Weight Gainer for Kids",
      "Supports Bone Development & Muscle Growth",
      "High Potassium & Fibers for Digestive Ease",
      "Instant Source of Clean, Healthy Calories"
    ],
    ingredients: [
      "Sun-Dried Raw Kerala Nendran Banana Powder",
      "Sprouted Pearl Millet (Kambu)",
      "Rich Almonds & Pistachios",
      "Organic Palm Jaggery",
      "Cardamom Extract"
    ],
    nutritionFacts: {
      "Energy": "412 kcal",
      "Carbohydrates": "86.1g",
      "Protein": "7.2g",
      "Fat": "2.1g",
      "Potassium": "340mg",
      "Calcium": "98mg"
    },
    usageInstructions: "Mix 2-3 teaspoons of Blovit Nendran Banana Malt with warm milk or boiling water. Stir well to avoid lumps.",
    isBestseller: true,
    whoIsItFor: ["Toddlers & Kids (1+ Yrs)", "Growing Children", "Sports Enthusiasts", "Underweight Adults"],
    healthGoals: ["Kids Growth & Nutrition", "Daily Energy", "Natural Nutrition"],
    certifications: ["FSSAI Licensed (22421543000120)", "Zero Preservatives", "Handpicked Kerala Bananas"],
    rating: 4.92,
    reviewCount: 162,
    variants: [
      { weight: "200g", price: 260, originalPrice: 320, sku: "BLV-NEN-200G", inStock: true },
      { weight: "500g", price: 610, originalPrice: 750, sku: "BLV-NEN-500G", inStock: true },
      { weight: "1kg", price: 1150, originalPrice: 1450, sku: "BLV-NEN-1KG", inStock: true }
    ]
  },
  {
    id: "sprouted-ragi-malt",
    name: "Blovit Sprouted Ragi Malt",
    slug: "sprouted-ragi-malt",
    sku: "BLV-RAG-200G",
    weight: "200g",
    inStock: true,
    price: 220,
    originalPrice: 269,
    category: "Natural Malts",
    description: "A powerhouse calcium and iron supplement made from 100% sprouted finger millet (Ragi). Sprouting unlocks maximum bioavailability of nutrients, making it ideal for bone development, anemia management, and sustained daily energy.",
    imageUrl: "/images/sprouted-ragi-malt.png",
    images: ["/images/sprouted-ragi-malt.png"],
    benefits: [
      "Maximum Calcium & Iron Bioavailability",
      "Supports Strong Bones & Teeth",
      "Natural Anemia & Fatigue Management",
      "Gluten-Sensitive Friendly Grain"
    ],
    ingredients: [
      "100% Sprouted Finger Millet (Ragi)",
      "Premium Almonds",
      "Raw Palm Jaggery (Nattu Sakkarai)",
      "Green Cardamom"
    ],
    nutritionFacts: {
      "Energy": "375 kcal",
      "Carbohydrates": "78.2g",
      "Protein": "7.4g",
      "Fat": "1.5g",
      "Calcium": "344mg",
      "Iron": "3.9mg"
    },
    usageInstructions: "Stir 2 tablespoons of Blovit Sprouted Ragi Malt into warm milk or water. Mix until smooth. Best consumed as a breakfast drink.",
    isBestseller: false,
    whoIsItFor: ["Pregnant Women", "Lactating Mothers", "Children (2+ Yrs)", "Seniors", "Anemia Patients"],
    healthGoals: ["Bone Health", "Increase Iron", "Daily Energy", "Family Wellness"],
    certifications: ["FSSAI Licensed (22421543000120)", "100% Sprouted Grain", "No Refined Sugar", "Lab Tested"],
    rating: 4.8,
    reviewCount: 74,
    variants: [
      { weight: "200g", price: 220, originalPrice: 269, sku: "BLV-RAG-200G", inStock: true },
      { weight: "500g", price: 520, originalPrice: 650, sku: "BLV-RAG-500G", inStock: true },
      { weight: "1kg", price: 980, originalPrice: 1250, sku: "BLV-RAG-1KG", inStock: true }
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
