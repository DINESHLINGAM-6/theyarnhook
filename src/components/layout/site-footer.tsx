import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import { collections } from "@/lib/commerce/data";
import { Newsletter } from "./newsletter";
import { LogoMark } from "./logo";

const shopLinks = [
  { label: "All yarns", href: "/shop" },
  { label: "Bestsellers", href: "/shop?tags=bestseller" },
  { label: "New arrivals", href: "/shop?tags=new" },
  { label: "Sale", href: "/shop?tags=sale" },
  { label: "Shop by weight", href: "/shop" },
  { label: "Shop by fibre", href: "/shop" },
];

const helpLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Shipping", href: "/policies/shipping" },
  { label: "Returns", href: "/policies/returns" },
  { label: "Contact", href: "/contact" },
  { label: "Our story", href: "/about" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-line bg-ivory">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2" aria-label="TheYarnHook home">
              <LogoMark className="h-7 w-7 text-ink" />
              <span className="font-display text-2xl tracking-tight">TheYarnHook</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              Small-batch yarn for crochet and knitting, dyed slowly in India. Four collections, one
              soft obsession.
            </p>
            <address className="mt-4 space-y-1 text-sm not-italic text-ink-soft">
              <p>Indiranagar, Bengaluru</p>
              <a href="mailto:hello@theyarnhook.example" className="underline decoration-line underline-offset-4 hover:text-ink">
                hello@theyarnhook.example
              </a>
              <p className="text-xs text-muted">Mon–Sat, 10am–6pm IST</p>
            </address>
            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="TheYarnHook on Instagram"
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="TheYarnHook on YouTube"
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-wide text-ink">Shop</p>
            <ul className="space-y-2 text-sm">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-ink-soft transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-wide text-ink">Collections</p>
            <ul className="space-y-2 text-sm">
              {collections.map((collection) => (
                <li key={collection.id}>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: collection.accent.solid }} aria-hidden />
                    {collection.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-wide text-ink">Help</p>
            <ul className="space-y-2 text-sm">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-ink-soft transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <Newsletter compact />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>© {year} TheYarnHook. Made with care in India.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/policies/shipping" className="hover:text-ink">Shipping</Link>
            <Link href="/policies/returns" className="hover:text-ink">Returns</Link>
            <Link href="/policies/privacy" className="hover:text-ink">Privacy</Link>
            <Link href="/policies/terms" className="hover:text-ink">Terms</Link>
          </div>
          <p>UPI / Visa / Mastercard / RuPay</p>
        </div>
      </div>
      <div aria-hidden className="overflow-hidden px-5 pb-6">
        <p className="display select-none text-center text-[15vw] leading-[0.8] text-ink/[0.06]">
          TheYarnHook
        </p>
      </div>
    </footer>
  );
}
