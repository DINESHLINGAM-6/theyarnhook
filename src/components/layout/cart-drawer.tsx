"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, ShoppingBag, Trash2, Truck } from "lucide-react";
import { getProductById } from "@/lib/commerce/provider";
import { formatINR } from "@/lib/commerce/format";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/commerce/data";
import { cartCount, cartSubtotal, freeShippingRemaining, useCartStore } from "@/lib/store/cart";
import { useUIStore } from "@/lib/store/ui";
import { Drawer } from "@/components/ui/drawer";
import { ButtonLink } from "@/components/ui/button-link";
import { QuantityStepper } from "@/components/commerce/quantity-stepper";

export function CartDrawer() {
  const overlay = useUIStore((state) => state.overlay);
  const close = useUIStore((state) => state.close);
  const lines = useCartStore((state) => state.lines);
  const removeLine = useCartStore((state) => state.removeLine);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const open = overlay === "cart";

  const count = cartCount(lines);
  const subtotal = cartSubtotal(lines);
  const remaining = freeShippingRemaining(subtotal);
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <Drawer
      open={open}
      onClose={close}
      title={`Your bag${count > 0 ? ` (${count})` : ""}`}
      footer={
        lines.length > 0 ? (
          <div className="space-y-3 p-5">
            <div>
              <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5 text-ink-soft">
                  {remaining > 0 ? <Truck size={14} aria-hidden /> : <Check size={14} aria-hidden className="text-success" />}
                  {remaining > 0 ? `${formatINR(remaining)} away from free shipping` : "Free shipping unlocked"}
                </span>
                <span className="tabular-nums text-muted">{progress}%</span>
              </div>
              <div
                className="h-1.5 overflow-hidden rounded-full bg-oat"
                role="progressbar"
                aria-label="Free shipping progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <div className="h-full rounded-full bg-brass transition-[width] duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-soft">Subtotal</span>
              <span className="font-semibold tabular-nums text-ink">{formatINR(subtotal)}</span>
            </div>
            <ButtonLink href="/checkout" onClick={close} size="lg" className="w-full">
              Checkout
            </ButtonLink>
            <div className="flex items-center justify-between text-xs">
              <Link href="/cart" onClick={close} className="text-ink-soft underline decoration-line underline-offset-4 hover:text-ink">
                View bag
              </Link>
              <span className="text-muted">Taxes included</span>
            </div>
          </div>
        ) : undefined
      }
    >
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center px-6 py-16 text-center">
          <div className="h-32 w-32 opacity-80 rounded-full overflow-hidden border border-line bg-paper">
            <Image
              src="https://placehold.co/400x400/7A1F3D/FFFFFF?text=Desire+Yarn"
              alt=""
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
          <h3 className="mt-4 font-display text-2xl">Your bag is still soft and empty.</h3>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            Add a skein or two and they'll wait here for you.
          </p>
          <ButtonLink href="/shop" onClick={close} className="mt-5">
            <ShoppingBag size={15} aria-hidden />
            Shop the collections
          </ButtonLink>
        </div>
      ) : (
        <ul className="divide-y divide-line px-5">
          {lines.map((line) => {
            const product = getProductById(line.productId);
            if (!product) return null;
            const colour = product.colours.find((item) => item.id === line.colourId) ?? product.colours[0];
            return (
              <li key={`${line.productId}-${line.colourId}`} className="flex gap-3 py-4">
                <Link
                  href={`/products/${product.slug}`}
                  onClick={close}
                  className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md border border-line"
                >
                  <Image
                    src={product.image ?? `https://placehold.co/400x400/7A1F3D/FFFFFF?text=Desire+Yarn`}
                    alt=""
                    fill
                    className="object-cover object-center"
                    loading="lazy"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/products/${product.slug}`} onClick={close} className="text-sm font-medium leading-snug text-ink hover:underline">
                      {product.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeLine(line.productId, line.colourId)}
                      aria-label={`Remove ${product.name} from bag`}
                      className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-sale"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted">
                    {colour.name} · {product.weightLabel}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <QuantityStepper
                      size="sm"
                      value={line.quantity}
                      onChange={(value) => setQuantity(line.productId, line.colourId, value)}
                      max={Math.max(1, product.stock)}
                    />
                    <span className="text-sm font-medium tabular-nums">{formatINR(product.price * line.quantity)}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Drawer>
  );
}
