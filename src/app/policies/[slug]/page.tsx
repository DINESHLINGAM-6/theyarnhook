import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Policy {
  slug: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}

const UPDATED = "November 2026";

const policies: Policy[] = [
  {
    slug: "shipping",
    title: "Shipping",
    intro: "How your yarn gets from the studio to your door.",
    sections: [
      {
        heading: "Processing",
        body: [
          "Orders are packed by hand at the studio in Bengaluru, usually within two working days, Monday to Saturday. Orders placed on a Sunday or public holiday are packed the next working day.",
        ],
      },
      {
        heading: "Rates",
        body: [
          "Standard shipping is free on orders over ₹999. Below that, a flat ₹79 applies. Cash on delivery adds a ₹40 handling fee, shown at checkout.",
        ],
      },
      {
        heading: "Delivery",
        body: [
          "Standard delivery across India takes 3–6 working days after dispatch. Remote pin codes can take a little longer. We'll tell you at checkout if your address sits outside the usual window.",
        ],
      },
      {
        heading: "Tracking",
        body: [
          "We email a tracking link once your parcel is picked up. If it hasn't arrived after 8 working days, write to hello@theyarnhook.example with your order number and we'll chase it.",
        ],
      },
      {
        heading: "Packaging",
        body: [
          "Orders ship in recycled paper and, where possible, a reusable cotton pouch. We don't use plastic tape. If you'd like your order gift-wrapped, leave a note at checkout.",
        ],
      },
    ],
  },
  {
    slug: "returns",
    title: "Returns & exchanges",
    intro: "If the colour isn't right, we'd rather fix it than have you keep something you won't use.",
    sections: [
      {
        heading: "The window",
        body: [
          "Unused yarn in its original condition can be returned within 7 days of delivery. Write to hello@theyarnhook.example with your order number to start a return.",
        ],
      },
      {
        heading: "Condition",
        body: [
          "We can only accept skeins that are unwound, unwashed and in their original packaging with the label attached. Wound or partially used yarn can't be returned for hygiene and resale reasons.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "Once you write in, we'll share a pickup address or arrange a reverse pickup where available. Return shipping is free for faulty or incorrect items; otherwise it's ₹79, deducted from the refund.",
        ],
      },
      {
        heading: "Refunds",
        body: [
          "Refunds go back to the original payment method within 5–7 working days after we receive and check the return. COD orders are refunded by UPI or bank transfer.",
        ],
      },
      {
        heading: "Exchanges",
        body: [
          "Need a different colour or weight? Tell us what you'd like when you write in. If it's in stock, we'll hold it while your return travels back to us.",
        ],
      },
      {
        heading: "Faulty or damaged items",
        body: [
          "If your order arrives damaged, email a photo within 48 hours and we'll replace or refund it, including shipping. Please don't send damaged yarn back without writing to us first.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    intro: "What we collect, why we collect it, and what we never do with it.",
    sections: [
      {
        heading: "What we collect",
        body: [
          "When you order or write to us, we collect the details you give us: your name, email, phone number, shipping address and order history. We don't buy data about you from anyone else.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "We use your details to pack and send your order, answer your messages, and (only if you opt in) send occasional studio notes. We don't sell or rent your data.",
        ],
      },
      {
        heading: "Payments",
        body: [
          "Payments are processed by our payment partners. We never see or store your full card number. Our partners handle card data under their own security standards.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "The site uses a small amount of local storage to remember your bag and wishlist on your device. We don't run advertising trackers.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "You can ask us to correct or delete your details at any time by writing to hello@theyarnhook.example. You can unsubscribe from studio notes using the link in any email.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of service",
    intro: "The short version: be kind, and we'll do the same.",
    sections: [
      {
        heading: "Using the site",
        body: [
          "By using this site you agree to these terms. You're welcome to browse, but please don't scrape, copy or resell our photography, copy or designs without asking.",
        ],
      },
      {
        heading: "Orders and pricing",
        body: [
          "All prices are in Indian rupees and include applicable taxes. We try to keep everything accurate, but if a price is clearly wrong we'll contact you before charging and you can cancel.",
        ],
      },
      {
        heading: "Availability",
        body: [
          "Small-batch means stock moves. If something you ordered sells out before we pack it, we'll write to you with the option to wait, swap or refund.",
        ],
      },
      {
        heading: "Payments",
        body: [
          "Orders are confirmed once payment is received, or once a COD order is accepted. COD orders that are refused may affect future COD availability.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "TheYarnHook name, logo, product names, photography and site design belong to us. Patterns and projects you make with our yarn are yours, always.",
        ],
      },
      {
        heading: "Contact",
        body: [
          "Questions about these terms? Write to hello@theyarnhook.example and a person will reply.",
        ],
      },
    ],
  },
];

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = policies.find((item) => item.slug === slug);
  if (!policy) return { title: "Policy not found" };
  return {
    title: policy.title,
    description: policy.intro,
    alternates: { canonical: `/policies/${policy.slug}` },
  };
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policies.find((item) => item.slug === slug);
  if (!policy) notFound();

  return (
    <section className="container-x py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[200px_1fr] lg:gap-16">
        <nav aria-label="Policies" className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
          <p className="mb-3 text-[11px] font-semibold tracking-wide text-ink">Policies</p>
          <ul className="space-y-2 text-sm">
            {policies.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/policies/${item.slug}`}
                  aria-current={item.slug === policy.slug ? "page" : undefined}
                  className={
                    item.slug === policy.slug
                      ? "font-medium text-ink"
                      : "text-ink-soft transition-colors hover:text-ink"
                  }
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <article className="max-w-2xl">
          <p className="kicker">Policy</p>
          <h1 className="display mt-2 text-5xl">{policy.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{policy.intro}</p>
          <p className="mt-2 text-xs text-muted">Last updated {UPDATED}</p>

          <div className="mt-8 space-y-8">
            {policy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl">{section.heading}</h2>
                <div className="mt-2 space-y-3 text-sm leading-relaxed text-ink-soft">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-line bg-oat/40 p-5 text-sm leading-relaxed text-ink-soft">
            <p className="font-medium text-ink">Still have a question?</p>
            <p className="mt-1">
              Write to{" "}
              <a href="mailto:hello@theyarnhook.example" className="underline decoration-line underline-offset-4 hover:decoration-ink">
                hello@theyarnhook.example
              </a>{" "}
              or visit the{" "}
              <Link href="/faq" className="underline decoration-line underline-offset-4 hover:decoration-ink">
                FAQ
              </Link>
              .
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
