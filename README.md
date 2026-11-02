# Tekevol Website

Astro static site (migrated from plain HTML/CSS/JS).

## Run it

```bash
npm install
npm run dev       # http://localhost:4321 — live reload while you edit
npm run build     # production site in dist/
npm run preview   # serve dist/ locally to check the build
```

Requires Node 22 or newer.

## Where to edit things

| To change… | Edit |
|---|---|
| Nav links, footer links, GTM ID, HubSpot IDs, booking link | `src/data/site.ts` |
| Pricing tiers (home + services) | `src/data/pricing.ts` |
| Industry cards (home grid + industries page), trade dropdown | `src/data/industries.ts` |
| FAQs (why-us also builds its structured data from this) | `src/data/faq.ts` |
| `<head>`, GTM, fonts, HubSpot tracking code | `src/layouts/BaseLayout.astro` |
| Header / footer | `src/components/Header.astro`, `Footer.astro` |
| Forms | `src/components/QuoteForm.astro`, `ContactForm.astro` (+ `src/scripts/forms.js`) |
| A page's own copy | `src/pages/<page>.astro` |
| Styles | `src/styles/` (same files as before) |
| Images, favicons, robots.txt | `public/` |

## Structure

```
src/
├── data/        site.ts, pricing.ts, industries.ts, faq.ts
├── layouts/     BaseLayout.astro — every page uses this
├── components/  Header, Footer, Pricing, PricingCard, CtaBand, QuoteForm, ContactForm, JsonLd
├── pages/       index, services, why-us, industries, contact, thank-you, privacy, terms, 404
├── scripts/     header.js, forms.js, main.js
└── styles/      variables, reset, base, layout, components, components/*, pages/*
public/          assets/, favicons, site.webmanifest, robots.txt
```

## How it works

- **New page:** create `src/pages/name.astro`, wrap it in `<BaseLayout title="…">`,
  import its CSS. GTM, HubSpot, header and footer come with the layout.
- **CSS** is imported at the top of each page, in the same order the HTML site
  loaded it, so the cascade is unchanged.
- **URLs** have no `.html`: `/services`, `/contact`, `/thank-you`. Pages build to
  `services.html` etc.; Netlify, Cloudflare Pages and Vercel (`cleanUrls: true`)
  serve those at the clean URL.
- **Sitemap** is generated on build (`sitemap-index.xml`); thank-you and 404 are left out.

## Brand Palette (Palette C)

| Role       | Hex       |
|------------|-----------|
| Primary    | `#123A4A` |
| Secondary  | `#4E7C8A` |
| Accent     | `#E1AD01` |
| Background | `#F7F8F6` |
| Surface    | `#FFFFFF` |
| Heading    | `#0D2830` |
| Body text  | `#4A5560` |

Fonts: Space Grotesk (headings), Inter (body).
