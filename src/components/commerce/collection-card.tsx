import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Collection } from "@/lib/commerce/types";
import { getCollectionCount } from "@/lib/commerce/provider";
import { CollectionMark } from "@/components/art/collection-mark";
import { cn } from "@/lib/utils";

interface CollectionCardProps {
  collection: Collection;
  variant?: "tall" | "wide" | "compact";
  className?: string;
}

const heights: Record<NonNullable<CollectionCardProps["variant"]>, string> = {
  tall: "min-h-[440px] sm:min-h-[520px] lg:min-h-[640px]",
  wide: "min-h-[260px] sm:min-h-[320px]",
  compact: "min-h-[260px] sm:min-h-[320px]",
};

export function CollectionCard({ collection, variant = "compact", className }: CollectionCardProps) {
  const count = getCollectionCount(collection.id);
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-line/70 p-6 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:shadow-card sm:p-8",
        heights[variant],
        className,
      )}
      style={{
        backgroundColor: collection.accent.tint,
        color: collection.accent.ink,
        backgroundImage: `linear-gradient(135deg, ${collection.accent.tint} 0%, transparent 60%)`,
      }}
    >
      {collection.image && (
        <div
          className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-smooth"
          style={{ backgroundImage: `url(${collection.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 opacity-60 transition-transform duration-700 ease-smooth group-hover:scale-[1.06]"
        style={{
          background: `radial-gradient(120% 90% at 78% 18%, ${collection.palette[1]}44 0%, transparent 58%)`,
        }}
      />
      <div className="pointer-events-none absolute -right-8 bottom-[-10%] h-[80%] w-[60%] opacity-95 transition-transform duration-700 ease-smooth group-hover:scale-[1.08] sm:-right-4">
        {collection.image ? (
          <Image
            src={collection.image}
            alt=""
            fill
            className="object-cover object-center rounded-[30%] opacity-90"
            style={{ transform: "rotate(-6deg)" }}
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full" />
        )}
      </div>

      <div className="relative flex items-center justify-between gap-4 z-10">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-current/25 text-[10px] font-semibold tracking-wide opacity-90">
          <CollectionMark symbol={collection.symbol} className="h-3.5 w-3.5" />
          {count} yarns
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-full border border-current/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:shadow-lift">
          <ArrowUpRight size={16} aria-hidden />
        </div>
      </div>

      <div className="relative max-w-[85%] z-10">
        <h3
          className={cn(
            "display",
            variant === "tall" ? "text-6xl sm:text-7xl lg:text-8xl" : "text-4xl sm:text-5xl",
            "gradient-text",
          )}
        >
          {collection.name}
        </h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed opacity-85">{collection.tagline}</p>
        <div className="mt-5 flex items-center gap-1.5">
          <span className="text-[11px] font-semibold tracking-wide underline-draw">
            Explore the collection
          </span>
          <Sparkles size={12} className="text-current opacity-70 animate-[pulse-ring_2s_ease-out_infinite]" aria-hidden />
        </div>
      </div>
    </Link>
  );
}
