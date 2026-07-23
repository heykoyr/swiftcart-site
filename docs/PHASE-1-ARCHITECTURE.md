# SwiftCart Website — Phase 1 System Architecture
**Status: Complete — Source of Truth for All Phases**
**Platform: Badagry, Lagos, Nigeria**
**Deployment target: cPanel static file hosting**

> This document governs every page, component, CSS file, JS module,
> and design decision across the SwiftCart website. Nothing ships
> without being consistent with what is defined here.

---

---

## 1. FULL SITEMAP

### Primary Public Pages

```
/                           index.html
│
├── /partner-with-us        partner-with-us.html
├── /become-a-rider         become-a-rider.html
├── /support                support.html
├── /contact                contact.html
├── /delete-account         delete-account.html
│
├── /privacy                privacy.html
├── /terms                  terms.html
├── /vendor-terms           vendor-terms.html
└── /rider-terms            rider-terms.html
```

### Supporting Technical Files

```
/robots.txt
/sitemap.xml
/site.webmanifest
/.htaccess                  (cPanel: clean URLs, cache headers, gzip)
/404.html
/browserconfig.xml          (optional: Microsoft tile config)
```

### Page Purpose Map

| Page | Primary audience | Primary goal |
|------|-----------------|--------------|
| `/` | Everyone | Platform trust, ecosystem overview, drive vendor + rider entry |
| `/partner-with-us` | Prospective vendors | Vendor onboarding, verification clarity, application CTA |
| `/become-a-rider` | Prospective riders | Rider recruitment, independent provider positioning, apply CTA |
| `/support` | All users | Support categories, response times, channels, dispute routing |
| `/contact` | All users | General enquiries, business contact, support routing |
| `/delete-account` | Existing users | Account deletion guidance, data retention context |
| `/privacy` | All users, regulators | NDPA-aligned privacy policy |
| `/terms` | All users | Platform terms of service |
| `/vendor-terms` | Vendors | Supplementary vendor terms |
| `/rider-terms` | Riders | Supplementary rider terms |
| `/404` | Lost visitors | Recovery, navigation back to platform |

### URL Policy

- All files use `.html` extensions for cPanel compatibility
- Canonical `<link>` tags reference clean URLs (`https://swiftcartapp.co/privacy`)
- `.htaccess` may rewrite `/privacy` → `privacy.html` once DNS and hosting are configured
- Internal links use `.html` during development, `.htaccess` handles clean resolution in production

---

---

## 2. FULL FOLDER STRUCTURE

```
C:\Users\HP ENVY 15\OneDrive\Desktop\SwiftCart\website\
│
├── index.html
├── partner-with-us.html
├── become-a-rider.html
├── support.html
├── contact.html
├── delete-account.html
├── privacy.html
├── terms.html
├── vendor-terms.html
├── rider-terms.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── .htaccess
│
├── css/
│   ├── main.css                      ← Import hub. Load order enforced here.
│   │
│   ├── base/
│   │   ├── tokens.css                ← All design tokens (single source of truth)
│   │   ├── reset.css                 ← Modern CSS reset + reduced-motion safeguards
│   │   ├── typography.css            ← Type scale, heading classes, body text, eyebrow
│   │   ├── animations.css            ← All @keyframes. Nothing else.
│   │   └── utilities.css             ← Accessibility, reveal, glass helpers, display utils
│   │
│   ├── layout/
│   │   ├── grid.css                  ← Containers, CSS grid helpers, flex row utilities
│   │   ├── header.css                ← Sticky header, dark/light modes, mobile nav
│   │   ├── footer.css                ← Dark footer, Koyr credit, column layout
│   │   └── sections.css             ← Section padding system, dark/hero/warm variants
│   │
│   ├── components/
│   │   ├── buttons.css               ← All button variants and sizes
│   │   ├── cards.css                 ← Light cards, glass cards, badges, checklist
│   │   ├── banners.css               ← Feature bands, CTA band, trust strip, app badges
│   │   ├── forms.css                 ← Form fields, labels, checkboxes, status
│   │   ├── accordions.css            ← FAQ and accordion, light + dark variants
│   │   └── legal.css                 ← Legal article layout, TOC, table, callout box
│   │
│   └── pages/
│       ├── home.css                  ← Homepage-only composition (Phase 2)
│       ├── legal-pages.css           ← Shared legal page overrides (Phase 4)
│       └── operational-pages.css     ← Shared ops page overrides (Phase 5)
│
├── js/
│   ├── main.js                       ← Entry point, imports shared modules
│   │
│   └── modules/
│       ├── dom.js                    ← qs(), qsa(), on(), setExpanded(), lockPage()
│       ├── nav.js                    ← Header scroll state, mobile menu toggle
│       ├── reveal.js                 ← IntersectionObserver scroll reveal
│       ├── accordions.js             ← Exclusive details/summary behaviour
│       ├── forms.js                  ← serializeForm(), setFormStatus()
│       └── analytics-events.js       ← trackEvent() → window.dataLayer
│
├── assets/
│   ├── fonts/                        ← Self-hosted font fallback (Phase 6)
│   │
│   ├── images/
│   │   ├── logo/                     ← SVG logo, wordmark, icon variants
│   │   ├── icons/                    ← Custom SVG icons not available from CSS
│   │   ├── illustrations/            ← Section illustrations
│   │   ├── og/                       ← Open Graph images (1200×630 each)
│   │   ├── brand/                    ← Brand sheets, favicon source files
│   │   ├── home/                     ← Hero imagery, app screenshots, marketplace scenes
│   │   ├── pages/                    ← Vendor, rider, support, contact imagery
│   │   └── legal/                    ← Restrained legal/compliance imagery
│   │
│   └── video/                        ← Lightweight ambient loops only (Phase 6)
│
├── legal-versions/                   ← Archived dated legal document versions
│   ├── privacy/
│   ├── terms/
│   ├── vendor-terms/
│   └── rider-terms/
│
└── docs/                             ← Internal reference. Not deployed.
    ├── PHASE-1-ARCHITECTURE.md       ← This file
    └── design-system.md              ← Token and component quick reference
```

### Folder Rules

- `css/base/` — global primitives only. No page-specific or component styles here.
- `css/layout/` — structural elements shared by every page.
- `css/components/` — self-contained reusable UI components. No page-specific layout.
- `css/pages/` — composition only. Arranges shared components for that specific page.
- `js/modules/` — each module has one clear responsibility. No module handles two concerns.
- `assets/` — static files only. No generated outputs.
- `docs/` — excluded from deployment via `.htaccess` or cPanel ignore rules.

---

---

## 3. SHARED WEBSITE ARCHITECTURE

