/**
 * SwiftCart — Navbar Module
 *
 * Handles:
 * - Sticky header scroll state (.is-scrolled)
 * - Mobile menu open/close with accessibility (aria-expanded)
 * - Escape key closes menu
 * - Resize above breakpoint closes menu
 * - Body scroll lock when menu is open
 *
 * Expects:
 * - [data-header]       on <header>
 * - [data-menu-button]  on the hamburger <button>
 * - [data-mobile-menu]  on the mobile nav panel
 */

import { lockPage, on, qs, setExpanded } from "./dom.js";

export function initNavbar() {
  const header     = qs("[data-header]");
  const menuButton = qs("[data-menu-button]");
  const mobileMenu = qs("[data-mobile-menu]");

  // ── Scroll state ──────────────────────────────────────────
  function syncScrollState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }

  // ── Menu ──────────────────────────────────────────────────
  function closeMenu() {
    if (!menuButton || !mobileMenu) return;
    setExpanded(menuButton, false);
    mobileMenu.classList.remove("is-open");
    lockPage(false);
  }

  function openMenu() {
    if (!menuButton || !mobileMenu) return;
    setExpanded(menuButton, true);
    mobileMenu.classList.add("is-open");
    lockPage(true);
  }

  function toggleMenu() {
    const isOpen = menuButton?.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  }

  // ── Events ────────────────────────────────────────────────
  on(window, "scroll", syncScrollState, { passive: true });

  on(window, "resize", () => {
    if (window.innerWidth > 960) closeMenu();
  });

  on(menuButton, "click", toggleMenu);

  // Close when a menu link is clicked
  on(mobileMenu, "click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });

  // Close on Escape
  on(document, "keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // ── Init ──────────────────────────────────────────────────
  syncScrollState();
}
