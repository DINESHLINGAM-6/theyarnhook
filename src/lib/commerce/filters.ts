import { getCollectionById, productInStock } from "./provider";
import type { Product, ProductFilters, SortKey } from "./types";

function matchesQuery(product: Product, query: string): boolean {
  const haystack = [
    product.name,
    product.fibre,
    product.brand,
    product.weightLabel,
    product.description,
    getCollectionById(product.collectionId).name,
    ...product.colours.map((colour) => colour.name),
    ...product.tags,
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function filterProducts(list: Product[], filters: ProductFilters): Product[] {
  return list.filter((product) => {
    if (filters.collection && product.collectionId !== filters.collection) return false;
    if (filters.fibre?.length && !filters.fibre.includes(product.fibre)) return false;
    if (filters.weight?.length && !filters.weight.includes(product.weight)) return false;
    if (filters.brand?.length && !filters.brand.includes(product.brand)) return false;
    if (filters.project && !product.projects.includes(filters.project)) return false;
    if (filters.tags?.length && !filters.tags.some((tag) => product.tags.includes(tag))) return false;
    if (filters.inStockOnly && !productInStock(product)) return false;
    if (filters.colour?.length) {
      const wanted = filters.colour.map((value) => value.toLowerCase());
      const hasColour = product.colours.some((colour) =>
        wanted.includes(colour.name.toLowerCase()),
      );
      if (!hasColour) return false;
    }
    if (filters.price) {
      const [min, max] = filters.price;
      if (product.price < min || product.price > max) return false;
    }
    if (filters.query && !matchesQuery(product, filters.query)) return false;
    return true;
  });
}

export function sortProducts(list: Product[], key: SortKey): Product[] {
  const sorted = [...list];
  switch (key) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case "newest":
      return sorted.sort(
        (a, b) => Number(b.tags.includes("new")) - Number(a.tags.includes("new")),
      );
    case "featured":
    default:
      return sorted.sort((a, b) => {
        const best = Number(b.tags.includes("bestseller")) - Number(a.tags.includes("bestseller"));
        return best || b.rating - a.rating || b.reviewCount - a.reviewCount;
      });
  }
}

export const PRICE_MIN = 0;
export const PRICE_MAX = 1500;

export function activeFilterCount(filters: ProductFilters): number {
  let count = 0;
  count += filters.fibre?.length ?? 0;
  count += filters.weight?.length ?? 0;
  count += filters.brand?.length ?? 0;
  count += filters.colour?.length ?? 0;
  count += filters.project ? 1 : 0;
  count += filters.inStockOnly ? 1 : 0;
  count += filters.tags?.length ?? 0;
  if (filters.price && (filters.price[0] !== PRICE_MIN || filters.price[1] !== PRICE_MAX)) count += 1;
  return count;
}
