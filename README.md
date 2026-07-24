# SwiftCart — Marketing Website

The public marketing site for **SwiftCart**, a nationwide consumer delivery
marketplace in Nigeria. Customers use one SwiftCart app to order from nearby
restaurants, pharmacies, supermarkets and more; independent, licensed local
delivery companies fulfil every order with their own riders and payment
accounts.

**Live:** https://swiftcartapp.co · **A product of Koyr.**

This repository is the static, dependency-free website only. The SwiftCart
apps (customer, vendor, rider, admin) live in separate repositories.

---

## What's in here

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Marketplace pitch, how it works, FAQs |
| Customers | `customers.html` | For people ordering |
| Delivery companies | `companies.html` | For operators licensing the platform |
| Vendors | `vendors.html` | For shops selling on SwiftCart |
| Riders | `riders.html` | For delivery riders |
| Contact | `contact.html` | Waitlist + enquiry form |
| Legal | `privacy.html`, `terms.html`, `vendor-terms.html`, `rider-terms.html` | Policies |
| Account deletion | `delete-account.html` | Google Play data-deletion route |
| Not found | `404.html` | Error page |

## Tech

- **Plain HTML, CSS and vanilla JS (ES modules).** No framework, no build step,
  no runtime dependencies — it deploys to any static host / cPanel as-is.
- **Fonts:** Space Grotesk (display) + DM Sans (body), via Google Fonts.
- **Node is used only offline** to regenerate brand raster assets (see below).

## Project structure

```
├── *.html                     # pages (see table above)
├── css/
│   ├── main.css               # entry — @imports base, layout, components, utilities
│   ├── base/                  # tokens, reset, typography, animations
│   ├── layout/                # grid, header, footer, sections
│   ├── components/            # buttons, cards, accordions, steps, forms, legal…
│   └── pages/
│       ├── home.css           # the marketing design system (colours live here)
│       └── legal-pages.css    # legal-page layout + palette remap
├── js/
│   ├── main.js                # boot: nav, reveal, FAQ, toasts, forms, year
│   └── modules/               # nav, reveal, accordions, toc, forms, toast, dom
├── assets/images/
│   ├── brand/                 # logo.png (source), favicon.svg, PWA/apple icons
│   └── og/                    # 1200×630 social share image
├── manifest.json  robots.txt  sitemap.xml  .htaccess
```

## Design system

The website is **orange-led, light and warm**. Orange is the brand (it comes
straight from the app logo); green and yellow are the playful supporting
accents; backgrounds are cream and soft tints, with a single deep-green footer
as the anchor.

The palette is defined once as CSS custom properties at the top of
`css/pages/home.css`. Legal pages inherit it through a token remap in
`css/pages/legal-pages.css`.

| Role | Colour | Notes |
|------|--------|-------|
| Brand orange | `#ff5a1f` | Logo, decorative fills. Never small text (too light). |
| Orange text | `#be3b08` | Links, eyebrows, the accent word in headings. |
| Orange button | `#d93900` | Primary button surface (white text, 4.6:1). |
| Ink | `#2a2521` | Headings and body. |
| Muted | `#6b6259` | Secondary text. |
| Green | `#0e5a37` / `#0a472b` | Footer anchor, the company card, icon accents. |
| Yellow | `#ffc63d` | Sunny accent — eyebrow dots, the customer card, footer headings. |
| Paper / cream / mint | `#fffdf8` / `#fff3e4` / `#e6f6ec` | Page + soft section backgrounds. |

### Accessibility (WCAG 2.1 AA)

Accessibility is a hard requirement, not an afterthought:

- **Contrast:** every text/background pair meets AA (≥4.5:1 normal, ≥3:1 large).
  Colours were solved against the formula before use, and every page is
  re-checked with a compositing-aware audit (it walks translucent layers and
  skips decorative `aria-hidden` art) — all pages pass with zero failures.
- **Keyboard:** a visible focus ring on every interactive element, plus a
  "Skip to main content" link.
- **Motion:** reveal animations and transitions collapse under
  `prefers-reduced-motion`.
- **Content without JS:** pages render fully even if scripting is unavailable.
- Decorative CSS illustrations are hidden from screen readers.

## Brand assets

`assets/images/brand/logo.png` (512×512) is the **source of truth** for the
mark. Everything else is generated from it with [sharp](https://sharp.pixelplumbing.com/):

- `favicon.svg` (an inline data-URI of the logo), `favicon-96.png`
- `apple-touch-icon.png` (180), `favicon-192.png`, `favicon-512.png` (full-bleed, maskable)
- `assets/images/og/homepage-og.{png,jpg}` (1200×630 social card)

To regenerate after replacing the logo, install `sharp` (`npm i sharp`) and run
the small generation script used in development; icons and the OG image derive
from the one PNG.

## Running locally

No build — just serve the folder over HTTP (module scripts need a server, not
`file://`):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

Upload the repository contents to any static host or cPanel document root.
`.htaccess` provides extensionless URLs and basic caching; `robots.txt` and
`sitemap.xml` are included for SEO.

---

© SwiftCart. Built for customers. Powered by local operators. A product of Koyr.
