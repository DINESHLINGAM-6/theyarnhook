"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { collections, products } from "@/lib/commerce/data";
import { getCollectionById } from "@/lib/commerce/provider";
import { formatINR } from "@/lib/commerce/format";
import { productPlaceholders } from "@/lib/commerce/placeholder";
import { useDialog } from "@/lib/hooks/use-dialog";
import { useMounted } from "@/lib/hooks/use-mounted";
import { useUIStore } from "@/lib/store/ui";

const POPULAR = ["Merino", "Cotton", "Blanket", "Plush Luxe", "Sale"];

export function SearchOverlay() {
  const overlay = useUIStore((state) => state.overlay);
  const close = useUIStore((state) => state.close);
  const open = overlay === "search";
  const router = useRouter();
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  useDialog(open, close, panelRef);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  if (!mounted) return null;

  const q = query.trim().toLowerCase();
  const matchedProducts = q
    ? products
        .filter((product) =>
          [
            product.name,
            product.fibre,
            product.brand,
            product.weightLabel,
            getCollectionById(product.collectionId).name,
            ...product.colours.map((colour) => colour.name),
          ]
            .join(" ")
            .toLowerCase()
            .includes(q),
        )
        .slice(0, 6)
    : [];
  const matchedCollections = q
    ? collections.filter((collection) =>
        `${collection.name} ${collection.tagline} ${collection.description}`.toLowerCase().includes(q),
      )
    : [];

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    close();
  };

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80]">
          <motion.button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 cursor-default bg-ink/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            tabIndex={-1}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search the shop"
            className="absolute inset-x-0 top-0 max-h-[92svh] overflow-hidden bg-paper shadow-lift"
            initial={reduce ? false : { y: "-100%" }}
            animate={{ y: 0 }}
            exit={reduce ? undefined : { y: "-100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.38 }}
          >
            <div className="container-x py-4">
              <form onSubmit={submit} className="flex items-center gap-3 border-b border-line pb-3">
                <Search size={20} aria-hidden className="shrink-0 text-muted" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search yarn, fibre or colour"
                  aria-label="Search yarn"
                  autoComplete="off"
                  className="h-11 flex-1 bg-transparent text-lg text-ink outline-none placeholder:text-muted"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close search"
                  className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  <X size={18} />
                </button>
              </form>

              <div className="max-h-[70svh] overflow-y-auto pb-4 pt-4">
                <p className="sr-only" aria-live="polite">
                  {q
                    ? `${matchedProducts.length + matchedCollections.length} suggestions`
                    : "Popular searches"}
                </p>

                {!q ? (
                  <div className="space-y-6">
                    <div>
                      <p className="mb-2 text-[11px] font-semibold tracking-wide text-ink">Popular searches</p>
                      <div className="flex flex-wrap gap-1.5">
                        {POPULAR.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setQuery(item)}
                            className="cursor-pointer rounded-full border border-line bg-ivory px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-[11px] font-semibold tracking-wide text-ink">Collections</p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {collections.map((collection) => (
                          <Link
                            key={collection.id}
                            href={`/collections/${collection.slug}`}
                            onClick={close}
                            className="flex items-center gap-2 rounded-md border border-line bg-ivory px-3 py-2.5 text-sm text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
                          >
                            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: collection.accent.solid }} aria-hidden />
                            {collection.name}
                            <span className="ml-auto text-[11px] text-muted">{collection.tagline}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {matchedProducts.length > 0 ? (
                      <div>
                        <p className="mb-2 text-[11px] font-semibold tracking-wide text-ink">Yarns</p>
                        <ul className="divide-y divide-line">
                          {matchedProducts.map((product) => {
                            const colour = product.colours[0];
                            return (
                              <li key={product.id}>
                                <Link
                                  href={`/products/${product.slug}`}
                                  onClick={close}
                                  className="flex items-center gap-3 py-2.5 transition-colors hover:bg-ink/[0.02]"
                                >
                                  <span
                                    className="relative h-12 w-10 shrink-0 overflow-hidden rounded-md border border-line"
                                  >
                                    <Image
                                      src={product.image ?? productPlaceholders.desire}
                                      alt=""
                                      fill
                                      className="object-cover object-center"
                                      loading="lazy"
                                    />
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="block text-sm font-medium text-ink">{product.name}</span>
                                    <span className="block text-[11px] text-muted">
                                      {getCollectionById(product.collectionId).name} / {product.fibre} / {product.weightLabel}
                                    </span>
                                  </span>
                                  <span className="text-sm tabular-nums text-ink-soft">{formatINR(product.price)}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ) : null}

                    {matchedCollections.length > 0 ? (
                      <div>
                        <p className="mb-2 text-[11px] font-semibold tracking-wide text-ink">Collections</p>
                        <div className="flex flex-wrap gap-1.5">
                          {matchedCollections.map((collection) => (
                            <Link
                              key={collection.id}
                              href={`/collections/${collection.slug}`}
                              onClick={close}
                              className="rounded-full border border-line bg-ivory px-3 py-1.5 text-xs text-ink-soft hover:text-ink"
                            >
                              {collection.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {matchedProducts.length === 0 && matchedCollections.length === 0 ? (
                      <div className="py-8 text-center">
                        <p className="font-display text-2xl">No match for “{query}”.</p>
                        <p className="mt-1 text-sm text-muted">Try a fibre like merino, or a colour like plum.</p>
                        <button
                          type="button"
                          onClick={() => setQuery("")}
                          className="mt-4 cursor-pointer text-sm text-brass underline underline-offset-4"
                        >
                          Clear search
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={submit}
                        className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-brass underline-offset-4 hover:underline"
                      >
                        See all results for “{query}”
                        <ArrowRight size={14} aria-hidden />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
