"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Mic, Paperclip } from "lucide-react";
import { useAiChatStore } from "@/store/useAiChatStore";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";

export default function AIChatWidget() {
  const { isOpen, isMinimized, toggleOpen, setOpen, sendMessage, aiState } = useAiChatStore();
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleOpen}
            className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2.5 bg-[#5A3B28] hover:bg-[#2E5A44] text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border border-white/20 transition-all group"
            aria-label="Open Blovit AI Assistant"
          >
            <div className="relative">
              <Sparkles className="h-5 w-5 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="font-heading text-xs font-bold uppercase tracking-wider hidden sm:inline">
              Ask Blovit AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window Container */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 sm:hidden"
            />

            {/* Main Chat Drawer Window */}
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed z-50 flex flex-col bg-white rounded-3xl shadow-2xl border border-walnut-brown/15 overflow-hidden transition-all duration-300 ${
                isMinimized
                  ? "bottom-20 right-4 sm:bottom-6 sm:right-6 w-80 h-16"
                  : "bottom-0 right-0 left-0 top-0 sm:top-auto sm:left-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[620px] rounded-none sm:rounded-3xl"
              }`}
            >
              <ChatHeader />

              {!isMinimized && (
                <>
                  <ChatMessages />

                  {/* Input Footer */}
                  <div className="p-3 bg-white border-t border-walnut-brown/10 flex items-center gap-2 shrink-0">
                    <button
                      title="Voice input (coming soon)"
                      className="p-2 rounded-full text-walnut-brown/40 hover:text-moss-green hover:bg-cream-dark transition-colors"
                    >
                      <Mic className="h-4 w-4" />
                    </button>

                    <button
                      title="Attach image (coming soon)"
                      className="p-2 rounded-full text-walnut-brown/40 hover:text-moss-green hover:bg-cream-dark transition-colors"
                    >
                      <Paperclip className="h-4 w-4" />
                    </button>

                    <input
                      type="text"
                      placeholder="Ask Blovit AI (e.g., ABC Malt for iron)..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={aiState === "Thinking"}
                      className="flex-grow rounded-full px-4 py-2.5 bg-cream-dark/40 border border-walnut-brown/15 text-xs text-walnut-brown focus:outline-none focus:border-moss-green disabled:opacity-50 font-body"
                    />

                    <button
                      onClick={handleSend}
                      disabled={!inputText.trim() || aiState === "Thinking"}
                      className="p-2.5 rounded-full bg-moss-green hover:bg-walnut-brown text-white transition-colors disabled:opacity-40 shadow-xs"
                      aria-label="Send message"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
