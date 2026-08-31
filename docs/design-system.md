# SwiftCart Website — Design System Reference

> ## ⚠️ Superseded — kept for history
>
> This document describes an **earlier visual direction** that was explored and then
> replaced: dark hero sections, red gradient orbs, and Clash Display headings.
>
> **The shipped site looks nothing like this.** The current direction is warm and
> light — forest green, sunny yellow and brand orange on cream — with Space Grotesk
> headings and DM Sans body text.
>
> **The source of truth is the palette block at the top of
> [`css/pages/home.css`](../css/pages/home.css)**, where every colour token is
> annotated with its measured WCAG contrast ratio and the roles it is allowed to
> carry. See also the design-system summary in the [README](../README.md).
>
> Nothing below should be used as guidance for the current site.

---

## 1. Design Direction *(historical)*

**Personality:** Bold gradient, modern startup energy. Premium without being generic. Locally relevant, operationally serious.

**Not:** SaaS purple gradients. Fintech dashboards. Generic stock-photo websites. Flat minimal with no personality.

**Visual pillars:**
- Dark hero sections with ambient red gradient orbs
- Frosted glass cards floating on dark backgrounds
- Gradient brand buttons with glow shadows
- White sections for content and breathing room
- Clash Display for all headings — bold and distinctive
- Satoshi for body text — clean and readable

---

## 2. Typography

### Fonts
```
Display / Headings: "Clash Display" (Fontshare) — weights 400, 500, 600, 700
Body / UI:          "Satoshi" (Fontshare) — weights 400, 500, 700, 900
```

### Font import (in every HTML <head>)
```html
<link rel="preconnect" href="https://api.fontshare.com">
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700,900&display=swap" rel="stylesheet">
```

### CSS Variables
```css
--font-display: "Clash Display", "Satoshi", system-ui, sans-serif;
--font-sans:    "Satoshi", system-ui, -apple-system, sans-serif;
```

### Scale
| Class           | Size  | Weight | Line Height | Use                        |
|-----------------|-------|--------|-------------|----------------------------|
| `.text-display` | 72px  | 700    | 1.00        | Hero headline only         |
| `h1`            | 56px  | 700    | 1.04        | Page title                 |
| `h2`            | 40px  | 700    | 1.10        | Section heading            |
| `h3`            | 24px  | 700    | 1.22        | Card/feature heading       |
| `h4`            | 18px  | 800    | 1.35        | Sub-heading                |
| `.text-body-lg` | 18px  | 400    | 1.65        | Section lead text          |
| `.text-body`    | 16px  | 400    | 1.65        | Body copy                  |
| `.text-small`   | 14px  | 500    | 1.55        | Labels, captions           |
| `.text-xs`      | 13px  | 500    | 1.45        | Fine print, legal meta     |
| `.eyebrow`      | 12px  | 800    | —           | UPPERCASE section label    |

### Rules
- Clash Display is used on all `h1`–`h3` and `.text-display` via CSS `font-family: var(--font-display)`
- No viewport-unit font scaling — fixed px sizes with responsive breakpoints only
- Legal pages: max 72 characters per line (enforced by `.container--narrow`)
- Eyebrow labels: always uppercase, 0.08em letter-spacing, brand red on light / brand-light on dark

---

## 3. Color System

### Brand
| Token                  | Value                     | Use                              |
|------------------------|---------------------------|----------------------------------|
| `--color-brand`        | `#E8391D`                 | Primary brand, CTAs, accents     |
| `--color-brand-dark`   | `#C42E14`                 | Hover state for brand elements   |
| `--color-brand-mid`    | `#FF5722`                 | Gradient mid-point               |
| `--color-brand-light`  | `#FF6B35`                 | Brand accent on dark backgrounds |
| `--color-brand-soft`   | `#FEF2F0`                 | Soft tint for badges, hovers     |
| `--color-brand-glow`   | `rgba(232,57,29,0.32)`    | Shadow glow on brand elements    |

### Gradients
| Token                       | Use                                          |
|-----------------------------|----------------------------------------------|
| `--gradient-brand`          | Primary CTA buttons                          |
| `--gradient-brand-vivid`    | Button hover state                           |
| `--gradient-dark-hero`      | Hero and dark section backgrounds            |
| `--gradient-orb-hero`       | Ambient light orb in hero (opacity layer)    |
| `--gradient-cta-band`       | Full-width CTA band background               |

