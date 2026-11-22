import { Instagram } from "lucide-react";
import { collections } from "@/lib/commerce/data";
import { YarnSkein } from "@/components/art/yarn-skein";
import type { MediaKind } from "@/lib/commerce/types";

const TILES: { palette: string[]; kind: MediaKind }[] = [
  { palette: collections[0].palette, kind: "skein" },
  { palette: collections[1].palette, kind: "ball" },
  { palette: collections[2].palette, kind: "texture" },
  { palette: collections[3].palette, kind: "skein" },
  { palette: ["#B98A5E", "#E7D8BF", "#6B4A2C"], kind: "texture" },
  { palette: ["#F2C879", "#E8A87C", "#D98A5A"], kind: "ball" },
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
            style={{ background: `linear-gradient(150deg, ${tile.palette[0]}22, #FFFDF8)` }}
          >
            <div className="absolute inset-0 p-3 transition-transform duration-500 ease-smooth group-hover:scale-105">
              <YarnSkein palette={tile.palette} uid={`ig-${index}`} kind={tile.kind} />
            </div>
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
