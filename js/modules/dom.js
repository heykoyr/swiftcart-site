export const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

export function on(target, event, handler, options) {
  if (!target) return () => {};
  target.addEventListener(event, handler, options);
  return () => target.removeEventListener(event, handler, options);
}

export function setExpanded(control, expanded) {
  if (!control) return;
  control.setAttribute("aria-expanded", String(expanded));
}

export function lockPage(locked) {
  document.body.classList.toggle("is-menu-open", locked);
}
