import type { Metadata } from "next";
import { ShopView } from "@/components/commerce/shop-view";
import type { CollectionId, ProductFilters, ProductTag, SortKey, WeightCategory } from "@/lib/commerce/types";
import { products } from "@/lib/commerce/data";

export const metadata: Metadata = {
  title: "Shop all yarn",
  description:
    "Browse all 28 small-batch yarns from TheYarnHook. Filter by collection, fibre, weight, colour and project.",
  alternates: { canonical: "/shop" },
};

const WEIGHTS = [2, 3, 4, 5, 6, 7];
const TAGS = ["new", "bestseller", "sale"];
const SORTS = ["featured", "price-asc", "price-desc", "rating", "newest"];

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function list(value: string | string[] | undefined): string[] | undefined {
  if (!value) return undefined;
  return Array.isArray(value) ? value : [value];
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const weights = list(params.weight)
    ?.map(Number)
    .filter((weight) => WEIGHTS.includes(weight)) as WeightCategory[] | undefined;

  const tags = list(params.tags)?.filter((tag) => TAGS.includes(tag)) as ProductTag[] | undefined;

  const min = Number(first(params.min));
  const max = Number(first(params.max));

  const initialFilters: ProductFilters = {
    collection: first(params.collection) as CollectionId | undefined,
    fibre: list(params.fibre) as ProductFilters["fibre"],
    weight: weights?.length ? weights : undefined,
    brand: list(params.brand),
    colour: list(params.colour),
    project: first(params.project) as ProductFilters["project"],
    inStockOnly: first(params.inStock) === "1",
    tags: tags?.length ? tags : undefined,
    price: Number.isFinite(min) && Number.isFinite(max) && max > 0 ? [min, max] : undefined,
  };

  const sortParam = first(params.sort);
  const initialSort = (SORTS.includes(sortParam ?? "") ? sortParam : "featured") as SortKey;

  return (
    <>
      <section className="border-b border-line bg-oat/40">
        <div className="container-x py-12 sm:py-16">
          <p className="kicker">The shop</p>
          <h1 className="display mt-2 max-w-2xl text-5xl sm:text-6xl">Every yarn, in one place.</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
            {products.length} yarns across four collections and six weights. Filter by the fibre you
            love, the colour you're after, or the thing you're making.
          </p>
        </div>
      </section>

      <section className="container-x py-10 sm:py-14">
        <ShopView
          initialQuery={first(params.q) ?? ""}
          initialFilters={initialFilters}
          initialSort={initialSort}
        />
      </section>
    </>
  );
}
