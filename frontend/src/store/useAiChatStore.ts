import { create } from "zustand";
import { AiChatMessage, sendAiMessage } from "@/lib/api/ai";
import { Product } from "@/lib/api/mockData";
import { GuestShippingAddress } from "@/lib/types/customer";

export type AiState =
  | "Idle"
  | "Typing"
  | "Thinking"
  | "ShowingProducts"
  | "CollectingAddress"
  | "CalculatingShipping"
  | "CreatingOrder"
  | "RedirectingToPayment"
  | "Success"
  | "Error";

interface AiChatStore {
  isOpen: boolean;
  isMinimized: boolean;
  messages: AiChatMessage[];
  sessionId: string;
  aiState: AiState;
  addressDraft: GuestShippingAddress;
  selectedProductForCheckout: Product | null;

  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
  setMinimized: (min: boolean) => void;
  sendMessage: (text: string) => Promise<void>;
  selectProductForCheckout: (product: Product) => void;
  setAddressDraft: (addr: Partial<GuestShippingAddress>) => void;
  submitAddressAndCheckout: () => Promise<void>;
  resetChat: () => void;
}

const DEFAULT_ADDRESS: GuestShippingAddress = {
  name: "",
  phone: "",
  email: "",
  line1: "",
  line2: "",
  city: "",
  state: "Tamil Nadu",
  pincode: "",
};

const INITIAL_WELCOME_MSG: AiChatMessage = {
  id: "msg_welcome",
  sender: "ai",
  text: "Welcome to Amudhasurabiy Organics! I'm your Blovit AI Sales Executive. How can I guide your health mix purchase today?",
  timestamp: "Just now",
  quickReplies: ["🩸 ABC Malt for Hemoglobin", "👶 Ragi Malt for Kids Weight", "📦 Track Order", "🏷️ Today's Offers"],
};

export const useAiChatStore = create<AiChatStore>((set, get) => ({
  isOpen: false,
  isMinimized: false,
  messages: [INITIAL_WELCOME_MSG],
  sessionId: typeof window !== "undefined"
    ? (() => {
        let id = localStorage.getItem("blovit_ai_session");
        if (!id) {
          id = `ai_sess_${Date.now()}`;
          localStorage.setItem("blovit_ai_session", id);
        }
        return id;
      })()
    : "ai_sess_default",
  aiState: "Idle",
  addressDraft: DEFAULT_ADDRESS,
  selectedProductForCheckout: null,

  toggleOpen: () => {
    const nextOpen = !get().isOpen;
    set({ isOpen: nextOpen, isMinimized: false });
  },

  setOpen: (open) => set({ isOpen: open, isMinimized: false }),
  setMinimized: (min) => set({ isMinimized: min }),

  selectProductForCheckout: (product) => {
    set({ selectedProductForCheckout: product });
    get().sendMessage(`I want to buy ${product.name}`);
  },

  setAddressDraft: (partial) => {
    set((state) => ({ addressDraft: { ...state.addressDraft, ...partial } }));
  },

  sendMessage: async (text: string) => {
    if (!text.trim()) return;

    const userMsg: AiChatMessage = {
      id: `msg_user_${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    set((state) => ({
      messages: [...state.messages, userMsg],
      aiState: "Thinking",
    }));

    try {
      const response = await sendAiMessage({
        message: text,
        sessionId: get().sessionId,
      });

      let nextState: AiState = "Idle";
      if (response.products && response.products.length > 0) nextState = "ShowingProducts";
      if (response.requiresAddress) nextState = "CollectingAddress";

      set((state) => ({
        messages: [...state.messages, response],
        aiState: nextState,
      }));
    } catch (err) {
      console.error("[AiChatStore Error]", err);
      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: `err_${Date.now()}`,
            sender: "ai",
            text: "I am having trouble connecting right now. Please try again or browse our shop.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ],
        aiState: "Error",
      }));
    }
  },

  submitAddressAndCheckout: async () => {
    const { addressDraft, selectedProductForCheckout } = get();
    if (!addressDraft.name || !addressDraft.phone || !addressDraft.line1 || !addressDraft.pincode) {
      alert("Please fill in Name, Mobile, Address, and Pincode.");
      return;
    }

    set({ aiState: "CreatingOrder" });

    const price = selectedProductForCheckout ? selectedProductForCheckout.price : 250;
    const shippingCharge = price >= 499 ? 0 : 40;
    const grandTotal = price + shippingCharge;

    const summaryMsg: AiChatMessage = {
      id: `order_created_${Date.now()}`,
      sender: "ai",
      text: `Thank you, ${addressDraft.name}! Your order has been generated. Redirecting to Razorpay secure payment gateway...`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      orderSummary: {
        items: [{ name: selectedProductForCheckout?.name || "Blovit Natural Malt", qty: 1, price }],
        subtotal: price,
        shippingCharge,
        discount: 0,
        grandTotal,
      },
    };

    set((state) => ({
      messages: [...state.messages, summaryMsg],
      aiState: "RedirectingToPayment",
    }));

    // Trigger payment modal or checkout redirect after short delay
    setTimeout(() => {
      window.location.href = `/checkout/?direct=true&product=${selectedProductForCheckout?.id || "5"}`;
    }, 1500);
  },

  resetChat: () => {
    set({
      messages: [INITIAL_WELCOME_MSG],
      aiState: "Idle",
      selectedProductForCheckout: null,
      addressDraft: DEFAULT_ADDRESS,
    });
  },
}));
