import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Collection } from "@/lib/commerce/types";
import { getCollectionCount } from "@/lib/commerce/provider";
import { YarnSkein } from "@/components/art/yarn-skein";
import { CollectionMark } from "@/components/art/collection-mark";
import { cn } from "@/lib/utils";

interface CollectionCardProps {
  collection: Collection;
  variant?: "tall" | "wide" | "compact";
  className?: string;
}

const heights: Record<NonNullable<CollectionCardProps["variant"]>, string> = {
  tall: "min-h-[440px] sm:min-h-[520px] lg:min-h-[600px]",
  wide: "min-h-[260px] sm:min-h-[300px]",
  compact: "min-h-[260px] sm:min-h-[300px]",
};

export function CollectionCard({ collection, variant = "compact", className }: CollectionCardProps) {
  const count = getCollectionCount(collection.id);
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-lg border border-line/60 p-6 transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:shadow-lift sm:p-8",
        heights[variant],
        className,
      )}
      style={{ backgroundColor: collection.accent.tint, color: collection.accent.ink }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70 transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
        style={{
          background: `radial-gradient(120% 90% at 78% 18%, ${collection.palette[1]}44 0%, transparent 58%)`,
        }}
      />
      <div className="pointer-events-none absolute -right-10 bottom-[-12%] h-[78%] w-[62%] opacity-95 transition-transform duration-700 ease-smooth group-hover:scale-[1.05] sm:-right-6">
        <YarnSkein palette={collection.palette} uid={`coll-${collection.id}`} kind={variant === "wide" ? "ball" : "skein"} />
      </div>

      <div className="relative flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-wide">
          <CollectionMark symbol={collection.symbol} className="h-4 w-4" />
          {count} yarns
        </span>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-current/20 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <ArrowUpRight size={16} aria-hidden />
        </span>
      </div>

      <div className="relative max-w-[85%]">
        <h3
          className={cn(
            "display",
            variant === "tall" ? "text-6xl sm:text-7xl lg:text-8xl" : "text-4xl sm:text-5xl",
          )}
        >
          {collection.name}
        </h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed opacity-80">{collection.tagline}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide">
          Explore the collection
          <ArrowUpRight size={13} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
