"use client";

import type { Colour } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";

interface ColourSwatchesProps {
  colours: Colour[];
  selectedId?: string;
  onSelect: (colour: Colour) => void;
  onPreview?: (colour: Colour) => void;
  size?: "sm" | "md";
  max?: number;
  className?: string;
}

export function ColourSwatches({
  colours,
  selectedId,
  onSelect,
  onPreview,
  size = "sm",
  max,
  className,
}: ColourSwatchesProps) {
  const visible = max ? colours.slice(0, max) : colours;
  const extra = max ? colours.length - visible.length : 0;
  const dimension = size === "md" ? "h-8 w-8" : "h-5 w-5";

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      role="group"
      aria-label="Choose a colour"
    >
      {visible.map((colour) => {
        const selected = colour.id === selectedId;
        return (
          <button
            key={colour.id}
            type="button"
            aria-label={`${colour.name}${colour.inStock ? "" : " (out of stock)"}`}
            aria-pressed={selected}
            title={colour.name}
            onClick={() => onSelect(colour)}
            onMouseEnter={() => onPreview?.(colour)}
            onFocus={() => onPreview?.(colour)}
            className={cn(
              "relative grid cursor-pointer place-items-center rounded-full ring-offset-2 ring-offset-paper transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
              dimension,
              selected ? "ring-1 ring-ink" : "ring-1 ring-ink/15",
            )}
            style={{ backgroundColor: colour.hex }}
          >
            {!colour.inStock ? (
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute left-1/2 top-1/2 h-px w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-ink/60" />
              </span>
            ) : null}
            <span className="sr-only">{colour.name}</span>
          </button>
        );
      })}
      {extra > 0 ? <span className="text-[11px] text-muted">+{extra}</span> : null}
    </div>
  );
}
