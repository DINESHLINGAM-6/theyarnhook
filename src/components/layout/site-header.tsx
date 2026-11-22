"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { collections, projects, weights } from "@/lib/commerce/data";
import { getCollectionCount } from "@/lib/commerce/provider";
import { cartCount, useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useUIStore } from "@/lib/store/ui";
import { useMounted } from "@/lib/hooks/use-mounted";
import { LogoMark } from "./logo";
import { cn } from "@/lib/utils";

const iconButton =
  "relative grid h-10 w-10 cursor-pointer place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink";

const navLink =
  "rounded-full px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-ink/[0.04] hover:text-ink";

function Count({ value }: { value: number }) {
  if (value <= 0) return null;
  return (
    <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brass px-1 text-[9px] font-semibold text-white">
      {value}
    </span>
  );
}

export function SiteHeader() {
  const mounted = useMounted();
  const openCart = useUIStore((state) => state.openCart);
  const openSearch = useUIStore((state) => state.openSearch);
  const openMenu = useUIStore((state) => state.openMenu);
  const lines = useCartStore((state) => state.lines);
  const wishlistIds = useWishlistStore((state) => state.ids);
  const count = mounted ? cartCount(lines) : 0;
  const wishes = mounted ? wishlistIds.length : 0;

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="inline-flex shrink-0 items-center gap-2" aria-label="TheYarnHook home">
          <LogoMark className="h-7 w-7 text-ink" />
          <span className="font-display text-[1.35rem] leading-none tracking-tight">TheYarnHook</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
          <Link href="/shop" className={navLink}>
            Shop
          </Link>

          <div className="group relative">
            <Link
              href="/collections"
              className={cn(navLink, "inline-flex items-center gap-1")}
              aria-haspopup="true"
            >
              Collections
              <ChevronDown size={13} aria-hidden className="transition-transform duration-300 group-hover:rotate-180" />
            </Link>

            <div className="invisible absolute left-1/2 top-full z-50 w-[min(92vw,880px)] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 ease-smooth group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-lift">
                <div className="grid gap-6 p-5 lg:grid-cols-[1.35fr_1fr]">
                  <div>
                    <p className="mb-3 text-[11px] font-semibold tracking-wide text-muted">The four collections</p>
                    <div className="grid gap-1.5 sm:grid-cols-2">
                      {collections.map((collection) => (
                        <Link
                          key={collection.id}
                          href={`/collections/${collection.slug}`}
                          className="group/item flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-oat/50"
                        >
                          <span
                            className="h-10 w-10 shrink-0 rounded-md"
                            style={{
                              background: `linear-gradient(140deg, ${collection.palette[0]}, ${collection.palette[1]} 55%, ${collection.palette[2]})`,
                            }}
                            aria-hidden
                          />
                          <span className="min-w-0">
                            <span className="block font-display text-lg leading-tight">{collection.name}</span>
                            <span className="block truncate text-[11px] text-muted">
                              {getCollectionCount(collection.id)} yarns · {collection.tagline}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/collections"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
                    >
                      All four collections
                      <ArrowRight size={13} aria-hidden />
                    </Link>
                  </div>

                  <div className="grid gap-5 border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                    <div>
                      <p className="mb-2 text-[11px] font-semibold tracking-wide text-muted">By weight</p>
                      <div className="flex flex-wrap gap-1.5">
                        {weights.map((weight) => (
                          <Link
                            key={weight.weight}
                            href={`/shop?weight=${weight.weight}`}
                            className="rounded-full border border-line px-2.5 py-1 text-[11px] text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
                          >
                            {weight.weight} · {weight.label.split(" / ")[0]}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-[11px] font-semibold tracking-wide text-muted">By project</p>
                      <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                        {projects.map((project) => (
                          <li key={project.id}>
                            <Link
                              href={`/shop?project=${project.id}`}
                              className="text-xs text-ink-soft transition-colors hover:text-ink"
                            >
                              {project.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/shop?tags=new" className={navLink}>
            New in
          </Link>
          <Link href="/about" className={navLink}>
            Our story
          </Link>
        </nav>

        <div className="flex items-center gap-0.5">
          <button type="button" onClick={openSearch} className={iconButton} aria-label="Search">
            <Search size={18} />
          </button>
          <Link href="/wishlist" className={iconButton} aria-label={`Wishlist, ${wishes} items`}>
            <Heart size={18} />
            <Count value={wishes} />
          </Link>
          <button type="button" onClick={openCart} className={iconButton} aria-label={`Bag, ${count} items`}>
            <ShoppingBag size={18} />
            <Count value={count} />
          </button>
          <button
            type="button"
            onClick={openMenu}
            className={cn(iconButton, "md:hidden")}
            aria-label="Open menu"
          >
            <Menu size={19} />
          </button>
        </div>
      </div>
    </header>
  );
}