### Light Surfaces
| Token                  | Value       | Use                    |
|------------------------|-------------|------------------------|
| `--color-page`         | `#F8F8F8`   | Page background        |
| `--color-surface`      | `#FFFFFF`   | Cards, panels          |
| `--color-surface-warm` | `#FFF8F5`   | Warm tinted cards      |
| `--color-surface-2`    | `#F3F4F6`   | Subtle alternate bg    |
| `--color-ink`          | `#0A0A0F`   | Primary text           |
| `--color-ink-muted`    | `#4B5563`   | Secondary text         |
| `--color-ink-soft`     | `#9CA3AF`   | Tertiary / placeholder |
| `--color-line`         | `#E5E7EB`   | Borders, dividers      |

### Dark Surfaces
| Token                     | Value                       | Use                       |
|---------------------------|-----------------------------|---------------------------|
| `--color-dark`            | `#0A0A0F`                   | Hero background           |
| `--color-dark-2`          | `#111118`                   | Dark section alt          |
| `--color-dark-3`          | `#1A1A24`                   | Cards on dark             |
| `--color-dark-ink`        | `#FFFFFF`                   | Text on dark              |
| `--color-dark-muted`      | `rgba(255,255,255,0.62)`    | Secondary text on dark    |
| `--color-dark-soft`       | `rgba(255,255,255,0.38)`    | Tertiary text on dark     |
| `--color-dark-line`       | `rgba(255,255,255,0.10)`    | Borders on dark           |

### Glass System
| Token               | Value                       | Use                              |
|---------------------|-----------------------------|----------------------------------|
| `--glass-bg`        | `rgba(255,255,255,0.06)`    | Glass card background            |
| `--glass-bg-mid`    | `rgba(255,255,255,0.10)`    | Hovered glass card               |
| `--glass-border`    | `rgba(255,255,255,0.12)`    | Glass card border                |
| `--glass-blur`      | `blur(22px)`                | backdrop-filter value            |

### Semantic
```
Success: #10B981 / soft: rgba(16,185,129,0.12)
Warning: #F59E0B / soft: rgba(245,158,11,0.12)
Danger:  #EF4444 / soft: rgba(239,68,68,0.12)
Info:    #3B82F6 / soft: rgba(59,130,246,0.12)
```

---

## 4. Spacing Scale

Base unit: **4px**

| Token         | Value  | Common Use                                |
|---------------|--------|-------------------------------------------|
| `--space-1`   | 4px    | Tight inline gaps                         |
| `--space-2`   | 8px    | Icon-to-label gap                         |
| `--space-3`   | 12px   | Badge padding, tight stacks               |
| `--space-4`   | 16px   | Form field gap, card internal             |
| `--space-5`   | 20px   | Card padding (compact)                    |
| `--space-6`   | 24px   | Card padding (standard), nav gap          |
| `--space-8`   | 32px   | Between cards in a grid                   |
| `--space-10`  | 40px   | Between sections (compact)                |
| `--space-12`  | 48px   | Feature band padding                      |
| `--space-14`  | 56px   | Section compact padding                   |
| `--space-16`  | 64px   | Section padding (mobile)                  |
| `--space-20`  | 80px   | Hero bottom padding                       |
| `--space-24`  | 96px   | Section padding (desktop standard)        |

---

## 5. Border Radius

| Token          | Value  | Use                                  |
|----------------|--------|--------------------------------------|
| `--radius-xs`  | 6px    | Small badges, tooltips               |
| `--radius-sm`  | 10px   | Small controls, TOC links            |
| `--radius-md`  | 16px   | Input fields, small cards            |
| `--radius-lg`  | 22px   | Standard cards, accordions           |
| `--radius-xl`  | 30px   | Feature bands, mobile menu           |
| `--radius-2xl` | 40px   | CTA band, hero card                  |
| `--radius-full`| 999px  | Buttons, pills, badges               |

---

## 6. Shadow System

### Light section shadows
```
--shadow-xs:    0 2px 8px rgba(15,23,42,0.06)
--shadow-sm:    0 4px 16px rgba(15,23,42,0.08)
--shadow-card:  0 12px 36px rgba(15,23,42,0.10)
--shadow-soft:  0 20px 60px rgba(15,23,42,0.10)
```

### Brand glow shadows (red elements)
```
--shadow-brand-sm: 0 6px 20px rgba(232,57,29,0.24)
--shadow-brand:    0 14px 40px rgba(232,57,29,0.32)
--shadow-brand-lg: 0 24px 64px rgba(232,57,29,0.36)
```

### Glass / dark shadows
```
--shadow-glass:    0 8px 32px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.12)
--shadow-glass-lg: 0 20px 60px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.14)
--shadow-dark:     0 24px 60px rgba(0,0,0,0.44)
```

---

