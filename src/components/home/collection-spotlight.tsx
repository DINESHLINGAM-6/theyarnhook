import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getFeaturedCollection, getProductsByCollection } from "@/lib/commerce/provider";
import { formatINR } from "@/lib/commerce/format";
import { ButtonLink } from "@/components/ui/button-link";
import { CollectionMark } from "@/components/art/collection-mark";
import { productPlaceholders } from "@/lib/commerce/placeholder";

export function CollectionSpotlight() {
  const collection = getFeaturedCollection();
  const items = getProductsByCollection(collection.id).slice(0, 3);

  return (
    <section className="bg-plush-solid text-plush-on" aria-labelledby="spotlight-heading">
      <div className="container-x grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 text-[11px] font-medium tracking-wide text-[#E7C766]">
            <CollectionMark symbol={collection.symbol} className="h-4 w-4" />
            Collection spotlight
          </p>
          <h2 id="spotlight-heading" className="display mt-3 text-5xl sm:text-6xl lg:text-7xl">
            Plush Luxe
          </h2>
          <p className="mt-3 font-display text-xl italic text-plush-on/90">{collection.tagline}</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-plush-on/75">{collection.description}</p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-plush-on/70">
            <li>Midnight merino</li>
            <li>Brass thread</li>
            <li>Velvet textures</li>
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={`/collections/${collection.slug}`} variant="light" size="lg">
              Enter Plush Luxe
              <ArrowRight size={16} aria-hidden />
            </ButtonLink>
            <ButtonLink
              href="/shop?colour=Plum"
              variant="outline"
              size="lg"
              className="border-plush-on/30 text-plush-on hover:border-plush-on hover:bg-plush-on hover:text-plush-solid"
            >
              Shop the plum tones
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {items.map((product) => {
            const colour = product.colours[0];
            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group rounded-lg bg-plush-tint p-2 text-plush-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="relative aspect-square overflow-hidden rounded-md bg-plush-tint">
                  <Image
                    src={product.image ?? productPlaceholders["plush-luxe"]}
                    alt=""
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="mt-2 truncate text-[11px] font-medium leading-tight">{product.name}</p>
                <p className="text-[11px] opacity-70">{formatINR(product.price)}</p>
                <span className="sr-only">Colour: {colour.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
