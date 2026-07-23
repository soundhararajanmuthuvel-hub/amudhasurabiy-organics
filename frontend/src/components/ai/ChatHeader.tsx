"use client";

import { useAiChatStore } from "@/store/useAiChatStore";
import { Sparkles, Minus, X, RefreshCw } from "lucide-react";

export default function ChatHeader() {
  const { toggleOpen, setMinimized, resetChat } = useAiChatStore();

  return (
    <div className="bg-walnut-brown text-white p-4 flex items-center justify-between border-b border-white/10 shrink-0">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-9 w-9 rounded-full bg-moss-green flex items-center justify-center text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-walnut-brown" />
        </div>

        <div>
          <h3 className="font-heading text-xs font-bold text-cream tracking-wide">
            Blovit AI Sales Executive
          </h3>
          <p className="font-body text-[10px] text-cream/70 flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online • Instant Shopping Guidance
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={resetChat}
          title="Reset Chat"
          className="p-1.5 rounded-lg text-cream/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>

        <button
          onClick={() => setMinimized(true)}
          title="Minimize"
          className="p-1.5 rounded-lg text-cream/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Minus className="h-4 w-4" />
        </button>

        <button
          onClick={toggleOpen}
          title="Close"
          className="p-1.5 rounded-lg text-cream/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
