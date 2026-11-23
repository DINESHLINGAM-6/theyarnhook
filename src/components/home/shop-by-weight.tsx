import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products, weights } from "@/lib/commerce/data";
import { CollectionMark } from "@/components/art/collection-mark";

const weightTints: Record<number, string> = {
  2: "#F4DCE2",
  3: "#F3E7D6",
  4: "#FBE3CC",
  5: "#E7DEF0",
  6: "#F3E7D6",
  7: "#E7DEF0",
};

const weightAccents: Record<number, string> = {
  2: "#7A1F3D",
  3: "#6B4A2C",
  4: "#9A4A16",
  5: "#3A2350",
  6: "#A16207",
  7: "#4A423B",
};

export function ShopByWeight() {
  return (
    <section className="bg-oat/40 py-16 sm:py-24 relative overflow-hidden" aria-labelledby="weight-heading">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob w-[600px] h-[600px] bg-brass/25 rounded-full -top-[180px] left-[-180px] mix-blend-screen" />
        <div className="blob w-[500px] h-[500px] bg-desire-tint/30 rounded-full bottom-[-120px] right-[-100px] mix-blend-screen" />
      </div>

      <div className="container-x">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">From lace to jumbo</p>
            <h2 id="weight-heading" className="display mt-2 text-4xl sm:text-5xl gradient-text">
              Shop by weight.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
              Every yarn carries a weight number — match it to your pattern and you’re set.
            </p>
          </div>
          <Link href="/faq" className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-all duration-300 hover:text-ink hover:-translate-x-0.5">
            Weight guide
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {weights.map((weight) => {
            const count = products.filter((product) => product.weight === weight.weight).length;
            const tint = weightTints[weight.weight] ?? "#efe4d3";
            const accent = weightAccents[weight.weight] ?? "#A16207";
            return (
              <Link
                key={weight.weight}
                href={`/shop?weight=${weight.weight}`}
                className="group relative flex flex-col justify-between rounded-xl border border-line bg-paper p-5 transition-all duration-400 ease-smooth hover:-translate-y-1 hover:border-current/40 hover:shadow-card sm:p-6"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div
                    className="inline-flex items-center justify-center rounded-full"
                    style={{
                      width: 56,
                      height: 56,
                      backgroundColor: tint,
                      color: accent,
                    }}
                  >
                    <span className="display text-[2.5rem] font-bold leading-none">{weight.weight}</span>
                  </div>
                  <CollectionMark symbol="puff" className="h-4 w-4 text-brass opacity-70" />
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium leading-snug text-ink">{weight.label}</p>
                  <p className="mt-2 hidden text-[11px] leading-relaxed text-muted sm:block">{weight.blurb}</p>
                  <p className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-brass">
                    {count} yarns
                    <ArrowRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition-transform duration-300" aria-hidden />
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
