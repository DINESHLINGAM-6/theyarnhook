"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Trash2, X } from "lucide-react";
import { useCartStore, cartSubtotal, freeShippingRemaining } from "@/lib/store/cart";
import { getProductById } from "@/lib/commerce/provider";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/commerce/data";
import { formatINR } from "@/lib/commerce/format";
import { useMounted } from "@/lib/hooks/use-mounted";
import { ButtonLink } from "@/components/ui/button-link";
import { QuantityStepper } from "@/components/commerce/quantity-stepper";

const SHIPPING_FLAT = 79;

export default function CartPage() {
  const mounted = useMounted();
  const lines = useCartStore((state) => state.lines);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeLine = useCartStore((state) => state.removeLine);
  const clear = useCartStore((state) => state.clear);

  if (!mounted) {
    return (
      <div className="container-x py-16">
        <div className="h-8 w-48 animate-pulse rounded-full bg-oat/70" />
        <div className="mt-8 h-64 animate-pulse rounded-lg bg-oat/50" />
      </div>
    );
  }

  const subtotal = cartSubtotal(lines);
  const remaining = freeShippingRemaining(subtotal);
  const shipping = lines.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  if (lines.length === 0) {
    return (
      <section className="container-x flex min-h-[60svh] flex-col items-center justify-center py-20 text-center">
        <div className="h-32 w-32 opacity-80 rounded-full overflow-hidden border border-line bg-paper">
          <Image
            src="https://placehold.co/400x400/7A1F3D/FFFFFF?text=Desire+Yarn"
            alt=""
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
        <p className="kicker mt-6">Your bag</p>
        <h1 className="display mt-2 text-4xl sm:text-5xl">Nothing in the bag yet.</h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
          Your next project is one soft skein away. Start with the collections, or browse every yarn.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/shop">
            Shop all yarns
            <ArrowRight size={16} aria-hidden />
          </ButtonLink>
          <ButtonLink href="/collections" variant="outline">
            The collections
          </ButtonLink>
        </div>
      </section>
    );
  }

  return (
    <section className="container-x py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="kicker">Your bag</p>
          <h1 className="display mt-2 text-4xl sm:text-5xl">
            {lines.length} {lines.length === 1 ? "yarn" : "yarns"} in the bag.
          </h1>
        </div>
        <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
          <ArrowLeft size={15} aria-hidden />
          Continue shopping
        </Link>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="rounded-lg border border-line bg-paper px-4 sm:px-6">
            {lines.map((line) => {
              const product = getProductById(line.productId);
              if (!product) return null;
              const colour = product.colours.find((item) => item.id === line.colourId) ?? product.colours[0];
              return (
                <div
                  key={`${line.productId}-${line.colourId}`}
                  className="flex gap-4 border-b border-line py-5 last:border-b-0"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-line/70 bg-oat/30 sm:h-24 sm:w-24"
                    aria-label={product.name}
                  >
                    <Image
                      src={product.image ?? `https://placehold.co/400x400/7A1F3D/FFFFFF?text=Desire+Yarn`}
                      alt=""
                      fill
                      className="object-cover object-center"
                      loading="lazy"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/products/${product.slug}`}
                          className="font-display text-lg leading-tight hover:text-brass"
                        >
                          {product.name}
                        </Link>
                        <p className="mt-1 text-xs text-muted">
                          {colour?.name} · {product.weightLabel}
                        </p>
                        <p className="mt-1 text-xs text-muted">{formatINR(product.price)} each</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.productId, line.colourId)}
                        aria-label={`Remove ${product.name} from bag`}
                        className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-sale"
                      >
                        <X size={15} />
                      </button>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                      <QuantityStepper
                        size="sm"
                        value={line.quantity}
                        max={product.stock}
                        onChange={(value) => setQuantity(line.productId, line.colourId, value)}
                        label={`Quantity for ${product.name}`}
                      />
                      <p className="text-sm font-semibold tabular-nums">
                        {formatINR(product.price * line.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={clear}
            className="mt-4 inline-flex cursor-pointer items-center gap-1.5 text-xs text-muted transition-colors hover:text-sale"
          >
            <Trash2 size={13} aria-hidden />
            Empty the bag
          </button>
        </div>

        <aside>
          <div className="rounded-lg border border-line bg-paper p-6 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <h2 className="font-display text-2xl">Order summary</h2>

            <div className="mt-4 rounded-md bg-oat/50 p-3">
              {remaining > 0 ? (
                <p className="text-xs text-ink-soft">
                  Add <span className="font-semibold text-ink">{formatINR(remaining)}</span> for free shipping.
                </p>
              ) : (
                <p className="text-xs text-success">Free shipping unlocked.</p>
              )}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-brass transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="tabular-nums">{formatINR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Shipping</dt>
                <dd className="tabular-nums">{shipping === 0 ? "Free" : formatINR(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-2 text-base font-semibold">
                <dt>Total</dt>
                <dd className="tabular-nums">{formatINR(subtotal + shipping)}</dd>
              </div>
            </dl>

            <ButtonLink href="/checkout" size="lg" className="mt-5 w-full">
              Checkout
              <ArrowRight size={16} aria-hidden />
            </ButtonLink>
            <p className="mt-3 text-center text-[11px] text-muted">
              Taxes included. UPI, cards and COD at checkout.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted">
              <span className="h-1 w-1 rounded-full bg-brass" aria-hidden />
              Secure checkout · 7-day returns
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
