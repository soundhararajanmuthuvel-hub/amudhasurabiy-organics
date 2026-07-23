"use client";

import { useEffect, useRef } from "react";
import { useAiChatStore } from "@/store/useAiChatStore";
import TypingIndicator from "./TypingIndicator";
import QuickReplies from "./QuickReplies";
import ProductCard from "./ProductCard";
import AddressFormCard from "./AddressFormCard";
import OrderSummaryCard from "./OrderSummaryCard";

export default function ChatMessages() {
  const { messages, aiState, sendMessage, selectProductForCheckout } = useAiChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiState]);

  return (
    <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-cream/40 font-body text-xs">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
        >
          {/* Message Text Bubble */}
          <div
            className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
              msg.sender === "user"
                ? "bg-moss-green text-white rounded-br-none"
                : "bg-white text-walnut-brown border border-walnut-brown/10 rounded-bl-none"
            }`}
          >
            <p>{msg.text}</p>
            <span
              className={`block text-[9px] mt-1 text-right ${
                msg.sender === "user" ? "text-white/60" : "text-walnut-brown/40"
              }`}
            >
              {msg.timestamp}
            </span>
          </div>

          {/* Render Products */}
          {msg.products && msg.products.length > 0 && (
            <div className="flex flex-col gap-2 my-1">
              {msg.products.map((p) => (
                <ProductCard key={p.id} product={p} onBuyNow={selectProductForCheckout} />
              ))}
            </div>
          )}

          {/* Render Address Form Card */}
          {msg.requiresAddress && <AddressFormCard />}

          {/* Render Order Summary Card */}
          {msg.orderSummary && <OrderSummaryCard summary={msg.orderSummary} />}

          {/* Quick Replies */}
          {msg.quickReplies && (
            <QuickReplies replies={msg.quickReplies} onSelect={sendMessage} />
          )}
        </div>
      ))}

      {/* Thinking / Typing Animation */}
      {aiState === "Thinking" && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
}
