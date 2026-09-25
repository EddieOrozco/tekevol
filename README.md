# Tekevol Website

Plain HTML/CSS/JS build.

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

## Structure

- `css/variables.css` — colors, fonts, spacing (edit here to change brand-wide values)
- `css/reset.css` — normalize defaults
- `css/base.css` — global typography/element styles
- `css/layout.css` — header, footer, section spacing
- `css/components.css` — buttons, cards, reusable UI pieces
- `css/pages/` — page-specific overrides only
- `js/main.js` — entry point, imports the rest
- `js/nav.js` — mobile nav toggle
- `js/forms.js` — contact form validation
- `assets/images/` — logo, hero, icons
- `assets/fonts/` — only needed if self-hosting fonts instead of Google Fonts CDN

## Notes

- Every HTML page loads CSS in this order: variables → reset → base → layout → components → page-specific.
- `main.js` is loaded as a module (`type="module"`) on every page so `import`/`export` works in `nav.js` / `forms.js`.
- Hero visual/mockup graphic still needed on homepage.
- Contact form currently logs to console — needs a backend (Formspree, Netlify Forms, etc.) hooked up in `js/forms.js`.
