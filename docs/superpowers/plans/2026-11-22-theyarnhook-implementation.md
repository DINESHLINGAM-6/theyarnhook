# TheYarnHook Storefront — Implementation Plan

> **For agentic workers:** Execute task-by-task with `executing-plans` (chosen: user
> asked for in-session execution through Phase 5). Steps use checkbox syntax.

**Goal:** Ship a premium, original, mobile-first Next.js storefront for TheYarnHook with
four mood-driven collections and full shopping logic (filter, quick-add, cart, wishlist,
search, checkout UI).

**Architecture:** Next.js 15 App Router + RSC pages with client islands for interactive
commerce (cart/wishlist/UI via Zustand). Typed local commerce provider (`getProducts`,
`getProduct`, `getCollection`, `getCollections`) so a Shopify/Medusa adapter can replace
it. All imagery is original SVG/CSS art behind a typed `Media` abstraction.

**Tech Stack:** Next.js 15.1, React 19, TypeScript 5.7, Tailwind 3.4, Framer Motion 11,
Zustand 5, lucide-react, next/font (Fraunces + Manrope).

**Spec:** `docs/superpowers/specs/2026-11-22-theyarnhook-design.md`

## Global Constraints

- Prices in ₹ (INR). Currency code `INR`.
- WCAG AA contrast; full keyboard support; `prefers-reduced-motion` respected globally.
- No reference (kaysonindia) copy, layout, colour, image, or code. Original assets only.
- Mobile-first: 375 / 768 / 1440 are the QA widths.
- No default Inter/Roboto/Arial-only look. Display serif = Fraunces; sans = Manrope.
- `npm run build`, `npm run lint`, `npm run typecheck` must pass with zero errors.
- No console errors; no broken images/links; no layout shift from media.

## Review Focus

- **Empty/zero-result states** (filter combo with no matches) must show a designed empty
  state with a reset action, not a blank grid.
- **Cart math** (qty, line totals, subtotal, free-shipping threshold, discount) must stay
  correct across add/remove/quantity and survive reload (persisted).
- **Reduced motion + keyboard** (drawer focus trap, Escape closes, focus returns) must
  hold on every overlay.
- **Missing/invalid product or collection slug** must 404 gracefully (`notFound()`).
- **Images** must never 404 or shift layout — SVG/CSS art with reserved aspect ratios.

---

## File Structure

```
theyarnhook/
  package.json  tsconfig.json  next.config.mjs  postcss.config.mjs  tailwind.config.ts
  src/
    app/
      layout.tsx  globals.css  page.tsx  not-found.tsx
      collections/[slug]/page.tsx
      shop/page.tsx
      products/[slug]/page.tsx
      cart/page.tsx  checkout/page.tsx  wishlist/page.tsx  search/page.tsx
      about/page.tsx  contact/page.tsx  faq/page.tsx
      policies/[slug]/page.tsx
      sitemap.ts  robots.ts  manifest.ts
      opengraph-image.tsx (or static svg)
    components/
      layout/{announcement-bar,site-header,mega-menu,mobile-nav,site-footer,cart-drawer,search-overlay,newsletter}.tsx
      home/{hero,collections-grid,shop-by-weight,shop-by-project,product-tabs,collection-spotlight,brand-strip,reviews,instagram-grid}.tsx
      commerce/{product-card,product-grid,collection-card,rating-stars,price,badge,quick-add,filter-panel,filter-drawer,sort-select,colour-swatches,yarn-calculator,product-gallery}.tsx
      motion/{reveal,parallax,magnetic,stagger}.tsx
      art/{yarn-skein,yarn-ball,strand-field,grain,collection-mark}.tsx
      ui/{button,badge,input,sheet,accordion,select,separator,visually-hidden}.tsx
    lib/
      commerce/{types.ts,data.ts,provider.ts,format.ts,filters.ts}
      store/{cart.ts,wishlist.ts,ui.ts}
      hooks/{use-mounted.ts,use-media-query.ts,use-scroll-direction.ts}
      utils.ts  seo.ts
  public/  (favicon.svg, textures)
  docs/superpowers/{specs,plans}/
```

### Data model (exact)

```ts
type CollectionId = 'desire' | 'milka' | 'souffle' | 'plush-luxe'
type WeightCategory = 2 | 3 | 4 | 5 | 6 | 7
interface Colour { id: string; name: string; hex: string; inStock: boolean }
interface Media { kind: 'skein' | 'ball' | 'texture'; palette: string[]; alt: string }
interface Product {
  id: string; slug: string; name: string; collectionId: CollectionId
  price: number; compareAtPrice?: number
  fibre: 'Cotton' | 'Merino' | 'Acrylic' | 'Bamboo' | 'Alpaca' | 'Blend'
  weight: WeightCategory; weightLabel: string; brand: string
  colours: Colour[]; rating: number; reviewCount: number
  yardage: number; ply: number; needleSize: string; hookSize: string
  description: string; care: string[]; media: Media[]
  tags: ('new'|'bestseller'|'sale')[]; stock: number
}
interface Collection {
  id: CollectionId; slug: string; name: string; tagline: string; description: string
  accent: { base: string; soft: string; ink: string }
  mood: string; signature: string
}
```

### Milestones & acceptance criteria

**M0 — Scaffold.** Next 15 + TS + Tailwind + fonts + tokens + providers. ✔ `npm run dev`
boots, tokens render, fonts load, no hydration warnings.

**M1 — Data + state.** 24+ products across 4 collections, typed provider, cart/wishlist/
UI stores persisted. ✔ unit sanity via typecheck; cart math verified in QA.

