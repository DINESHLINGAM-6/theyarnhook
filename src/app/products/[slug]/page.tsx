import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/lib/commerce/data";
import { getCollectionById, getProduct, getRelated, productInStock } from "@/lib/commerce/provider";
import { ProductDetail } from "@/components/commerce/product-detail";
import { ProductGrid } from "@/components/commerce/product-grid";

const SITE_URL = "https://theyarnhook.example";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Yarn not found" };
  return {
    title: product.name,
    description: `${product.description} ${product.fibre} yarn, ${product.weightLabel}.`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} — TheYarnHook`,
      description: product.description,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const collection = getCollectionById(product.collectionId);
  const related = getRelated(product, 4);
  const inStock = productInStock(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    brand: { "@type": "Brand", name: product.brand },
    category: `${collection.name} yarn`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/products/${product.slug}`,
    },
  };

  return (
    <>
      <ProductDetail product={product} />

      {related.length > 0 ? (
        <section className="container-x py-16 sm:py-20" aria-labelledby="related-heading">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 id="related-heading" className="display text-3xl sm:text-4xl">
              Pairs well with
            </h2>
            <p className="text-xs text-muted">{collection.name} and nearby fibres</p>
          </div>
          <ProductGrid products={related} />
        </section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
