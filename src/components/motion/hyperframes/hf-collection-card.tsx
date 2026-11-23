"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface HFCollectionCardProps {
  collectionName: string;
  tagline: string;
  bgColor: string;
  accentColor: string;
  textColor: string;
  className?: string;
}

/**
 * HyperFrames Native Port of Remotion CollectionTitleCard
 * Renders smooth floating concentric geometry & editorial typography
 */
export function HFCollectionCard({
  collectionName,
  tagline,
  bgColor,
  accentColor,
  textColor,
  className = "",
}: HFCollectionCardProps) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`relative overflow-hidden rounded-2xl flex flex-col items-center justify-center p-8 min-h-[220px] ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Background kinetic dashed ring */}
      <motion.div
        className="absolute w-72 h-72 rounded-full border border-dashed pointer-events-none opacity-20"
        style={{ borderColor: accentColor }}
        animate={reduce ? {} : { rotate: 360, scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <span
        className="text-[10px] uppercase font-bold tracking-[0.3em] mb-2"
        style={{ color: accentColor }}
      >
        Collection
      </span>
      <h3 className="font-display text-4xl sm:text-5xl font-normal tracking-wide text-center">
        {collectionName}
      </h3>
      <p
        className="font-display italic text-base mt-2 text-center opacity-90"
        style={{ color: accentColor }}
      >
        {tagline}
      </p>
    </div>
  );
}
