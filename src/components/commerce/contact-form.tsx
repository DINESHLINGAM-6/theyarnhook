"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-lg border border-line bg-paper p-8 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/10 text-success">
          <Check size={22} aria-hidden />
        </span>
        <h2 className="mt-4 font-display text-2xl">Message sent.</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Thanks for writing. We reply within one working day, usually sooner.
        </p>
        <Button variant="outline" className="mt-5" onClick={() => setSent(false)}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      className="rounded-lg border border-line bg-paper p-5 sm:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block text-xs text-ink-soft">Name</span>
          <Input name="name" required autoComplete="name" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-xs text-ink-soft">Email</span>
          <Input name="email" type="email" required autoComplete="email" />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block text-xs text-ink-soft">What's it about?</span>
          <Select name="subject" defaultValue="order">
            <option value="order">Order help</option>
            <option value="yarn">A yarn question</option>
            <option value="wholesale">Wholesale</option>
            <option value="other">Something else</option>
          </Select>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block text-xs text-ink-soft">Message</span>
          <textarea
            name="message"
            required
            rows={5}
            className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10"
            placeholder="Tell us what you're making, or what you need."
          />
        </label>
      </div>
      <Button type="submit" size="lg" className="mt-5 w-full sm:w-auto">
        Send message
      </Button>
      <p className="mt-3 text-[11px] text-muted">
        This demo form doesn't send email, but the real studio would get back to you.
      </p>
    </form>
  );
}
