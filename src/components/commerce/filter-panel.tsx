"use client";

import type { Fibre, ProductFilters, WeightCategory } from "@/lib/commerce/types";
import { brands, fibres, weights } from "@/lib/commerce/data";
import { products } from "@/lib/commerce/data";
import { activeFilterCount, PRICE_MAX, PRICE_MIN } from "@/lib/commerce/filters";
import { cn } from "@/lib/utils";

const COLOUR_OPTIONS = (() => {
  const map = new Map<string, string>();
  for (const product of products) {
    for (const colour of product.colours) {
      if (!map.has(colour.name)) map.set(colour.name, colour.hex);
    }
  }
  return Array.from(map, ([name, hex]) => ({ name, hex }));
})();

const PRICE_RANGES: { label: string; value: [number, number] }[] = [
  { label: "Under ₹400", value: [0, 400] },
  { label: "₹400–₹700", value: [400, 700] },
  { label: "₹700–₹1,000", value: [700, 1000] },
  { label: "₹1,000+", value: [1000, PRICE_MAX] },
];

interface FilterPanelProps {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  onClear: () => void;
  className?: string;
}

function toggleValue<T>(value: T, list?: T[]): T[] {
  const current = list ?? [];
  return current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
}

export function FilterPanel({ filters, onChange, onClear, className }: FilterPanelProps) {
  const count = activeFilterCount(filters);

  return (
    <div className={cn("space-y-7", className)}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-wide text-ink">
          Filters {count > 0 ? <span className="text-muted">({count})</span> : null}
        </p>
        {count > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="cursor-pointer text-xs text-brass underline-offset-4 hover:underline"
          >
            Clear all
          </button>
        ) : null}
      </div>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold tracking-wide text-ink">Fibre</legend>
        <div className="space-y-2.5">
          {fibres.map((fibre) => {
            const checked = filters.fibre?.includes(fibre) ?? false;
            return (
              <label key={fibre} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange({ ...filters, fibre: toggleValue<Fibre>(fibre, filters.fibre) })}
                  className="h-4 w-4 cursor-pointer rounded border-line accent-ink"
                />
                {fibre}
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold tracking-wide text-ink">Weight</legend>
        <div className="flex flex-wrap gap-1.5">
          {weights.map((weight) => {
            const checked = filters.weight?.includes(weight.weight) ?? false;
            return (
              <button
                key={weight.weight}
                type="button"
                aria-pressed={checked}
                onClick={() =>
                  onChange({
                    ...filters,
                    weight: toggleValue<WeightCategory>(weight.weight, filters.weight),
                  })
                }
                className={cn(
                  "cursor-pointer rounded-full border px-3 py-1.5 text-xs transition-colors",
                  checked
                    ? "border-ink bg-ink text-ivory"
                    : "border-line bg-paper text-ink-soft hover:border-ink/40",
                )}
                title={weight.label}
              >
                {weight.weight} · {weight.label.split(" / ")[0]}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold tracking-wide text-ink">Brand</legend>
        <div className="space-y-2.5">
          {brands.map((brand) => {
            const checked = filters.brand?.includes(brand) ?? false;
            return (
              <label key={brand} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange({ ...filters, brand: toggleValue<string>(brand, filters.brand) })}
                  className="h-4 w-4 cursor-pointer rounded border-line accent-ink"
                />
                {brand}
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold tracking-wide text-ink">Colour</legend>
        <div className="flex flex-wrap gap-2">
          {COLOUR_OPTIONS.map((colour) => {
            const checked = filters.colour?.includes(colour.name) ?? false;
            return (
              <button
                key={colour.name}
                type="button"
                aria-pressed={checked}
                aria-label={colour.name}
                title={colour.name}
                onClick={() => onChange({ ...filters, colour: toggleValue<string>(colour.name, filters.colour) })}
                className={cn(
                  "h-7 w-7 cursor-pointer rounded-full ring-offset-2 ring-offset-paper transition-transform hover:scale-110",
                  checked ? "ring-2 ring-ink" : "ring-1 ring-ink/15",
                )}
                style={{ backgroundColor: colour.hex }}
              />
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold tracking-wide text-ink">Price</legend>
        <div className="flex flex-wrap gap-1.5">
          {PRICE_RANGES.map((range) => {
            const checked =
              !!filters.price && filters.price[0] === range.value[0] && filters.price[1] === range.value[1];
            return (
              <button
                key={range.label}
                type="button"
                aria-pressed={checked}
                onClick={() =>
                  onChange({ ...filters, price: checked ? undefined : range.value })
                }
                className={cn(
                  "cursor-pointer rounded-full border px-3 py-1.5 text-xs transition-colors",
                  checked
                    ? "border-ink bg-ink text-ivory"
                    : "border-line bg-paper text-ink-soft hover:border-ink/40",
                )}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-line bg-paper px-3.5 py-3 text-sm text-ink-soft">
        In stock only
        <input
          type="checkbox"
          checked={filters.inStockOnly ?? false}
          onChange={(event) => onChange({ ...filters, inStockOnly: event.target.checked })}
          className="h-4 w-4 cursor-pointer rounded border-line accent-ink"
        />
      </label>

      <p className="text-[11px] leading-relaxed text-muted">
        Showing {PRICE_MIN === 0 ? "all" : ""} prices in ₹. Every yarn is dyed in small batches, so
        colours can shift gently between lots.
      </p>
    </div>
  );
}
