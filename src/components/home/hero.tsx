import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { collections } from "@/lib/commerce/data";
import { ButtonLink } from "@/components/ui/button-link";
import { Magnetic } from "@/components/motion/magnetic";
import { Parallax } from "@/components/motion/parallax";
import { YarnSkein } from "@/components/art/yarn-skein";
import { StrandField } from "@/components/art/strand-field";

export function Hero() {
  const desire = collections[0];
  const milka = collections[1];
  const plush = collections[3];

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <StrandField palette={["#7A1F3D", "#B98A5E", "#3A2350"]} uid="hero-strands" className="h-full w-full" opacity={0.4} />
      </div>

      <div className="container-x grid items-center gap-10 pb-14 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24 lg:pt-16">
        <div className="relative z-10">
          <p className="animate-fade-up kicker inline-flex items-center gap-2" style={{ animationDelay: "60ms" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-brass" aria-hidden />
            Small-batch yarn, dyed in India
          </p>

          <h1 className="display mt-4 animate-fade-up text-[clamp(3rem,9vw,7rem)]" style={{ animationDelay: "140ms" }}>
            Yarn, but
            <br />
            make it a <em className="italic text-desire-solid">feeling</em>.
          </h1>

          <p
            className="mt-5 max-w-md animate-fade-up text-[0.98rem] leading-relaxed text-ink-soft"
            style={{ animationDelay: "240ms" }}
          >
            Four collections of soft, colour-rich yarn for crochet and knitting. Dyed slowly in small
            batches, wound by hand, made for the projects you keep.
          </p>

          <div className="mt-7 flex animate-fade-up flex-wrap items-center gap-3" style={{ animationDelay: "320ms" }}>
            <Magnetic>
              <ButtonLink href="/shop" size="lg">
                Shop the collections
                <ArrowRight size={16} aria-hidden />
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="/shop?weight=4" variant="outline" size="lg">
              Find your weight
            </ButtonLink>
          </div>

          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-x-5 gap-y-2" style={{ animationDelay: "400ms" }}>
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="inline-flex items-center gap-2 text-xs text-ink-soft transition-colors hover:text-ink"
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: collection.accent.solid }} aria-hidden />
                {collection.name}
              </Link>
            ))}
          </div>

          <p className="mt-6 animate-fade-up text-[11px] text-muted" style={{ animationDelay: "460ms" }}>
            Free shipping over ₹999 · 7-day easy returns · 28 yarns in four moods
          </p>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "260ms" }}>
          <Parallax distance={26}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[500px]">
              <div className="absolute left-0 top-[9%] h-[70%] w-[60%] -rotate-6 overflow-hidden rounded-[18px] border border-line/70 bg-paper p-4 shadow-lift">
                <YarnSkein palette={desire.palette} uid="hero-desire" />
              </div>
              <div className="absolute right-0 top-0 h-[62%] w-[57%] rotate-3 overflow-hidden rounded-[18px] border border-line/70 bg-paper p-4 shadow-soft">
                <YarnSkein palette={milka.palette} uid="hero-milka" kind="ball" />
              </div>
              <div className="absolute bottom-0 right-[5%] h-[58%] w-[55%] rotate-6 overflow-hidden rounded-[18px] border border-line/70 bg-paper p-4 shadow-lift">
                <YarnSkein palette={plush.palette} uid="hero-plush" />
              </div>
              <div className="absolute bottom-[9%] left-0 rounded-md border border-line bg-paper/95 px-4 py-3 shadow-soft backdrop-blur">
                <p className="font-display text-3xl leading-none">28</p>
                <p className="mt-1 text-[11px] text-muted">yarns, four moods</p>
              </div>
              <Link
                href="/collections/plush-luxe"
                className="absolute right-0 top-[58%] inline-flex items-center gap-1.5 rounded-full border border-line bg-paper/95 px-3 py-1.5 text-[11px] font-medium text-ink shadow-soft backdrop-blur transition-transform hover:-translate-y-0.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-plush-solid" aria-hidden />
                New: Plush Luxe
              </Link>
            </div>
          </Parallax>
        </div>
      </div>

      <div className="container-x flex items-center justify-between border-t border-line/70 py-4 text-[11px] text-muted">
        <span className="inline-flex items-center gap-2">
          <ArrowDown size={13} aria-hidden className="animate-float" />
          Scroll for the four collections
        </span>
        <span className="hidden sm:block">Merino / Cotton / Bamboo / Alpaca</span>
      </div>
    </section>
  );
}
