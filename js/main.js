import { initNavbar } from "./modules/nav.js";
import { initRevealMotion } from "./modules/reveal.js";
import { initExclusiveDetails } from "./modules/accordions.js";
import { initTOC } from "./modules/toc.js";
import { initAnalytics, trackEvent } from "./modules/analytics.js";
import { qs } from "./modules/dom.js";

/* ════════════════════════════════════════════════════════════════════════
   SITE CONFIG — set these once before launch.
   ──────────────────────────────────────────────────────────────────────
   1. FORMSPREE_ENDPOINT: create a form at https://formspree.io, then paste
      its endpoint here (looks like https://formspree.io/f/abcdwxyz). All
      form submissions go to that one inbox; a `form_type` field on each
      submission tells the coverage check and the waitlist apart.
      Until this is set, forms show the confirmation but DO NOT send.
   2. ANALYTICS: fill ONE of these. `ga` = a Google Analytics 4 id
      "G-XXXXXXXXXX" (free, but sets cookies). `plausibleDomain` = your
      domain for Plausible (cookieless, no consent banner). Leave both
      empty to disable analytics entirely.
   ════════════════════════════════════════════════════════════════════════ */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgogdern";
const ANALYTICS = { ga: "", plausibleDomain: "" };

initAnalytics(ANALYTICS);
initNavbar();
initRevealMotion();
initExclusiveDetails("[data-faq-list]");

if (qs("[data-toc]") && qs("[data-article]")) {
  initTOC("[data-toc]", "[data-article]");
}

const yearEl = document.getElementById("footer-year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const toast = qs("[data-toast]");
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 4200);
}

/* Accessible desktop navigation flyouts. */
const dropdowns = Array.from(document.querySelectorAll("[data-dropdown]"));

function closeDropdowns(except) {
  dropdowns.forEach((dropdown) => {
    if (dropdown === except) return;
    dropdown.classList.remove("is-open");
    dropdown.querySelector("button")?.setAttribute("aria-expanded", "false");
  });
}

dropdowns.forEach((dropdown) => {
  const trigger = dropdown.querySelector("button");
  if (!trigger) return;

  trigger.addEventListener("click", () => {
    const willOpen = !dropdown.classList.contains("is-open");
    closeDropdowns(dropdown);
    dropdown.classList.toggle("is-open", willOpen);
    trigger.setAttribute("aria-expanded", String(willOpen));
  });
});

document.addEventListener("pointerdown", (event) => {
  if (!event.target.closest("[data-dropdown]")) closeDropdowns();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDropdowns();
});

/* ── Form submission → Formspree (AJAX, so we keep the on-page toast) ──────── */
const formspreeConfigured = FORMSPREE_ENDPOINT && !FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID");

async function submitToFormspree(form, extra = {}) {
  const data = new FormData(form);
  Object.entries(extra).forEach(([k, v]) => data.append(k, v));
  if (!formspreeConfigured) {
    // Wiring is in place, but no real endpoint yet. Don't silently claim success
    // in production — warn in the console so it's caught before launch.
    console.warn("[SwiftCart] FORMSPREE_ENDPOINT is not set — submission was not sent. Set it in js/main.js.");
    return { ok: true, unconfigured: true };
  }
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

function setBusy(btn, busy) {
  if (!btn) return;
  btn.disabled = busy;
  btn.setAttribute("aria-busy", String(busy));
  btn.style.opacity = busy ? "0.65" : "";
}

qs("[data-coverage-form]")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const area = new FormData(form).get("area")?.toString().trim();
  if (!area) return;
  const btn = form.querySelector("button");
  setBusy(btn, true);
  const { ok } = await submitToFormspree(form, { form_type: "coverage_check", _subject: `SwiftCart coverage check: ${area}` });
  setBusy(btn, false);
  if (ok) {
    trackEvent("coverage_check", { area });
    showToast(`Thanks — we’ll share coverage news for ${area} as launch expands.`);
    form.reset();
  } else {
    showToast("Something went wrong — please try again in a moment.");
  }
});

/* Contact page: map audience-specific links to the select field. */
const interestSelect = qs("[data-interest-select]");
const requestedInterest = new URLSearchParams(window.location.search).get("interest");
if (interestSelect && requestedInterest && [...interestSelect.options].some((option) => option.value === requestedInterest)) {
  interestSelect.value = requestedInterest;
}

qs("[data-contact-form]")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const fd = new FormData(form);
  const name = fd.get("name")?.toString().trim();
  const interest = fd.get("interest")?.toString() || "unspecified";
  const btn = form.querySelector("button");
  setBusy(btn, true);
  const { ok } = await submitToFormspree(form, {
    form_type: "waitlist",
    _subject: `SwiftCart waitlist — ${interest}${name ? ` — ${name}` : ""}`,
  });
  setBusy(btn, false);
  if (ok) {
    trackEvent("waitlist_signup", { interest });
    showToast(`Thanks${name ? `, ${name}` : ""}. Your SwiftCart interest has been received.`);
    form.reset();
    if (interestSelect && requestedInterest) interestSelect.value = requestedInterest;
  } else {
    showToast("Something went wrong — please try again, or email us directly.");
  }
});
