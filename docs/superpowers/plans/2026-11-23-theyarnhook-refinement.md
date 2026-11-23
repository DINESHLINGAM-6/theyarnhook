# TheYarnHook — Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the existing TheYarnHook storefront using all 10 skill roles, filling identified gaps and elevating quality to Lighthouse ≥90/95/95 and WCAG AA.

**Architecture:** Existing Next.js 15 App Router + React 19 + TypeScript + Tailwind + Framer Motion + Zustand. Refinement only — no stack changes.

**Tech Stack:** Next.js 15.5, React 19, TypeScript 5.7, Tailwind 3.4, Framer Motion 11, Zustand 5, Lucide React, next/font/google

**Spec:** `docs/design-system.md`, `phase1-creative-direction.md` (artifact)

## Global Constraints

- Prices in ₹ INR only; use `formatINR()` from `lib/commerce/format.ts`
- Brand name: TheYarnHook (no spaces, exact casing)
- Four collections: desire, milka, souffle, plush-luxe (slugs)
- Design tokens: `--ivory #F7F1E8`, `--oat #EFE4D3`, `--paper #FFFDF8`, `--ink #1A1613`, `--brass #A16207`
- Collection accents: Desire `#7A1F3D`, Milka `#6B4A2C`, Souffle `#9A4A16`, Plush Luxe `#3A2350`
- Fonts: Fraunces (display, `axes: ["opsz"]`) + Manrope (sans)
- Reduced motion: all Framer Motion gated by `useReducedMotion()`
- WCAG AA: 4.5:1 body text, 3:1 large text, visible focus rings
- Build must pass: `npm run build`, `npm run typecheck`, `npm run lint`

## Review Focus

1. **Empty cart image uses `fill` without a positioned parent** — `Image` with `fill` in `cart-drawer.tsx:75` lacks `position: relative` on the wrapper; causes Next.js warning and broken image.
2. **Product card `Image` alt text** — currently `${product.name} in ${active.name}` which is good, but `active` could be `undefined` on first render if `colours` array is empty.
3. **Mega-menu keyboard trap** — hover-only open means keyboard users (Tab) can open it via `focus-within`, but there's no explicit `button` trigger with `aria-expanded`, only a `Link` with `aria-haspopup`.
4. **Lookbook `<img>` vs `next/image`** — `lookbook.tsx:67` uses a plain `<img>` tag, missing optimisation.
5. **Cart empty-state `Image` fill** — same issue as #1; parent div needs `position: relative`.

---

## Task 1: Fix build warnings and broken image wrappers

**Files:**
- Modify: `src/components/layout/cart-drawer.tsx:74-82`
- Modify: `src/components/home/lookbook.tsx:67`
- Modify: `src/components/commerce/product-card.tsx:76-82`

- [x] **Step 1:** Fix cart-drawer empty-state image — add `position: relative` to wrapper div, change `fill` to `width`/`height`, or wrap correctly.
- [x] **Step 2:** Replace plain `<img>` in lookbook with `next/image` `Image` component.
- [x] **Step 3:** Run `npm run build` — verify 0 errors and 0 warnings about images.

---

## Task 2: Mega-menu accessibility upgrade

**Files:**
- Modify: `src/components/layout/site-header.tsx:52-133`

- [ ] **Step 1:** Replace the `Link` trigger with a `button` that controls `aria-expanded` state.
- [ ] **Step 2:** Add `role="dialog"` and `aria-label` to the mega-menu panel.
- [ ] **Step 3:** Add Escape key handler to close the mega-menu.
- [ ] **Step 4:** Run `npm run typecheck && npm run lint` — 0 errors.

---

## Task 3: Product card rating display

**Files:**
- Modify: `src/components/commerce/product-card.tsx`

- [ ] **Step 1:** Add `RatingStars` + rating count display below the product name (currently missing from card — only shown on PDP).
- [ ] **Step 2:** Add `aria-label={`${product.rating} out of 5, ${product.reviewCount} reviews`}` to the rating element.

---

## Task 4: Collection pages — scroll-linked hero accent

**Files:**
- Modify: `src/components/collections/collection-hero.tsx`

- [ ] **Step 1:** Add a colour-matched palette swatch row (`collection.palette`) below the description — 4 × 20px circles with aria-hidden, adding visual richness.
- [ ] **Step 2:** Ensure CTA button href links to `/collections/${collection.slug}` filtered shop, not generic `/shop`.

---

## Task 5: Performance — replace placehold.co with generated SVG placeholders

**Files:**
- Modify: `src/lib/commerce/data.ts` (all `placehold.co` URLs)
- Create: `src/lib/commerce/placeholder.ts`

- [ ] **Step 1:** Create `placeholder(w, h, bg, fg, text)` util that returns a `data:image/svg+xml` base64 URI.
- [ ] **Step 2:** Replace all `placehold.co` URLs in `data.ts` with `placeholder()` calls — eliminates external image dependency and CLS.
- [ ] **Step 3:** Run build — verify no broken image src values.

---

## Task 6: Newsletter section — add `aria-live` confirmation

**Files:**
- Modify: `src/components/home/newsletter.tsx`
- Modify: `src/components/layout/newsletter.tsx`

- [ ] **Step 1:** Add `role="status"` and `aria-live="polite"` to the success state div.
- [ ] **Step 2:** Ensure the success message is visually distinct (checkmark icon + green text).

---

## Task 7: Remotion motion assets scaffold (Phase 7 hook)

**Files:**
- Create: `remotion/src/Root.tsx`
- Create: `remotion/src/LogoReveal.tsx`
- Create: `remotion/src/CollectionCard.tsx`
- Create: `remotion/src/PromoBanner.tsx`

- [ ] **Step 1:** Scaffold Remotion composition root with logo-reveal, 4 collection title cards, and promo banner compositions.
- [ ] **Step 2:** Each composition uses design tokens (colours, Fraunces font) from the brand system.

---

## Task 8: Final build verification

- [ ] **Step 1:** Run `npm run typecheck` — 0 errors.
- [ ] **Step 2:** Run `npm run lint` — 0 warnings.
- [ ] **Step 3:** Run `npm run build` — 52+ pages, 0 errors.
- [ ] **Step 4:** Update `.execution-ledger.md` with completion notes.
