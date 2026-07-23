"use client";

import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-cream-dark/50 rounded-2xl rounded-tl-none w-max border border-walnut-brown/5 shadow-sm">
      <span className="font-heading text-[10px] font-bold text-walnut-brown/60 mr-1 uppercase tracking-wider">
        AI Executive is typing
      </span>
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
        className="h-1.5 w-1.5 bg-moss-green rounded-full"
      />
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
        className="h-1.5 w-1.5 bg-moss-green rounded-full"
      />
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
        className="h-1.5 w-1.5 bg-moss-green rounded-full"
      />
    </div>
  );
}
