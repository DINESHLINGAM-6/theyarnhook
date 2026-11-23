import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { lookbookPlaceholders } from "@/lib/commerce/placeholder";

const LOOKBOOK = [
  {
    id: "throws" as const,
    title: "Throws that hug back",
    blurb: "Chunky merino and alpaca blankets for winter evenings.",
    href: "/shop?project=blankets",
    colour: "#F4DCE2",
  },
  {
    id: "garments" as const,
    title: "Drape for every day",
    blurb: "Silk-merino blends that move with you, not against you.",
    href: "/shop?project=garments",
    colour: "#F3E7D6",
  },
  {
    id: "amigurumi" as const,
    title: "Small makes, big joy",
    blurb: "Fine cotton for amigurumi, booties and first toys.",
    href: "/shop?project=amigurumi",
    colour: "#FBE3CC",
  },
  {
    id: "home" as const,
    title: "Soft things for the home",
    blurb: "Cushions, baskets and throws in midnight and brass.",
    href: "/shop?project=home",
    colour: "#E7DEF0",
  },
];

export function Lookbook() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="lookbook-heading">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob w-[600px] h-[600px] bg-desire-tint/40 rounded-full -top-[200px] -left-[200px] mix-blend-screen" />
        <div className="blob w-[500px] h-[500px] bg-plush-tint/30 rounded-full bottom-[-150px] right-[-150px] mix-blend-screen" />
      </div>

      <div className="container-x py-20 sm:py-28 relative z-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">Lookbook</p>
            <h2 id="lookbook-heading" className="display mt-2 text-4xl sm:text-5xl">
              Make something you’ll keep.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
              Projects that start with the yarn and end with something you reach for again and again.
            </p>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-all duration-300 hover:text-ink hover:-translate-x-0.5">
            Browse by project
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LOOKBOOK.map((item) => (
            <article key={item.id} className="group lookbook-frame life-card relative overflow-hidden rounded-xl">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={lookbookPlaceholders[item.id]}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <span
                className="life-badge"
                style={{ backgroundColor: item.colour, color: item.colour === "#E7DEF0" ? "#3A2350" : "#1a1613" }}
              >
                {item.title.split(" ")[0]}
              </span>
              <div className="lookbook-caption">
                <span className="kicker">{item.blurb.split(" ")[0]}</span>
                <h3>{item.title}</h3>
              </div>
              <Link
                href={item.href}
                className="absolute inset-0 z-20"
                aria-label={`Explore ${item.title}`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
