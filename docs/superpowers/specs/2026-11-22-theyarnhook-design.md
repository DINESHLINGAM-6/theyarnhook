# TheYarnHook — Brand & Product Design

Date: 2026-11-22
Status: Approved direction (brief is a complete spec; user asked to execute through Phase 5)
Size: Project (full design doc)

## Intent and why

Build a premium, original e-commerce storefront for **TheYarnHook**, an Indian yarn
brand for crochet and knitting. The site must feel like *touching yarn*: warm, creamy,
calm, tactile, editorial. Functionally it must match a modern yarn retailer (browse,
filter, quick-add, cart, wishlist, search, checkout UI) but be **visually and
verbally original** — no layout, theme, colour, copy, image, or code borrowed from
the reference.

The four collections are the brand's spine and primary navigation:
**DESIRE · MILKA · SOUFFLE · PLUSH LUXE**.

## Goals

- A storefront that looks hand-crafted and editorial, not templated or "AI purple".
- Mobile-first excellence (most Indian traffic), then tablet and desktop.
- Real shopping logic: filter by fibre, weight, brand, colour, price, in-stock; sort;
  quick-add; colour swatch swap; cart drawer with free-shipping progress; wishlist;
  search overlay; checkout UI.
- WCAG AA, keyboard-complete, `prefers-reduced-motion` safe.
- Lighthouse: Perf ≥ 90, A11y ≥ 95, SEO ≥ 95 (target).
- Data layer swappable for Shopify/Medusa later (typed provider boundary).

## Non-goals

- Real payments, auth, inventory backend, or CMS in this phase.
- Recreating the reference's promotions, copy, imagery, or layout.
- Video/motion assets (Phases 6–7) — Phase 5 ships with SVG/CSS art + graceful
  poster fallbacks designed to accept video later.

## Anti-goals (failure even if it "works")

- Looks like a generic Shopify template or a purple-gradient AI site.
- Desktop-only polish with broken mobile flows.
- Decorative motion that ignores reduced-motion or hurts CLS.
- Copied assets/copy from the reference.

## Brand personality

**"Soft luxury, quietly Indian."** Warm ivory and oat, deep ink type, one rich accent
per collection. Confident editorial display serif against a clean humanist sans.
Texture over gloss: paper grain, fibre fuzz, velvet, milk, butter, rose. Voice is
warm, a little poetic, never salesy: *"Yarn, but make it a feeling."*

### Target users
1. **Hobby crocheters** (25–45, IG/Pinterest-led): shop by mood/colour, want swatches,
   ratings, quick-add, mobile speed.
2. **Gifters** (premium gifting, festivals/birthdays): want bundles, trust signals,
   easy discovery, gift-ready presentation.
3. **Small-business makers**: need specs (weight, ply, yardage, needle), stock status,
   bulk clarity, dependable filtering.

## Collection concepts (one system, four moods)

All share: ivory base, same grid, same type, same radius/shadow language. Only the
accent hue, texture, and signature gesture change.

| Collection | Accent | Mood | Tagline | Signature treatment |
|---|---|---|---|---|
| **DESIRE** | Deep rose / wine `#7A1F3D` | Romantic, evening, silk-adjacent | *Desire what you make.* | Rose-petal gradient, ribbon curves, italic serif, wine velvet |
| **MILKA** | Milk-tea / cream `#B98A5E` on oat | Cozy, milky, café-nostalgic | *Slow mornings, soft stitches.* | Milk swirl, soft beige, rounded forms |
| **SOUFFLE** | Butter / peach `#E08A4F` | Airy, puffed, playful | *Light as a whisk.* | Puffed cloud shapes, peach gradient |
| **PLUSH LUXE** | Midnight plum `#3A2350` + brass | Opulent, nocturnal, velvet | *Midnight, but make it soft.* | Dark velvet, gold thread, low glow |

## Hero concepts considered

- **A. "The Unspool"** — full-bleed macro of a yarn strand unwinding; oversized serif
  headline set along the curve; scroll parallax reveals the four collections as yarn
  balls/portals. *Cinematic, tactile, scales to Phase 6 video.*
- **B. "Colour Library"** — editorial split; huge serif "YARN, BUT MAKE IT A FEELING"
  with a fan of four collection swatches that fans on hover. Product-led, shoppable.
- **C. "The Hook Diary"** — maker's-hands craft storytelling, journal aesthetic, then grid.

**Chosen: A (The Unspool), with a B-style swatch fan in the collection rail.** It best
expresses "soft luxury / touchable yarn", gives Phase 6 a natural video slot, and
degrades gracefully to CSS/SVG on mobile and reduced-motion. B is more generic; C is
warmer but less shoppable above the fold.

## Key differentiators vs reference

- Editorial soft-luxury art direction (paper grain, fibre macro, oversized serif)
  instead of catalogue density.
- Collections as *moods*, each with its own accent and signature gesture.
- Refined sale/stock language instead of badge clutter.
- Tactile, reduced-motion-aware motion system (parallax strands, magnetic buttons,
  image reveal, swatch swap, drawer slide).
- Accessible AA palette and full keyboard support from the start.
- Mobile-first: thumb-zone bottom nav, sticky add-to-cart, filter drawer.

## Pages / features

- **Home:** promo bar → sticky glass header + mega-menu → cinematic hero → 4 immersive
  collection cards → shop by weight (2–7) → shop by project → bestsellers/new/sale
  tabs → featured collection spotlight → brand strip → reviews → Instagram grid →
  newsletter → footer.
- **4 collection pages** (each with its own mood/accent).
- **All products** (`/shop`) with search, filters (fibre, weight, brand, colour, price,
  in-stock), sort.
- **Product page:** gallery, colour swatches, specs (weight/ply/yardage/needle),
  "yarn needed" calculator, reviews, related, sticky mobile add-to-cart.
- **Cart drawer**, **wishlist**, **search overlay**, **checkout UI**.
- **About, Contact, FAQ, Policies** (shipping/returns/privacy/terms).

## Constraints

- Next.js App Router + TypeScript + Tailwind + Framer Motion; local typed data;
  `next/image`; SEO metadata; accessible components.
- Prices in ₹ (INR), realistic placeholder products.
- Original imagery only: generated SVG yarn skeins, CSS gradients, procedural
  textures — no hotlinking.

## How it gets made (decisions)

- **Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind 3.4, Framer Motion,
  Zustand (cart/wishlist/UI), lucide-react. (Proven versions; change only with reason.)
- **Fonts:** Fraunces (display serif) + Manrope (sans) via `next/font/google`.
- **Imagery:** parameterised `<YarnSkein>` SVG + CSS gradients/textures. Product
  `images` field typed so real photography or Phase 6 video posters can replace them.
- **Data:** `src/lib/commerce` with `types.ts`, `data.ts` (seed), `provider.ts`
  (interface) so a Shopify/Medusa adapter can drop in later.
- **State:** Zustand stores for cart, wishlist, UI; persisted to localStorage.

## What's left to the builder

Exact token values, component APIs, and copy micro-details are settled in Phases 2–4.
