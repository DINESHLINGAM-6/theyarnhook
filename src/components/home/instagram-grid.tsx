import { Instagram } from "lucide-react";
import Image from "next/image";
import { collections } from "@/lib/commerce/data";

const TILES: { palette: string[]; image: string }[] = [
  { palette: collections[0].palette, image: "/images/products/yarn-starlite.webp" },
  { palette: collections[1].palette, image: "/images/products/yarn-caramel.webp" },
  { palette: collections[2].palette, image: "/images/products/yarn-mousse-yellow.webp" },
  { palette: collections[3].palette, image: "/images/products/yarn-plush.webp" },
  { palette: ["#B98A5E", "#E7D8BF", "#6B4A2C"], image: "/images/products/yarn-cotton-plus.webp" },
  { palette: ["#F2C879", "#E8A87C", "#D98A5A"], image: "/images/products/yarn-v-peach.webp" },
];

export function InstagramGrid() {
  return (
    <section className="container-x py-16 sm:py-24" aria-labelledby="instagram-heading">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker">The hook diary</p>
          <h2 id="instagram-heading" className="display mt-2 text-4xl sm:text-5xl">
            @theyarnhook
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            Dye days, works in progress and the small things that make a project feel finished.
          </p>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
        >
          <Instagram size={15} aria-hidden />
          Follow along
        </a>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {TILES.map((tile, index) => (
          <a
            key={index}
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="TheYarnHook on Instagram"
            className="group relative aspect-square overflow-hidden rounded-md border border-line/60"
          >
            <Image
              src={tile.image}
              alt=""
              fill
              className="object-cover object-center transition-transform duration-500 ease-smooth group-hover:scale-105"
              loading="lazy"
            />
            <span className="absolute inset-0 grid place-items-center bg-ink/45 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
              <span className="flex flex-col items-center gap-1.5 text-ivory">
                <Instagram size={20} aria-hidden />
                <span className="text-[11px]">@theyarnhook</span>
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
