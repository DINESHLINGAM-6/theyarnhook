import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/commerce/data";
import { CollectionCard } from "@/components/commerce/collection-card";

export function CollectionsGrid() {
  const [desire, milka, souffle, plush] = collections;
  return (
    <section className="container-x py-16 sm:py-24" aria-labelledby="collections-heading">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker">Four collections</p>
          <h2 id="collections-heading" className="display mt-2 text-4xl sm:text-5xl">
            Pick a mood.
          </h2>
        </div>
        <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink">
          Shop all yarns
          <ArrowRight size={15} aria-hidden />
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <CollectionCard collection={desire} variant="tall" className="lg:col-span-7 lg:row-span-2" />
        <CollectionCard collection={milka} variant="compact" className="lg:col-span-5" />
        <CollectionCard collection={souffle} variant="compact" className="lg:col-span-5" />
        <CollectionCard collection={plush} variant="wide" className="lg:col-span-12" />
      </div>
    </section>
  );
}
