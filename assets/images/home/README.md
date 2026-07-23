# SwiftCart Homepage Asset Recommendations

Phase 2 uses lightweight CSS-built interface visuals so the homepage is cPanel-ready without heavy dependencies. Before launch, replace or augment those visuals with optimized production assets:

- `hero-customer-app.webp`: 1440x1200 source, exported under 250KB, showing the SwiftCart customer app in a delivery context.
- `customer-app-screen.webp`: phone-ratio app screenshot, 1170x2532 source.
- `vendor-app-screen.webp`: phone-ratio app screenshot showing order acceptance and product availability.
- `rider-app-screen.webp`: phone-ratio app screenshot showing pickup and delivery status.
- `badagry-marketplace.webp`: 1600x1000 source, real or realistic local commerce scene.
- `vendor-onboarding.webp`: 1400x900 source, vendor/store preparation or verified merchant moment.
- `rider-onboarding.webp`: 1400x900 source, rider pickup or document/onboarding context.
- `homepage-og.jpg`: 1200x630 social preview in `assets/images/og/`.

Asset rules:

- Prefer WebP or AVIF for production, with JPEG/PNG only when needed.
- Use real SwiftCart app screenshots when available.
- Keep people, storefronts, phones, and delivery handoffs clear and inspectable.
- Avoid dark, generic, or heavily blurred stock imagery.
- Add explicit `width` and `height` attributes when images are added to prevent layout shift.
