import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { collections } from "@/lib/commerce/data";
import { ButtonLink } from "@/components/ui/button-link";
import { Magnetic } from "@/components/motion/magnetic";
import { Tilt3D } from "@/components/motion/tilt-3d";
import { StrandField } from "@/components/art/strand-field";

export function Hero() {
  const desire = collections[0];
  const milka = collections[1];
  const plush = collections[3];

  return (
    <section className="relative overflow-hidden">
      {/* Gradient mesh blobs for depth */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob w-[600px] h-[600px] bg-desire-tint/60 rounded-full -top-[180px] -left-[180px] mix-blend-screen animate-[pulse-ring_8s_ease-in-out_infinite]" />
        <div className="blob w-[520px] h-[520px] bg-plush-tint/50 rounded-full bottom-[-200px] -right-[160px] mix-blend-screen animate-[float_10s_ease-in-out_infinite]" style={{ animationDelay: "2000ms" }} />
        <div className="blob w-[440px] h-[440px] bg-milka-tint/45 rounded-full top-[350px] left-[-120px] mix-blend-screen" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-70">
        <StrandField palette={["#7A1F3D", "#B98A5E", "#3A2350"]} uid="hero-strands" className="h-full w-full" opacity={0.35} />
      </div>

      <div className="container-x grid items-center gap-10 pb-14 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-28 lg:pt-20">
        <div className="relative z-10">
          <div className="animate-fade-up inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-line/60 bg-paper/80 text-[10px] font-semibold tracking-wider text-ink-soft backdrop-blur shadow-soft" style={{ animationDelay: "60ms" }}>
            <Sparkles size={12} className="text-brass" aria-hidden />
            New: Plush Luxe collection
          </div>

          <p className="mt-3 animate-fade-up kicker inline-flex items-center gap-2" style={{ animationDelay: "140ms" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-brass" aria-hidden />
            Small-batch yarn, dyed in India
          </p>

          <h1 className="display mt-4 animate-fade-up text-[clamp(3rem,9vw,7rem)] leading-tight" style={{ animationDelay: "220ms" }}>
            Yarn, but
            <br />
            make it a <em className="italic gradient-desire">feeling</em>.
          </h1>

          <p
            className="mt-5 max-w-md animate-fade-up text-[0.98rem] leading-relaxed text-ink-soft"
            style={{ animationDelay: "320ms" }}
          >
            Four collections of soft, colour-rich yarn for crochet and knitting. Dyed slowly in small
            batches, wound by hand, made for the projects you keep.
          </p>

          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-3" style={{ animationDelay: "420ms" }}>
            <Magnetic>
              <ButtonLink href="/shop" size="lg" className="glow-brass shadow-lift">
                Shop the collections
                <ArrowRight size={16} aria-hidden />
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="/shop?weight=4" variant="outline" size="lg">
              Find your weight
            </ButtonLink>
          </div>

          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-x-5 gap-y-2" style={{ animationDelay: "500ms" }}>
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="inline-flex items-center gap-2 text-xs font-medium tracking-wide transition-all duration-300 hover:text-ink hover:-translate-y-0.5"
              >
                <span className="h-2 w-2 rounded-full border border-current/30" style={{ backgroundColor: collection.accent.solid }} aria-hidden />
                {collection.name}
              </Link>
            ))}
          </div>

          <p className="mt-7 animate-fade-up text-[11px] text-muted" style={{ animationDelay: "580ms" }}>
            Free shipping over ₹999 · 7-day easy returns · 28 yarns in four moods
          </p>
        </div>

        <div className="relative z-10 animate-fade-up" style={{ animationDelay: "300ms" }}>
          <Tilt3D intensity={7} className="group mx-auto aspect-[4/5] w-full max-w-[520px]">
          <div className="relative h-full w-full">
            <div className="absolute left-0 top-[9%] h-[70%] w-[60%] -rotate-6 overflow-hidden rounded-[20px] border border-line/70 bg-paper p-5 shadow-lift ring-1 ring-current/10">
              {desire.image && (
                <Image
                  src={desire.image}
                  alt=""
                  fill
                  className="object-cover object-center rounded-[18px]"
                  loading="lazy"
                />
              )}
            </div>
            <div className="absolute right-0 top-0 h-[62%] w-[57%] rotate-3 overflow-hidden rounded-[20px] border border-line/70 bg-paper p-5 shadow-soft ring-1 ring-current/10">
              {milka.image && (
                <Image
                  src={milka.image}
                  alt=""
                  fill
                  className="object-cover object-center rounded-[18px]"
                  loading="lazy"
                  style={{ transform: "rotate(3deg)" }}
                />
              )}
            </div>
            <div className="absolute bottom-0 right-[5%] h-[58%] w-[55%] rotate-6 overflow-hidden rounded-[20px] border border-line/70 bg-paper p-5 shadow-lift ring-1 ring-current/10">
              {plush.image && (
                <Image
                  src={plush.image}
                  alt=""
                  fill
                  className="object-cover object-center rounded-[18px]"
                  loading="lazy"
                  style={{ transform: "rotate(-6deg)" }}
                />
              )}
            </div>
            <div className="absolute bottom-[10%] left-0 rounded-[20px] border border-line bg-paper/95 px-5 py-4 shadow-card backdrop-blur-xl ring-1 ring-current/10">
              <p className="font-display text-4xl sm:text-5xl leading-none">28</p>
              <p className="mt-1.5 text-[11px] text-muted">yarns, four moods</p>
            </div>
            <Link
              href="/collections/plush-luxe"
              className="absolute right-0 top-[56%] inline-flex items-center gap-1.5 rounded-full border border-current/20 bg-paper/95 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-ink shadow-card backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-plush-solid" aria-hidden />
              New: Plush Luxe
            </Link>
          </div>
          </Tilt3D>
        </div>
      </div>

      <div className="container-x flex items-center justify-between border-t border-line/70 py-5 text-[11px] text-muted">
        <span className="inline-flex items-center gap-2">
          <ArrowDown size={13} aria-hidden className="animate-float" />
          Scroll for the four collections
        </span>
        <span className="hidden sm:block">Merino / Cotton / Bamboo / Alpaca</span>
      </div>
    </section>
  );
}
