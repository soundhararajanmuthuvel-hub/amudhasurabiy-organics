import { create } from "zustand";
import { getWishlist as apiGetWishlist, toggleWishlist as apiToggleWishlist } from "@/lib/api/wishlist";
import { calculateShipping as apiCalculateShipping } from "@/lib/api/shipping";
import { logout as apiLogout } from "@/lib/api/auth";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
  imageUrl: string;
}

export interface User {
  phone: string;
  name: string;
  rewardPoints: number;
}

export interface Coupon {
  valid: boolean;
  discount: number;
  type: "percentage" | "fixed";
  value: number;
  message: string;
}

interface CartStore {
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  token: string | null;
  coupon: Coupon | null;
  shippingCharge: number;
  shippingPincode: string;
  shippingMessage: string;
  freeShippingThreshold: number;
  isHydrated: boolean;
  
  // Actions
  addToCart: (product: { id: string; name: string; price: number; imageUrl: string }, qty: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => Promise<void>;
  loadWishlist: () => Promise<void>;
  setUser: (user: User | null, token: string | null) => void;
  logout: () => void;
  setCoupon: (coupon: Coupon | null) => void;
  calculateShipping: (pincode: string) => Promise<void>;
  hydrate: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  wishlist: [],
  user: null,
  token: null,
  coupon: null,
  shippingCharge: 0,
  shippingPincode: "",
  shippingMessage: "",
  freeShippingThreshold: 999,
  isHydrated: false,

  addToCart: (product, qty) => {
    const currentCart = get().cart;
    const existing = currentCart.find((item) => item.productId === product.id);
    let newCart;
    if (existing) {
      newCart = currentCart.map((item) =>
        item.productId === product.id ? { ...item, qty: item.qty + qty } : item
      );
    } else {
      newCart = [
        ...currentCart,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          qty,
          imageUrl: product.imageUrl,
        },
      ];
    }
    set({ cart: newCart });
    if (typeof window !== "undefined") {
      window.localStorage.setItem("blovit_cart", JSON.stringify(newCart));
    }
  },

  removeFromCart: (productId) => {
    const newCart = get().cart.filter((item) => item.productId !== productId);
    set({ cart: newCart });
    if (typeof window !== "undefined") {
      window.localStorage.setItem("blovit_cart", JSON.stringify(newCart));
    }
    // Re-calculate shipping if cart items change
    const pincode = get().shippingPincode;
    if (pincode) {
      get().calculateShipping(pincode);
    }
  },

  updateQty: (productId, qty) => {
    if (qty <= 0) {
      get().removeFromCart(productId);
      return;
    }
    const newCart = get().cart.map((item) =>
      item.productId === productId ? { ...item, qty } : item
    );
    set({ cart: newCart });
    if (typeof window !== "undefined") {
      window.localStorage.setItem("blovit_cart", JSON.stringify(newCart));
    }
    // Re-calculate shipping if cart items change
    const pincode = get().shippingPincode;
    if (pincode) {
      get().calculateShipping(pincode);
    }
  },

  clearCart: () => {
    set({ cart: [], coupon: null });
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("blovit_cart");
    }
  },

  toggleWishlist: async (productId) => {
    try {
      const updated = await apiToggleWishlist(productId);
      set({ wishlist: updated });
    } catch (e) {
      console.error("Error toggling wishlist", e);
    }
  },

  loadWishlist: async () => {
    try {
      const list = await apiGetWishlist();
      set({ wishlist: list });
    } catch (e) {
      console.error("Error loading wishlist", e);
    }
  },

  setUser: (user, token) => {
    set({ user, token });
    if (typeof window !== "undefined") {
      if (user && token) {
        window.localStorage.setItem("blovit_user", JSON.stringify(user));
        window.localStorage.setItem("blovit_token", token);
      } else {
        window.localStorage.removeItem("blovit_user");
        window.localStorage.removeItem("blovit_token");
      }
    }
  },

  logout: () => {
    apiLogout();
    set({ user: null, token: null, wishlist: [] });
  },

  setCoupon: (coupon) => {
    set({ coupon });
  },

  calculateShipping: async (pincode) => {
    const subtotal = get().cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (!pincode || pincode.length < 6) {
      set({ shippingPincode: pincode, shippingCharge: 110, freeShippingThreshold: 999, shippingMessage: "Enter pincode..." });
      return;
    }
    try {
      const calc = await apiCalculateShipping(pincode, subtotal);
      set({
        shippingPincode: pincode,
        shippingCharge: calc.shippingCharge,
        freeShippingThreshold: calc.freeShippingThreshold,
        shippingMessage: calc.message,
      });
    } catch (e) {
      console.error("Failed calculating shipping charge", e);
    }
  },

  hydrate: () => {
    if (typeof window === "undefined" || get().isHydrated) return;
    try {
      const savedCart = window.localStorage.getItem("blovit_cart");
      const savedUser = window.localStorage.getItem("blovit_user");
      const savedToken = window.localStorage.getItem("blovit_token");

      set({
        cart: savedCart ? JSON.parse(savedCart) : [],
        user: savedUser ? JSON.parse(savedUser) : null,
        token: savedToken || null,
        isHydrated: true,
      });

      if (savedToken) {
        get().loadWishlist();
      }
    } catch (e) {
      console.error("Hydration error in Zustand", e);
      set({ isHydrated: true });
    }
  },
}));
