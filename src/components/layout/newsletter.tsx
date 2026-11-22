"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NewsletterProps {
  compact?: boolean;
}

export function Newsletter({ compact = false }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  const form = (
    <form onSubmit={submit} noValidate className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={compact ? "newsletter-footer" : "newsletter-home"} className="sr-only">
          Email address
        </label>
        <Input
          id={compact ? "newsletter-footer" : "newsletter-home"}
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={status === "error"}
          aria-describedby={compact ? "newsletter-footer-msg" : "newsletter-home-msg"}
          className="sm:flex-1"
        />
        <Button type="submit" className="shrink-0">
          Join the list
          <ArrowRight size={15} aria-hidden />
        </Button>
      </div>
      <p
        id={compact ? "newsletter-footer-msg" : "newsletter-home-msg"}
        aria-live="polite"
        className={cn("mt-2 min-h-4 text-xs", status === "error" ? "text-sale" : "text-success")}
      >
        {status === "error" ? "Please enter a valid email address." : null}
        {status === "success" ? (
          <span className="inline-flex items-center gap-1.5">
            <Check size={13} aria-hidden /> You're on the list. Watch your inbox for the next drop.
          </span>
        ) : null}
      </p>
    </form>
  );

  if (compact) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg">A little yarn in your inbox.</p>
          <p className="text-xs text-muted">One letter a month. New colours, small projects, no noise.</p>
        </div>
        <div className="w-full sm:max-w-sm">{form}</div>
      </div>
    );
  }

  return (
    <section className="bg-oat/60" aria-labelledby="newsletter-heading">
      <div className="container-x py-16 sm:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="kicker">The Yarn Letter</p>
            <h2 id="newsletter-heading" className="display mt-3 text-4xl sm:text-5xl">
              A little yarn
              <br />
              in your inbox.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
              One letter a month: new colours before they launch, small projects we love, and the
              occasional dye-lot story. No noise, no daily pings.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-paper p-5 shadow-soft sm:p-7">
            {form}
            <p className="mt-3 text-[11px] leading-relaxed text-muted">
              By joining you agree to our privacy policy. Unsubscribe any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
