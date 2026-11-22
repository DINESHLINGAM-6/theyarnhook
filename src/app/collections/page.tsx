import type { Metadata } from "next";
import { collections } from "@/lib/commerce/data";
import { CollectionCard } from "@/components/commerce/collection-card";

export const metadata: Metadata = {
  title: "The four collections",
  description:
    "Desire, Milka, Souffle and Plush Luxe — four moods of small-batch yarn, dyed in India.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <section className="container-x py-12 sm:py-16">
      <p className="kicker">Four collections</p>
      <h1 className="display mt-2 max-w-3xl text-5xl sm:text-6xl">
        Four moods, one soft obsession.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
        Each collection begins with a feeling and ends with a palette. Start with the one that sounds
        like you.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {collections.map((collection, index) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            variant={index === 0 || index === 3 ? "tall" : "compact"}
          />
        ))}
      </div>
    </section>
  );
}
