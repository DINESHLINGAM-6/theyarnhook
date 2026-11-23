"use client";

import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <section className="container-x py-16 sm:py-24 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="blob w-[500px] h-[500px] bg-success/25 rounded-full -top-[120px] left-[-100px] mix-blend-screen" />
          <div className="blob w-[380px] h-[380px] bg-brass/20 rounded-full bottom-[-80px] right-[-60px] mix-blend-screen" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center" role="status" aria-live="polite">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-success/40 bg-success/10 text-success-ink text-[10px] font-semibold tracking-wide mx-auto mb-4">
            <Mail size={14} className="text-success-solid" aria-hidden />
            You’re on the list
          </div>
          <h2 className="display text-3xl sm:text-4xl text-ink">Thanks for subscribing</h2>
          <p className="mt-3 text-ink-soft">
            You’ll be the first to hear about new dye lots, restocks and studio notes.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-brass bg-brass text-ivory px-5 py-2.5 text-sm font-semibold shadow-lift hover:shadow-card hover:-translate-y-0.5 transition-all duration-300"
          >
            Browse the yarns <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-x py-16 sm:py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob w-[500px] h-[500px] bg-desire-tint/35 rounded-full -top-[100px] left-[-80px] mix-blend-screen" />
        <div className="blob w-[400px] h-[400px] bg-plush-tint/25 rounded-full bottom-[-60px] right-[-40px] mix-blend-screen" />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        <div className="mb-6 text-center">
          <p className="kicker">Studio notes</p>
          <h2 className="display mt-2 text-3xl sm:text-4xl text-ink">First dibs on new dye lots.</h2>
          <p className="mt-3 text-ink-soft">
            Get early access to restocks, crochet patterns and occasional studio letters.
          </p>
        </div>

        <div className="grid gap-3 sm:flex sm:items-center">
          <div className="relative">
            <Mail size={18} className="absolute left-3.5 top-3.5 text-ink-soft" aria-hidden />
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="block w-full rounded-lg border border-line bg-paper px-4 py-3 pl-10 text-ink placeholder:text-ink-soft transition-all focus:border-brass focus:ring-1 focus:ring-brass"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg border border-brass bg-brass text-ivory px-6 py-3 text-sm font-semibold shadow-lift transition-all duration-300 hover:shadow-card hover:-translate-y-0.5 hover:bg-desire-solid focus-ring-rich"
          >
            Join <ArrowRight size={16} aria-hidden />
          </button>
        </div>

        <p className="mt-4 text-[11px] text-muted text-center">
          No spam. Unsubscribe anytime.
        </p>
      </form>
    </section>
  );
}
