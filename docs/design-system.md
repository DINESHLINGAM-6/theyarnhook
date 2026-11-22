# TheYarnHook — Design Intelligence Layer (Phase 3, ui-ux-pro-max)

Source signals: `--design-system` (E-commerce Luxury → warm stone + gold, editorial serif),
`ux` (focus trap, focus-not-obscured, empty states, sticky-nav padding), `nextjs` (next/image,
metadata API), `landing` (hero → proof → CTA). Refined to the brief's ivory/oat soft-luxury.

## 1. Design system

### 1.1 Colour tokens (light theme, AA)

Base (shared across all collections):

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--ivory` | `#F7F1E8` | page background | — |
| `--oat` | `#EFE4D3` | section alt / wells | — |
| `--paper` | `#FFFDF8` | cards, header glass | — |
| `--ink` | `#1A1613` | primary text | 15.8:1 on ivory |
| `--ink-soft` | `#4A423B` | secondary text | 8.4:1 |
| `--muted` | `#6B6157` | captions, labels | 5.1:1 |
| `--line` | `#E0D4C3` | borders/dividers | — |
| `--brass` | `#A16207` | brand accent, links | 4.9:1 on paper |
| `--sale` | `#A32A2A` | sale / destructive | 6.3:1 |
| `--success` | `#2F6B4F` | in stock / success | 5.6:1 |
| `--focus` | `#1A1613` | focus ring (2px + 2px offset) | — |

Collection accents (each has `solid` for buttons w/ white text, `tint` for backgrounds,
`ink` for text on tint, `on` for text on solid):

| Collection | solid | tint | ink | on | mood |
|---|---|---|---|---|---|
| Desire | `#7A1F3D` | `#F4DCE2` | `#4A1024` | `#FFF6F8` | wine, rose petal |
| Milka | `#6B4A2C` | `#F3E7D6` | `#3A2716` | `#FFFBF4` | milk tea, oat |
| Souffle | `#9A4A16` | `#FBE3CC` | `#5A2A0C` | `#FFF8F0` | butter, peach |
| Plush Luxe | `#3A2350` | `#E7DEF0` | `#241430` | `#F7F1FF` | midnight plum + brass |

Rule: **never** use a collection `solid` as body text; text on `tint` uses that
collection's `ink`. All body copy ≥ 4.5:1; large display ≥ 3:1.

### 1.2 Typography

- **Display:** Fraunces (variable, opsz 9–144, wght 300–700). Hero `clamp(3rem, 9vw, 8rem)`,
  leading `0.88`, tracking `-0.03em`. Section H2 `clamp(2rem, 5vw, 4rem)`.
- **Sans:** Manrope (400/500/600/700). Body `1rem/1.65`; UI labels `0.75rem` uppercase
  `tracking-[0.18em]`; micro `0.6875rem`.
- **Rules:** max 72ch body measure; display can be tight/oversized; no body < 14px.
- **Fallbacks:** `Georgia, serif` and `system-ui, sans-serif` (never Arial-only).

### 1.3 Spacing, radius, shadow, grid

- Spacing scale 4/8/12/16/24/32/48/64/96/128. Section padding `clamp(4rem, 9vw, 8rem)`.
- Radius: `sm 8`, `md 14`, `lg 22`, `xl 32`, `pill 999`.
- Shadows: `soft 0 1px 2px rgba(26,22,19,.04), 0 8px 30px -12px rgba(26,22,19,.12)`;
  `lift` deeper on hover; `drawer -24px 0 60px -20px rgba(26,22,19,.25)`.
- Container `max-w-[80rem]` (1280) + `px-5 sm:px-8`; wide `90rem`.
- Product grid: 2 cols mobile, 3 tablet, 4 desktop. Collections: 1 mobile, 2×2 desktop
  with one oversized tile (asymmetry).

### 1.4 Motion tokens

- Durations: `fast 150ms`, `base 250ms`, `slow 450ms`, `cinematic 700ms`.
- Easing: `[0.22, 1, 0.36, 1]` (out-expo-ish); spring `{ stiffness: 260, damping: 30 }`.
- Motion is meaning: reveal on scroll, swatch colour swap, hover zoom, drawer slide,
  magnetic buttons, strand parallax. **All** gated by `useReducedMotion()`; reduced-motion
  renders final state instantly.

## 2. Component specs

