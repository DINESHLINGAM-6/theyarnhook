"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/lib/commerce/types";
import { getCollectionById } from "@/lib/commerce/provider";
import { discountPercent } from "@/lib/commerce/format";
import { shade } from "@/lib/color";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useUIStore } from "@/lib/store/ui";
import { YarnSkein } from "@/components/art/yarn-skein";
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
  const palette = [shade(active.hex, 0.12), active.hex, shade(active.hex, -0.22)];

  const quickAdd = () => {
    addLine(product.id, active.id, 1);
    openCart();
  };

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <Link href={`/products/${product.slug}`} className="block focus-visible:outline-none">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line/70 bg-oat/40 transition-all duration-500 ease-smooth group-hover:-translate-y-0.5 group-hover:shadow-lift">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(155deg, ${shade(active.hex, 0.9)}, #FFFDF8 62%, ${shade(active.hex, 0.82)})`,
            }}
          />
          <div className="absolute inset-0 p-5 transition-transform duration-700 ease-smooth group-hover:scale-[1.04]">
            <YarnSkein palette={palette} uid={`${product.id}-${active.id}`} />
          </div>
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {discount ? <Badge variant="sale">-{discount}%</Badge> : null}
            {product.tags.includes("new") ? <Badge variant="new">New</Badge> : null}
            {product.tags.includes("bestseller") && !discount ? (
              <Badge variant="bestseller">Bestseller</Badge>
            ) : null}
            {low ? <Badge variant="low">Only {product.stock} left</Badge> : null}
          </div>
          <span className="absolute bottom-3 right-3 hidden rounded-full bg-paper/90 px-2.5 py-1 text-[10px] font-medium text-ink-soft shadow-soft backdrop-blur-sm sm:block">
            {product.colours.length} colours
          </span>
        </div>
        <div className="mt-3 space-y-1.5">
          <p className="text-[11px] text-muted">
            {collection.name} / {product.fibre}
          </p>
          <h3 className="font-sans text-[0.95rem] font-semibold leading-snug text-ink">
            {product.name}
          </h3>
          <RatingStars rating={product.rating} count={product.reviewCount} size={12} />
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <Price price={product.price} compareAt={product.compareAtPrice} size="sm" />
            <span className="text-[11px] text-muted">{product.weightLabel.split(" / ")[0]}</span>
          </div>
        </div>
      </Link>

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
        <button
          type="button"
          onClick={quickAdd}
          aria-label={`Add ${product.name} in ${active.name} to bag`}
          className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-line bg-paper text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-ivory"
        >
          <Plus size={15} />
        </button>
      </div>

      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        aria-pressed={wished}
        className="absolute right-3 top-3 z-10 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-paper/85 text-ink shadow-soft backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-paper"
      >
        <Heart size={16} className={wished ? "fill-sale text-sale" : "text-ink-soft"} />
      </button>
    </article>
  );
}
