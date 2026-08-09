# Glow — campaign/profile page: assumptions & how to correct them

Everything below is an assumption made in the absence of brand assets or a spec.
Each item says exactly where to change it, so a correction pass is one edit per item.

The reference image (`64565F1F-F6B5-4D46-8341-A373EAD30544.png`) is **1206 × 981 px**.
The build is calibrated so that at a **1206 px viewport** it lands on the reference's
geometry. Content column is 1152 px with 27 px gutters (`--shell`, `--shell-pad`),
so at 1280 / 1440 the page is the same layout, centred.

---

## 1. Fonts

All three are `next/font/google`, declared once in `app/layout.jsx`. Swap the imports
there and the whole page follows — nothing else references a family name.

| Role | Assumed face | Used for |
|---|---|---|
| Display serif | **Cormorant Garamond** | "Sarah, 32", "A$8,150", card headings, the italic quote, the orb's "68%" |
| Script | **Pinyon Script** | "Glow" wordmark, "Gift a little glow" |
| Body / UI | **Inter** | everything else |

### The one thing worth checking first

**The reference's UI sans is not Inter.** Measured against the image, the reference face
has a noticeably *larger cap height for a given advance width* than Inter — roughly
7–10 % narrower per character at the same visual size. Two consequences:

- Sizes were solved from **string widths**, not cap heights, because widths drive the
  line breaks and therefore every card's height. So the numeric `font-size` values look
  small (nav is 12 px, the profile meta row is 9.5 px). They render at the reference's
  *width*; they render very slightly *shorter* than the reference.
- Where the reference locks a specific line break, the break is held with an explicit
  measure rather than by luck — see `--measure-*` in `globals.css`.

If you tell me the real UI face, re-solving the scale is a single pass and most of these
sizes will move up 5–10 %.

The same applies to the serif: the reference's italic quote is a slightly narrower cut
than Cormorant Garamond italic.

---

## 2. Colours

Sampled from the reference PNG (darkest-ink / mean-region sampling), not from the draft.
All live in `:root` in `app/globals.css`; there are **no literal hex values in any
component CSS module**.

| Token | Value | Sampled from |
|---|---|---|
| `--c-page` | `#faf7f2` | page background, far left gutter |
| `--c-surface` | `#fdfbf7` | card interiors (cards are only ~4 L\* lighter than the page) |
| `--c-border` / `--c-border-soft` | `#f0e8dc` | card edge |
| `--c-ink` | `#2b211b` | "Sarah, 32", "A$8,150" |
| `--c-ink-strong` | `#332c27` | nav, step titles, supporter names |
| `--c-body` | `#554e48` | body copy |
| `--c-muted` | `#8b837c` | timestamps, step meta |
| `--gold-ink` | `#96703c` | "Verified" text, links, script wordmark, chip-selected |
| `--gold-mid` | `#ddb472` | hearts, icons |
| `--gold-pale` | `#f6e9d3` | "Verified" pill, "New" pill, avatar fills |
| `--track` | `#e8dacb` | the meter's empty track (warm beige, not grey) |

**Assumption:** the page background is flat cream plus one very soft warm radial bloom
top-right (`--c-page-bloom`). The reference has a warm cast in that area; I read it as
page-level, not as a card treatment.

**Assumption:** the header sits on a translucent near-white (`--c-header`) with a 1 px
bottom rule, rather than being fully opaque. The reference's header band is ~1 L\*
lighter than the page below it.

---

## 3. The Glow Orb

`components/campaign/GlowOrb.{jsx,module.css}` — standalone, reusable, driven by
`percent` and a single `--orb-size` (124 px on this page).

Built from the reference's actual radial profile, sampled at 8 angles × 11 radii:

- **No border, no stroke, no SVG circle, no conic gradient.** The ring is a colour stop
  at 66 % of a `radial-gradient(circle closest-side, …)` on a layer 152 % of the orb box.
- **The bloom decays to alpha 0** at 86 % of its own radius, so there is no edge where
  the glow terminates. The goal card deliberately does **not** clip (`overflow` is not
  `hidden`) — clipping it was producing exactly the hard cut this must avoid.
- **Interior is a lit sphere, not a donut**: an 8-stop ramp from `--orb-core-1` (`#bd8f5c`
  at centre) out to `--orb-core-8` (`#fef7e4` at the rim). Those eight values are the
  measured interior ramp — centre ≈ `rgb(196,148,101)`, brightening to near-white just
  inside the ring.
- Rim light, drifting sparkle motes, and two lens flares (lower-right and upper-left)
  match the flares visible on the reference's ring.
- **Anti-banding**: a 5.5 %-opacity `feTurbulence` dither layer (inline data-URI, no
  external request) in `overlay` blend, plus sub-pixel blur on the bloom and ring.
- Label: white, Cormorant for the percentage, Inter for "of goal", both sized as a ratio
  of `--orb-size`, with a warm two-layer text-shadow.

**Assumption:** the reference's orb also carries small star sparkles *outside* the ring,
scattered on the card. I put a soft warm wash there (`GlowGoalCard .wash`) but did not
scatter card-level sparkles — say the word and they go in as a card layer.

## 4. The Glow Meter

`components/campaign/GlowMeter.{jsx,module.css}` — standalone, same `percent`.

- Track 33 px, fully rounded, warm beige with an inset shadow.
- Fill is a **13-stop** gradient (`--meter-1` … `--meter-13`) read straight off the
  reference at 20 px intervals: bright at the very left, dipping to a deep amber
  (`#d17431`) at ~29 %, then brightening continuously to near-white at the leading edge.