- **Header (sticky glass):** promo bar above; header `backdrop-blur` paper/80, border-bottom
  on scroll. Left logo (Fraunces wordmark + hook glyph), center nav (Desire, Milka, Souffle,
  Plush Luxe, Shop▾, Sale), right: search, wishlist (count), cart (count), account.
  Height 64 mobile / 76 desktop; `scroll-padding-top` matches.
- **Mega-menu:** hover/focus opens a 4-column panel: collection tiles (accent tint), then
  Shop by weight / fibre / project columns, plus a featured product. Keyboard: focusable
  trigger, Escape closes, arrow through links; not hover-only.
- **Product card:** 4:5 art (YarnSkein SVG), sale/new badge top-left, wishlist heart top-right,
  colour swatch row (max 5 + “+n”), name, fibre · weight, rating + count, price (₹, compare-at
  struck), hover: art zoom + swatch-driven colour swap + quick-add slides up. Whole card is one
  link; quick-add and heart are separate buttons with labels.
- **Filter drawer:** right sheet on mobile, sidebar on desktop. Sections: fibre, weight, brand,
  colour (swatches), price (range), in-stock toggle. Active chips + “Clear all”. Result count.
- **Quick add:** adds default/first in-stock colour to cart, opens cart drawer, announces via
  `aria-live`. If multiple colours, opens a compact chooser.
- **Cart drawer:** right slide-over; free-shipping progress (threshold ₹999); line items with
  swatch, qty stepper, remove; subtotal; checkout CTA; empty state with “shop collections”.
- **Search overlay:** top sheet/command palette; debounced input; suggestions (collections +
  products); keyboard nav; recent/popular when empty; Escape closes; focus trap.
- **Wishlist:** heart toggles persisted; `/wishlist` grid; header count badge.
- **Mobile bottom nav (≤5):** Home, Shop, Search, Wishlist, Cart — thumb zone, safe-area
  padding, active accent, 44×44 min targets. Hidden when a drawer/overlay is open.

## 3. UX flows

**Browse → filter → quick add → cart → checkout**
1. Land on home; hero CTA → collection or `/shop`.
2. `/shop`: apply fibre/weight/colour/price/in-stock; results update with count; chips show
   active filters; URL reflects query where cheap; empty state offers “Clear filters”.
3. Quick add from card → cart drawer opens → adjust qty → free-shipping bar updates.
4. Checkout: contact + shipping form, order summary (read-only), pay CTA (UI only).

**PDP:** gallery → swatch select (updates art + stock) → specs table → yarn calculator
(project + size → estimated balls) → add to cart (sticky bar on mobile) → reviews → related.

**Search:** open overlay → type “merino” → suggestions → Enter → `/search?q=merino`.

## 4. States

- **Empty:** cart, wishlist, search, filter-no-results each get a designed state with a
  hand-drawn yarn motif, one line of copy, and a primary action (never a blank grid).
- **Loading:** skeleton cards (shimmer respecting reduced motion) for grids; button spinner
  for async add.
- **Error:** inline field errors near inputs; toast for failed actions; 404 page with
  “this stitch came undone” + links.
- **Low stock:** “Only N left” in `--sale` when stock ≤ 8.
- **Success:** cart count pulse + `aria-live` “Added to bag”.

## 5. Accessibility (WCAG AA)

- Semantic landmarks; skip link; one H1/page; logical heading order.
- Visible focus ring on every control (`:focus-visible`, 2px + offset); never remove outline.
- Dialog/sheet: `role="dialog" aria-modal`, focus moved in, Tab trapped, Escape closes,
  focus returned to opener; background `inert`/scroll-locked.
- Icon-only buttons have `aria-label`; decorative SVG `aria-hidden`; live regions for cart
  count and toasts.
- Colour never the only signal (badges have text; stock has text + icon).
- Targets ≥ 44×44; `scroll-padding-top` for sticky header; no focus obscured.
- `prefers-reduced-motion` removes parallax/auto-rotation; content still appears.

## 6. Conversion patterns

- Trust strip: “Free shipping over ₹999 · 7-day returns · Secure checkout · Made in India”.
- Free-shipping progress bar in cart drawer (remaining amount + unlocked state).
- Low-stock urgency (honest, ≤8), sale markers with real compare-at prices.
- Reviews with aggregate rating + count on PDP and cards; verified badges.
- Newsletter with a clear value line (no dark patterns); WhatsApp support link in footer.
- Recently viewed / related to extend sessions.
