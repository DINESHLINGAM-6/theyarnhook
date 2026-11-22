"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBestsellers, getNewArrivals, getSaleProducts } from "@/lib/commerce/provider";
import { ProductGrid } from "@/components/commerce/product-grid";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "bestsellers", label: "Bestsellers", products: getBestsellers(8) },
  { id: "new", label: "New in", products: getNewArrivals(8) },
  { id: "sale", label: "On sale", products: getSaleProducts(8) },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ProductTabs() {
  const [active, setActive] = useState<TabId>("bestsellers");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeProducts = TABS.find((tab) => tab.id === active)?.products ?? [];

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const index = TABS.findIndex((tab) => tab.id === active);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = TABS.length - 1;
    else return;
    event.preventDefault();
    setActive(TABS[next].id);
    refs.current[next]?.focus();
  };

  return (
    <section className="container-x py-16 sm:py-24" aria-labelledby="loved-heading">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="kicker">Most loved</p>
          <h2 id="loved-heading" className="display mt-2 text-4xl sm:text-5xl">
            The ones everyone
            <br className="hidden sm:block" /> reaches for.
          </h2>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <div role="tablist" aria-label="Product collections" onKeyDown={onKeyDown} className="flex flex-wrap gap-1.5">
            {TABS.map((tab, index) => (
              <button
                key={tab.id}
                ref={(element) => {
                  refs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={active === tab.id}
                aria-controls={`panel-${tab.id}`}
                tabIndex={active === tab.id ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-xs font-medium transition-colors",
                  active === tab.id
                    ? "border-ink bg-ink text-ivory"
                    : "border-line bg-paper text-ink-soft hover:border-ink/40 hover:text-ink",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink">
            View all yarns
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </div>

      <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}>
        <ProductGrid products={activeProducts} />
      </div>
    </section>
  );
}