- Outer glow bleeds onto the track; a bright radial tip sits on the leading edge; fine
  sparkle points are scattered across the fill; a slow shimmer sweeps it.
- `role="progressbar"` with `aria-valuenow/min/max/valuetext`.
- All motion is off under `prefers-reduced-motion` (handled globally in `globals.css`).

---

## 5. Layout measurements taken from the image

Card edges were found by scanning for luminance steps, not eyeballed.

| Thing | Value | Note |
|---|---|---|
| Content width / gutter | 1152 / 27 px | cards run x = 27 → 1179 |
| Hero columns | `625fr 519fr`, 8 px gap | the hero gap really is much tighter than the three-column gap in the reference |
| Three-column row | `312fr 401fr 407fr`, 18 px gap | measured 310 / 399 / 404 px — **not equal** |
| Section gap | 13 px | vertical gaps measured 11–13 px |
| Header height | 86 px | |
| Portrait | 310 × 316 px, radius 30 px | |
| Orb | 124 px diameter, centre 116 px from the card's right edge | |
| Meter | 462 × 33 px | |
| Trust bar split | 671 px / rest, divider at x = 706 | not a 50/50 split |
| Donate bar padding | 67 px left / 26 px right | asymmetric in the reference; reproduced as-is |

### Two deliberate normalisations

1. **Hero cards are flush at the top.** In the reference the Glow Goal card's top edge
   sits ~14 px below the profile card's and its bottom ~5 px above — i.e. it reads as
   vertically centred against a taller neighbour. I read that as an artefact of the mock
   and made both cards stretch to the same height. One line to revert:
   `align-items: center` on `.hero` in `app/campaign/[slug]/page.module.css`.
2. **"See all supporters" is centred** in its card. In the reference it is 249 px wide
   and sits ~9 px left of centre. Centred at a fixed 250 px.

---

## 6. Copy details taken from the reference over the brief

Where the brief and the image disagreed, the image won:

- The profile meta row's labels ("Procedure", "Clinic", "Date") are **title case, semibold,
  dark ink** — not uppercase, and the icons are dark grey, not gold.
- The supporter rows have **no dividing rules** between them.
- The timeline connector is a **fine dotted line**, not solid.
- The trust bar's second link ("Learn about privacy on Glow.") is **ink-coloured and
  underlined**, not gold like "Learn more".
- The security line sits **below the amount chips**, aligned to them — not under the CTA.

---

## 7. Data

Everything renders from one `campaign` object; there is no copy in any JSX.
`lib/campaign.js` holds a mock row shaped exactly like a Supabase `campaigns` row
(snake_case), a `fromRow()` mapper, and a clearly marked block showing the query that
replaces the mock. `percent` is derived from `raised / goal` and never stored.

Site chrome (nav items, brand, header buttons) is a separate `SITE` export — it isn't
campaign data, but it isn't hardcoded in JSX either.

**Assumption:** pronouns are row fields (`pronoun_subject`, `pronoun_possessive`) rather
than inferred from the name, so templated copy ("her story", "a future she deserves")
stays correct for any campaigner.

**Assumption:** the portrait ships as `public/sarah.jpg`, extracted from the reference at
3× and served through `next/image` with `priority` and `sizes`. Replace with the real
asset and update `photo_url` / `photo_alt` in the row.

---

## 8. Responsive behaviour

Verified breakpoints: 1440 / 1280 / 1024 / 768 / 390. Nothing overflows horizontally.

- **≤ 1180** — nav gaps tighten; donate bar stacks to brand+copy / chips / CTA.
- **≤ 1080** — hero stacks; three columns become two with Supporters full-width; trust bar
  goes 50/50; the fixed `--measure-*` line lengths are released so text uses the wider cards.
- **≤ 1000** — nav collapses (hidden).
- **≤ 860** — profile card stacks (portrait full-width at its 310∶326 aspect).
- **≤ 820** — three columns become one; trust bar stacks with a horizontal divider.
- **≤ 620** — orb scales to 92 px, meter to 26 px, amount to 40 px, chips become a 2-up
  grid, CTA goes full width, supporter rows drop the trailing heart, timeline meta moves
  below the step body, "Log in" is hidden from the header.

**Assumption:** the mobile nav collapses to nothing rather than a hamburger + drawer,
because the reference shows no mobile state. A drawer is a small addition if wanted.

---

## 9. Accessibility

- `h1` is the name; card titles are `h2`, step titles `h3`.
- The quote is a real `blockquote`; the timeline is an `ol`; the meta row is a `dl`.
- The meter is `role="progressbar"` with full aria values; the orb is `role="img"` with an
  `aria-label` of "68% of goal".
- Every decorative glow, bloom, flare, divider and icon is `aria-hidden`.
- Visible focus ring on every interactive element (`:focus-visible`, gold, 2 px, offset 3).
- All animation is disabled under `prefers-reduced-motion`.

---

## 10. Known open questions

1. **The real UI sans and serif** — see §1. This is the highest-value correction.
2. **Hover / active states** are invented (they don't appear in a still). Currently: gold
   border on outlined controls, lift + stronger bloom on gold buttons.
3. **The amount chips are presentational.** No selection state is wired up — `selected`
   comes from the data. Say whether this should become a client component with state.
4. **The info "i" beside GLOW GOAL** is a button with an aria-label but no tooltip yet.
5. **Card corner radius** is read as 20 px and the portrait as 30 px; if the design system
   has a defined scale, `--r-card` / `--r-portrait` are the two values to set.
