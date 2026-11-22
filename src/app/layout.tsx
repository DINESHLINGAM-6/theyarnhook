import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SearchOverlay } from "@/components/layout/search-overlay";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { Grain } from "@/components/art/grain";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://theyarnhook.example";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TheYarnHook — Soft luxury yarn, dyed in India",
    template: "%s | TheYarnHook",
  },
  description:
    "Small-batch yarn for crochet and knitting, dyed slowly in India. Explore Desire, Milka, Souffle and Plush Luxe — four collections, one soft obsession.",
  keywords: [
    "yarn India",
    "crochet yarn",
    "knitting yarn",
    "merino yarn",
    "cotton yarn",
    "TheYarnHook",
  ],
  applicationName: "TheYarnHook",
  authors: [{ name: "TheYarnHook" }],
  creator: "TheYarnHook",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "TheYarnHook",
    title: "TheYarnHook — Soft luxury yarn, dyed in India",
    description:
      "Four collections of small-batch yarn for crochet and knitting. Desire, Milka, Souffle and Plush Luxe.",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "TheYarnHook — soft luxury yarn" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheYarnHook — Soft luxury yarn, dyed in India",
    description: "Four collections of small-batch yarn for crochet and knitting.",
    images: ["/og.svg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
  other: { "page-type": "product", "site-kind": "other" },
};

export const viewport: Viewport = {
  themeColor: "#F7F1E8",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TheYarnHook",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  email: "hello@theyarnhook.example",
  sameAs: ["https://instagram.com", "https://youtube.com"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
          >
            Skip to content
          </a>
          <AnnouncementBar />
          <SiteHeader />
          <main id="main" className="min-h-[60svh]">
            {children}
          </main>
          <SiteFooter />
          <div aria-hidden className="h-16 md:hidden" />
          <MobileNav />
          <CartDrawer />
          <SearchOverlay />
          <MobileMenu />
          <Grain />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />
        </Providers>
      </body>
    </html>
  );
}
