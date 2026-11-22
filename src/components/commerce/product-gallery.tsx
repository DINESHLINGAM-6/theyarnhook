"use client";

import { useState } from "react";
import type { Colour, MediaKind, Product } from "@/lib/commerce/types";
import { shade } from "@/lib/color";
import { YarnSkein } from "@/components/art/yarn-skein";
import { cn } from "@/lib/utils";

const VIEWS: { kind: MediaKind; label: string }[] = [
  { kind: "skein", label: "Skein" },
  { kind: "ball", label: "Ball" },
  { kind: "texture", label: "Texture" },
];

interface ProductGalleryProps {
  product: Product;
  colour: Colour;
  className?: string;
}

export function ProductGallery({ product, colour, className }: ProductGalleryProps) {
  const [view, setView] = useState<MediaKind>("skein");
  const palette = [shade(colour.hex, 0.12), colour.hex, shade(colour.hex, -0.22)];

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div
        className="group relative aspect-square overflow-hidden rounded-lg border border-line/70"
        style={{
          background: `linear-gradient(150deg, ${shade(colour.hex, 0.9)}, #FFFDF8 60%, ${shade(colour.hex, 0.8)})`,
        }}
      >
        <div className="absolute inset-0 p-8 transition-transform duration-700 ease-smooth group-hover:scale-[1.04] sm:p-12">
          <YarnSkein
            palette={palette}
            uid={`gallery-${product.id}-${colour.id}`}
            kind={view}
            title={`${product.name} in ${colour.name}`}
          />
        </div>
        {!colour.inStock ? (
          <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-xs font-medium text-sale shadow-soft">
            Out of stock
          </span>
        ) : null}
      </div>
      <div className="flex gap-2" role="group" aria-label="Product views">
        {VIEWS.map((item) => (
          <button
            key={item.kind}
            type="button"
            aria-pressed={view === item.kind}
            aria-label={`View ${item.label.toLowerCase()}`}
            onClick={() => setView(item.kind)}
            className={cn(
              "relative h-20 w-20 cursor-pointer overflow-hidden rounded-md border bg-paper p-1.5 transition-all duration-200 hover:-translate-y-0.5",
              view === item.kind ? "border-ink" : "border-line hover:border-ink/40",
            )}
            style={{ background: `linear-gradient(150deg, ${shade(colour.hex, 0.92)}, #FFFDF8)` }}
          >
            <YarnSkein palette={palette} uid={`thumb-${product.id}-${colour.id}-${item.kind}`} kind={item.kind} />
          </button>
        ))}
      </div>
    </div>
  );
}
