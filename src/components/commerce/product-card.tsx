"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Plus, ArrowRight } from "lucide-react";
import type { Product } from "@/lib/commerce/types";
import { getCollectionById } from "@/lib/commerce/provider";
import { discountPercent, formatINR } from "@/lib/commerce/format";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useUIStore } from "@/lib/store/ui";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ColourSwatches } from "./colour-swatches";
import { RatingStars } from "./rating-stars";
import { Price } from "./price";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const collection = getCollectionById(product.collectionId);
  const initial = product.colours.find((colour) => colour.inStock) ?? product.colours[0];
  const [selectedId, setSelectedId] = useState(initial.id);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const active = product.colours.find((colour) => colour.id === (previewId ?? selectedId)) ?? initial;
  const addLine = useCartStore((state) => state.addLine);
  const openCart = useUIStore((state) => state.openCart);
  const wishlistIds = useWishlistStore((state) => state.ids);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const wished = wishlistIds.includes(product.id);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const low = product.stock > 0 && product.stock <= 8;

  const quickAdd = () => {
    addLine(product.id, active.id, 1);
    openCart();
  };

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-line bg-paper transition-all duration-300 ease-smooth group-hover:shadow-card">
        {/* Discount badge */}
        {discount && (
          <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sale text-[9px] font-bold text-white shadow-soft">
            -{discount}%
          </span>
        )}

        {/* Brand label */}
        {product.brand && product.brand !== "TheYarnHook" && (
          <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-paper/95 border border-line/60 text-[9px] font-semibold text-ink backdrop-blur ring-1 ring-current/10">
            {product.brand.split(" ")[0]}
          </span>
        )}

        {/* Wishlist heart */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={wished}
          className="absolute right-3 top-3 z-20 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-paper/90 text-ink shadow-soft backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-paper focus-ring-rich"
        >
          <Heart size={16} className={wished ? "fill-sale text-sale" : "text-ink-soft"} />
        </button>

        <Link href={`/products/${product.slug}`} className="block focus-visible:outline-none">
          <Image
            src={product.image ?? `https://placehold.co/800x800/7A1F3D/FFFFFF?text=Desire+Yarn`}
            alt={`${product.name} in ${active.name}`}
            fill
            sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 200px"
            className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute bottom-3 right-3 hidden rounded-full bg-paper/95 px-2.5 py-1 text-[10px] font-medium text-ink-soft shadow-soft backdrop-blur sm:block ring-1 ring-current/10">
            {product.colours.length} colours
          </div>
        </Link>
      </div>

      <div className="mt-3 space-y-1">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-brass uppercase">
          {collection.name.split(" ")[0]}
        </span>
        <h3 className="font-sans text-[0.925rem] font-semibold leading-snug text-ink line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <Price price={product.price} compareAt={product.compareAtPrice} size="sm" />
          {low ? (
            <span className="text-[10px] font-semibold text-sale">
              Only {product.stock} left
            </span>
          ) : (
            <span className="text-[10px] text-muted">{product.weightLabel.split(" / ")[0]}</span>
          )}
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <div onMouseLeave={() => setPreviewId(null)}>
          <ColourSwatches
            colours={product.colours}
            selectedId={selectedId}
            onSelect={(colour) => {
              setSelectedId(colour.id);
              setPreviewId(null);
            }}
            onPreview={(colour) => setPreviewId(colour.id)}
            max={5}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={quickAdd}
            aria-label={`Add ${product.name} in ${active.name} to bag`}
            className="flex-1 cursor-pointer rounded-lg border border-brass bg-brass px-4 py-2.5 text-[11px] font-semibold text-ivory transition-all duration-300 hover:bg-desire-solid hover:shadow-card focus-ring-rich"
          >
            Add to Cart
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="shrink-0 cursor-pointer rounded-lg border border-line bg-paper px-3 py-2.5 text-[11px] font-semibold text-ink transition-all duration-300 hover:bg-ink hover:text-ivory focus-ring-rich"
          >
            Buy Now <ArrowRight size={12} className="ml-1" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
