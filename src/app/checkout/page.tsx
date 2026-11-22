"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Lock } from "lucide-react";
import { useCartStore, cartSubtotal, freeShippingRemaining } from "@/lib/store/cart";
import { getProductById } from "@/lib/commerce/provider";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/commerce/data";
import { formatINR } from "@/lib/commerce/format";
import { useMounted } from "@/lib/hooks/use-mounted";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Input } from "@/components/ui/input";
import { YarnSkein } from "@/components/art/yarn-skein";

const SHIPPING_FLAT = 79;

const fieldClass = "w-full";

export default function CheckoutPage() {
  const mounted = useMounted();
  const lines = useCartStore((state) => state.lines);
  const clear = useCartStore((state) => state.clear);
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [payment, setPayment] = useState("upi");

  if (!mounted) {
    return (
      <div className="container-x py-16">
        <div className="h-8 w-48 animate-pulse rounded-full bg-oat/70" />
        <div className="mt-8 h-80 animate-pulse rounded-lg bg-oat/50" />
      </div>
    );
  }

  const subtotal = cartSubtotal(lines);
  const remaining = freeShippingRemaining(subtotal);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <section className="container-x flex min-h-[65svh] flex-col items-center justify-center py-20 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-success/10 text-success">
          <Check size={26} aria-hidden />
        </span>
        <p className="kicker mt-6">Order {orderId}</p>
        <h1 className="display mt-2 text-4xl sm:text-5xl">Thank you — it's on its way.</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          We've noted your order. A confirmation would normally land in your inbox within a few
          minutes. This is a demo storefront, so no payment has been taken.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/shop">
            Keep shopping
            <ArrowRight size={16} aria-hidden />
          </ButtonLink>
          <ButtonLink href="/" variant="outline">
            Back home
          </ButtonLink>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="container-x flex min-h-[60svh] flex-col items-center justify-center py-20 text-center">
        <div className="h-28 w-28 opacity-80">
          <YarnSkein palette={["#D9C3A5", "#B98A5E", "#6B4A2C"]} uid="empty-checkout" kind="ball" />
        </div>
        <h1 className="display mt-5 text-4xl">There's nothing to check out.</h1>
        <p className="mt-3 max-w-sm text-sm text-ink-soft">Add a yarn to the bag first, then come back.</p>
        <ButtonLink href="/shop" className="mt-6">
          Shop all yarns
          <ArrowRight size={16} aria-hidden />
        </ButtonLink>
      </section>
    );
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOrderId(`YH-${Date.now().toString().slice(-6)}`);
    clear();
    setPlaced(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="container-x py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="kicker">Checkout</p>
          <h1 className="display mt-2 text-4xl sm:text-5xl">Almost yours.</h1>
        </div>
        <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
          <ArrowLeft size={15} aria-hidden />
          Back to bag
        </Link>
      </div>

      <form onSubmit={onSubmit} className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <fieldset className="rounded-lg border border-line bg-paper p-5 sm:p-6">
            <legend className="px-1 font-display text-xl">Contact</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1.5 block text-xs text-ink-soft">Email</span>
                <Input type="email" name="email" required autoComplete="email" placeholder="you@example.com" className={fieldClass} />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-xs text-ink-soft">Phone</span>
                <Input type="tel" name="phone" required autoComplete="tel" placeholder="+91 98xxx xxxxx" className={fieldClass} />
              </label>
            </div>
          </fieldset>

          <fieldset className="rounded-lg border border-line bg-paper p-5 sm:p-6">
            <legend className="px-1 font-display text-xl">Shipping address</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1.5 block text-xs text-ink-soft">First name</span>
                <Input name="firstName" required autoComplete="given-name" className={fieldClass} />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-xs text-ink-soft">Last name</span>
                <Input name="lastName" required autoComplete="family-name" className={fieldClass} />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-1.5 block text-xs text-ink-soft">Address</span>
                <Input name="address" required autoComplete="street-address" placeholder="Flat, street, area" className={fieldClass} />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-xs text-ink-soft">City</span>
                <Input name="city" required autoComplete="address-level2" className={fieldClass} />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-xs text-ink-soft">State</span>
                <Input name="state" required autoComplete="address-level1" className={fieldClass} />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-xs text-ink-soft">PIN code</span>
                <Input name="pincode" required inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{6}" className={fieldClass} />
              </label>
            </div>
          </fieldset>

          <fieldset className="rounded-lg border border-line bg-paper p-5 sm:p-6">
            <legend className="px-1 font-display text-xl">Payment</legend>
            <div className="mt-4 space-y-2">
              {[
                { id: "upi", label: "UPI", note: "GPay, PhonePe, Paytm" },
                { id: "card", label: "Card", note: "Visa, Mastercard, RuPay" },
                { id: "cod", label: "Cash on delivery", note: "+ ₹40 handling fee" },
              ].map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-line px-4 py-3 text-sm transition-colors has-[:checked]:border-ink has-[:checked]:bg-oat/40"
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value={option.id}
                      checked={payment === option.id}
                      onChange={() => setPayment(option.id)}
                      className="h-4 w-4 accent-ink"
                    />
                    <span>{option.label}</span>
                  </span>
                  <span className="text-xs text-muted">{option.note}</span>
                </label>
              ))}
            </div>
            <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-muted">
              <Lock size={12} aria-hidden />
              Demo checkout — no payment is processed.
            </p>
          </fieldset>
        </div>

        <aside>
          <div className="rounded-lg border border-line bg-paper p-6 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <h2 className="font-display text-2xl">Your order</h2>

            <ul className="mt-4 space-y-3">
              {lines.map((line) => {
                const product = getProductById(line.productId);
                if (!product) return null;
                const colour = product.colours.find((item) => item.id === line.colourId);
                return (
                  <li key={`${line.productId}-${line.colourId}`} className="flex items-center gap-3">
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-line bg-oat/30">
                      <YarnSkein palette={product.media[0].palette} uid={`checkout-${product.id}-${line.colourId}`} />
                    </span>
                    <span className="min-w-0 flex-1 text-xs">
                      <span className="block truncate font-medium text-ink">{product.name}</span>
                      <span className="block text-muted">
                        {colour?.name} · Qty {line.quantity}
                      </span>
                    </span>
                    <span className="text-xs tabular-nums">{formatINR(product.price * line.quantity)}</span>
                  </li>
                );
              })}
            </ul>

            <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
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
                <dd className="tabular-nums">{formatINR(total)}</dd>
              </div>
            </dl>

            {remaining > 0 ? (
              <p className="mt-3 rounded-md bg-oat/50 p-3 text-[11px] text-ink-soft">
                Add {formatINR(remaining)} more for free shipping.
              </p>
            ) : null}

            <Button type="submit" size="lg" className="mt-5 w-full">
              Place order
              <ArrowRight size={16} aria-hidden />
            </Button>
            <p className="mt-3 text-center text-[11px] text-muted">
              By placing an order you agree to our terms and returns policy.
            </p>
          </div>
        </aside>
      </form>
    </section>
  );
}
