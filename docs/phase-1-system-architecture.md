# SwiftCart Website Phase 1 - System Architecture

Source of truth: `C:\Users\HP ENVY 15\OneDrive\Desktop\SwiftCart\docs\swiftcart-system-architecture.md`

This phase defines the public website architecture only. No final page implementation is included here.

## 1. Sitemap

Primary public pages:

- `/` -> Homepage for customer trust, local launch positioning, app ecosystem overview, vendor/rider entry points.
- `/partner-with-us.html` -> Vendor onboarding, eligibility, verification expectations, marketplace value, application CTA.
- `/become-a-rider.html` -> Rider recruitment, independent provider positioning, verification, safety, earnings expectations, physical onboarding note.
- `/support.html` -> Support categories, response expectations, WhatsApp/email channels, dispute route.
- `/contact.html` -> General contact, business inquiries, support routing, office/operations availability.
- `/delete-account.html` -> Account deletion request guidance, retention obligations, support contact.
- `/privacy.html` -> Privacy Policy, Nigerian data protection posture, data collection, retention, rights.
- `/terms.html` -> Terms of Service for all users.
- `/vendor-terms.html` -> Vendor supplementary terms.
- `/rider-terms.html` -> Rider supplementary terms.

Supporting technical files:

- `/sitemap.xml`
- `/robots.txt`
- `/site.webmanifest`
- `/browserconfig.xml` if needed for Microsoft tiles
- `/404.html` in final deployment phase

Recommended URL policy:

- Use `.html` files for cPanel compatibility.
- Canonical URLs should resolve to clean public routes where hosting permits, for example `https://swiftcartapp.co/privacy`.
- Internal links may use `.html` during static deployment, then be rewritten by `.htaccess` later if desired.

## 2. Folder Structure

Created Phase 1 folders inside `C:\Users\HP ENVY 15\OneDrive\Desktop\SwiftCart\website`:

```text
website/
  index.html                    Existing file; do not treat as final Phase 2 output yet.
  privacy.html                  Phase 4
  terms.html                    Phase 4
  vendor-terms.html             Phase 4
  rider-terms.html              Phase 4
  support.html                  Phase 5
  contact.html                  Phase 5
  delete-account.html           Phase 5
  become-a-rider.html           Phase 5
  partner-with-us.html          Phase 5
  404.html                      Phase 6
  robots.txt                    Phase 6
  sitemap.xml                   Phase 6
  site.webmanifest              Phase 6
  .htaccess                     Phase 6, optional cPanel clean URLs/cache rules
  docs/
    phase-1-system-architecture.md
  css/
    main.css                    Final compiled/import file
    base/
      reset.css
      tokens.css
      typography.css
      utilities.css
    layout/
      grid.css
      header.css
      footer.css
      sections.css
    components/
      buttons.css
      cards.css
      forms.css
      nav.css
      legal.css
      banners.css
      accordions.css
    pages/
      home.css
      legal-pages.css
      operational-pages.css
  js/
    main.js
    modules/
      nav.js
      reveal.js
      forms.js
      accordions.js
      analytics-events.js
  assets/
    fonts/
    icons/
    images/
      brand/
      home/
      pages/
      legal/
      og/
    video/
  legal-versions/
    privacy/
    terms/
    vendor-terms/
    rider-terms/
```

## 3. Shared Website Architecture

Use static semantic HTML, modular CSS, and lightweight vanilla JS. Each page uses the same structural shell:

- Skip link.
- Sticky header with brand, primary navigation, secondary CTA, mobile menu.
- `main` with page-specific content.
- Shared footer with legal, onboarding, support, and company columns.
- Page-specific script only when required.

Content hierarchy should reflect the platform model:

- SwiftCart is a Nigerian local commerce and delivery marketplace.
- Launch market is Badagry, Lagos.
- The platform connects customers, vendors, and independent delivery riders.
- SwiftCart is not a bank, financial institution, payment processor, product manufacturer, product owner, or direct rider employer.
- Payments are handled by Paystack.
- OTP/SMS verification support matters for Termii review and telecom legitimacy.

