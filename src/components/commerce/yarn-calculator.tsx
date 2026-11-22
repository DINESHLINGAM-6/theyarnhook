"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import type { Product } from "@/lib/commerce/types";
import { Select } from "@/components/ui/select";

const YARDAGE: Record<string, Record<string, number>> = {
  blanket: { small: 1200, medium: 1800, large: 2400 },
  scarf: { small: 300, medium: 450, large: 600 },
  sweater: { small: 900, medium: 1300, large: 1800 },
  hat: { small: 120, medium: 180, large: 240 },
  socks: { small: 250, medium: 350, large: 450 },
};

const PROJECT_LABELS: Record<string, string> = {
  blanket: "Blanket / throw",
  scarf: "Scarf",
  sweater: "Sweater",
  hat: "Hat / beanie",
  socks: "Socks",
};

export function YarnCalculator({ product }: { product: Product }) {
  const [project, setProject] = useState("blanket");
  const [size, setSize] = useState("medium");
  const needed = YARDAGE[project][size];
  const balls = Math.ceil(needed / product.yardage);

  return (
    <div className="rounded-lg border border-line bg-oat/40 p-5">
      <div className="flex items-center gap-2">
        <Calculator size={16} aria-hidden className="text-brass" />
        <h3 className="font-sans text-sm font-semibold text-ink">How much will I need?</h3>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        A rough guide based on {product.yardage} m per skein. Your gauge and stitch pattern will
        change the final count.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Select value={project} onChange={(event) => setProject(event.target.value)} aria-label="Project type">
          {Object.entries(PROJECT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Select value={size} onChange={(event) => setSize(event.target.value)} aria-label="Project size">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </Select>
      </div>
      <div className="mt-4 flex items-end justify-between gap-4" aria-live="polite">
        <div>
          <p className="font-display text-4xl leading-none text-ink">{balls}</p>
          <p className="mt-1 text-xs text-muted">
            {balls === 1 ? "skein" : "skeins"} · about {needed.toLocaleString("en-IN")} m
          </p>
        </div>
        <p className="text-right text-[11px] leading-relaxed text-muted">
          For {PROJECT_LABELS[project].toLowerCase()},
          <br />
          {size} size
        </p>
      </div>
    </div>
  );
}
