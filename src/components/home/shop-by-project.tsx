import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/commerce/data";

const PROJECT_TINTS: Record<string, string> = {
  amigurumi: "#F4DCE2",
  garments: "#F3E7D6",
  blankets: "#FBE3CC",
  socks: "#E7DEF0",
  bags: "#F3E7D6",
  home: "#E7DEF0",
};

const PROJECT_IMAGES: Record<string, string> = {
  amigurumi: "/images/products/yarn-mousse-peach.webp",
  garments: "/images/products/lifestyle-knit.jpg",
  blankets: "/images/products/yarn-arm-knit.webp",
  socks: "/images/products/yarn-mousse-majenta.webp",
  bags: "/images/products/yarn-cotton-plus.webp",
  home: "/images/products/yarn-blankie.webp",
};

const ICONS = {
  amigurumi: "🧸",
  garments: "👕",
  blankets: "🛋️",
  socks: "🧦",
  bags: "👜",
  home: "🏠",
} as const;

export function ShopByProject() {
  return (
    <section className="container-x py-16 sm:py-24" aria-labelledby="project-heading">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker">Start with the thing you're making</p>
          <h2 id="project-heading" className="display mt-2 text-4xl sm:text-5xl">
            Shop by project.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
            Choose what you want to make — we’ll show you the yarns that suit it best.
          </p>
        </div>
        <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-all duration-300 hover:text-ink hover:-translate-x-0.5">
          Browse everything
          <ArrowRight size={15} aria-hidden />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const tint = PROJECT_TINTS[project.id] ?? "#efe4d3";
          const image = PROJECT_IMAGES[project.id];
          return (
            <Link
              key={project.id}
              href={`/shop?project=${project.id}`}
              className="group relative flex flex-col justify-between rounded-xl border border-line bg-paper p-5 transition-all duration-400 ease-smooth hover:-translate-y-1 hover:border-current/40 hover:shadow-card sm:p-6"
            >
              <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl border border-line/60 bg-[var(--ink-soft)]/5">
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[var(--ink-soft)]/20 via-transparent to-transparent" />
                <span className="absolute left-2 top-2 z-10 flex h-6 items-center gap-1 rounded-full bg-paper/90 px-2 py-0.5 text-[10px] font-bold text-ink backdrop-blur ring-1 ring-current/10">
                  {ICONS[project.id]}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <span className="block font-display text-xl leading-tight text-ink">{project.name}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted">{project.blurb}</span>
              </div>
              <ArrowRight size={16} aria-hidden className="shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-ink" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
