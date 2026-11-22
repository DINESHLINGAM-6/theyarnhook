"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collections, fibres, projects, weights } from "@/lib/commerce/data";
import { getCollectionCount } from "@/lib/commerce/provider";
import { useUIStore } from "@/lib/store/ui";
import { Drawer } from "@/components/ui/drawer";
import { CollectionMark } from "@/components/art/collection-mark";

export function MobileMenu() {
  const overlay = useUIStore((state) => state.overlay);
  const close = useUIStore((state) => state.close);
  const open = overlay === "menu";

  return (
    <Drawer open={open} onClose={close} title="Menu" side="left">
      <div className="space-y-8 p-5">
        <section>
          <p className="mb-3 text-[11px] font-semibold tracking-wide text-ink">Collections</p>
          <ul className="space-y-1">
            {collections.map((collection) => (
              <li key={collection.id}>
                <Link
                  href={`/collections/${collection.slug}`}
                  onClick={close}
                  className="flex items-center justify-between gap-3 rounded-md py-2.5 transition-colors hover:bg-ink/[0.03]"
                >
                  <span className="flex items-center gap-2.5">
                    <CollectionMark symbol={collection.symbol} className="h-5 w-5" />
                    <span>
                      <span className="block font-display text-lg leading-tight">{collection.name}</span>
                      <span className="block text-[11px] text-muted">{collection.tagline}</span>
                    </span>
                  </span>
                  <span className="text-[11px] text-muted">{getCollectionCount(collection.id)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="mb-2 text-[11px] font-semibold tracking-wide text-ink">Shop by weight</p>
          <div className="flex flex-wrap gap-1.5">
            {weights.map((weight) => (
              <Link
                key={weight.weight}
                href={`/shop?weight=${weight.weight}`}
                onClick={close}
                className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs text-ink-soft"
              >
                {weight.weight} · {weight.label.split(" / ")[0]}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <p className="mb-2 text-[11px] font-semibold tracking-wide text-ink">Shop by fibre</p>
          <div className="flex flex-wrap gap-1.5">
            {fibres.map((fibre) => (
              <Link
                key={fibre}
                href={`/shop?fibre=${encodeURIComponent(fibre)}`}
                onClick={close}
                className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs text-ink-soft"
              >
                {fibre}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <p className="mb-2 text-[11px] font-semibold tracking-wide text-ink">Shop by project</p>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
            {projects.map((project) => (
              <li key={project.id}>
                <Link href={`/shop?project=${project.id}`} onClick={close} className="text-sm text-ink-soft hover:text-ink">
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-line pt-5">
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/shop" onClick={close} className="flex items-center justify-between text-ink">All yarns <ArrowUpRight size={14} aria-hidden /></Link></li>
            <li><Link href="/shop?tags=sale" onClick={close} className="flex items-center justify-between text-sale">Sale <ArrowUpRight size={14} aria-hidden /></Link></li>
            <li><Link href="/about" onClick={close} className="flex items-center justify-between text-ink-soft">Our story <ArrowUpRight size={14} aria-hidden /></Link></li>
            <li><Link href="/faq" onClick={close} className="flex items-center justify-between text-ink-soft">FAQ <ArrowUpRight size={14} aria-hidden /></Link></li>
            <li><Link href="/contact" onClick={close} className="flex items-center justify-between text-ink-soft">Contact <ArrowUpRight size={14} aria-hidden /></Link></li>
            <li><Link href="/wishlist" onClick={close} className="flex items-center justify-between text-ink-soft">Wishlist <ArrowUpRight size={14} aria-hidden /></Link></li>
          </ul>
        </section>
      </div>
    </Drawer>
  );
}
