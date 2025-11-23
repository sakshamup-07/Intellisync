// src/components/LoadingDots.jsx
import React from "react";

export default function LoadingDots({ size = 4 }) {
  const dots = new Array(size).fill(0);
  return (
    <div className="flex items-center gap-1">
      {dots.map((_, i) => (
        <span
          key={i}
          className="inline-block w-2 h-2 rounded-full bg-white/70 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}
