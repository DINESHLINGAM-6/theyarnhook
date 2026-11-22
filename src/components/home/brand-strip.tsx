import { brands } from "@/lib/commerce/data";

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden}>
      {brands.map((brand) => (
        <span key={brand} className="flex items-center gap-10">
          <span className="font-display text-xl text-ink-soft sm:text-2xl">{brand}</span>
          <span className="h-1 w-1 rounded-full bg-brass/60" aria-hidden />
        </span>
      ))}
    </div>
  );
}

export function BrandStrip() {
  return (
    <section className="border-y border-line bg-ivory py-6" aria-label="Brands we carry">
      <div className="container-x flex items-center gap-6">
        <p className="hidden shrink-0 text-[11px] tracking-wide text-muted lg:block">Yarns from</p>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            <Group />
            <Group hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