## 7. Motion System

### Timing
```
--duration-fast:   150ms   Micro-interactions (hover, focus)
--duration-base:   240ms   UI transitions (menu, toggle)
--duration-slow:   480ms   Section reveals
--duration-xslow:  720ms   Complex entrance animations
```

### Easing
```
--ease-standard:  cubic-bezier(0.2, 0.8, 0.2, 1)   General purpose
--ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1)  Bouncy (card hover, menu)
--ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1)      Scroll reveals
--ease-smooth:    cubic-bezier(0.4, 0, 0.2, 1)        Ambient / looping
```

### Keyframes available (animations.css)
| Animation       | Use                               |
|-----------------|-----------------------------------|
| `orb-drift`     | Background orb slow float         |
| `orb-pulse`     | Orb breathe / scale               |
| `fade-up`       | One-shot entrance                 |
| `fade-in`       | Pure opacity entrance             |
| `float`         | Floating UI elements              |
| `pulse-dot`     | Live/active status indicator      |
| `pulse-success` | Success green pulse               |
| `shimmer`       | Loading skeleton effect           |
| `progress-fill` | Progress bar fill animation       |

### Stagger delays
Apply `data-delay="1"` through `data-delay="6"` to `.reveal` elements for staggered entrance (60ms increments).

### Rules
- All animations **must** be disabled for `prefers-reduced-motion` — handled globally in `reset.css`
- Orb animations: 12–20 second loop, low opacity, `blur(80px)` — subtle atmosphere only
- Card hover: `translateY(-5px)` max — never tilt/rotate cards
- Button hover: `translateY(-2px)` + shadow intensify

---

## 8. Header System

### Two header modes

**Dark hero pages** (homepage, become-a-rider, partner-with-us):
- Add `data-header-dark` attribute to `<header>`
- Header starts: transparent background, white text
- After 10px scroll: `background: rgba(10,10,15,0.88)` + blur

**Light pages** (legal, support, contact, delete-account):
- No `data-header-dark` attribute
- Header starts: `rgba(255,255,255,0.92)` + border
- After 10px scroll: drop shadow, border removed

### JS hook attributes required
```html
data-header       → on <header>
data-menu-button  → on <button class="menu-button">
data-mobile-menu  → on <nav class="mobile-menu">
```

---

## 9. Section System

