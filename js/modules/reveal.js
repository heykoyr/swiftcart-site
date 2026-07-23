/**
 * SwiftCart — Scroll Reveal Module
 *
 * Adds .is-visible to .reveal elements when they enter the viewport.
 * Respects prefers-reduced-motion.
 * Falls back gracefully if IntersectionObserver is unavailable.
 *
 * Selector is configurable so the module can be reused for
 * different element types on operational/legal pages.
 */

import { prefersReducedMotion, qsa } from "./dom.js";

export function initRevealMotion(selector = ".reveal, .reveal--fade, .reveal--scale") {
  const items = qsa(selector);
  if (!items.length) return;

  // If user prefers reduced motion or browser is too old — show everything
  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.10,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  items.forEach((el) => observer.observe(el));
}
