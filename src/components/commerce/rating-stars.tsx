import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: number;
  className?: string;
  showCount?: boolean;
}

export function RatingStars({
  rating,
  count,
  size = 13,
  className,
  showCount = true,
}: RatingStarsProps) {
  const rounded = Math.round(rating);
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        className="inline-flex items-center gap-0.5"
        role="img"
        aria-label={`Rated ${rating.toFixed(1)} out of 5`}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={size}
            aria-hidden
            className={
              index < rounded ? "fill-brass text-brass" : "fill-transparent text-ink/20"
            }
            strokeWidth={1.6}
          />
        ))}
      </span>
      {showCount ? (
        <span className="text-[11px] tabular-nums text-muted">
          {rating.toFixed(1)}
          {typeof count === "number" ? ` (${count})` : ""}
        </span>
      ) : null}
    </span>
  );
}
