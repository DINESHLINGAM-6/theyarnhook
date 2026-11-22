import { formatINR } from "@/lib/commerce/format";
import { cn } from "@/lib/utils";

interface PriceProps {
  price: number;
  compareAt?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Price({ price, compareAt, className, size = "md" }: PriceProps) {
  const sizeClass =
    size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-[15px]";
  return (
    <span className={cn("inline-flex items-baseline gap-2 tabular-nums", className)}>
      <span className={cn("font-semibold text-ink", sizeClass)}>{formatINR(price)}</span>
      {compareAt && compareAt > price ? (
        <span className={cn("text-muted line-through", size === "lg" ? "text-base" : "text-xs")}>
          {formatINR(compareAt)}
        </span>
      ) : null}
    </span>
  );
}
