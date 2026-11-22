import type { Metadata } from "next";
import Link from "next/link";
import { weights } from "@/lib/commerce/data";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers on shipping, yarn weights, care, returns and wholesale at TheYarnHook.",
  alternates: { canonical: "/faq" },
};

const groups = [
  {
    id: "orders",
    title: "Orders & shipping",
    faqs: [
      {
        q: "How long does shipping take?",
        a: "Orders leave the studio within two working days. Standard delivery across India takes 3–6 working days after dispatch. Bengaluru is usually next day.",
      },
      {
        q: "Do you ship outside India?",
        a: "Not yet. We ship across India and hope to add international delivery in 2027.",
      },
      {
        q: "Can I track my order?",
        a: "Yes. You'll get a tracking link by email once your parcel is picked up.",
      },
      {
        q: "What payment methods do you accept?",
        a: "UPI, Visa, Mastercard, RuPay and cash on delivery. COD carries a ₹40 handling fee.",
      },
    ],
  },
  {
    id: "yarn",
    title: "Yarn & care",
    faqs: [
      {
        q: "How do I choose a weight?",
        a: "Match the weight number to your pattern. 2 is fine/fingering, 3 is light/DK, 4 is medium/worsted, 5 is chunky, 6 is super chunky and 7 is jumbo. When in doubt, go up a weight for blankets and down a weight for amigurumi.",
      },
      {
        q: "Will my skein match the photo?",
        a: "Screens vary, and small-batch dyeing means slight variation between skeins. We photograph in daylight, but expect a little life in the colour.",
      },
      {
        q: "How much yarn do I need for a project?",
        a: "A sweater usually needs 1,200–1,800 m, a throw 1,500–2,500 m, a pair of socks 350–450 m, and a small amigurumi 50–150 m. Use the yarn calculator on any product page for a closer estimate.",
      },
      {
        q: "How should I care for the yarn?",
        a: "Hand wash cool with a gentle detergent, squeeze rather than wring, and dry flat in shade. Some fibres can be machine washed on a wool cycle; check the label.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns",
    faqs: [
      {
        q: "What is your returns policy?",
        a: "Unused yarn in its original condition can be returned within 7 days of delivery. We can't accept wound, washed or partially used skeins.",
      },
      {
        q: "My order arrived damaged.",
        a: "Email us within 48 hours with a photo and we'll replace or refund it.",
      },
      {
        q: "How long do refunds take?",
        a: "Refunds go back to the original payment method within 5–7 working days after we receive the return.",
      },
    ],
  },
  {
    id: "shop",
    title: "The shop",
    faqs: [
      {
        q: "Where is the yarn made?",
        a: "Our own yarn is dyed and wound in Bengaluru. We also carry a small selection from independent Indian mills.",
      },
      {
        q: "Do you offer wholesale?",
        a: "Yes, for studios, workshops and shops. Write to us with your requirements and we'll send a trade sheet.",
      },
      {
        q: "Can I visit the studio?",
        a: "The studio is open by appointment. Email us a day ahead and we'll put the kettle on.",
      },
    ],
  },
];

const allFaqs = groups.flatMap((group) => group.faqs);

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <section className="border-b border-line bg-oat/40">
        <div className="container-x py-12 sm:py-16">
          <p className="kicker">Help</p>
          <h1 className="display mt-2 max-w-2xl text-5xl sm:text-6xl">Questions, answered.</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
            Shipping, weights, care and returns. If something isn't here, the studio is one message
            away.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-10 py-10 sm:py-14 lg:grid-cols-[200px_1fr] lg:gap-16">
        <nav aria-label="FAQ sections" className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
          <p className="mb-3 text-[11px] font-semibold tracking-wide text-ink">On this page</p>
          <ul className="space-y-2 text-sm">
            {groups.map((group) => (
              <li key={group.id}>
                <a href={`#${group.id}`} className="text-ink-soft transition-colors hover:text-ink">
                  {group.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#weight-guide" className="text-ink-soft transition-colors hover:text-ink">
                Weight guide
              </a>
            </li>
          </ul>
          <div className="mt-6 rounded-lg border border-line bg-paper p-4 text-xs leading-relaxed text-ink-soft">
            <p className="font-medium text-ink">Still stuck?</p>
            <Link href="/contact" className="mt-1 inline-block underline decoration-line underline-offset-4 hover:decoration-ink">
              Write to the studio
            </Link>
          </div>
        </nav>

        <div className="min-w-0 space-y-12">
          {groups.map((group) => {
            const items: AccordionItem[] = group.faqs.map((faq, index) => ({
              value: `${group.id}-${index}`,
              title: faq.q,
              content: <p>{faq.a}</p>,
            }));
            return (
              <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`}>
                <h2 id={`${group.id}-heading`} className="display mb-4 text-3xl">
                  {group.title}
                </h2>
                <Accordion items={items} />
              </section>
            );
          })}

          <section id="weight-guide" aria-labelledby="weight-guide-heading">
            <h2 id="weight-guide-heading" className="display mb-2 text-3xl">
              The weight guide
            </h2>
            <p className="mb-4 max-w-xl text-sm leading-relaxed text-ink-soft">
              Weight numbers are a starting point, not a rule. Always swatch if the fit matters.
            </p>
            <div className="overflow-x-auto rounded-lg border border-line bg-paper">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-[11px] uppercase tracking-wide text-muted">
                    <th scope="col" className="px-4 py-3 font-medium">No.</th>
                    <th scope="col" className="px-4 py-3 font-medium">Name</th>
                    <th scope="col" className="px-4 py-3 font-medium">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {weights.map((weight) => (
                    <tr key={weight.weight} className="border-b border-line last:border-b-0">
                      <td className="px-4 py-3 font-display text-xl">{weight.weight}</td>
                      <td className="px-4 py-3 font-medium">{weight.label}</td>
                      <td className="px-4 py-3 text-ink-soft">{weight.blurb}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <ButtonLink href="/shop" variant="outline">
                Shop by weight
              </ButtonLink>
            </div>
          </section>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
