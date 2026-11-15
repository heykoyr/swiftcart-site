# SwiftCart

### One app for every shop nearby — delivered by the licensed companies already operating in your city.

**SwiftCart is a nationwide consumer delivery marketplace for Nigeria, and the software platform that runs it.** Customers order from nearby restaurants, pharmacies and supermarkets in a single app; independent, licensed local delivery companies fulfil every order with their own riders and their own payment accounts.

I designed and built the whole thing solo — the product strategy, four mobile apps, a multi-tenant backend, the brand, and this website.

**Live:** [swiftcartapp.co](https://swiftcartapp.co) · Currently in pre-launch.

> *This repository is the public marketing website. It's the front door to a much larger system — the story below is what it's the door to.*

---

## The problem, and the pivot that became the business model

Running a delivery marketplace nationwide normally means one company obtaining the operating licences and payment infrastructure to move money and dispatch riders across the country. For a solo founder, that's a wall.

So SwiftCart turns the wall into the model. The delivery companies that **already hold those licences and payment accounts** become the fulfilment layer. SwiftCart provides the consumer brand, the marketplace customers love, and the software that runs operations. Each company brings its own riders and payment account, sets its own commission and delivery rates, and keeps its own economics.

The constraint became the moat: instead of a capital-heavy logistics operation, SwiftCart is a **software platform licensed to the operators** — earning from fixed company subscriptions, taking no cut of any order and never touching customer money.

## What it actually is

Not one app — a four-sided platform, each side a full product:

| | |
|---|---|
| 🛍️ **Customer app** | One nationwide storefront. Browse nearby shops, pay, live-track the rider, earn loyalty. Always SwiftCart-branded. |
| 🏪 **Vendor app** | For every shop: orders, inventory, promotions and payouts. |
| 🛵 **Rider app** | Jobs, a guided delivery flow, clear take-home earnings and withdrawals — **white-labelled** to the company each rider works for. |
| ⚙️ **Admin app** | One app, two faces: a **company console** (each operator sees only their own data) and a **super-admin console** (the platform owner, across every company). |
| 🌐 **Marketing site** | The public front — *this repository*. |

**→ [The full SwiftCart story](https://github.com/heykoyr/swiftcart)** — the platform overview, the case study behind the architecture, and the design system.

*(The apps live in their own repositories — [customer](https://github.com/heykoyr/SwiftCart-customer) · [vendor](https://github.com/heykoyr/SwiftCart-vendor) · [rider](https://github.com/heykoyr/SwiftCart-rider) · [admin](https://github.com/heykoyr/SwiftCart-admin) — all private, as it's a launching product.)*

## What building it involved

**Product thinking**
- Reframing a licensing blocker into a SaaS licensing model — turning "we can't get a licence" into "we don't need one; we license the software to the people who have them."
- A tenancy model where **role** (what you're allowed to do) and **scope** (whose data you can see) are deliberately separate ideas — so the same admin app safely serves both a single company and the platform owner.
- A money model that never pools order funds: each company's payments land in its own account; balances are ledgers, not a shared pot.

**Product design**
- One coherent brand and design system, from the app icon through to this site — orange-led, warm and playful, with a real logo carried consistently across favicons, PWA icons and social cards.
- **Accessible by default.** Every page of this site meets **WCAG 2.1 AA** contrast, with visible keyboard focus, a skip link, reduced-motion support, and content that renders even with JavaScript off. Colours were solved against the contrast formula *before* use and re-verified page-by-page.
- Attention to the unglamorous details that make a product feel finished: consistent navigation and footer, honest microcopy, graceful empty and error states.

**Product engineering**
- A multi-tenant system that keeps every company's data, money and people cleanly separated — verified by actually impersonating each role and checking what leaks, not by trusting the rules on paper.
- A fast, framework-free, dependency-free marketing site that deploys to any static host as-is and renders correctly at any URL shape.
- Shipping end to end and solo: strategy → design → build → deploy, across five codebases.

---

## About this repository (the website)

Hand-built, **no framework, no build step, no runtime dependencies** — plain HTML, CSS and vanilla ES-module JavaScript. It deploys to any static host or cPanel document root as-is.

### Pages
`index` · `customers` · `companies` · `vendors` · `riders` · `contact` · `privacy` · `terms` · `vendor-terms` · `rider-terms` · `delete-account` · `404`

### Structure
```
├── *.html                # pages
├── css/
│   ├── main.css           # entry (@imports base, layout, components, utilities)
│   ├── base/ layout/ components/
│   └── pages/home.css     # the design system — palette lives here
├── js/
│   ├── main.js            # boot + site config (forms, analytics)
│   └── modules/           # nav, reveal, accordions, toc, analytics, dom…
├── assets/images/brand/   # logo.png (source) → favicons + PWA icons
├── assets/images/og/      # 1200×630 social card
└── manifest.json  robots.txt  sitemap.xml  .htaccess
```

### Design system
Orange (`#ff5a1f`, straight from the logo) is the brand; green and yellow are the playful accents; backgrounds are cream and soft tints with a single deep-green footer as the anchor. The palette is defined once as CSS custom properties at the top of `css/pages/home.css`; legal pages inherit it through a token remap. The brand mark lives at `assets/images/brand/logo.png` (512×512) and every icon and the social card are generated from it with [sharp](https://sharp.pixelplumbing.com/).

### Run it locally
```bash
python3 -m http.server 8000   # module scripts need HTTP, not file://
```

### Configure before launch
Two integrations sit at the top of `js/main.js`, deliberately blank so nothing tracks anyone or fakes a signup until you opt in:

- **Forms → Formspree.** The coverage check and waitlist form submit by AJAX (keeping the on-page toast). Paste your endpoint into `FORMSPREE_ENDPOINT`; both forms share one inbox and are distinguished by a `form_type` field, with a `_gotcha` honeypot for spam. *Until it's set, forms confirm but don't send, and log a console warning.*
- **Analytics.** Fill one of `ANALYTICS = { ga, plausibleDomain }` — GA4 (cookie-based) or Plausible (cookieless). Form success fires `coverage_check` / `waitlist_signup` events.

### Deploy
Upload the repo contents to the document root. `.htaccess` handles clean URLs, caching and security headers; `robots.txt` and `sitemap.xml` are included. All asset and link paths are root-absolute, so pages render correctly at any URL shape.

---

Designed & built by **Adekoya Oluwafemi A.** — SwiftCart is a product of **Koyr**.
