import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products, weights } from "@/lib/commerce/data";
import { CollectionMark } from "@/components/art/collection-mark";

export function ShopByWeight() {
  return (
    <section className="bg-oat/50 py-16 sm:py-24" aria-labelledby="weight-heading">
      <div className="container-x">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">From lace to jumbo</p>
            <h2 id="weight-heading" className="display mt-2 text-4xl sm:text-5xl">
              Shop by weight.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
              Every yarn is labelled 2–7 so you can match the fibre to the project, not guess at it.
            </p>
          </div>
          <Link href="/faq" className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink">
            How to choose
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {weights.map((weight) => {
            const count = products.filter((product) => product.weight === weight.weight).length;
            return (
              <Link
                key={weight.weight}
                href={`/shop?weight=${weight.weight}`}
                className="group relative flex flex-col justify-between rounded-lg border border-line bg-paper p-4 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-soft sm:p-5"
              >
                <div className="flex items-start justify-between">
                  <span className="display text-5xl text-ink sm:text-6xl">{weight.weight}</span>
                  <CollectionMark symbol="puff" className="h-4 w-4 text-brass opacity-60" />
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium leading-snug text-ink">{weight.label}</p>
                  <p className="mt-2 hidden text-[11px] leading-relaxed text-muted sm:block">{weight.blurb}</p>
                  <p className="mt-2 text-[11px] text-brass">{count} yarns</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
