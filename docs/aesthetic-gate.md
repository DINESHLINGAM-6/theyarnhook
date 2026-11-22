# TheYarnHook — Aesthetic Gate (Phase 4: design-taste-frontend + frontend-design)

**Kind:** product (physical goods, site-kind `other`). **Main action:** Shop the collections.
**Material:** small-batch yarn, four collections, ₹ prices, India.

## The deal (decisions, not taste-by-default)

- **One bold moment:** the hero — *The Unspool*. Oversized Fraunces headline
  "Yarn, but make it a feeling." over a tactile, hand-built yarn-skein composition with
  a single orchestrated entrance. Everything after it is quiet and disciplined.
- **Base:** warm ivory `#F7F1E8`, oat `#EFE4D3`, warm ink `#1A1613`, brass `#A16207`.
  Accents are **collection-owned** (wine, milk-tea, peach, plum), never a global terracotta.
- **Type:** Fraunces (expressive display, incl. italic for collection names) + Manrope
  (clean sans). No Inter/Roboto/Arial. Italic is a *system* for collection names, not a
  random accented word per headline.
- **Layout concept:** editorial asymmetric. 12-col desktop; collection tiles deliberately
  unequal (Desire tall-left, Milka/Souffle stacked right, Plush Luxe full-bleed dark band).
  Equal outer edges on one container; generous vertical rhythm. Mobile: single column,
  thumb-zone bottom nav, sticky PDP add-to-cart.
- **Art direction:** **original illustrated textile** — parameterised SVG skeins, balls,
  fibre macro and strand fields with soft gradients and paper grain. This is a deliberate
  brand choice (placeholder until Phase 6 video/real photography), not a stock stand-in.
  Every visual renders; no captions under art; reserved aspect ratios (no CLS).
- **Signature devices:** "yarn label" product cards (paper band + swatch row), stitch
  dividers (a small loop glyph, not middle dots), oversized collection wordmarks, brass
  hairlines, die-cut/petal tile corners for Desire, soft puffs for Souffle.

## Rejected generic defaults (and what I did instead)

| Default tell | Replacement |
|---|---|
| Warm cream + terracotta `#D97757` global accent | Ivory/oat base; brass hairline; accents owned by each collection |
| Tracked-out ALL-CAPS eyebrow above every heading | Sentence-case kicker with a small yarn-loop glyph, used sparingly |
| `A · B · C` middle-dot meta strings | Comma/slash in prose, or a small stitch divider glyph |
| Monospace micro-labels | Manrope labels |
| `→` on every link | Custom stitch arrow only on primary CTAs |
| Identical rounded cards + same soft shadow everywhere | Three card families: collection tiles, yarn-label product cards, quiet info cards |
| Fade-up on every section | One hero entrance + hover answers; scroll reveal only on key art |
| Violet/lavender palette | Not in global design; Plush Luxe plum is brief-mandated and contained |
| Numbered 01/02/03 everywhere | Numbers only for the real 2–7 weight sequence |

## Per-section self-review (checked before shipping each)

- **Hero:** fills first screen; says what is sold + for whom; one hard fact (small-batch,
  India, ₹); one primary action; art renders at 375/768/1440; entrance once, reduced-motion
  rest state.
- **Collections:** one idea (four moods); unequal tiles; art zooms 1.03 in frame on hover;
  card lifts 2px; equal edges; no caption.
- **Weight:** real 2–7 sequence → numbers justified; counts accurate; links filter.
- **Projects:** working presets; icons are SVG (lucide), not emoji.
- **Tabs:** keyboard arrow support, no timed rotation; product cards consistent family.
- **Spotlight:** the one dark band (Plush Luxe); brass hairline; not a second hero.
- **Brands/reviews/Instagram/newsletter/footer:** quiet; real feedback states; no
  placeholder text; contacts on `.example`; no invented "open now".
- **PDP:** product big and whole; swatch changes the art; no fact twice; sticky mobile add.
- **Motion:** buttons step/press, cards lift, underlines draw; no tilt/carousel/scroll-jack;
  reduced motion rests.
- **Keyboard/head:** skip link, visible focus, named controls, alt text, heading order,
  lang/title/description/share tags.
- **One system:** one button pair, one radius scale, one link look, one heading scale.

## Honest notes for the final report
- Product/collection visuals are **original SVG placeholders**; replace with real
  photography or Phase 6 video posters (typed `Media` makes this a data-only swap).
- Reviews, ratings and stock are **sample data** for the demo; replace with real reviews.
- Checkout is **UI-only demo mode**; no payment is taken.
