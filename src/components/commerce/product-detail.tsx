"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Heart, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import type { Product } from "@/lib/commerce/types";
import { getCollectionById } from "@/lib/commerce/provider";
import { formatINR } from "@/lib/commerce/format";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useUIStore } from "@/lib/store/ui";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColourSwatches } from "./colour-swatches";
import { ProductGallery } from "./product-gallery";
import { QuantityStepper } from "./quantity-stepper";
import { RatingStars } from "./rating-stars";
import { Price } from "./price";
import { YarnCalculator } from "./yarn-calculator";
import { CollectionMark } from "@/components/art/collection-mark";

export function ProductDetail({ product }: { product: Product }) {
  const collection = getCollectionById(product.collectionId);
  const initial = product.colours.find((colour) => colour.inStock) ?? product.colours[0];
  const [colourId, setColourId] = useState(initial.id);
  const [quantity, setQuantity] = useState(1);
  const [announce, setAnnounce] = useState("");
  const colour = product.colours.find((item) => item.id === colourId) ?? initial;
  const addLine = useCartStore((state) => state.addLine);
  const openCart = useUIStore((state) => state.openCart);
  const wishlistIds = useWishlistStore((state) => state.ids);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const wished = wishlistIds.includes(product.id);

  const add = () => {
    if (!colour.inStock) return;
    addLine(product.id, colour.id, quantity);
    setAnnounce(`Added ${quantity} ${quantity === 1 ? "skein" : "skeins"} of ${product.name} in ${colour.name} to your bag.`);
    openCart();
  };

  const specs = (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5">
      {[
        ["Fibre", product.fibre],
        ["Weight", `${product.weightLabel} (${product.weight})`],
        ["Ply", String(product.ply)],
        ["Yardage", `${product.yardage} m`],
        ["Needle", product.needleSize],
        ["Hook", product.hookSize],
        ["Brand", product.brand],
        ["Stock", product.stock > 0 ? `${product.stock} in stock` : "Out of stock"],
      ].map(([label, value]) => (
        <div key={label}>
          <dt className="text-[11px] text-muted">{label}</dt>
          <dd className="text-sm text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );

  const care = (
    <ul className="space-y-1.5">
      {product.care.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass" />
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted">
        <Link href="/" className="hover:text-ink">Home</Link>
        <ChevronRight size={12} aria-hidden />
        <Link href="/shop" className="hover:text-ink">Shop</Link>
        <ChevronRight size={12} aria-hidden />
        <Link href={`/collections/${collection.slug}`} className="hover:text-ink">{collection.name}</Link>
        <ChevronRight size={12} aria-hidden />
        <span className="text-ink-soft">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
          <ProductGallery product={product} colour={colour} />
        </div>

        <div className="pb-24 lg:pb-0">
          <Link
            href={`/collections/${collection.slug}`}
            className="inline-flex items-center gap-2 text-xs font-medium"
            style={{ color: collection.accent.solid }}
          >
            <CollectionMark symbol={collection.symbol} className="h-4 w-4" />
            {collection.name} collection
          </Link>
          <h1 className="display mt-2 text-4xl sm:text-5xl">{product.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <RatingStars rating={product.rating} count={product.reviewCount} size={14} />
            <a href="#reviews" className="text-xs text-ink-soft underline decoration-line underline-offset-4 hover:text-ink">
              Read reviews
            </a>
            {product.tags.includes("bestseller") ? <Badge variant="bestseller">Bestseller</Badge> : null}
            {product.tags.includes("new") ? <Badge variant="new">New</Badge> : null}
          </div>

          <div className="mt-4">
            <Price price={product.price} compareAt={product.compareAtPrice} size="lg" />
            <p className="mt-1 text-xs text-muted">Inclusive of all taxes</p>
          </div>

          <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-soft">{product.description}</p>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold text-ink">
                Colour: <span className="font-normal text-ink-soft">{colour.name}</span>
              </p>
              {!colour.inStock ? <span className="text-xs text-sale">Out of stock</span> : null}
            </div>
            <ColourSwatches
              colours={product.colours}
              selectedId={colourId}
              onSelect={(item) => setColourId(item.id)}
              size="md"
              className="mt-3"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QuantityStepper value={quantity} onChange={setQuantity} max={Math.max(1, product.stock)} />
            <Button size="lg" onClick={add} disabled={!colour.inStock} className="min-w-[180px] flex-1">
              {colour.inStock ? `Add to bag — ${formatINR(product.price * quantity)}` : "Out of stock"}
            </Button>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
              aria-pressed={wished}
              className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-line bg-paper text-ink transition-all hover:-translate-y-0.5 hover:border-ink"
            >
              <Heart size={18} className={wished ? "fill-sale text-sale" : "text-ink-soft"} />
            </button>
          </div>
          <p aria-live="polite" className="sr-only">{announce}</p>

          <ul className="mt-6 grid grid-cols-1 gap-2.5 text-xs text-ink-soft sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <Truck size={15} aria-hidden className="text-brass" /> Free shipping over ₹999
            </li>
            <li className="flex items-center gap-2">
              <RotateCcw size={15} aria-hidden className="text-brass" /> 7-day easy returns
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck size={15} aria-hidden className="text-brass" /> Secure checkout
            </li>
          </ul>

          <div className="mt-8">
            <Accordion
              defaultOpen={["specs"]}
              items={[
                { value: "specs", title: "Yarn specs", content: specs },
                { value: "care", title: "Care", content: care },
                {
                  value: "shipping",
                  title: "Shipping & returns",
                  content:
                    "Dispatched within 1–2 working days from Bengaluru. Free shipping on orders over ₹999. Unused skeins with the band intact can be returned within 7 days.",
                },
              ]}
            />
          </div>

          <div className="mt-6">
            <YarnCalculator product={product} />
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-[calc(64px+env(safe-area-inset-bottom))] z-30 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-ink">{product.name}</p>
            <p className="text-xs text-muted">
              {colour.name} · <Price price={product.price} size="sm" />
            </p>
          </div>
          <Button onClick={add} disabled={!colour.inStock} className="shrink-0">
            {colour.inStock ? "Add to bag" : "Sold out"}
          </Button>
        </div>
      </div>
    </div>
  );
}