### Technology Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Markup | Semantic HTML5 | cPanel compatible, no build step, SEO friendly |
| Styling | Modular CSS with custom properties | No framework weight, full design control |
| Scripting | Vanilla ES Modules | No bundler required for cPanel deployment |
| Fonts | Fontshare CDN (Clash Display + Satoshi) | Free, fast, premium quality |
| Deployment | cPanel file manager upload | Matches user environment |
| DNS/Hosting | swiftcartapp.co | Nigerian domain |

### Every Page Uses This Shell

```
[skip link — accessibility]
[site-header — sticky, shared]
  [.container .nav-shell]
    [.brand]
    [.desktop-nav]
    [.nav-actions]
    [.menu-button]
  [.mobile-menu]
[main#main]
  [page-specific content]
[site-footer — dark, shared]
  [.container .footer-grid]
    [.footer-brand]
    [.footer-col × 4]
  [.footer-bottom]
    [.footer-bottom-inner]
```

### Platform Positioning (on every page)

- SwiftCart is a **marketplace technology platform** — not a logistics company, not a bank
- Products are listed and sold by **vendors** — SwiftCart does not own or manufacture goods
- Deliveries are made by **independent delivery service providers (riders)** — not employees
- Payments are processed by **Paystack** — not SwiftCart
- OTP/SMS verification uses **Termii** — relevant for SMS provider compliance context
- Earnings language: **Available Earnings, Pending Payouts** — never "wallet" or "bank account"
- Launch market is always **Badagry, Lagos** — not just "Lagos" or "Nigeria"

### Progressive Enhancement Rules

- Every page must be **fully readable without JavaScript**
- JavaScript enhances: mobile navigation, scroll reveals, accordion exclusivity, form feedback
- JavaScript must never be required to view content, read legal terms, or navigate the site
- CSS animations must degrade gracefully under `prefers-reduced-motion`

---

---

## 4. SHARED DESIGN SYSTEM

### Design Personality

**Bold gradient. Modern startup energy. Locally grounded. Operationally serious.**

SwiftCart's website should feel like a real platform built by real people, for a real community — not a generic SaaS product or a corporate brochure.

| Attribute | Expression |
|-----------|-----------|
| Premium | Dark heroes, glass cards, Clash Display, gradient buttons with glow |
| Trustworthy | Clean white sections, structured information, consistent spacing |
| Local | Badagry references, community language, practical copy |
| Energetic | Brand red gradient, ambient orbs, motion on scroll |
| Serious | Proper legal pages, compliance language, no playful graphics on legal content |

### Visual Rhythm

The page reads in alternating dark and light zones:

```
[Dark hero — full viewport, gradient, orbs]
[White section — ecosystem or features]
[Dark section — trust or stats]
[White section — vendor or rider feature band]
[Dark section — FAQ or CTA band]
[Dark footer]
```

This creates contrast and energy without feeling chaotic.

### What To Avoid

- Purple/blue SaaS gradient palettes
- Generic stock photography with smiling office workers
- Fintech dashboard screenshots as the primary hero visual
- Nested cards inside cards (card matryoshka)
- Heavy drop shadows on everything
- More than two typefaces
- Decorative illustrations on legal or compliance pages
- Marketing copy inside legal documents

---

---

## 5. TYPOGRAPHY SYSTEM

### Fonts

```
Display / Headings : Clash Display — weights 400, 500, 600, 700
Body / UI          : Satoshi — weights 400, 500, 700, 900
```

### HTML Font Import (every page `<head>`)

```html
<link rel="preconnect" href="https://api.fontshare.com">
<link
  href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700,900&display=swap"
  rel="stylesheet"
>
```

### CSS Font Tokens

```css
--font-display : "Clash Display", "Satoshi", system-ui, -apple-system, sans-serif;
--font-sans    : "Satoshi", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
```

Clash Display is applied via `font-family: var(--font-display)` in `typography.css` on all heading elements and `.text-display`.

### Type Scale

| Class / Element   | Desktop | Tablet  | Mobile  | Weight | Line-height | Font        | Use |
|-------------------|---------|---------|---------|--------|-------------|-------------|-----|
| `.text-display`   | 72px    | 56px    | 36px    | 700    | 1.00        | Clash Display | Hero headline only |
| `h1`              | 56px    | 40px    | 34px    | 700    | 1.04        | Clash Display | Page title |
| `h2`              | 40px    | 32px    | 28px    | 700    | 1.10        | Clash Display | Section heading |
| `h3`              | 24px    | 22px    | 22px    | 700    | 1.22        | Clash Display | Card / feature heading |
| `h4`              | 18px    | 18px    | 18px    | 800    | 1.35        | Satoshi | Sub-heading |
| `.text-body-xl`   | 20px    | 18px    | 17px    | 400    | 1.65        | Satoshi | Hero lead text |
| `.text-body-lg`   | 18px    | 17px    | 16px    | 400    | 1.65        | Satoshi | Section lead text |
| `.text-body`      | 16px    | 16px    | 15px    | 400    | 1.65        | Satoshi | Body copy |
| `.text-small`     | 14px    | 14px    | 14px    | 500    | 1.55        | Satoshi | Labels, captions |
| `.text-xs`        | 13px    | 13px    | 13px    | 500    | 1.45        | Satoshi | Fine print, legal meta |
| `.eyebrow`        | 12px    | 12px    | 12px    | 800    | 1.0         | Satoshi | UPPERCASE section label |

### Typography Rules

1. **No viewport-unit font scaling (no `clamp()` or `vw` units)** — fixed px sizes with responsive breakpoints only
2. **No negative letter-spacing** on body text — only headings may use `-0.2px` to `-0.5px`
3. **Eyebrow labels** are always uppercase, `0.08em` letter-spacing, brand red on light backgrounds, brand-light on dark
4. **Legal pages** enforce `max-width: 760px` (`.container--narrow`) for comfortable line length (68–76 characters)
5. **H1 appears exactly once per page** — never skip heading levels
6. **Satoshi 900** is used for UI elements (nav links, badges, button labels) — Clash Display is for headings only
7. **Line height of 1.65** on all body text — essential for readability on mobile data-sensitive screens

### Dark Section Typography Overrides

Text colour automatically inherits from the section context. The section classes (`section--dark`, `section--hero`) provide the correct colour cascade. No manual colour overrides needed for standard text.

---

---

## 6. COLOR SYSTEM

### Brand Palette

| Token | Value | Use |
|-------|-------|-----|
| `--color-brand` | `#E8391D` | Primary CTAs, active states, eyebrow labels |
| `--color-brand-dark` | `#C42E14` | Hover state on brand elements |
| `--color-brand-mid` | `#FF5722` | Gradient mid-stop |
| `--color-brand-light` | `#FF6B35` | Brand accent on dark backgrounds |
| `--color-brand-soft` | `#FEF2F0` | Soft badge fills, soft hover backgrounds |
| `--color-brand-glow` | `rgba(232,57,29,0.32)` | Shadow glow on brand elements |
| `--color-brand-glow-sm` | `rgba(232,57,29,0.20)` | Subtle focus ring glow |

