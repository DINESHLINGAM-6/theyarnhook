"use client";

import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Collection } from "@/lib/commerce/types";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { Magnetic } from "@/components/motion/magnetic";
import { CollectionMark } from "@/components/art/collection-mark";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

interface CollectionHeroProps {
  collection: Collection;
  count: number;
}

export function CollectionHero({ collection, count }: CollectionHeroProps) {
  const reduce = useReducedMotion();

  return (
    <section style={{ backgroundColor: collection.accent.tint, color: collection.accent.ink }}>
      <div className="container-x py-12 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="relative z-10">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs opacity-70 transition-opacity hover:opacity-100"
            >
              <ArrowLeft size={13} aria-hidden />
              All yarns
            </Link>

            <Reveal delay={60} once={!reduce}>
              <p className="mt-8 inline-flex items-center gap-2 text-[11px] font-medium tracking-wide">
                <CollectionMark symbol={collection.symbol} className="h-4 w-4" />
                {collection.mood}
              </p>
            </Reveal>

            <Reveal delay={140} once={!reduce}>
              <h1 className="display mt-3 max-w-[48ch] text-6xl sm:text-7xl lg:text-8xl leading-[0.9]">
                {collection.name}
              </h1>
            </Reveal>

            <Reveal delay={220} once={!reduce}>
              <p className="mt-4 font-display text-xl italic opacity-90">{collection.tagline}</p>
            </Reveal>

            <Reveal delay={300} once={!reduce}>
              <p className="mt-5 max-w-lg text-sm leading-relaxed opacity-80">{collection.description}</p>
            </Reveal>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px]">
              <Reveal delay={380} once={!reduce}>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-current" aria-hidden />
                  {count} yarns in this collection
                </span>
              </Reveal>
              <Reveal delay={440} once={!reduce}>
                <span className="opacity-70">
                  Signature: {collection.signature}
                </span>
              </Reveal>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Reveal delay={520} once={!reduce}>
                <Magnetic>
                  <ButtonLink
                    href={`/shop?collection=${collection.id}`}
                    size="lg"
                    style={{ backgroundColor: collection.accent.solid, color: collection.accent.on }}
                  >
                    Shop this collection
                    <ArrowRight size={16} aria-hidden />
                  </ButtonLink>
                </Magnetic>
              </Reveal>
              <Reveal delay={600} once={!reduce}>
                <ButtonLink href="/collections" variant="outline" size="lg">
                  All collections
                  <ArrowRight size={16} aria-hidden />
                </ButtonLink>
              </Reveal>
            </div>
          </div>

          <div className="relative z-10">
            <Parallax distance={28}>
              <div className="relative mx-auto aspect-square w-full max-w-[460px] sm:max-w-[520px]">
                <div className="absolute inset-0 rounded-full border border-current/10 animate-[pulse_4s_ease-in-out_infinite]" />
                <div className="absolute inset-[6%] rotate-3 transition-transform duration-1000 ease-in-out">
                  <div className="relative h-full w-full overflow-hidden rounded-full shadow-2xl">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={`/media/${collection.id}-hero-poster.svg`}
                      className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                      aria-label={`${collection.name} collection ambient motion loop`}
                    >
                      <source src={`/media/${collection.id}-hero.mp4`} type="video/mp4" />
                      {/* Fallback image when video isn't loaded or supported */}
                      <Image
                        src={`/media/${collection.id}-hero-poster.svg`}
                        alt={`${collection.name} yarn mood visual`}
                        fill
                        className="object-cover object-center"
                        loading="lazy"
                      />
                    </video>
                  </div>
                </div>
                <div className="absolute -right-6 bottom-6 hidden sm:block rounded-full border border-current/20 bg-paper/80 backdrop-blur-md p-6 shadow-lift">
                  <p className="text-[10px] uppercase tracking-widest text-current font-bold">
                    {collection.symbol}
                  </p>
                </div>
              </div>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}
