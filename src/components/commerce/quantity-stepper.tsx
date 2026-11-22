"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  size?: "sm" | "md";
  label?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
  size = "md",
  label = "Quantity",
}: QuantityStepperProps) {
  const dimension = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-paper",
        className,
      )}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={cn(
          "grid cursor-pointer place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink disabled:cursor-not-allowed disabled:opacity-35",
          dimension,
        )}
      >
        <Minus size={14} />
      </button>
      <span className="min-w-7 text-center text-sm font-medium tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={cn(
          "grid cursor-pointer place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink disabled:cursor-not-allowed disabled:opacity-35",
          dimension,
        )}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