### Gradient Library

| Token | Definition | Use |
|-------|-----------|-----|
| `--gradient-brand` | `linear-gradient(135deg, #E8391D 0%, #FF5722 100%)` | Primary button background |
| `--gradient-brand-vivid` | `linear-gradient(135deg, #E8391D 0%, #FF6B35 55%, #FF8C42 100%)` | Button hover state |
| `--gradient-dark-hero` | `linear-gradient(145deg, #0A0A0F 0%, #130808 55%, #0D0505 100%)` | Hero background |
| `--gradient-dark-section` | `linear-gradient(180deg, #0F0F14 0%, #0A0A0F 100%)` | Dark alternating sections |
| `--gradient-orb-hero` | `radial-gradient(ellipse 70% 60% at 72% 40%, rgba(232,57,29,0.22) 0%, transparent 75%)` | Hero ambient orb |
| `--gradient-orb-secondary` | `radial-gradient(ellipse 50% 50% at 20% 80%, rgba(255,87,34,0.12) 0%, transparent 65%)` | Secondary orb |
| `--gradient-cta-band` | `linear-gradient(135deg, #E8391D 0%, #FF5722 60%, #FF6B35 100%)` | CTA band background |
| `--gradient-card-warm` | `linear-gradient(135deg, #FFFFFF 0%, #FFF8F5 100%)` | Warm feature band fill |

### Light Surface System

| Token | Value | Use |
|-------|-------|-----|
| `--color-page` | `#F8F8F8` | Body / page background |
| `--color-surface` | `#FFFFFF` | Cards, panels, inputs |
| `--color-surface-warm` | `#FFF8F5` | Warm-tinted feature cards |
| `--color-surface-2` | `#F3F4F6` | Alternate subtle bg, code blocks |
| `--color-ink` | `#0A0A0F` | Primary text |
| `--color-ink-muted` | `#4B5563` | Secondary text, body copy |
| `--color-ink-soft` | `#9CA3AF` | Tertiary text, placeholders |
| `--color-line` | `#E5E7EB` | Borders, dividers |
| `--color-line-soft` | `#F0F1F3` | Very light dividers |

### Dark Surface System

| Token | Value | Use |
|-------|-------|-----|
| `--color-dark` | `#0A0A0F` | Hero + dark section base |
| `--color-dark-2` | `#111118` | Alternate dark section |
| `--color-dark-3` | `#1A1A24` | Elevated card on dark |
| `--color-dark-4` | `#22222E` | Second-level card on dark |
| `--color-dark-ink` | `#FFFFFF` | Primary text on dark |
| `--color-dark-muted` | `rgba(255,255,255,0.62)` | Secondary text on dark |
| `--color-dark-soft` | `rgba(255,255,255,0.38)` | Tertiary text on dark |
| `--color-dark-line` | `rgba(255,255,255,0.10)` | Borders on dark surfaces |
| `--color-dark-line-soft` | `rgba(255,255,255,0.06)` | Subtle dividers on dark |

### Glass System

| Token | Value | Use |
|-------|-------|-----|
| `--glass-bg` | `rgba(255,255,255,0.06)` | Glass card default fill |
| `--glass-bg-mid` | `rgba(255,255,255,0.10)` | Glass card hover fill |
| `--glass-bg-light` | `rgba(255,255,255,0.86)` | Light frosted (header after scroll) |
| `--glass-border` | `rgba(255,255,255,0.12)` | Glass card border |
| `--glass-border-strong` | `rgba(255,255,255,0.20)` | Glass card hover border |
| `--glass-blur` | `blur(22px)` | Standard backdrop-filter |
| `--glass-blur-heavy` | `blur(36px)` | Heavy blur (header only) |

### Semantic Colors

| Token | Value | Soft | Use |
|-------|-------|------|-----|
| `--color-success` | `#10B981` | `rgba(16,185,129,0.12)` | Live status, verified, delivered |
| `--color-warning` | `#F59E0B` | `rgba(245,158,11,0.12)` | Pending, caution |
| `--color-danger` | `#EF4444` | `rgba(239,68,68,0.12)` | Error, suspended, declined |
| `--color-info` | `#3B82F6` | `rgba(59,130,246,0.12)` | Informational, loading |

### Color Usage Rules

1. **Brand red** is used for: primary CTAs, active nav states, eyebrow labels, check indicators, status dots. It is never used as a large background on white-text sections (that is the job of the gradient-dark-hero).
2. **White and near-white surfaces** dominate light sections — brand red is an accent, not a flood fill.
3. **Glass system** is used exclusively on dark sections. Never on light sections.
4. **Semantic green** (`--color-success`) signals operational readiness. Use it for: live zone badge, rider verification tick, delivery confirmed, vendor active.
5. **Never mix dark system tokens with light system tokens** on the same surface.
6. **Avoid red backgrounds** on legal or compliance pages — use white. Red draws the eye away from important information.

---

---

## 7. SPACING SYSTEM

### Base Unit

**4px** — every spacing value is a multiple of 4.

### Scale

| Token | Value | Common Uses |
|-------|-------|------------|
| `--space-1` | `4px` | Tight icon-to-label gaps |
| `--space-2` | `8px` | Badge padding, micro gaps |
| `--space-3` | `12px` | Tight list gaps, badge group gaps |
| `--space-4` | `16px` | Form field gap, card padding compact |
| `--space-5` | `20px` | Checklist item, eyebrow to heading gap |
| `--space-6` | `24px` | Standard card padding, nav item gap |
| `--space-8` | `32px` | Between cards in a grid |
| `--space-10` | `40px` | Section heading bottom margin |
| `--space-12` | `48px` | Feature band padding, between grid rows |
| `--space-14` | `56px` | Section padding (mobile) |
| `--space-16` | `64px` | Section padding (tablet) |
| `--space-18` | `72px` | Hero top offset on some breakpoints |
| `--space-20` | `80px` | Hero section vertical padding |
| `--space-24` | `96px` | Section padding (desktop default) |
| `--space-28` | `112px` | Large section padding (desktop) |
| `--space-32` | `128px` | Extra large section padding |

### Section Vertical Rhythm

| Section type | Desktop | Tablet | Mobile |
|-------------|---------|--------|--------|
| Standard `.section` | 96px top/bottom | 72px | 56px |
| `.section--compact` | 64px top/bottom | 56px | 48px |
| Hero section | 120px top, 96px bottom | 96px/80px | 80px/64px |
| Legal page content | 64px top, 96px bottom | 56px/80px | 48px/64px |

