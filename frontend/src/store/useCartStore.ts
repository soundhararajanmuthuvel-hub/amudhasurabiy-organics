import { create } from "zustand";
import { getWishlist as apiGetWishlist, toggleWishlist as apiToggleWishlist } from "@/lib/api/wishlist";
import { calculateShipping as apiCalculateShipping } from "@/lib/api/shipping";
import { logout as apiLogout } from "@/lib/api/auth";
import { syncCart as apiSyncCart } from "@/lib/api/cart";
import type { Customer } from "@/lib/types/customer";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
  imageUrl: string;
  weight?: string;
  sku?: string;
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
  customer: Customer | null;
  /** Backwards compatibility alias for components using user */
  user: Customer | null;
  token: string | null;
  coupon: Coupon | null;
  walletBalance: number;
  useWallet: boolean;
  shippingCharge: number;
  shippingPincode: string;
  shippingMessage: string;
  freeShippingThreshold: number;
  isHydrated: boolean;
  checkoutMode: "login" | "guest" | null;

  addToCart: (
    product: { id: string; name: string; price: number; imageUrl: string; weight?: string; sku?: string },
    qty: number
  ) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => Promise<void>;
  loadWishlist: () => Promise<void>;
  setCustomer: (customer: Customer | null, token: string | null) => void;
  setUser: (customer: Customer | null, token: string | null) => void;
  logout: () => void;
  setCoupon: (coupon: Coupon | null) => void;
  setWalletBalance: (balance: number) => void;
  toggleUseWallet: (useWallet?: boolean) => void;
  setCheckoutMode: (mode: "login" | "guest" | null) => void;
  calculateShipping: (pincode: string) => Promise<void>;
  hydrate: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  wishlist: [],
  customer: null,
  user: null,
  token: null,
  coupon: null,
  walletBalance: 500,
  useWallet: false,
  shippingCharge: 0,
  shippingPincode: "",
  shippingMessage: "",
  freeShippingThreshold: 999,
  isHydrated: false,
  checkoutMode: null,

  addToCart: (product, qty) => {
    const currentCart = get().cart;
    const itemKey = product.weight ? `${product.id}-${product.weight}` : product.id;
    const existing = currentCart.find((item) => item.productId === itemKey);
    let newCart;
    if (existing) {
      newCart = currentCart.map((item) =>
        item.productId === itemKey ? { ...item, qty: item.qty + qty } : item
      );
    } else {
      newCart = [
        ...currentCart,
        {
          productId: itemKey,
          name: product.weight ? `${product.name} (${product.weight})` : product.name,
          price: product.price,
          qty,
          imageUrl: product.imageUrl,
          weight: product.weight || "200g",
          sku: product.sku,
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
    const pincode = get().shippingPincode;
    if (pincode) get().calculateShipping(pincode);
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
    const pincode = get().shippingPincode;
    if (pincode) get().calculateShipping(pincode);
  },

  clearCart: () => {
    set({ cart: [], coupon: null, useWallet: false });
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

  setCustomer: (customer, token) => {
    set({ customer, user: customer, token });
    if (typeof window !== "undefined") {
      if (customer && token) {
        window.localStorage.setItem("blovit_customer", JSON.stringify(customer));
        window.localStorage.setItem("blovit_token", token);
        const cartItems = get().cart.map((item) => ({ productId: item.productId, qty: item.qty }));
        if (cartItems.length > 0) {
          apiSyncCart(cartItems).catch((err) => console.error("syncCart failed:", err));
        }
      } else {
        window.localStorage.removeItem("blovit_customer");
        window.localStorage.removeItem("blovit_token");
      }
    }
  },

  setUser: (customer, token) => {
    get().setCustomer(customer, token);
  },

  logout: () => {
    apiLogout();
    set({ customer: null, user: null, token: null, wishlist: [], checkoutMode: null, useWallet: false });
  },

  setCoupon: (coupon) => set({ coupon }),

  setWalletBalance: (balance) => set({ walletBalance: balance }),

  toggleUseWallet: (useWallet) => {
    const current = get().useWallet;
    set({ useWallet: useWallet !== undefined ? useWallet : !current });
  },

  setCheckoutMode: (mode) => {
    set({ checkoutMode: mode });
    if (typeof window !== "undefined") {
      if (mode) sessionStorage.setItem("blovit_checkout_mode", mode);
      else sessionStorage.removeItem("blovit_checkout_mode");
    }
  },

  calculateShipping: async (pincode) => {
    const subtotal = get().cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (!pincode || pincode.length < 6) {
      set({
        shippingPincode: pincode,
        shippingCharge: 110,
        freeShippingThreshold: 999,
        shippingMessage: "Enter pincode...",
      });
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
      const savedCustomer = window.localStorage.getItem("blovit_customer");
      const savedToken = window.localStorage.getItem("blovit_token");
      const savedMode = sessionStorage.getItem("blovit_checkout_mode") as "login" | "guest" | null;

      const customerObj = savedCustomer ? JSON.parse(savedCustomer) : null;

      set({
        cart: savedCart ? JSON.parse(savedCart) : [],
        customer: customerObj,
        user: customerObj,
        token: savedToken || null,
        checkoutMode: savedMode || null,
        walletBalance: customerObj?.walletBalance ?? 500,
        isHydrated: true,
      });

      if (savedToken) get().loadWishlist();
    } catch (e) {
      console.error("Hydration error in Zustand", e);
      set({ isHydrated: true });
    }
  },
}));

export function useCustomer() {
  return useCartStore((s) => s.customer);
}