| Class                      | Background                  | Text color            |
|----------------------------|-----------------------------|-----------------------|
| `.section`                 | `--color-page` (#F8F8F8)   | Dark                  |
| `.section--surface`        | `#FFFFFF`                   | Dark                  |
| `.section--warm`           | `#FFF8F5`                   | Dark                  |
| `.section--dark`           | `#0A0A0F`                   | White                 |
| `.section--dark-gradient`  | Gradient dark               | White                 |
| `.section--hero`           | Gradient dark + min 100svh  | White                 |

Hero sections also include `.hero-orb--primary` and `.hero-orb--secondary` as ambient background elements.

---

## 10. Component Library

### Buttons
```
.button + .button--primary      Gradient red, main CTA
.button + .button--secondary    White with border, light sections
.button + .button--ghost        Text only, light hover
.button + .button--outline-dark Transparent + border, dark sections
.button + .button--glass        Frosted glass, dark sections
.button + .button--light        White button on gradient/dark bg

Sizes: .button--sm / default / .button--lg
```

### Cards
```
.card                    Standard light card
.card--interactive       With hover lift
.card--warm              Warm gradient fill
.card--glass             Frosted glass (dark sections only)
.card--glass-interactive Frosted glass with hover
.stat-card               For metric/number display
```

### Badges
```
.badge                   Neutral
.badge--brand            Red brand
.badge--success          Green
.badge--warning          Amber
.badge--dark             Dark section neutral
.badge--dark-brand       Dark section brand accent
```

### Banners
```
.feature-band            Split content + visual, light
.feature-band--warm      Warm tinted variant
.feature-band--glass     Glass variant (dark sections)
.cta-band                Full-width gradient CTA block
.trust-strip             Row of trust signal items
.app-badges              App store download badges group
```

---

## 11. Folder Structure

```
website/
├── index.html                   Homepage shell (Phase 2 fills content)
├── privacy.html                 Phase 4
├── terms.html                   Phase 4
├── vendor-terms.html            Phase 4
├── rider-terms.html             Phase 4
├── support.html                 Phase 5
├── contact.html                 Phase 5
├── delete-account.html          Phase 5
├── become-a-rider.html          Phase 5
├── partner-with-us.html         Phase 5
├── 404.html                     Phase 6
├── robots.txt                   Phase 6
├── sitemap.xml                  Phase 6
├── site.webmanifest             Phase 6
├── .htaccess                    Phase 6 (cPanel clean URLs + cache)
│
├── css/
│   ├── main.css                 Import hub — load order matters
│   ├── base/
│   │   ├── tokens.css           All design tokens (single source of truth)
│   │   ├── reset.css            Global CSS reset
│   │   ├── typography.css       Type scale and classes
│   │   ├── animations.css       All @keyframes
│   │   └── utilities.css        Accessibility, reveal, display helpers
│   ├── layout/
│   │   ├── grid.css             Containers and grid helpers
│   │   ├── header.css           Sticky header, mobile nav
│   │   ├── footer.css           Dark footer, Koyr credit
│   │   └── sections.css         Section system with dark/hero variants
│   ├── components/
│   │   ├── buttons.css          All button variants
│   │   ├── cards.css            Cards, badges, checklist
│   │   ├── banners.css          Feature bands, CTA band, trust strip, app badges
│   │   ├── forms.css            Form fields, labels, status
│   │   ├── accordions.css       FAQ and accordion, light + dark
│   │   └── legal.css            Legal article layout and TOC
│   └── pages/
│       ├── home.css             Phase 2
│       ├── legal-pages.css      Phase 4
│       └── operational-pages.css Phase 5
│
├── js/
│   ├── main.js                  Entry point — imports shared modules
│   └── modules/
│       ├── dom.js               Query helpers, aria, page lock
│       ├── nav.js               Header scroll, mobile menu
│       ├── reveal.js            IntersectionObserver scroll reveal
│       ├── accordions.js        Exclusive details/summary
│       ├── forms.js             Serialize, status helpers
│       └── analytics-events.js  dataLayer event helper
│
├── assets/
│   ├── fonts/                   Self-hosted fonts (optional, Phase 6)
│   ├── images/
│   │   ├── logo/                SVG logo files
│   │   ├── icons/               Custom SVG icons
│   │   ├── illustrations/       Feature/section illustrations
│   │   ├── og/                  Open Graph social images (1200×630)
│   │   ├── brand/               Brand assets
│   │   ├── home/                Homepage imagery
│   │   ├── pages/               Operational page imagery
│   │   └── legal/               Legal page imagery (restrained)
│   └── video/                   Lightweight video loops (Phase 6 only)
│
├── legal-versions/              Archived legal document versions
└── docs/
    ├── design-system.md         This file
    └── phase-1-system-architecture.md  (previous architecture reference)
```

---

## 12. Page Shell Rules

Every HTML page must follow this structure:

```html
1. DOCTYPE + lang="en"
2. <head>
   - charset, viewport
   - title (unique per page)
   - meta description (unique per page)
   - og: and twitter: meta tags
   - theme-color: #E8391D
   - canonical link
   - Fontshare preconnect + link (Clash Display + Satoshi)
   - css/main.css
   - css/pages/[page-name].css
   - js/main.js (type="module")
3. <body>
   - .skip-link
   - <header> with data-header (+ data-header-dark on dark-hero pages)
   - <main id="main">
   - <footer class="site-footer"> (identical across all pages)
   - Copyright year auto-update script
```

---

## 13. Naming Conventions

- CSS: BEM-lite (`block`, `block--modifier`, `block__element`)
- JS: camelCase functions, `init` prefix for boot functions
- HTML data attributes: `data-[purpose]` (e.g. `data-header`, `data-faq-list`)
- Files: kebab-case (`become-a-rider.html`, `legal-pages.css`)
- CSS classes: hyphen-separated (`card--glass-interactive`)

---

## 14. Content Rules (Brand Voice)

Always:
- SwiftCart is a **marketplace technology platform** — not a bank, not a delivery company
- Riders are **independent delivery service providers** — not employees
- Vendors **list products** — SwiftCart does not own or manufacture products
- Payments are handled by **Paystack** — not SwiftCart
- OTP verification is powered by **Termii** (for SMS provider context)
- Launch market is always **Badagry, Lagos** — not just "Lagos"
- Support email: `support@swiftcartapp.co`
- Privacy email: `support@swiftcartapp.co`
- Earnings language: **Available Earnings**, **Pending Payouts** — never "wallet" or "bank account"
- "SwiftCart is a product of Koyr ❤️" in the footer bottom bar

Never:
- Describe SwiftCart as a fintech, neobank, or payment company
- Use "salary" for rider or vendor earnings
- Use generic SaaS marketing copy
- Imply SwiftCart employs riders

---

*Phase 1 complete. Proceed to Phase 2: Homepage.*