### Spacing Rules

1. **Never hardcode spacing values** — always use `var(--space-N)` tokens
2. **Card internal padding** is always `--space-6` (24px) unless explicitly `--compact` variant
3. **Grid gap** between cards is always `--space-5` (20px) to `--space-6` (24px)
4. **Section heading bottom margin** is always `--space-10` to `--space-12`
5. **Legal pages** use `--space-12` between article sections, `--space-5` between heading and paragraph

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-xs` | `6px` | Small pills, chips, code |
| `--radius-sm` | `10px` | Small controls, TOC links, input corners |
| `--radius-md` | `16px` | Input fields, small cards |
| `--radius-lg` | `22px` | Standard cards, accordion items |
| `--radius-xl` | `30px` | Feature bands, mobile menu |
| `--radius-2xl` | `40px` | CTA band, hero cards, large surfaces |
| `--radius-full` | `999px` | Buttons, pills, badges |

**Rule:** Radius increases with surface size. Small elements = small radius. Large containers = large radius. Legal and compliance pages use `--radius-md` maximum — avoid playful large radius on serious content.

---

---

## 8. GRID / LAYOUT SYSTEM

### Container Widths

| Class | Max Width | Padding | Use |
|-------|-----------|---------|-----|
| `.container` | `1120px` | `24px` each side | Default — most sections |
| `.container--wide` | `1280px` | `24px` each side | Homepage hero, wide image grids |
| `.container--narrow` | `760px` | `24px` each side | Legal pages, support articles |

### Grid Classes

| Class | Columns | Gap | Responsive |
|-------|---------|-----|-----------|
| `.grid--2` | `1fr 1fr` | `--space-6` | Collapses to 1 at 768px |
| `.grid--3` | `1fr 1fr 1fr` | `--space-6` | Collapses to 1 at 768px |
| `.grid--4` | `1fr 1fr 1fr 1fr` | `--space-6` | 2-col at 1024px, 1-col at 640px |
| `.auto-grid` | `auto-fill, minmax(280px, 1fr)` | `--space-5` | Auto-responsive |
| `.split-grid` | `1fr 1fr` | `--space-16` | Single column at 1024px |
| `.split-grid--wide-left` | `1.1fr 0.9fr` | `--space-16` | Content-heavy left |
| `.split-grid--wide-right` | `0.9fr 1.1fr` | `--space-16` | Visual-heavy right |

### Common Layout Patterns

**Hero layout (homepage, partner, rider pages):**
- Dark full-viewport section
- Text column left (60%) + visual column right (40%) on desktop
- Stacked, text first on mobile

**Feature band layout (vendor, rider section):**
- `.feature-band` — card with 50/50 split, copy + visual panel inside one bordered container
- Alternates: copy left for vendor, copy right for rider
- Collapses to single column at 1024px

**Role card grid (homepage ecosystem):**
- `.grid--4` — four cards in a row on desktop
- 2-column at 1024px
- 1-column at 640px

**Legal article layout:**
- `.legal-layout--with-toc` — sticky sidebar (220px) + article column on 1024px+
- Single column below 1024px (TOC hidden, anchor links at top)

**FAQ layout:**
- `.split-grid--wide-right` — heading/context left, accordion right
- Stacks on tablet

**CTA band:**
- Full width inside container, gradient background, `.cta-band` component
- Never a split — full width content, centered or left-aligned

### Z-Index Scale

| Token | Value | Reserved for |
|-------|-------|-------------|
| `--z-base` | `1` | Elevated content within sections |
| `--z-above` | `10` | Floating cards, overlapping visuals |
| `--z-nav` | `40` | Mobile menu panel |
| `--z-header` | `50` | Sticky site header |
| `--z-modal` | `60` | Future modals |
| `--z-toast` | `70` | Future toast notifications |
| `--z-skip` | `100` | Accessibility skip link (always topmost) |

---

---

## 9. COMPONENT ARCHITECTURE

### Philosophy

- **Components own their appearance.** They never dictate page-level layout or spacing.
- **Pages arrange components.** `css/pages/home.css` controls how components sit within the homepage, not what they look like.
- **Shared components are composable.** A `.card` works in a `.grid--3` or a `.feature-band` without modification.
- **Dark section variants are predictable.** Adding `section--dark` to a parent cascades correct colours to standard child components. Glass variants are explicitly opted-in.

### Component Inventory

#### Foundation
```
.container / .container--wide / .container--narrow
.grid--2 / .grid--3 / .grid--4 / .auto-grid / .split-grid
.cluster           — flex row with wrap
.stack             — grid column with gap
```

#### Layout Shell
```
.site-header       — sticky, two modes (transparent dark / solid light)
.nav-shell         — inner header row
.brand             — logo lockup
.brand-mark        — gradient icon container
.brand-name        — wordmark
.desktop-nav       — primary nav links row
.nav-actions       — secondary links + CTA
.menu-button       — hamburger toggle
.mobile-menu       — dropdown nav panel
.site-footer       — dark full-width footer
.footer-grid       — 1.6fr + 4×1fr brand+columns
.footer-col        — individual footer link column
.footer-bottom     — bottom bar with Koyr credit
```

#### Sections
```
.section                — base section, --color-page background
.section--surface       — white background
.section--warm          — warm-tinted background
.section--muted         — subtle gray
.section--dark          — dark, white text
.section--dark-gradient — gradient dark, white text
.section--hero          — full-viewport dark, orb decorations
.section-heading        — centered heading block, max-width 680px
.section-heading--left  — left-aligned variant
.hero-orb               — decorative absolute orb element
```

#### Buttons
```
.button                 — base
.button--primary        — gradient red (main CTA)
.button--secondary      — white + border (light sections)
.button--ghost          — text only, soft hover
.button--outline-dark   — glass border (dark sections)
.button--glass          — frosted glass (dark sections)
.button--light          — white button on gradient/CTA band
.button--sm / --lg      — size modifiers
.button--full           — full width
.button-group           — flex container for button pairs
```

#### Cards
```
.card                   — standard light card
.card--interactive      — hover lift + shadow
.card--warm             — warm gradient fill
.card--glass            — frosted glass (dark only)
.card--glass-interactive — glass with hover
.card-icon              — icon block inside card
.card-number            — numbered label inside card
.stat-card              — metric display card
```

#### Badges
```
.badge                  — neutral
.badge--brand           — red brand
.badge--success         — green
.badge--warning         — amber
.badge--info            — blue
.badge--dark            — dark section neutral
.badge--dark-brand      — dark section brand accent
.badge-dot              — coloured dot inside badge
```

#### Banners and Bands
```
.feature-band           — split copy + visual card
.feature-band--warm     — warm-tinted fill
.feature-band--glass    — glass variant (dark sections)
.feature-panel          — visual area inside feature band
.feature-copy           — content column inside feature band
.cta-band               — full-width gradient CTA block
.cta-band__inner        — relative wrapper for CTA content
.trust-strip            — horizontal row of trust signals
.trust-item             — single trust signal
.app-badges             — app store badges group
.app-badge              — single app store link
```

#### Forms
```
.form                   — grid form wrapper
.form-field             — label + input group
.form-input / .form-textarea / .form-select — standalone inputs
.form-help              — helper text below input
.form-status            — success / error / loading feedback
.form-status--success / --error / --loading
.form-check             — checkbox or radio row
.form--dark             — dark section form variant
```

#### Accordions / FAQ
```
.accordion-list         — standard accordion group
.faq-list               — FAQ-sized accordion
.faq-list--dark / .accordion-list--dark — dark section variants
```

#### Legal
```
.legal-layout           — full layout wrapper
.legal-layout--with-toc — sticky sidebar + article
.legal-header           — page title + meta date
.legal-meta             — last-updated / effective date row
.legal-toc              — sticky sidebar table of contents
.legal-article          — article column
.legal-section          — bordered article group
.legal-table            — styled data table
.legal-contact-box      — highlighted contact block
.legal-callout          — left-border callout box
.legal-supplement-note  — supplementary terms notice
```

#### Utilities
```
.skip-link              — accessibility skip navigation
.sr-only                — visually hidden, screen-reader accessible
.reveal                 — scroll-triggered fade-up entrance
.reveal--fade           — fade only, no movement
.reveal--scale          — scale-in entrance
.anim-float             — CSS looping float animation
.anim-orb               — CSS looping orb drift
.anim-pulse-dot         — pulsing brand dot
.anim-pulse-success     — pulsing success dot
.status-dot             — live / pending / error indicator
.glass-surface          — glass fill + blur utility
.divider                — horizontal rule
.mesh-noise             — decorative noise texture overlay
.text-center / .text-left / .text-right
.desktop-only / .mobile-only / .tablet-only
```

---

---

## 10. RESPONSIVE BREAKPOINT STRATEGY

### Breakpoints

| Breakpoint | Width | Role |
|------------|-------|------|
| Base | `0px` | Mobile-first default — smallest Android (360px) |
| `xs` | `480px` | Large phones — refine type, some layout adjustments |
| `sm` | `640px` | Small tablets — 2-column compact areas |
| `md` | `768px` | Tablet — main layout changes, hide desktop nav |
| `lg` | `1024px` | Desktop — full grid, sticky TOC, feature bands split |
| `xl` | `1280px` | Wide — refinements for large screens |

### Breakpoint Usage Rules

```css
/* Mobile-first — always write base styles for mobile first */
.component { ... }                    /* 360px–767px */
@media (min-width: 640px) { ... }    /* Small tablet up */
@media (min-width: 768px) { ... }    /* Tablet up */
@media (min-width: 1024px) { ... }   /* Desktop up */
@media (min-width: 1280px) { ... }   /* Wide desktop */
```

### Critical Layout Transitions

| Behaviour | Breakpoint |
|-----------|-----------|
| Mobile menu activates (hamburger shown) | Below `960px` |
| Desktop nav hidden | Below `960px` |
| Hero split-grid collapses to single column | Below `1024px` |
| Feature band collapses to single column | Below `1024px` |
| `.grid--4` becomes 2-column | Below `1024px` |
| `.grid--3` and `.grid--2` collapse to 1-col | Below `768px` |
| `.grid--4` becomes 1-column | Below `640px` |
| Legal sidebar TOC hidden | Below `1024px` |
| Footer 5-column → 2-column | Below `1024px` |
| Footer 2-column → 1-column | Below `640px` |
| Button groups stack to full-width | Below `480px` |
| Container padding reduced to `20px` | Below `768px` |
| `.hero-orb` reduced in size | Below `768px` |

### Touch and Mobile Rules

1. **Minimum tap target: 44px × 44px** — applies to all buttons, nav links, accordion toggles
2. **No hover-dependent content** — all interactive information must be accessible without hover
3. **No horizontal scroll** — `overflow-x: hidden` on `body`, images always `max-width: 100%`
4. **Mobile navigation drawer** closes when: a link is clicked, Escape is pressed, viewport resizes above 960px
5. **CTA buttons stack to full-width on mobile** — never compress side-by-side below 480px

---

---

## 11. SHARED MOTION / ANIMATION STRATEGY

### Motion Philosophy

**Fast, purposeful, premium.** Motion communicates state, trust, and operational confidence — not decoration.

### Timing Tokens

| Token | Duration | Used For |
|-------|----------|---------|
| `--duration-instant` | `80ms` | Instant feedback (active states) |
| `--duration-fast` | `150ms` | Micro-interactions (hover, focus rings) |
| `--duration-base` | `240ms` | UI transitions (mobile menu, toggle) |
| `--duration-slow` | `480ms` | Scroll reveals, card entrances |
| `--duration-xslow` | `720ms` | Complex entrance sequences |

### Easing Tokens

| Token | Curve | Personality |
|-------|-------|------------|
| `--ease-standard` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | General purpose, smooth |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy — card hover, menu open |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Scroll reveals — fast settle |
| `--ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Ambient loops |

