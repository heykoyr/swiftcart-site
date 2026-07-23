import { initNavbar } from "./modules/nav.js";
import { initRevealMotion } from "./modules/reveal.js";
import { initExclusiveDetails } from "./modules/accordions.js";
import { initTOC } from "./modules/toc.js";
import { qs } from "./modules/dom.js";

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

qs("[data-coverage-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const area = new FormData(event.currentTarget).get("area")?.toString().trim();
  if (!area) return;
  showToast(`Thanks — we’ll share coverage news for ${area} as launch expands.`);
});

qs("[data-newsletter-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const email = form.querySelector("input")?.value.trim();
  if (!email) return;
  form.reset();
  const message = document.querySelector("[data-newsletter-message]");
  if (message) message.textContent = "You’re on the list. We’ll only send useful launch news.";
  showToast("You’re on the SwiftCart launch list.");
});

/* Contact page: map audience-specific links to the select field. */
const interestSelect = qs("[data-interest-select]");
const requestedInterest = new URLSearchParams(window.location.search).get("interest");
if (interestSelect && requestedInterest && [...interestSelect.options].some((option) => option.value === requestedInterest)) {
  interestSelect.value = requestedInterest;
}

qs("[data-contact-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = new FormData(form).get("name")?.toString().trim();
  showToast(`Thanks${name ? `, ${name}` : ""}. Your SwiftCart interest has been received.`);
  form.reset();
  if (interestSelect && requestedInterest) interestSelect.value = requestedInterest;
});
