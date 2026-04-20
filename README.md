# Factorial Systems — Website

The marketing site for Factorial Systems, positioned as an AI Implementation & Solutions partner for enterprise workflows, anchored by the ChatCraft platform.

Built with **Next.js 15** (App Router) + **Tailwind CSS v4** + **TypeScript**.

---

## Quick start

```bash
# install dependencies
npm install

# run the dev server
npm run dev
# → http://localhost:3000

# production build
npm run build
npm run start
```

Node 18.18+ required (Node 20 LTS recommended).

---

## Project structure

```
factorial-systems/
├── public/
│   ├── logo.png         # Original logo (PNG fallback)
│   ├── logo.svg         # Full-color SVG logo
│   ├── logo-white.svg   # Monochrome white variant
│   └── favicon.svg      # Simplified 3-bar favicon
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout, fonts, metadata
│   │   ├── globals.css          # Tailwind v4 + brand tokens
│   │   ├── page.tsx             # Homepage
│   │   ├── chatcraft/page.tsx   # ChatCraft product page
│   │   ├── services/page.tsx    # Services breakdown
│   │   ├── work/page.tsx        # Case studies
│   │   └── about/page.tsx       # Team, contact
│   └── components/
│       ├── Logo.tsx
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       └── Button.tsx
├── BRAND.md            # Brand system reference
└── package.json
```

---

## Brand tokens

All brand values are centralized in `src/app/globals.css` under `@theme`. Tailwind v4 picks them up automatically — use classes like `bg-[color:var(--color-factorial-500)]` or reference them directly in inline styles.

See `BRAND.md` for the full brand system.

---

## Fonts

Loaded via `next/font/google` in `src/app/layout.tsx`:

- **Space Grotesk** — display (headings)
- **Geist** — body text
- **JetBrains Mono** — technical accents (timestamps, IDs, labels)

All three are free and served from Google Fonts with automatic optimization.

---

## Editing content

Most page copy sits at the bottom of each `page.tsx` file in exported `const` arrays (services, case studies, team members, etc.). Edit those arrays to update content without touching the layout.

The contact form in `about/page.tsx` is **presentational only** — no backend wired yet. Options to hook it up:

1. **Formspree / Basin / Web3Forms** — drop-in, no backend required
2. **Resend + API route** — for email delivery from a custom domain
3. **Your own CRM endpoint** — swap the `<form>` `action` attribute

---

## Deployment

**Recommended: Vercel**

```bash
# one-time

vercel
# follow prompts — it will auto-detect Next.js and deploy
```

Alternatives: Netlify, Cloudflare Pages, or any Node-capable host. For a fully static export, you can add `output: "export"` to `next.config.mjs` and host on any static file server.

---

## What's not included yet

These are intentional gaps — add when priorities allow:

- **Contact form backend** (see options above)
- **Analytics** — add Plausible / Fathom / PostHog in `layout.tsx`
- **OG / social preview image** — generate a static 1200×630 PNG and wire it in `metadata.openGraph.images`
- **Blog / CMS** — if you want to publish, consider adding Sanity, Contentlayer, or MDX
- **Cookie banner** — only needed if you add analytics cookies that require consent

---

## Known choices worth flagging

- **No pricing page**. The old "₦POA / Basic / Pro / Premium" table signalled template shop. Until you have genuinely productized offers, let discovery calls set price.
- **Testimonials not included**. The previous site's testimonials were template placeholders. Ship real quotes from named clients or leave the section off entirely.
- **Case studies are drafted from context** and should be reviewed against NDAs before going live. Anonymize where required.

---

## Support

For questions about the codebase or customization, contact Factorial Systems via the details in the footer.