### Allowed Motion Patterns

| Pattern | Element | Duration | Easing |
|---------|---------|---------|--------|
| Header scroll shadow | `.site-header` | `240ms` | `--ease-standard` |
| Mobile menu open/close | `.mobile-menu` | `240ms` | `--ease-out-expo` |
| Button hover lift | `.button` | `150ms` | `--ease-spring` |
| Card hover lift | `.card--interactive` | `240ms` | `--ease-spring` |
| Glass card hover | `.card--glass-interactive` | `240ms` | `--ease-spring` |
| Nav link colour | `.desktop-nav a` | `150ms` | `--ease-standard` |
| Scroll reveal entrance | `.reveal` | `480ms` | `--ease-out-expo` |
| Staggered reveal delays | `[data-delay="1–6"]` | `60ms` increments | — |
| Ambient orb drift | `.hero-orb` | `12–20s loop` | `--ease-smooth` |
| Live status pulse | `.status-dot--live` | `2.4s loop` | `ease-in-out` |
| Floating UI element | `.anim-float` | `4s loop` | `--ease-smooth` |
| Accordion open/close | `<details>` | `150ms` | `--ease-standard` |

### Scroll Reveal System

```
.reveal              = opacity: 0, translateY(18px) → visible
.reveal--fade        = opacity: 0 → visible (no movement)
.reveal--scale       = opacity: 0, scale(0.95) → visible
[data-delay="1–6"]   = 60ms stagger increment per item
```

