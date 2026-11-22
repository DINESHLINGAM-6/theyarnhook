import Link from "next/link";
import { ArrowRight, BedDouble, Footprints, House, Rabbit, Shirt, ShoppingBag } from "lucide-react";
import { projects } from "@/lib/commerce/data";

const ICONS = {
  amigurumi: Rabbit,
  garments: Shirt,
  blankets: BedDouble,
  socks: Footprints,
  bags: ShoppingBag,
  home: House,
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
        </div>
        <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink">
          Browse everything
          <ArrowRight size={15} aria-hidden />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const Icon = ICONS[project.id];
          return (
            <Link
              key={project.id}
              href={`/shop?project=${project.id}`}
              className="group flex items-center gap-4 rounded-lg border border-line bg-paper p-5 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-soft"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-oat/70 text-ink transition-colors group-hover:bg-ink group-hover:text-ivory">
                <Icon size={20} strokeWidth={1.5} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-xl leading-tight text-ink">{project.name}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted">{project.blurb}</span>
              </span>
              <ArrowRight size={16} aria-hidden className="shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-ink" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
