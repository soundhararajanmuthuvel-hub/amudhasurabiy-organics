import { apiFetch } from "@/lib/api";
import { Product } from "@/lib/api/mockData";
import { getProducts } from "@/lib/api/products";

export interface AiChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  intent?: string;
  products?: Product[];
  requiresAddress?: boolean;
  orderSummary?: {
    items: { name: string; qty: number; price: number }[];
    subtotal: number;
    shippingCharge: number;
    discount: number;
    grandTotal: number;
  };
  paymentUrl?: string;
  quickReplies?: string[];
}

export interface SendAiMessagePayload {
  message: string;
  sessionId: string;
  cartContext?: unknown;
}

export async function sendAiMessage(payload: SendAiMessagePayload): Promise<AiChatMessage> {
  const { message, sessionId } = payload;
  const userText = message.toLowerCase().trim();

  try {
    const res = await apiFetch<Record<string, unknown>>("/ai/chat", {
      method: "POST",
      body: JSON.stringify({ message, sessionId }),
    });

    if (res && res.reply) {
      return {
        id: `msg_${Date.now()}`,
        sender: "ai",
        text: String(res.reply),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        intent: (res.intent as string) || "chat",
        products: Array.isArray(res.products) ? (res.products as Product[]) : undefined,
        requiresAddress: Boolean(res.requiresAddress),
        orderSummary: (res.orderSummary as AiChatMessage["orderSummary"]) || undefined,
        paymentUrl: (res.paymentUrl as string) || undefined,
        quickReplies: Array.isArray(res.quickReplies) ? (res.quickReplies as string[]) : undefined,
      };
    }
  } catch (err) {
    console.warn("[AI API Proxy] Backend AI route unavailable, generating intelligent sales response:", err);
  }

  // Conversational Fallback powered by live AO ERP catalog
  const allProducts = await getProducts().catch(() => []);
  const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  if (userText.includes("abc") || userText.includes("apple") || userText.includes("iron")) {
    const abcMalt = allProducts.find((p) => p.name.toLowerCase().includes("abc") || p.slug.includes("abc")) || allProducts[0];
    return {
      id: `msg_${Date.now()}`,
      sender: "ai",
      text: "Blovit ABC Malt (Apple, Beetroot & Carrot) is our #1 bestseller for natural hemoglobin and iron boosting! Crafted from 100% natural ingredients in Kumbakonam.",
      timestamp,
      intent: "product_recommendation",
      products: abcMalt ? [abcMalt] : allProducts.slice(0, 1),
      quickReplies: ["Buy ABC Malt Now", "Show Ingredients", "View Other Malts"],
    };
  }

  if (userText.includes("ragi") || userText.includes("kids") || userText.includes("growth") || userText.includes("weight")) {
    const ragiMalt = allProducts.find((p) => p.name.toLowerCase().includes("ragi") || p.slug.includes("ragi")) || allProducts[0];
    return {
      id: `msg_${Date.now()}`,
      sender: "ai",
      text: "For kids' healthy weight gain and bone strength, Sprouted Ragi Malt is our top recommendation! Easy to digest, rich in calcium and natural fiber.",
      timestamp,
      intent: "product_recommendation",
      products: ragiMalt ? [ragiMalt] : allProducts.slice(0, 1),
      quickReplies: ["Buy Sprouted Ragi Malt", "How to Use", "Offers & Discounts"],
    };
  }

  if (userText.includes("address") || userText.includes("buy") || userText.includes("checkout") || userText.includes("order")) {
    const targetProduct = allProducts[0];
    const subtotal = targetProduct ? targetProduct.price : 250;
    const shippingCharge = subtotal >= 499 ? 0 : 40;
    const grandTotal = subtotal + shippingCharge;

    return {
      id: `msg_${Date.now()}`,
      sender: "ai",
      text: "I can help you place your order right here! Please fill in your delivery address below to calculate instant shipping.",
      timestamp,
      intent: "checkout",
      requiresAddress: true,
      orderSummary: targetProduct ? {
        items: [{ name: targetProduct.name, qty: 1, price: targetProduct.price }],
        subtotal,
        shippingCharge,
        discount: 0,
        grandTotal,
      } : undefined,
    };
  }

  return {
    id: `msg_${Date.now()}`,
    sender: "ai",
    text: `Hello! I'm your Blovit AI Sales Executive. I can help you find the perfect natural malt health mix for your family, answer ingredient queries, or assist with instant checkout.`,
    timestamp,
    intent: "general_inquiry",
    products: allProducts.slice(0, 2),
    quickReplies: ["🩸 ABC Malt for Hemoglobin", "👶 Ragi Malt for Kids Weight", "📦 Track Order", "🏷️ Today's Offers"],
  };
}