Triggered by `IntersectionObserver` at `threshold: 0.10` with `rootMargin: 0px 0px -40px 0px`.

### Motion Restrictions

1. **Orb animations must use `filter: blur(80px)` minimum** — never let them look like shapes
2. **Card hover lift is `translateY(-5px)` maximum** — never rotate, tilt, or skew cards
3. **Button hover lift is `translateY(-2px)` maximum**
4. **No looping animations on legal or support pages** — orbs only on hero/dark sections of homepage, vendor, and rider pages
5. **All animations must be wrapped in `prefers-reduced-motion` guards** — handled globally in `reset.css`
6. **No autoplay video** unless it is muted, looped, and `<5MB`
7. **No parallax effects** — causes motion sickness and poor performance on low-end Android

---

---

## 12. ASSET STRUCTURE

### Image Directories

| Directory | Contents | Naming convention |
|-----------|---------|-------------------|
| `assets/images/logo/` | SVG logo, wordmark, icon variants, favicon source (512px) | `swiftcart-logo.svg`, `swiftcart-icon.svg` |
| `assets/images/icons/` | Custom SVG icons not achievable in CSS | `icon-[name].svg` |
| `assets/images/illustrations/` | Feature and section illustrations | `[feature]-illustration.svg` |
| `assets/images/og/` | Open Graph social preview images | `[page-name]-og.jpg` |
| `assets/images/brand/` | Brand sheets, colour references | Internal only |
| `assets/images/home/` | Hero imagery, app screenshots, marketplace scenes | `hero-[description].webp` |
| `assets/images/pages/` | Vendor, rider, support, contact page images | `[page]-[description].webp` |
| `assets/images/legal/` | Legal page supporting imagery (restrained) | `[page]-header.webp` |

### Preferred Formats

| Format | Use |
|--------|-----|
| `.webp` | All photography and raster imagery (primary) |
| `.jpg` | Fallback for `.webp` in `<picture>` |
| `.svg` | All icons, logos, illustrations, decorative shapes |
| `.png` | Only when transparency required and SVG not viable |
| `.mp4` / `.webm` | Ambient video loops only (Phase 6) |

### Image Rules

1. **Every `<img>` must have `width` and `height` attributes** — prevents layout shift (CLS)
2. **Every `<img>` must have a meaningful `alt` attribute** — decorative images use `alt=""`
3. **Above-fold images use `loading="eager"`** — all below-fold use `loading="lazy"`
4. **Above-fold hero image target: under 200KB after compression**
5. **Card images target: under 80KB**
6. **Use `<picture>` with `<source type="image/webp">` + `<img>` JPG fallback** for photographs
7. **Prefer real operational imagery** — store prep, rider on a bike, order handoff, Badagry context
8. **Avoid stock photography** with obviously non-Nigerian subjects, generic office environments

---

---

## 13. SEO STRUCTURE

### Per-Page Required Tags

```html
<!-- Required on every page -->
<title>[Page Title] — SwiftCart</title>
<meta name="description" content="[Unique description, 140–160 chars]">
<meta name="theme-color" content="#E8391D">
<link rel="canonical" href="https://swiftcartapp.co/[page]">

<!-- Open Graph -->
<meta property="og:type"        content="website">
<meta property="og:url"         content="https://swiftcartapp.co/[page]">
<meta property="og:title"       content="[Same as <title>]">
<meta property="og:description" content="[Same as meta description]">
<meta property="og:image"       content="https://swiftcartapp.co/assets/images/og/[page]-og.jpg">
<meta property="og:image:width"  content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale"      content="en_NG">
<meta property="og:site_name"   content="SwiftCart">

<!-- Twitter Card -->
<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:title"       content="[Same as <title>]">
<meta name="twitter:description" content="[Same as meta description]">
<meta name="twitter:image"       content="https://swiftcartapp.co/assets/images/og/[page]-og.jpg">
```

### Page SEO Targets

| Page | Title | Primary keyword |
|------|-------|----------------|
| `/` | SwiftCart — Local commerce and delivery in Badagry, Lagos | SwiftCart Badagry delivery |
| `/partner-with-us` | Partner with SwiftCart — Vendor onboarding in Badagry, Lagos | vendor delivery platform Nigeria |
| `/become-a-rider` | Become a Rider — Delivery opportunities in Badagry, Lagos | rider jobs Badagry |
| `/support` | Support Centre — SwiftCart Help and Disputes | SwiftCart support |
| `/contact` | Contact SwiftCart — Business enquiries and support routing | contact SwiftCart |
| `/delete-account` | Delete Your Account — SwiftCart Data Request | SwiftCart account deletion |
| `/privacy` | Privacy Policy — SwiftCart | SwiftCart privacy policy Nigeria |
| `/terms` | Terms of Service — SwiftCart | SwiftCart terms of service |
| `/vendor-terms` | Vendor Terms and Conditions — SwiftCart | SwiftCart vendor terms |
| `/rider-terms` | Rider Terms and Conditions — SwiftCart | SwiftCart rider terms |

### Structured Data (JSON-LD)

**Homepage** — Organisation schema:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SwiftCart",
  "url": "https://swiftcartapp.co",
  "logo": "https://swiftcartapp.co/assets/images/logo/swiftcart-icon.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@swiftcartapp.co",
    "availableLanguage": "English"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Badagry, Lagos, Nigeria"
  }
}
```

**Support page** — FAQ schema (real questions only, not fabricated).

**Vendor/Rider pages** — Service schema optional.

### Legal Page SEO Rules

- Legal pages **must be indexable** — do not add `noindex`
- Legal pages **must not contain marketing copy** — Google penalises mixed-intent pages
- Legal pages **must state last-updated date** in visible text
- Legal pages **must include `support@swiftcartapp.co` or `support@swiftcartapp.co`** in visible contact section

---

---

## 14. NAVIGATION ARCHITECTURE

### Desktop Header Structure

```
[Brand lockup]    [Primary Nav]                            [Actions]
SwiftCart         Customers | Vendors | Riders | Support   Contact  [Join SwiftCart →]
```

### Primary Navigation Links

| Label | Destination | Notes |
|-------|------------|-------|
| Customers | `/#customers` | Scrolls to ecosystem section on homepage |
| Vendors | `partner-with-us.html` | Full page |
| Riders | `become-a-rider.html` | Full page |
| Support | `support.html` | Full page |

### Secondary Navigation (Actions)

| Element | Destination | Type |
|---------|------------|------|
| Contact | `contact.html` | Ghost link |
| Join SwiftCart | `#app` (or app store link) | `.button--primary .button--sm` |

### Mobile Navigation

