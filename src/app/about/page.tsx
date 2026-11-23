import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/commerce/data";
import { ButtonLink } from "@/components/ui/button-link";
import { CollectionMark } from "@/components/art/collection-mark";
import { HFLogoReveal } from "@/components/motion/hyperframes/hf-logo-reveal";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "TheYarnHook is a small yarn studio in Bengaluru making soft, colour-rich yarn in four collections: Desire, Milka, Souffle and Plush Luxe.",
  alternates: { canonical: "/about" },
};

const steps = [
  { n: "01", title: "Source", body: "We buy small lots from mills we've worked with for years, and say no to anything that feels squeaky or splits." },
  { n: "02", title: "Dye", body: "Low-water dye baths, mixed by eye. We keep recipes loose so no two batches are exactly the same." },
  { n: "03", title: "Wind", body: "Every skein is wound, weighed and labelled by hand at the studio in Indiranagar." },
  { n: "04", title: "Send", body: "Orders leave within two working days, wrapped in paper you can recycle or keep." },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-x grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="kicker">Our story</p>
          <h1 className="display mt-3 max-w-2xl text-5xl sm:text-6xl lg:text-7xl">
            We started with one hook and a colour we couldn't find.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-soft">
            TheYarnHook is a small yarn studio in Bengaluru. We make yarn for people who care how a
            colour feels in the hand, not just how it looks on a screen.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/shop">
              Shop the yarns
              <ArrowRight size={16} aria-hidden />
            </ButtonLink>
            <ButtonLink href="/collections" variant="outline">
              The four collections
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px]">
          <div className="absolute left-0 top-[6%] h-[68%] w-[58%] -rotate-6 overflow-hidden rounded-[18px] border border-line bg-paper p-4 shadow-lift">
            {collections[0].image && (
              <Image
                src={collections[0].image}
                alt=""
                fill
                className="object-cover object-center rounded-[18px]"
                loading="lazy"
              />
            )}
          </div>
          <div className="absolute right-0 top-0 h-[58%] w-[54%] rotate-3 overflow-hidden rounded-[18px] border border-line bg-paper p-4 shadow-soft">
            {collections[1].image && (
              <Image
                src={collections[1].image}
                alt=""
                fill
                className="object-cover object-center rounded-[18px]"
                loading="lazy"
                style={{ transform: "rotate(3deg)" }}
              />
            )}
          </div>
          <div className="absolute bottom-0 right-[6%] h-[54%] w-[52%] rotate-6 overflow-hidden rounded-[18px] border border-line bg-paper p-4 shadow-lift">
            {collections[3].image && (
              <Image
                src={collections[3].image}
                alt=""
                fill
                className="object-cover object-center rounded-[18px]"
                loading="lazy"
                style={{ transform: "rotate(-6deg)" }}
              />
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-oat/40">
        <div className="container-x grid gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="display text-4xl sm:text-5xl">It began in a living room.</h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-ink-soft">
            <p>
              Meera learned to crochet from her grandmother, on a steel hook and a cone of cotton
              that smelled faintly of the mill. Years later, back in Bengaluru, she went looking for
              that same softness in a colour that felt like the city at dusk. Nothing matched.
            </p>
            <p>
              So she started dyeing. First a few skeins for friends, then a stall at a makers' market,
              then a studio with a window that catches the afternoon light. TheYarnHook grew from
              there, slowly, one colour at a time.
            </p>
            <p>
              We still work in small batches. We still mix by eye. And we still keep a jar of that
              first cotton on the shelf, to remember what we were chasing.
            </p>
            <p className="text-xs text-muted">Meera and the studio, Indiranagar, Bengaluru.</p>
          </div>
        </div>
      </section>

      <section className="container-x py-14 sm:py-20">
        <div className="mb-8 max-w-xl">
          <p className="kicker">How we make it</p>
          <h2 className="display mt-2 text-4xl sm:text-5xl">Slow on purpose.</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Four steps, no shortcuts. The pace is the point: it's what gives each batch its small
            variations and its hand.
          </p>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.n} className="rounded-lg border border-line bg-paper p-5">
              <p className="font-display text-3xl text-brass">{step.n}</p>
              <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-plush-solid text-plush-on">
        <div className="container-x py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="text-[11px] font-medium tracking-wide text-[#E7C766]">Four moods</p>
              <h2 className="display mt-3 text-4xl sm:text-5xl">One system, four feelings.</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-plush-on/75">
                Desire is wine and smoke. Milka is warm milk and camel. Souffle is apricot and
                afternoon light. Plush Luxe is plum velvet and brass. Different palettes, same
                standard of softness.
              </p>
              <Link
                href="/collections"
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-plush-on underline decoration-plush-on/30 underline-offset-4 hover:decoration-plush-on"
              >
                Explore all four
                <ArrowRight size={15} aria-hidden />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.slug}`}
                  className="group rounded-lg bg-plush-tint p-4 text-plush-ink transition-transform hover:-translate-y-0.5"
                >
                  <CollectionMark symbol={collection.symbol} className="h-5 w-5 opacity-70" />
                  <p className="mt-6 font-display text-2xl leading-tight">{collection.name}</p>
                  <p className="mt-1 text-[11px] opacity-70">{collection.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="kicker">What we won't do</p>
            <h2 className="display mt-2 text-4xl sm:text-5xl">A few small promises.</h2>
          </div>
          <ul className="space-y-4 text-sm leading-relaxed text-ink-soft">
            <li className="border-t border-line pt-4">We won't sell a yarn we haven't worked with ourselves.</li>
            <li className="border-t border-line pt-4">We won't hide a fibre behind a pretty name. Every label lists the blend, weight and yardage.</li>
            <li className="border-t border-line pt-4">We won't overdye a bad batch to save it. If it isn't right, it doesn't go out.</li>
            <li className="border-t border-line pt-4">We won't pretend small-batch means identical. Slight variations between batches are part of the yarn.</li>
          </ul>
        </div>
      </section>

      <section className="container-x pb-16 sm:pb-24">
        <div className="mb-12 rounded-2xl border border-line/60 bg-oat/20 py-8 backdrop-blur-sm">
          <HFLogoReveal />
        </div>
        <div className="flex flex-col items-center rounded-lg border border-line bg-paper px-6 py-12 text-center">
          <p className="kicker">Come say hello</p>
          <h2 className="display mt-2 max-w-xl text-4xl sm:text-5xl">There's always room for one more project.</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            Questions about a colour, a weight or a pattern? We answer every message ourselves.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact">
              Contact the studio
              <ArrowRight size={16} aria-hidden />
            </ButtonLink>
            <ButtonLink href="/faq" variant="outline">
              Read the FAQ
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
