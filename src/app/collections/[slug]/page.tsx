import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { collections, products } from "@/lib/commerce/data";
import { getCollection, getCollectionCount } from "@/lib/commerce/provider";
import { ShopView } from "@/components/commerce/shop-view";
import { CollectionCard } from "@/components/commerce/collection-card";
import { CollectionHero } from "@/components/collections/collection-hero";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection not found" };
  return {
    title: `${collection.name} yarn`,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: {
      title: `${collection.name} — TheYarnHook`,
      description: collection.tagline,
    },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const count = getCollectionCount(collection.id);
  const others = collections.filter((item) => item.id !== collection.id);

  return (
    <>
      <CollectionHero collection={collection} count={count} />

      <section className="container-x py-10 sm:py-14">
        <Reveal once={true}>
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="display text-3xl sm:text-4xl">
              The {collection.name} yarns
            </h2>
            <p className="text-xs text-muted">{count} of {products.length} yarns</p>
          </div>
        </Reveal>
        <ShopView initialFilters={{ collection: collection.id }} />
      </section>

      <section className="container-x pb-16 sm:pb-24">
        <Reveal once={true}>
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="display text-3xl sm:text-4xl">Keep exploring</h2>
            <Link href="/collections" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
              All collections
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-3 md:grid-cols-3">
          {others.map((item) => (
            <Reveal key={item.id} once={true} delay={100}>
              <CollectionCard
                collection={item}
                variant="compact"
                className="min-h-[220px]"
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
