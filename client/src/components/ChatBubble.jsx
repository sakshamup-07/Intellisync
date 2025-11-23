// src/components/ChatBubble.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiCopy } from "react-icons/fi";

export default function ChatBubble({ msg, isUser, onCopy, showTime = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}
    >
      <div
        className={`max-w-[86%] px-4 py-3 rounded-2xl break-words
          ${isUser ? "bg-white/6 text-right" : "bg-white/5"}
          border border-white/6`}
      >
        <div className="text-sm whitespace-pre-wrap">{msg.text}</div>

        <div className="mt-2 flex items-center justify-between gap-2">
          {showTime && (
            <div className="text-[11px] opacity-60">
              {new Date(msg.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          )}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => onCopy && onCopy(msg.text)}
              className="p-1 rounded-md hover:bg-white/6 transition"
              title="Copy"
            >
              <FiCopy size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