```
[Brand]                                      [Hamburger ≡]

Panel (dropdown, floating, rounded):
  Customers
  Vendors
  Riders
  Support
  ──────────
  Contact
  [Join SwiftCart →]   ← .button--primary full-width
```

### Navigation Rules

1. **Legal pages do NOT appear in primary navigation** — they belong only in the footer and onboarding flows
2. **Support IS in primary navigation** — operational trust is a core launch requirement
3. **Active page state** (`aria-current="page"`) is applied to the matching nav link on every page
4. **Header mode matches page context:**
   - Dark hero pages (homepage, partner, rider): `data-header-dark` on `<header>`
   - Light pages (legal, support, contact, delete): no `data-header-dark`
5. **CTA label changes per page context:**
   - Homepage: "Join SwiftCart"
   - Vendor page: "Start application"
   - Rider page: "Apply to ride"
   - Legal/support pages: "Get support" or "Join SwiftCart" depending on page intent

### Header Data Attributes (required for JS)

```html
data-header       → on <header class="site-header">
data-menu-button  → on <button class="menu-button">
data-mobile-menu  → on <nav class="mobile-menu">
```

---

---

## 15. FOOTER ARCHITECTURE

### Layout

```
[Brand + tagline + location badge + app links]    [Platform]   [Onboarding]   [Support]   [Legal]
                                                   Customer     Partner         Support     Privacy
                                                   Vendor       Become rider    Contact     Terms
                                                   Rider        Vendor verify   Delete acct Vendor Terms
                                                   Admin Ops    Rider verify    Email link  Rider Terms

───────────────────────────────────────────────────────────────────────────────────────────────────
Payments: Paystack · SMS/OTP: Termii       SwiftCart is a product of Koyr ❤️       © 2026 SwiftCart
```

### Footer Column Contents

**Brand column (1.6fr):**
- Logo lockup (white on dark)
- Tagline: "A Nigerian local commerce and delivery marketplace, launching first in Badagry, Lagos."
- Location badge with green pulse dot: "Badagry, Lagos — Live"
- App store link placeholders (Apple App Store, Google Play)

**Platform column:**
- Customer App → `/#customers`
- Vendor App → `partner-with-us.html`
- Rider App → `become-a-rider.html`
- Admin Operations → `/#customers` (referenced, not a public login link)

**Onboarding column:**
- Partner with us → `partner-with-us.html`
- Become a rider → `become-a-rider.html`
- Vendor verification → `partner-with-us.html#verification`
- Rider verification → `become-a-rider.html#verification`

**Support column:**
- Support centre → `support.html`
- Contact us → `contact.html`
- Delete account → `delete-account.html`
- `support@swiftcartapp.co` → `mailto:support@swiftcartapp.co`

**Legal column:**
- Privacy Policy → `privacy.html`
- Terms of Service → `terms.html`
- Vendor Terms → `vendor-terms.html`
- Rider Terms → `rider-terms.html`

### Footer Bottom Bar (left to right)

```
[Paystack + Termii note]     [SwiftCart is a product of Koyr ❤️]     [© year SwiftCart]
```

The copyright year is auto-updated by a small inline `<script>` using `new Date().getFullYear()`.

### Footer Rules

1. **Footer is identical on every page** — copy it verbatim. Only `aria-current="page"` changes.
2. **Dark background (`--color-dark`)** — white and muted text only
3. **Paystack reference is mandatory** in the footer bottom note — SwiftCart is not a payment processor
4. **"SwiftCart is a product of Koyr ❤️"** appears in the footer bottom bar on every page
5. **Location badge with green pulse dot** signals the platform is live and operational
6. **App store links** are placeholders until app store listings are live — link to `#app` or a waitlist form

---

---

## 16. IMAGE DIMENSION RECOMMENDATIONS

### Homepage

| Image | Source size | Render size (desktop) | Format | Max file size |
|-------|------------|----------------------|--------|--------------|
| Hero background orb | CSS only (radial-gradient) | — | CSS | 0 |
| Hero app mockup / screenshot | `1170 × 2532px` (iPhone ratio) | `~320 × 693px` | WebP | 180KB |
| Hero floating card decoration | CSS or SVG | — | CSS/SVG | — |
| Ecosystem / role card images | `720 × 540px` | `~280 × 210px` | WebP | 60KB |
| Vendor feature panel image | `1400 × 900px` | `~520 × 380px` | WebP | 120KB |
| Rider feature panel image | `1400 × 900px` | `~520 × 380px` | WebP | 120KB |
| Trust section icons | SVG | 32px | SVG | 4KB |
| CTA band (CSS gradient) | CSS only | — | CSS | 0 |

### Operational Pages (vendor, rider, support, contact)

| Image | Source size | Max file size |
|-------|------------|--------------|
| Page hero supporting image | `1400 × 800px` | 200KB |
| Section supporting image | `1200 × 700px` | 150KB |
| Icon set | SVG | 3–8KB each |

### Legal Pages

| Image | Use | Max file size |
|-------|-----|--------------|
| None (generally) | Legal pages use typography only | — |
| Optional header image | `1200 × 400px` subtle, restrained | 80KB |

### Open Graph / Social

| Image | Size | Format | Notes |
|-------|------|--------|-------|
| Default OG (`homepage-og.jpg`) | `1200 × 630px` | JPG | Shared when no page OG set |
| Per-page OG | `1200 × 630px` | JPG | One per page |
| Favicon source | `512 × 512px` | SVG or PNG | Used to generate all favicon sizes |
| Apple touch icon | `180 × 180px` | PNG | Referenced in `site.webmanifest` |

### Performance Targets

- **Hero image (above fold):** under 200KB after WebP compression
- **Card / feature images:** under 100KB each
- **Total page weight target (homepage, no video):** under 1.2MB uncompressed, under 600KB compressed
- **All images:** use `width` and `height` attributes to prevent CLS (Cumulative Layout Shift)
- **All below-fold images:** `loading="lazy"`

---

---

## 17. WEBSITE VISUAL DIRECTION

### The Look

Dark heroes with ambient red gradient orbs create immediate energy. White sections provide breathing room and contrast. Glass cards float on dark backgrounds. Clash Display headings are bold and confident. The red gradient button is always the most visually dominant element on screen.

This feels like a real platform — not a Figma template.

### Section-by-Section Visual Direction