**M2 — Primitives + art.** Button/Badge/Input/Sheet/Accordion/Select, Reveal/Parallax/
Magnetic, YarnSkein/YarnBall/StrandField/Grain, RatingStars/Price/ProductCard/
ColourSwatches/QuickAdd. ✔ components render in a scratch route; AA contrast checked.

**M3 — Layout shell.** Promo bar, sticky glass header + mega-menu, mobile bottom nav,
footer, cart drawer, search overlay, newsletter. ✔ nav works at 375/768/1440; drawer
focus trap + Escape.

**M4 — Home.** All required sections in order. ✔ matches spec order; reduced-motion safe;
no CLS.

**M5 — Collections + Shop.** 4 mood pages; `/shop` with search/filter/sort (fibre,
weight, brand, colour, price, in-stock). ✔ filtering correct; empty state; URL-synced
where cheap.

**M6 — Product + commerce pages.** Product detail (gallery, swatches, specs, calculator,
reviews, related, sticky mobile add-to-cart), cart, checkout UI, wishlist, search pages.
✔ add-to-cart from card and PDP; qty + remove; checkout summary correct.

**M7 — Content + SEO + a11y polish.** About/Contact/FAQ/Policies, sitemap/robots/
manifest/metadata/JSON-LD, skip link, focus styles, contrast pass.

**M8 — QA.** Build, lint, typecheck; browser QA at 3 widths; fix all issues.

## Tasks

### Task 1: Scaffold project
Files: package.json, tsconfig, next.config.mjs, postcss, tailwind.config.ts,
src/app/{layout.tsx,globals.css,page.tsx}, src/lib/utils.ts.
Steps: init package.json → install deps → config files → tokens + fonts → placeholder home
→ `npm run build` passes → commit.

### Task 2: Design tokens + globals
Files: src/app/globals.css, tailwind.config.ts.
Steps: CSS variables (light theme, AA) → Tailwind theme mapping (colours, fonts, radius,
shadow, easing) → base styles (selection, focus-visible, scrollbar, grain) → build → commit.

### Task 3: Commerce types + seed data + provider
Files: src/lib/commerce/{types,data,provider,format,filters}.ts.
Steps: types → 24+ realistic products (₹249–₹1,299) + 4 collections → provider fns →
format INR → filter/sort helpers → typecheck → commit.

### Task 4: Stores
Files: src/lib/store/{cart,wishlist,ui}.ts, src/lib/hooks/use-mounted.ts.
Steps: cart store (add/remove/qty/totals/free-shipping) → wishlist toggle → UI store
(drawer/search/menu) → persist → typecheck → commit.

### Task 5: UI primitives + motion + art
Files: components/ui/*, components/motion/*, components/art/*.
Steps: Button/Badge/Input/Sheet/Accordion/Select → Reveal/Parallax/Magnetic → YarnSkein/
YarnBall/StrandField/Grain → typecheck → commit.

### Task 6: Commerce components
Files: components/commerce/*.
Steps: RatingStars/Price/Badge → ColourSwatches → ProductCard (+quick add, hover swatch
swap) → ProductGrid/CollectionCard → FilterPanel/FilterDrawer/SortSelect → typecheck →
commit.

### Task 7: Layout shell
Files: components/layout/*, app/layout.tsx.
Steps: AnnouncementBar → SiteHeader + MegaMenu → MobileNav → SiteFooter → CartDrawer →
SearchOverlay → Newsletter → wire into layout → build → commit.

### Task 8: Home page
Files: components/home/*, app/page.tsx.
Steps: Hero → CollectionsGrid → ShopByWeight → ShopByProject → ProductTabs →
CollectionSpotlight → BrandStrip → Reviews → InstagramGrid → assemble → build → commit.

### Task 9: Collection pages + shop
Files: app/collections/[slug]/page.tsx, app/shop/page.tsx, components/commerce/*.
Steps: collection page (mood) → generateStaticParams + metadata → shop client view with
filters/sort/search + URL params → empty state → build → commit.

### Task 10: Product page
Files: app/products/[slug]/page.tsx, components/commerce/{product-gallery,yarn-calculator}.tsx.
Steps: gallery → swatches → specs → calculator → reviews → related → sticky mobile
add-to-cart → JSON-LD → build → commit.

### Task 11: Commerce pages
Files: app/{cart,checkout,wishlist,search}/page.tsx.
Steps: cart page → checkout UI → wishlist page → search page → build → commit.

### Task 12: Content + SEO
Files: app/{about,contact,faq}/page.tsx, app/policies/[slug]/page.tsx, sitemap.ts,
robots.ts, manifest.ts, src/lib/seo.ts.
Steps: content pages → policies → metadata/JSON-LD → sitemap/robots/manifest → build → commit.

### Task 13: QA + fixes
Steps: `npm run typecheck` → `npm run lint` → `npm run build` → run dev → browser QA
(Phase 8 later; here smoke) → fix → commit.

## Self-Review
- Spec coverage: all pages/sections and features mapped to Tasks 8–12; state/data to
  Tasks 3–4; motion/a11y to Tasks 2,5,7.
- Review Focus items pinned: empty state (Task 9), cart math (Tasks 4,11), reduced motion/
  keyboard (Tasks 5,7), invalid slug (Tasks 9,10), images (Tasks 5,6).
- Type consistency: `CollectionId`, `WeightCategory`, `Product`, `Colour`, `Media` used
  verbatim across tasks.
