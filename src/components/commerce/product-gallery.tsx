"use client";

import Image from "next/image";
import { useState } from "react";
import type { Colour, MediaKind, Product } from "@/lib/commerce/types";
import { productPlaceholders } from "@/lib/commerce/placeholder";
import { Tilt3D } from "@/components/motion/tilt-3d";
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
  const mainImage =
    product.image ??
    productPlaceholders[product.collectionId as keyof typeof productPlaceholders] ??
    productPlaceholders.desire;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Tilt3D intensity={8} className="group rounded-xl">
        <div
          className="relative aspect-square overflow-hidden rounded-xl border border-line/70 bg-paper/40 shadow-soft transition-all duration-400 ease-smooth group-hover:border-current/60 group-hover:shadow-lift"
          style={{
            background: `linear-gradient(150deg, #F7F1E8 0%, #FFFFFF 60%, #F7F1E8 100%)`,
          }}
        >
          <div className="absolute inset-0 p-6 transition-transform duration-700 ease-smooth group-hover:scale-[1.04] sm:p-14">
            <Image
              src={mainImage}
              alt={`${product.name} in ${colour.name}`}
              fill
              className="object-cover rounded-lg"
              loading="lazy"
            />
          </div>
          <div
            style={{ transform: "translateZ(24px)" }}
            className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-2 rounded-full border border-line/80 bg-paper/95 px-3 py-1.5 text-xs font-medium text-ink shadow-card backdrop-blur"
          >
            <span
              className="h-3.5 w-3.5 rounded-full border border-ink/20 shadow-inner"
              style={{ backgroundColor: colour.hex }}
              aria-hidden
            />
            <span className="tabular-nums font-semibold">{colour.code ?? colour.id.toUpperCase()}</span>
            <span className="text-ink-soft">· {colour.name}</span>
          </div>
          {!colour.inStock ? (
            <span className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-paper/95 px-3 py-1.5 text-xs font-medium text-sale shadow-card backdrop-blur ring-1 ring-current/10">
              <span className="h-2 w-2 rounded-full bg-sale" aria-hidden />
              Out of stock
            </span>
          ) : null}
        </div>
      </Tilt3D>
      <div className="flex gap-2" role="group" aria-label="Product views">
        {VIEWS.map((item) => (
          <button
            key={item.kind}
            type="button"
            aria-pressed={view === item.kind}
            aria-label={`View ${item.label.toLowerCase()}`}
            onClick={() => setView(item.kind)}
            className={cn(
              "relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border bg-paper p-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft",
              view === item.kind
                ? "border-ink bg-ink/10 ring-2 ring-inset ring-current"
                : "border-line hover:border-ink/40",
            )}
          >
            <Image
              src={mainImage}
              alt=""
              fill
              className="object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
