import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/commerce/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about yarn, an order or a pattern? Write to TheYarnHook studio in Bengaluru.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="container-x py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <p className="kicker">Contact</p>
          <h1 className="display mt-2 text-5xl sm:text-6xl">Write to the studio.</h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
            We're a small team, so every message is read by a person. Ask about a colour, a weight, an
            order, or what to make next.
          </p>

          <dl className="mt-8 space-y-5 text-sm">
            <div className="flex gap-3">
              <Mail size={16} aria-hidden className="mt-0.5 shrink-0 text-brass" />
              <div>
                <dt className="text-xs text-muted">Email</dt>
                <dd>
                  <a href="mailto:hello@theyarnhook.example" className="underline decoration-line underline-offset-4 hover:decoration-ink">
                    hello@theyarnhook.example
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone size={16} aria-hidden className="mt-0.5 shrink-0 text-brass" />
              <div>
                <dt className="text-xs text-muted">Phone</dt>
                <dd>
                  <a href="tel:+918000000000" className="hover:text-brass">+91 80 0000 0000</a>
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin size={16} aria-hidden className="mt-0.5 shrink-0 text-brass" />
              <div>
                <dt className="text-xs text-muted">Studio</dt>
                <dd>Indiranagar, Bengaluru 560038</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock size={16} aria-hidden className="mt-0.5 shrink-0 text-brass" />
              <div>
                <dt className="text-xs text-muted">Hours</dt>
                <dd>Mon–Sat, 10am–6pm IST</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Instagram size={16} aria-hidden className="mt-0.5 shrink-0 text-brass" />
              <div>
                <dt className="text-xs text-muted">Instagram</dt>
                <dd>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer noopener" className="hover:text-brass">
                    @theyarnhook
                  </a>
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-8 rounded-lg border border-line bg-oat/40 p-4 text-xs leading-relaxed text-ink-soft">
            <p className="font-medium text-ink">Order questions</p>
            <p className="mt-1">
              Include your order number if you have one. For returns, see our{" "}
              <Link href="/policies/returns" className="underline decoration-line underline-offset-4 hover:decoration-ink">
                returns policy
              </Link>
              .
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