## 4. Shared Design System

Design personality:

- Premium but practical.
- Local and operational rather than glossy fintech.
- Clear enough for customers, credible enough for vendors, serious enough for riders and compliance reviewers.
- Match the mobile app direction: Satoshi typography, clean surfaces, warm red brand accent, rounded components, quiet shadows.

Core primitives:

- Brand bar/header.
- Responsive container.
- Section blocks.
- Trust strips.
- Role cards for customer/vendor/rider.
- Process steps.
- Compliance cards.
- Support category cards.
- Legal article layout.
- CTA bands.
- Form controls.
- Status/response-time badges.

## 5. Typography System

Font stack:

```css
font-family: "Satoshi", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Scale:

- Display: 56px desktop / 40px tablet / 32px mobile, 1.02 line-height, 700-900 weight.
- H1: 48px / 36px / 30px, 1.08 line-height, 700-900.
- H2: 36px / 30px / 26px, 1.12 line-height, 700.
- H3: 24px / 22px / 20px, 1.2 line-height, 700.
- H4: 18px, 1.35 line-height, 700.
- Body large: 18px, 1.65 line-height, 400-500.
- Body: 16px, 1.65 line-height, 400.
- Small: 14px, 1.5 line-height, 400-500.
- Caption/legal meta: 13px, 1.45 line-height, 500.

Rules:

- No viewport-width font scaling.
- No negative letter spacing.
- Use short line lengths for legal pages: 68-76 characters.
- Use denser type for operational pages than homepage hero content.

## 6. Color System

Tokens:

```css
:root {
  --color-brand: #E8391D;
  --color-brand-dark: #C42E14;
  --color-brand-soft: #FEF2F0;
  --color-ink: #0A0A0A;
  --color-ink-muted: #4B5563;
  --color-ink-soft: #6B7280;
  --color-line: #E5E7EB;
  --color-page: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-surface-warm: #FFF8F5;
  --color-success: #16A34A;
  --color-warning: #D97706;
  --color-danger: #DC2626;
  --color-info: #2563EB;
}
```

Usage:

- Brand red for primary CTAs, active nav states, small highlights.
- White and near-white surfaces for premium calm.
- Warm soft surfaces for local marketplace warmth.
- Green only for trust, successful status, operational readiness.
- Avoid one-note red pages; pair red with white, black, soft gray, and small green/blue operational accents.

## 7. Spacing System

Base spacing token: 4px.

- `--space-1`: 4px
- `--space-2`: 8px
- `--space-3`: 12px
- `--space-4`: 16px
- `--space-5`: 20px
- `--space-6`: 24px
- `--space-8`: 32px
- `--space-10`: 40px
- `--space-12`: 48px
- `--space-16`: 64px
- `--space-20`: 80px
- `--space-24`: 96px

Section spacing:

- Desktop: 88-112px vertical for major homepage bands.
- Tablet: 72-88px.
- Mobile: 56-72px.
- Legal pages: 56px top content spacing, then 28-40px between article groups.

Radius:

- Small controls: 10px.
- Cards: 14-18px, following existing app feel.
- Pills: 999px.
- Avoid overly playful radius on compliance/legal surfaces.

## 8. Grid/Layout System

Containers:

- Standard: max-width 1120px, 24px desktop side padding.
- Wide: max-width 1240px for homepage hero and image grids.
- Narrow: max-width 760px for legal and support article content.

Grids:

- Desktop: 12-column conceptual grid, usually implemented with CSS grid.
- Tablet: 6-column behavior.
- Mobile: 1-column flow, with selective 2-column compact cards only when content remains readable.

Common layouts:

- Hero: two-zone composition only when product screenshots or operational imagery have equal value; otherwise full-width editorial layout.
- Role cards: 3 columns desktop, stacked mobile.
- Process steps: 4 columns desktop, 2 tablet, 1 mobile.
- Legal: article column plus optional sticky table of contents on large screens.

## 9. Component Architecture

Foundation components:

- `.container`, `.container--wide`, `.container--narrow`
- `.section`, `.section--compact`, `.section--warm`, `.section--surface`
- `.button`, `.button--primary`, `.button--secondary`, `.button--ghost`
- `.badge`, `.badge--trust`, `.badge--status`, `.badge--response`
- `.card`, `.card--role`, `.card--process`, `.card--compliance`
- `.app-link-group`
- `.trust-strip`
- `.section-heading`
- `.legal-layout`, `.legal-toc`, `.legal-article`, `.contact-box`
- `.support-card`, `.support-channel`, `.response-time`
- `.form`, `.form-field`, `.form-help`, `.form-status`
- `.site-header`, `.site-nav`, `.mobile-nav`, `.site-footer`

Component rules:

- Components should not encode page-specific spacing.
- Page CSS may arrange components, but should not redefine core styles.
- Legal and operational components must be visually related to homepage components, not separate mini-sites.

## 10. Responsive Breakpoints

Use mobile-first CSS:

- `360px`: minimum supported small Android width.
- `480px`: comfortable large-phone refinements.
- `640px`: small tablet and two-column compact areas.
- `768px`: tablet navigation/layout changes.
- `1024px`: desktop header, sticky legal table of contents, multi-column grids.
- `1280px`: wide layout refinements.

Rules:

- Header mobile menu activates below 900px.
- Footer columns collapse to two columns at tablet and one column on phones.
- CTAs stack on phones, align inline from 640px upward.
- Never let nav labels wrap inside buttons.

## 11. Shared Motion/Animation Strategy

Motion personality:

- Fast, clean, and purposeful.
- Use motion to communicate readiness, routing, confirmation, and trust.
- Avoid decorative motion that makes legal/support pages feel unserious.

Allowed patterns:

- Header shadow/blur transition after scroll.
- Subtle entrance reveal for sections: opacity 0 to 1, translateY 12px to 0.
- Button hover: 120-180ms transform and color.
- Card hover: small lift, never large tilt.
- Mobile nav: 180-220ms slide/fade.
- Reduced motion support via `prefers-reduced-motion`.

Timing:

- Micro-interactions: 120-180ms.
- Section reveals: 420-560ms.
- Mobile menu: 200ms.
- Easing: `cubic-bezier(.2,.8,.2,1)`.

## 12. Asset Structure

Asset categories:

- `assets/images/brand/`: logo lockups, favicon source, app icon.
- `assets/images/home/`: hero imagery, product/app screenshots, marketplace scenes.
- `assets/images/pages/`: support, vendor, rider, contact imagery.
- `assets/images/legal/`: restrained legal/compliance imagery if needed.
- `assets/images/og/`: social preview images.
- `assets/icons/`: SVG icons that are brand-owned or cannot come from CSS.
- `assets/fonts/`: local font files if replacing CDN loading.
- `assets/video/`: lightweight loops only if performance remains good.

Asset rules:

- Prefer real or realistic local commerce imagery over generic office photos.
- Show phones, riders, shops, order handoff, and Badagry/Lagos context when possible.
- Avoid stock-like dark overlays that hide the actual product or operation.
- Compress images to WebP/AVIF in final phase while keeping fallbacks if needed.

## 13. SEO Structure

Global SEO:

- Unique title and meta description per page.
- Canonical URL per page.
- Open Graph title, description, URL, image.
- Twitter card metadata.
- Organization schema for SwiftCart.
- LocalBusiness/Service schema where appropriate.
- FAQ schema only for real FAQ content on support/onboarding pages.

Core keyword themes:

- SwiftCart
- Badagry delivery
- local delivery in Badagry
- vendor delivery platform Nigeria
- rider delivery jobs Badagry
- local commerce Lagos
- Nigerian marketplace delivery app

Compliance pages:

- Must be indexable.
- Must state last updated/effective date.
- Must include contact email.
- Must avoid marketing embellishment inside legal content.

## 14. Navigation Architecture

Desktop header:

- Brand: SwiftCart logo -> `/`
- Primary nav:
  - Customers -> homepage section or `/`
  - Vendors -> `/partner-with-us.html`
  - Riders -> `/become-a-rider.html`
  - Support -> `/support.html`
- Secondary:
  - Contact -> `/contact.html`
  - Primary CTA: Get the app / Join SwiftCart, depending on page context.

Mobile header:

- Logo.
- Menu button with accessible label.
- Drawer/sheet containing the same nav order.
- CTA visible inside drawer.

Navigation rules:

- Keep legal pages out of primary nav; they belong in footer and onboarding flows.
- Keep support visible in primary nav because operational trust is a launch requirement.
- Use active states on all pages.

## 15. Footer Architecture

Footer columns:

- SwiftCart: brand statement, launch location, app ecosystem summary.
- Platform:
  - Customer App
  - Vendor App
  - Rider App
  - Admin Operations System, referenced as operational capability, not public login unless needed.
- Onboarding:
  - Partner with us
  - Become a rider
  - Vendor verification
  - Rider verification
- Support:
  - Support
  - Contact
  - Delete account
  - Email support
  - WhatsApp support placeholder until number is final.
- Legal:
  - Privacy Policy
  - Terms of Service
  - Vendor Terms
  - Rider Terms

Footer must include:

- Badagry, Lagos, Nigeria launch positioning.
- Payment processing note: Paystack handles payments.
- Data/support contact emails where relevant.
- Copyright.

## 16. Image Dimension Recommendations

Homepage:

- Hero product/mockup image: 1440x1200 source, render around 680x560 desktop.
- App screenshots: 1170x2532 source or equivalent phone-ratio PNG/WebP.
- Marketplace scene: 1600x1000 source, crop-safe center.
- Role cards thumbnails: 720x540 source.

Operational pages:

- Vendor page hero/supporting image: 1400x900.
- Rider page hero/supporting image: 1400x900.
- Support/contact image: 1200x800.

SEO/social:

- Open Graph default: 1200x630.
- Page-specific OG: 1200x630.
- Favicon source: 512x512 SVG/PNG.
- Apple touch icon: 180x180.

Performance:

- Above-the-fold hero image target: under 250KB after compression.
- Card images target: under 120KB.
- Use `width` and `height` attributes to prevent layout shift.

## 17. Website Visual Direction

The website should feel like a serious local logistics and commerce operation, not a generic SaaS template.

Visual cues:

- Warm red brand system.
- Clean white cards on quiet gray or warm surfaces.
- Real marketplace moments: store prep, dispatch handoff, rider verification, support operations.
- Premium phone mockups when showing apps.
- Clear badges for "Badagry launch", "Verified vendors", "Rider onboarding", "Paystack payments", "Support 8am-9pm".
- Subtle line icons for operations, safety, payout, support, delivery, verification.

Avoid:

- Fintech dashboards as the dominant visual metaphor.
- Purple/blue gradient SaaS styling.
- Generic corporate copy.
- Overly playful illustrations for legal/compliance pages.
- Huge decorative cards nested inside cards.

## 18. Page-to-Page Consistency Rules

Global consistency:

- Every page uses the same header and footer.
- Every page uses the same section spacing tokens.
- Every page has one clear H1.
- Every page has a primary CTA matched to user intent.
- Legal pages use the same legal article shell.
- Operational pages use the same intro, channel/process, and CTA pattern.
- Navigation labels stay identical across pages.
- Button labels must be specific: "Partner with SwiftCart", "Apply to ride", "Contact support".

Content consistency:

- Always say "Badagry, Lagos" for launch market context.
- Always describe riders as independent delivery service providers.
- Always describe SwiftCart as a marketplace technology platform.
- Always route formal support/legal issues to `support@swiftcartapp.co` or `support@swiftcartapp.co` where appropriate.
- Use Paystack and Termii references carefully: Paystack for payments, Termii/SMS for OTP verification support context.

Implementation consistency:

- Page CSS files only handle page-specific composition.
- Component CSS owns component appearance.
- JS modules must be optional and progressive.
- Pages remain functional without JS except mobile menu enhancements and interactive accordions.
- Accessibility is part of the base system: landmarks, focus states, skip links, labels, keyboard navigation, color contrast.
