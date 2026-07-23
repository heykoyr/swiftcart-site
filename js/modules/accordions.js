import { on, qs } from "./dom.js";

export function initExclusiveDetails(selector) {
  const list = qs(selector);
  if (!list) return;

  on(list, "toggle", (event) => {
    if (event.target.tagName !== "DETAILS" || !event.target.open) return;

    list.querySelectorAll("details").forEach((details) => {
      if (details !== event.target) details.removeAttribute("open");
    });
  }, true);
}
