"use client";

import { motion } from "framer-motion";

interface QuickRepliesProps {
  replies: string[];
  onSelect: (reply: string) => void;
}

export default function QuickReplies({ replies, onSelect }: QuickRepliesProps) {
  if (!replies || replies.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 my-2">
      {replies.map((reply, idx) => (
        <motion.button
          key={idx}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(reply)}
          className="bg-white border border-moss-green/30 hover:bg-moss-green hover:text-white text-walnut-brown px-3.5 py-1.5 rounded-full font-heading text-[11px] font-semibold transition-all shadow-xs"
        >
          {reply}
        </motion.button>
      ))}
    </div>
  );
}
