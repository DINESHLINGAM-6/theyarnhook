"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { ProductFilters, SortKey } from "@/lib/commerce/types";
import { products, projects } from "@/lib/commerce/data";
import { activeFilterCount, filterProducts, sortProducts } from "@/lib/commerce/filters";
import { formatINR } from "@/lib/commerce/format";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { YarnSkein } from "@/components/art/yarn-skein";
import { cn } from "@/lib/utils";
import { FilterPanel } from "./filter-panel";
import { ProductGrid } from "./product-grid";

interface ShopViewProps {
  initialQuery?: string;
  initialFilters?: ProductFilters;
  initialSort?: SortKey;
  className?: string;
}

export function ShopView({ initialQuery = "", initialFilters = {}, initialSort = "featured", className }: ShopViewProps) {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [sort, setSort] = useState<SortKey>(initialSort);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const results = useMemo(
    () => sortProducts(filterProducts(products, { ...filters, query }), sort),
    [filters, query, sort],
  );

  const count = activeFilterCount(filters);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (filters.collection) params.set("collection", filters.collection);
    filters.fibre?.forEach((value) => params.append("fibre", value));
    filters.weight?.forEach((value) => params.append("weight", String(value)));
    filters.brand?.forEach((value) => params.append("brand", value));
    filters.colour?.forEach((value) => params.append("colour", value));
    if (filters.project) params.set("project", filters.project);
    if (filters.inStockOnly) params.set("inStock", "1");
    if (filters.price) {
      params.set("min", String(filters.price[0]));
      params.set("max", String(filters.price[1]));
    }
    if (sort !== "featured") params.set("sort", sort);
    const qs = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
  }, [query, filters, sort]);

  const clearAll = () => {
    setFilters({});
    setQuery("");
  };

  const chips: { key: string; label: string; remove: () => void }[] = [];
  if (query) chips.push({ key: "q", label: `“${query}”`, remove: () => setQuery("") });
  filters.fibre?.forEach((value) =>
    chips.push({
      key: `fibre-${value}`,
      label: value,
      remove: () => setFilters((prev) => ({ ...prev, fibre: prev.fibre?.filter((item) => item !== value) })),
    }),
  );
  filters.weight?.forEach((value) =>
    chips.push({
      key: `weight-${value}`,
      label: `Weight ${value}`,
      remove: () => setFilters((prev) => ({ ...prev, weight: prev.weight?.filter((item) => item !== value) })),
    }),
  );
  filters.brand?.forEach((value) =>
    chips.push({
      key: `brand-${value}`,
      label: value,
      remove: () => setFilters((prev) => ({ ...prev, brand: prev.brand?.filter((item) => item !== value) })),
    }),
  );
  filters.colour?.forEach((value) =>
    chips.push({
      key: `colour-${value}`,
      label: value,
      remove: () => setFilters((prev) => ({ ...prev, colour: prev.colour?.filter((item) => item !== value) })),
    }),
  );
  if (filters.project) {
    const project = projects.find((item) => item.id === filters.project);
    chips.push({
      key: "project",
      label: project?.name ?? filters.project,
      remove: () => setFilters((prev) => ({ ...prev, project: undefined })),
    });
  }
  if (filters.price) {
    chips.push({
      key: "price",
      label: `${formatINR(filters.price[0])}–${formatINR(filters.price[1])}`,
      remove: () => setFilters((prev) => ({ ...prev, price: undefined })),
    });
  }
  if (filters.inStockOnly) {
    chips.push({
      key: "stock",
      label: "In stock",
      remove: () => setFilters((prev) => ({ ...prev, inStockOnly: false })),
    });
  }

  return (
    <div className={className}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-md">
          <Search size={16} aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search yarn, fibre or colour"
            aria-label="Search yarn"
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="hidden text-xs text-muted sm:block">{results.length} yarns</span>
          <Select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            aria-label="Sort by"
            className="w-44"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
            <option value="newest">Newest</option>
          </Select>
          <Button variant="light" onClick={() => setDrawerOpen(true)} className="lg:hidden">
            <SlidersHorizontal size={15} aria-hidden />
            Filters{count > 0 ? ` (${count})` : ""}
          </Button>
        </div>
      </div>

      <div className="mt-6 flex gap-10">
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-[calc(var(--header-h)+24px)] max-h-[calc(100svh-var(--header-h)-48px)] overflow-y-auto pb-6 pr-1">
            <FilterPanel filters={filters} onChange={setFilters} onClear={clearAll} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {chips.length > 0 ? (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {chips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={chip.remove}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line bg-paper py-1 pl-3 pr-2 text-xs text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
                >
                  {chip.label}
                  <X size={12} aria-hidden />
                  <span className="sr-only">Remove filter</span>
                </button>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="cursor-pointer px-2 text-xs text-brass underline-offset-4 hover:underline"
              >
                Clear all
              </button>
            </div>
          ) : null}

          <p className="mb-4 text-xs text-muted lg:hidden">
            {results.length} {results.length === 1 ? "yarn" : "yarns"}
          </p>

          {results.length > 0 ? (
            <ProductGrid products={results} />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-line bg-paper/60 px-6 py-16 text-center sm:py-20">
              <div className="h-28 w-28 opacity-80">
                <YarnSkein palette={["#D9C3A5", "#B98A5E", "#6B4A2C"]} uid="empty-shop" kind="ball" />
              </div>
              <h3 className="mt-4 font-display text-2xl tracking-tight">No yarns match that yet.</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                Try a different fibre or colour, or clear the filters to see all {products.length} yarns
                in the shop.
              </p>
              <Button className="mt-5" onClick={clearAll}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Filter yarn"
        side="bottom"
        footer={
          <div className="p-4">
            <Button className="w-full" onClick={() => setDrawerOpen(false)}>
              Show {results.length} {results.length === 1 ? "yarn" : "yarns"}
            </Button>
          </div>
        }
      >
        <div className="p-5">
          <FilterPanel filters={filters} onChange={setFilters} onClear={clearAll} />
        </div>
      </Drawer>
    </div>
  );
}
