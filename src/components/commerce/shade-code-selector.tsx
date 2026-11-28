"use client";

import { Check } from "lucide-react";
import type { Colour } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";

interface ShadeCodeSelectorProps {
  colours: Colour[];
  selectedId: string;
  onSelect: (colour: Colour) => void;
  onPreview?: (colour: Colour | null) => void;
  accentTint?: string;
  accentSolid?: string;
  className?: string;
}

function MiniYarnOrb({ hex }: { hex: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0 drop-shadow-sm"
    >
      <circle cx="12" cy="12" r="10.5" fill={hex} stroke="rgba(26,22,19,0.18)" strokeWidth="1" />
      <path
        d="M5.5 8.5C9 6.5 15 6.5 18.5 8.5M4.5 12C9 10 15 10 19.5 12M5.5 15.5C9.5 13.5 14.5 13.5 18.5 15.5"
        stroke="rgba(255,255,255,0.42)"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M8.5 4.5C10.5 9 10.5 15 8.5 19.5M14.5 4.5C12.5 9 12.5 15 14.5 19.5"
        stroke="rgba(26,22,19,0.18)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * YarnAddict-inspired Shade Code Selector elevated with miniature yarn-orb icons,
 * tabular dye-lot codes (e.g. 110 - TYH), stock state, and keyboard accessibility.
 */
export function ShadeCodeSelector({
  colours,
  selectedId,
  onSelect,
  onPreview,
  accentTint = "#EFE4D3",
  accentSolid = "#1A1613",
  className,
}: ShadeCodeSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Select yarn shade code"
      onMouseLeave={() => onPreview?.(null)}
      className={cn("grid grid-cols-2 gap-2 sm:grid-cols-3", className)}
    >
      {colours.map((colour) => {
        const selected = colour.id === selectedId;
        const shadeCode = colour.code ?? colour.id.toUpperCase();
        return (
          <button
            key={colour.id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`${shadeCode} ${colour.name}${colour.inStock ? "" : " (out of stock)"}`}
            onClick={() => onSelect(colour)}
            onMouseEnter={() => onPreview?.(colour)}
            onFocus={() => onPreview?.(colour)}
            style={
              selected
                ? {
                    backgroundColor: accentTint,
                    borderColor: accentSolid,
                  }
                : undefined
            }
            className={cn(
              "group/pill relative flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left transition-all duration-200 focus-ring-rich",
              selected
                ? "shadow-soft ring-1 ring-ink/15"
                : "border-line bg-paper hover:-translate-y-0.5 hover:border-ink/40 hover:shadow-soft",
              !colour.inStock && "opacity-55",
            )}
          >
            <MiniYarnOrb hex={colour.hex} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-semibold tabular-nums tracking-tight text-ink">
                {shadeCode}
              </span>
              <span className="block truncate text-[11px] text-ink-soft">
                {colour.name}
                {!colour.inStock ? " · Out" : ""}
              </span>
            </span>
            {selected ? (
              <span
                className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-ink text-ivory"
                aria-hidden
              >
                <Check size={10} strokeWidth={2.5} />
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
