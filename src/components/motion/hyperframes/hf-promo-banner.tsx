"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface HFPromoBannerProps {
  text?: string;
  badge?: string;
  className?: string;
}

/**
 * HyperFrames Native Port of Remotion PromoBanner
 * Lightweight inline animated promotional alert for sale/restock events
 */
export function HFPromoBanner({
  text = "New dye lots just landed in Desire & Souffle — limited reserve",
  badge = "JUST ARRIVED",
  className = "",
}: HFPromoBannerProps) {
  const reduce = useReducedMotion();

  return (
    <div className={`w-full overflow-hidden bg-ink py-2.5 px-4 text-paper ${className}`}>
      <div className="container-x flex items-center justify-center gap-3 text-xs sm:text-sm">
        <motion.span
          animate={reduce ? {} : { scale: [1, 1.06, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-full bg-brass px-2.5 py-0.5 text-[10px] font-bold text-ink tracking-wider shrink-0"
        >
          {badge}
        </motion.span>
        <span className="font-display italic tracking-wide truncate">{text}</span>
      </div>
    </div>
  );
}
