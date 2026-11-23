"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * HyperFrames Native Port of Remotion LogoReveal composition
 * Renders lightweight vector hook drawing & typography entrance
 */
export function HFLogoReveal({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <motion.div
        initial={reduce ? { scale: 1 } : { scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-4 relative"
      >
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="overflow-visible">
          {/* Animated crochet yarn loop */}
          <motion.path
            d="M 25 70 C 15 50, 20 25, 45 25 C 70 25, 80 45, 65 65 C 50 85, 30 75, 55 50"
            stroke="#C9A227"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={200}
            initial={reduce ? { strokeDashoffset: 0 } : { strokeDashoffset: 200 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          {/* Animated hook stem */}
          <motion.line
            x1="30"
            y1="85"
            x2="70"
            y2="15"
            stroke="#1A1613"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={120}
            initial={reduce ? { strokeDashoffset: 0 } : { strokeDashoffset: 120 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
          <path d="M 70 15 Q 75 10, 73 18" stroke="#1A1613" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </motion.div>

      <motion.h2
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="font-display text-3xl font-normal text-ink tracking-tight"
      >
        TheYarnHook
      </motion.h2>

      <motion.p
        initial={reduce ? { opacity: 0.8 } : { opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-1 text-xs font-medium tracking-[0.2em] uppercase text-ink-soft"
      >
        Tactile Luxury · Thoughtful Stitches
      </motion.p>
    </div>
  );
}
