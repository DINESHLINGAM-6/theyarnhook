import type { Product } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
  className?: string;
  columns?: 3 | 4;
}

export function ProductGrid({ products, className, columns = 4 }: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6",
        columns === 4 ? "md:grid-cols-3 xl:grid-cols-4" : "md:grid-cols-3",
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