**Hero section (homepage, vendor, rider pages):**
- Very dark background (#0A0A0F)
- Large radial gradient orb — brand red, blurred to 80px+, upper-right quadrant
- Secondary smaller orb — lower left, lower opacity
- Clash Display headline at 56–72px, white, weight 700
- Subtitle in `var(--color-dark-muted)`, Satoshi, 18–20px
- Two CTAs: gradient red button + glass or outline button
- Trust badges row underneath (white or glass pill badges)
- Hero visual: phone mockup or product illustration — right column on desktop, below text on mobile

**White / light sections:**
- Background: white or `--color-page` (#F8F8F8)
- Cards with `1px solid var(--color-line)` border and subtle shadow
- Headings in `--color-ink`, body in `--color-ink-muted`
- Red used only as accent: eyebrow labels, icon fills, active states

**Dark sections (alternating with white):**
- Background: `--color-dark` or `--color-dark-2`
- Glass cards: `rgba(255,255,255,0.06)` fill, `rgba(255,255,255,0.12)` border, `blur(22px)`
- Headings in white, body in `--color-dark-muted`
- Green success indicators contrast well against dark
- No orb animations unless it is the full hero section

**CTA band:**
- Full-width gradient (`#E8391D → #FF5722 → #FF6B35`)
- Subtle noise texture overlay + radial sheen overlay
- White headline, white/80% opacity body text
- Two buttons: `.button--light` + `.button--outline-dark`

**Legal pages:**
- Pure white — no dark sections, no animations, no orbs
- Narrow content column (760px max)
- Clean table layout for data retention, refund tiers, etc.
- Left-border callout for important notices
- Contact box in brand-soft colour at section end

### Visual Elements to Use

| Element | Where | Purpose |
|---------|-------|---------|
| Ambient gradient orbs | Dark hero sections | Energy, depth, brand presence |
| Phone mockup (CSS or image) | Homepage hero visual | Product preview |
| Frosted glass cards | Dark sections | Premium depth, modern feel |
| Gradient buttons with glow | All primary CTAs | Visual dominance, confidence |
| Green pulse dot | Footer location badge, live status | Operational readiness |
| Progress bar (CSS) | Vendor/rider application card | Process illustration |
| Route line (CSS gradient) | Rider section visual | Delivery route metaphor |
| Verification card (CSS) | Vendor section visual | Trust and process |
| Grid-pattern background | Feature panels | Depth without heavy imagery |
| Trust strip with icons | Below hero CTA or section | Compliance and operational signals |

### Visual Elements to Avoid

| Avoid | Because |
|-------|---------|
| Purple/blue gradient palette | Reads as generic SaaS, not SwiftCart |
| Stock photography with non-Nigerian subjects | Disconnects from local identity |
| Large illustration libraries (e.g. Undraw) | Makes the site look like every other startup |
| Dark overlays covering the entire page | Makes legal and support pages feel ominous |
| Card-inside-card-inside-card nesting | Creates visual noise, poor mobile experience |
| Parallax scroll effects | Motion sickness, poor performance on budget Android devices |
| Countdown timers or urgency manipulation | Inappropriate for a compliance-sensitive platform |
| Comic or illustrative UI style | Clashes with operational seriousness required |

---

---

## 18. PAGE-TO-PAGE CONSISTENCY RULES

### Structural Consistency

Every page must have:
- ✅ Exactly one `<h1>` — never zero, never two
- ✅ `<a class="skip-link" href="#main">` as first child of `<body>`
- ✅ `<main id="main">` wrapping all page content
- ✅ Identical `<header>` markup (only `data-header-dark` differs)
- ✅ Identical `<footer>` markup (only `aria-current` link differs)
- ✅ Unique `<title>` and `<meta name="description">`
- ✅ Unique `<link rel="canonical">`
- ✅ Unique `og:url` and `og:title`
- ✅ Page-specific CSS file linked after `css/main.css`
- ✅ `<script type="module" src="js/main.js">` in `<head>`

### Typography Consistency

- ✅ Eyebrow label always appears before section `h2`
- ✅ `h2` section headings are consistent case (sentence case, not ALL CAPS)
- ✅ Body text font-size is `16px` (`--text-body`) on all pages — never smaller for standard content
- ✅ Legal pages use `--text-body` at `15px` — slightly tighter for dense content
- ✅ CTA button labels are specific and action-oriented: not "Click here", "Learn more", or "Submit"

### Content Consistency

| Always say | Never say |
|-----------|-----------|
| "Badagry, Lagos" | Just "Lagos" or "Nigeria" |
| "independent delivery service providers" | "employees" or "our riders" |
| "marketplace technology platform" | "delivery company" or "logistics firm" |
| "Available Earnings" / "Pending Payouts" | "wallet" / "bank account" / "savings" |
| "payments processed by Paystack" | "SwiftCart processes payments" |
| "support@swiftcartapp.co" | Any other support email |
| "support@swiftcartapp.co" | For all data/privacy requests |
| "SwiftCart is a product of Koyr ❤️" | In footer bottom bar, every page |

### CTA Consistency

| Page | Primary CTA label | Secondary CTA label |
|------|------------------|-------------------|
| Homepage | "Join SwiftCart" | "Partner with us" |
| Vendor page | "Partner with SwiftCart" | "Contact us" |
| Rider page | "Apply to ride" | "Learn more" |
| Support | "Contact support" | — |
| Contact | "Send message" | — |
| Delete account | "Request deletion" | "Contact support" |
| Legal pages | — (no primary CTA — just navigation) | — |

### Design Consistency

- ✅ All sections use `--space-24` vertical padding on desktop (except `--compact` variants)
- ✅ All cards use `--radius-lg` (22px) — no custom radius per-page
- ✅ All buttons are `--radius-full` — no per-page radius exceptions
- ✅ Brand red (`--color-brand`) is never used as a large background fill on white text — only gradient
- ✅ Glass cards are only used on dark sections — never on white backgrounds
- ✅ Orb animations are only in hero sections — not on legal or support pages
- ✅ All section headings use `.section-heading` with `.eyebrow` above `h2`
- ✅ `.reveal` is applied to all major section content blocks for entrance motion

### Navigation Consistency

- ✅ `aria-current="page"` is set on the correct nav link for every page
- ✅ Legal pages have no active primary nav link — these pages are footer-only in navigation
- ✅ Mobile menu has the same links as desktop nav in the same order
- ✅ Footer legal column links are complete on every page

### Accessibility Consistency

- ✅ All interactive elements have visible focus rings (defined globally in `utilities.css`)
- ✅ All images have `alt` attributes
- ✅ Decorative elements use `aria-hidden="true"`
- ✅ Form labels are explicitly associated with inputs (`for` / `id` pairing)
- ✅ Accordion `<details>/<summary>` are used for all FAQ content — no custom JS accordion
- ✅ Colour contrast: white on brand red must meet WCAG AA (4.5:1 minimum)
- ✅ No information conveyed by colour alone — always pair colour with text or icon

---

*Phase 1 architecture is complete and sealed.*
*Nothing in Phases 2–6 may contradict the decisions documented here.*
*If a design decision needs to change, update this document first.*
