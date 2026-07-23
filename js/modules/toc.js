/**
 * SwiftCart — Table of Contents Scroll Highlighter
 *
 * Uses IntersectionObserver to track which section heading is
 * currently in view and highlights the matching TOC link.
 *
 * Respects prefers-reduced-motion (still activates — just no
 * smooth scroll behaviour on click).
 *
 * Usage:
 *   import { initTOC } from "./modules/toc.js";
 *   initTOC("[data-toc]", "[data-article]");
 *
 * HTML contract:
 *   <!-- Sidebar -->
 *   <nav class="legal-toc" data-toc>
 *     <ol>
 *       <li><a href="#section-1">Section 1</a></li>
 *       <li><a href="#section-2">Section 2</a></li>
 *     </ol>
 *   </nav>
 *
 *   <!-- Article -->
 *   <article data-article>
 *     <h2 id="section-1">Section 1</h2>
 *     ...
 *     <h2 id="section-2">Section 2</h2>
 *   </article>
 *
 * Active state:
 *   .legal-toc a.is-active  — highlighted in CSS
 */

import { qs, qsa, prefersReducedMotion } from "./dom.js";


export function initTOC(tocSelector = "[data-toc]", articleSelector = "[data-article]") {
  const toc     = qs(tocSelector);
  const article = qs(articleSelector);

  if (!toc || !article) return;

  // Collect all h2 and h3 headings that have an id
  const headings = qsa("h2[id], h3[id]", article);
  if (!headings.length) return;

  // Build a map: heading id → TOC anchor
  const linkMap = new Map();
  qsa("a[href]", toc).forEach((anchor) => {
    const id = anchor.getAttribute("href").replace(/^#/, "");
    if (id) linkMap.set(id, anchor);
  });

  if (!linkMap.size) return;

  // Track the most recent visible heading
  let activeId = null;

  function setActive(id) {
    if (id === activeId) return;
    activeId = id;

    linkMap.forEach((anchor) => anchor.classList.remove("is-active"));

    const anchor = linkMap.get(id);
    if (anchor) {
      anchor.classList.add("is-active");
      // Scroll the TOC sidebar to keep active link visible
      scrollTocToActive(toc, anchor);
    }
  }

  function scrollTocToActive(toc, anchor) {
    const tocRect    = toc.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    const isVisible  =
      anchorRect.top >= tocRect.top &&
      anchorRect.bottom <= tocRect.bottom;

    if (!isVisible) {
      anchor.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  // IntersectionObserver — fire when a heading enters top ~25% of viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: "0px 0px -70% 0px",  // trigger when heading is in top 30%
      threshold: 0,
    }
  );

  headings.forEach((h) => observer.observe(h));

  // Activate the first heading by default (in case page loads mid-way)
  if (headings[0]) setActive(headings[0].id);

  // Smooth scroll on TOC link click (honours reduced-motion)
  toc.addEventListener("click", (e) => {
    const anchor = e.target.closest("a[href^='#']");
    if (!anchor) return;

    e.preventDefault();
    const id  = anchor.getAttribute("href").replace(/^#/, "");
    const target = document.getElementById(id);
    if (!target) return;

    const behaviour = prefersReducedMotion.matches ? "instant" : "smooth";
    target.scrollIntoView({ behavior: behaviour, block: "start" });
    setActive(id);

    // Update the URL hash without triggering a page jump
    history.pushState(null, "", `#${id}`);
  });

  // Return a cleanup function for SPAs (not needed for static site, but good practice)
  return () => observer.disconnect();
}
