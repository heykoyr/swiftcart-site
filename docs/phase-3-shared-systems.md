# SwiftCart Website Phase 3 - Shared Systems

This phase creates the reusable frontend systems used by the homepage and future legal/operational pages.

## CSS Architecture

Load order:

```html
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/pages/[page].css">
```

`css/main.css` imports shared files only:

- `base/tokens.css` - color, spacing, radius, shadow, motion, container, and font tokens.
- `base/reset.css` - global reset and reduced-motion safeguards.
- `base/typography.css` - heading scale, body text, captions, muted text, eyebrow labels.
- `layout/grid.css` - containers, common grids, split layouts, responsive grid behavior.
- `layout/header.css` - shared navbar, mobile menu, brand lockup.
- `layout/footer.css` - shared footer grid, footer brand, footer legal/support columns.
- `layout/sections.css` - section spacing and section heading patterns.
- `components/buttons.css` - shared button variants and sizes.
- `components/cards.css` - cards, badges, check lists.
- `components/banners.css` - feature bands and CTA bands.
- `components/accordions.css` - reusable details/summary accordions.
- `components/forms.css` - shared form fields and status text.
- `base/utilities.css` - accessibility helpers, reveal motion, responsive display utilities.

Page styles should live in `css/pages/` and only handle page-specific layout or visual compositions.

## JavaScript Architecture

`js/main.js` imports shared utilities:

- `modules/dom.js` - query helpers, event helper, page locking, `aria-expanded`, reduced-motion media query.
- `modules/nav.js` - sticky header state, mobile nav open/close, escape key close, resize safety.
- `modules/reveal.js` - intersection-based reveal animation with reduced-motion support.
- `modules/accordions.js` - exclusive details/summary behavior for FAQ and support lists.
- `modules/forms.js` - form serialization and reusable status helpers.
- `modules/analytics-events.js` - lightweight dataLayer event helper.

All JavaScript is progressive. Pages remain readable without JS; JS enhances navigation, animation, accordions, and future forms.

## Accessibility Helpers

- `.skip-link` is globally available.
- `.sr-only` is globally available for assistive text.
- Focus rings are standardized for buttons, summaries, inputs, textareas, selects, and `.focus-ring`.
- Mobile menu controls use `aria-expanded` and `aria-controls`.
- Reveal motion respects `prefers-reduced-motion`.

## Consistency Rules

- Use tokens from `tokens.css`; do not hardcode repeated spacing, radius, or brand colors in page CSS unless it is a one-off illustration detail.
- Use `.container`, `.container--wide`, or `.container--narrow` for page width.
- Use `.section` and `.section-heading` for vertical rhythm.
- Use `.button` variants for every CTA.
- Use `.card`, `.card--interactive`, `.badge`, `.check-list`, `.feature-band`, and `.accordion-list` before creating page-specific components.
- Keep `css/pages/[page].css` focused on composition and unique visuals only.
