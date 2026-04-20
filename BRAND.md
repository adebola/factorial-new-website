# Factorial Systems — Brand system

A reference for anyone building with the Factorial Systems brand — from the website codebase to email signatures, presentations, and printed materials.

---

## Positioning

**What Factorial is:** An AI Implementation & Solutions Partner for enterprise workflows. A Lagos-based engineering team that designs, builds, and operates conversational AI and workflow automation systems for regulated industries.

**What Factorial is not:** A strategy consultancy. A template dev-shop. A generalist.

**Tagline:** *Enterprise AI, shipped — not pitched.*

**One-liner:** Factorial designs, builds, and deploys production-grade conversational AI and workflow automation for banks, insurers, and public-sector operators — anchored by ChatCraft, our conversational AI platform.

---

## Palette

### Brand

| Name            | Hex       | Role                                                  |
|-----------------|-----------|-------------------------------------------------------|
| Factorial Blue  | `#1F5FC0` | Primary. Workhorse color — CTAs, links, brand surfaces. |
| Deep Blue       | `#143D80` | Anchor. Dark surfaces, headline contrast, gravity.     |
| Azure           | `#2BA5DE` | Secondary. Links, data viz, gradient transitions.      |
| Mint            | `#5DD3B3` | Accent. Use sparingly — success states, live indicators, a single hero pop. |

### Neutrals

| Name  | Hex       | Role                                        |
|-------|-----------|---------------------------------------------|
| Ink   | `#0B1220` | Primary text, dark backgrounds.             |
| Slate | `#475569` | Body text at medium contrast.               |
| Fog   | `#F1F5F9` | Subtle surfaces, section backgrounds.       |
| Paper | `#FFFFFF` | Primary background.                         |

### Usage rules

- **Never use Mint for more than 5% of any surface.** It's an accent, not a wallpaper. Over-use tips the brand toward wellness-app rather than enterprise-AI.
- **Gradients only in specific moments** — hero underline, soft orbs in the background, logo itself. Not on buttons, cards, or headers.
- **Dark sections should use Ink, not Deep Blue** for the base. Deep Blue is for text/accent contrast on light surfaces.

---

## Typography

| Weight | Family           | Usage                                     |
|--------|------------------|-------------------------------------------|
| Display | **Space Grotesk** 500 | Headlines, hero text, section titles |
| Body   | **Geist** 400 / 500   | Body copy, navigation, buttons        |
| Mono   | **JetBrains Mono** 400 / 500 | Kickers, IDs, technical labels, timestamps |

### Rules

- Headlines use **−2% tracking** (`letter-spacing: -0.02em`) for tightness.
- **Sentence case everywhere.** Never Title Case, never ALL CAPS (except inside monospace "kicker" labels where 18% letter-spacing is applied for a UI-instrument feel).
- Body copy at **16px / 1.6–1.75 line-height**. Don't go below 14px for sustained reading.
- Use monospace for any technical signal: file IDs (`FS-021`), version tags (`v2.0.1`), coordinates, percentages as labels.

All three fonts are free via Google Fonts. Loaded automatically by `next/font` in the website codebase.

---

## Logo

### Variants included

| File                        | Usage                                                     |
|-----------------------------|-----------------------------------------------------------|
| `public/logo.png`           | Original raster. Use for contexts requiring a PNG.        |
| `public/logo.svg`           | Full-color scalable SVG. Default for web.                 |
| `public/logo-white.svg`     | Monochrome white. For dark backgrounds, print, faxes.     |
| `public/favicon.svg`        | Simplified 3-bar mark for favicons, app icons, 16–64px.   |

### Clearspace and minimum size

- **Clearspace:** minimum one bar-height on all sides.
- **Minimum size:** full logo at 24px height; simplified mark at 16px.
- Below 24px, switch to the favicon variant.

### Don'ts

- Don't rotate, skew, or re-color the mark.
- Don't place the full logo on busy photographic backgrounds — use the white variant or add a plate.
- Don't recreate the gradient by hand. Use the SVGs.

---

## Voice

Factorial's voice is **direct, technical, lightly dry.** The product is serious; the copy doesn't need to be.

### Do

- Use specific, concrete claims ("Reduced order-to-delivery reconciliation by over 60%").
- Name the stack when it matters ("Spring Boot, APISIX, GKE").
- Speak engineer-to-engineer when writing for engineers, and operator-to-operator when writing for buyers.
- Use em-dashes for emphasis.
- Make contrasts explicit: *built, not pitched. Shipped, not promised.*

### Don't

- Superlatives that aren't measurable ("best-in-class", "world-leading", "cutting-edge"). If you can't cite the measurement, drop the word.
- Consulting-speak. No "synergies", no "transformations", no "journeys".
- Emojis in body copy. One `→` arrow as a CTA terminator is fine.
- Empty enthusiasm. If a sentence could appear on a competitor's site unchanged, rewrite it.

### Example voice

> **Yes.** *(We like "yes" as a full sentence.)*
>
> Most conversational AI demos die in the handoff from prototype to production. ChatCraft was built for the other side of that line.
>
> We don't deploy and disappear. Managed hosting, monitoring, tuning — we operate it until you're ready to take it fully in-house.

---

## UI patterns

These recur throughout the site. Reuse them elsewhere (decks, reports, internal dashboards) to keep brand coherence.

- **Kicker labels:** mono, 11px, uppercase, 18% letter-spacing. Used as section numberers: `/01 — What we do`.
- **Section numbering:** `/01`, `/02`, `/03`, `/04` in mono. Preferred over H2-only hierarchies.
- **Hairline borders:** `rgba(11, 18, 32, 0.08)` on light surfaces, `rgba(255, 255, 255, 0.08)` on dark.
- **Grid backgrounds:** 56×56px grid at ~4% opacity for hero and CTA sections.
- **Gradient orbs:** radial, heavily blurred (40–50px), one per section maximum.
- **Underline accent:** hand-drawn SVG path with the Mint→Azure gradient under a single hero word.

---

## Applying the brand elsewhere

### Email signatures

```
Name
Role · Factorial Systems
+234 ... · name@factorialsystems.io
factorialsystems.io
```

Keep it monospace/fixed-width. No fancy HTML. Logo can be attached at 32px if needed.

### Slide decks

- First slide: logo on Ink background. One-line positioning below in Geist 400.
- Body slides: white background, Space Grotesk for titles, Geist for body.
- Data slides: Ink for labels, Factorial Blue for the primary series, Azure and Mint for secondary/accent.

### Invoices and contracts

- Deep Blue for header band, logo monochrome white.
- Body in Geist 400. Table headers in JetBrains Mono for that "instrument" feel.

---

## File locations (in the codebase)

- Brand colors & typography tokens: `src/app/globals.css` under `@theme`
- Font loading: `src/app/layout.tsx`
- Logo SVGs: `public/`
- Reusable button styling: `src/components/Button.tsx`
- Utility classes (`kicker`, `bg-grid`, `orb-*`, `rise-*`): `src/app/globals.css` under `@layer utilities`

When updating brand values, update them in `globals.css` once and the whole site follows.
