import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70svh] flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-8 h-40 w-40 opacity-90 rounded-full overflow-hidden border border-line bg-desire-solid/10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "url('/images/products/yarn-starlite.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
      <p className="kicker">404</p>
      <h1 className="display mt-3 text-5xl sm:text-6xl">This stitch came undone.</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
        The page you're looking for has wandered off the skein. Let's get you back to something soft.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="/shop">
          Shop all yarns
          <ArrowRight size={16} aria-hidden />
        </ButtonLink>
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
          <ArrowLeft size={15} aria-hidden />
          Back home
        </Link>
      </div>
    </section>
  );
}
