"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Trash2 } from "lucide-react";
import { products } from "@/lib/commerce/data";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useMounted } from "@/lib/hooks/use-mounted";
import { ButtonLink } from "@/components/ui/button-link";
import { ProductGrid } from "@/components/commerce/product-grid";

export function WishlistView() {
  const mounted = useMounted();
  const ids = useWishlistStore((state) => state.ids);
  const clear = useWishlistStore((state) => state.clear);

  if (!mounted) {
    return (
      <div className="container-x py-16">
        <div className="h-8 w-52 animate-pulse rounded-full bg-oat/70" />
        <div className="mt-8 h-64 animate-pulse rounded-lg bg-oat/50" />
      </div>
    );
  }

  const items = products.filter((product) => ids.includes(product.id));

  if (items.length === 0) {
    return (
      <section className="container-x flex min-h-[60svh] flex-col items-center justify-center py-20 text-center">
        <div className="h-32 w-32 opacity-80 rounded-full overflow-hidden border border-line bg-paper">
          <Image
            src="https://placehold.co/400x400/7A1F3D/FFFFFF?text=Desire+Yarn"
            alt=""
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
        <p className="kicker mt-6">Wishlist</p>
        <h1 className="display mt-2 text-4xl sm:text-5xl">Nothing saved yet.</h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
          Tap the heart on any yarn to keep it here for later. Your wishlist stays on this device.
        </p>
        <ButtonLink href="/shop" className="mt-7">
          Find something soft
          <ArrowRight size={16} aria-hidden />
        </ButtonLink>
      </section>
    );
  }

  return (
    <section className="container-x py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker">Wishlist</p>
          <h1 className="display mt-2 text-4xl sm:text-5xl">
            {items.length} {items.length === 1 ? "yarn" : "yarns"} saved.
          </h1>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted">
            <Heart size={12} aria-hidden className="fill-sale text-sale" />
            Kept on this device.
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-muted transition-colors hover:text-sale"
        >
          <Trash2 size={13} aria-hidden />
          Clear wishlist
        </button>
      </div>

      <div className="mt-8">
        <ProductGrid products={items} />
      </div>

      <p className="mt-8 text-center text-xs text-muted">
        Ready to commit?{" "}
        <Link href="/shop" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
          Browse the rest of the shop
        </Link>
        .
      </p>
    </section>
  );
}
