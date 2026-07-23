/**
 * SwiftCart — Toast Notification System
 *
 * Lightweight programmatic toasts for user feedback.
 * The container (#toast-container) is created automatically.
 * Styles live in css/components/alerts.css.
 *
 * Usage:
 *   import { toast } from "./modules/toast.js";
 *
 *   toast({ message: "Order placed!", type: "success" });
 *   toast({ title: "Error", message: "Try again.", type: "error", duration: 6000 });
 */


/* ── Config ────────────────────────────────────────────── */
const DEFAULTS = {
  title:    "",
  message:  "",
  type:     "info",       // "success" | "error" | "warning" | "info"
  duration: 4500,         // ms before auto-dismiss. 0 = sticky.
};

const ICONS = {
  success: "✅",
  error:   "❌",
  warning: "⚠️",
  info:    "ℹ️",
};


/* ── Container ─────────────────────────────────────────── */
function getContainer() {
  let el = document.getElementById("toast-container");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast-container";
    el.setAttribute("aria-live", "polite");
    el.setAttribute("aria-atomic", "false");
    document.body.appendChild(el);
  }
  return el;
}


/* ── Dismiss ────────────────────────────────────────────── */
function dismiss(el) {
  if (el.dataset.dismissed) return;
  el.dataset.dismissed = "1";
  el.classList.add("is-leaving");

  // Remove after animation completes (~duration-base = 240ms)
  el.addEventListener("animationend", () => el.remove(), { once: true });
  // Fallback in case animationend doesn't fire
  setTimeout(() => el.remove(), 400);
}


/* ── Build toast element ────────────────────────────────── */
function buildToast({ title, message, type, duration }) {
  const wrap = document.createElement("div");
  wrap.className = `toast toast--${type}`;
  wrap.setAttribute("role", "status");
  wrap.setAttribute("aria-live", "polite");
  wrap.style.position = "relative";

  const icon = document.createElement("span");
  icon.className = "toast-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = ICONS[type] ?? ICONS.info;

  const body = document.createElement("div");
  body.className = "toast-body";

  if (title) {
    const titleEl = document.createElement("div");
    titleEl.className = "toast-title";
    titleEl.textContent = title;
    body.appendChild(titleEl);
  }

  if (message) {
    const msgEl = document.createElement("div");
    msgEl.className = "toast-msg";
    msgEl.textContent = message;
    body.appendChild(msgEl);
  }

  const closeBtn = document.createElement("button");
  closeBtn.className = "toast-close";
  closeBtn.setAttribute("aria-label", "Dismiss notification");
  closeBtn.textContent = "×";
  closeBtn.addEventListener("click", () => dismiss(wrap));

  wrap.append(icon, body, closeBtn);

  // Progress bar (only for timed toasts)
  if (duration > 0) {
    const bar = document.createElement("div");
    bar.className = "toast-progress";
    bar.style.animationDuration = `${duration}ms`;
    wrap.appendChild(bar);
  }

  return wrap;
}


/* ── Public API ─────────────────────────────────────────── */

/**
 * Show a toast notification.
 *
 * @param {object} options
 * @param {string} [options.title]    – Bold heading (optional)
 * @param {string} options.message    – Main content
 * @param {string} [options.type]     – "success" | "error" | "warning" | "info"
 * @param {number} [options.duration] – Auto-dismiss delay in ms. 0 = sticky.
 */
export function toast(options = {}) {
  const config = { ...DEFAULTS, ...options };
  const container = getContainer();
  const el = buildToast(config);

  container.appendChild(el);

  // Auto-dismiss
  if (config.duration > 0) {
    setTimeout(() => dismiss(el), config.duration);
  }

  return el;
}

/** Convenience wrappers */
export const toastSuccess = (message, title = "")      => toast({ title, message, type: "success" });
export const toastError   = (message, title = "Error") => toast({ title, message, type: "error" });
export const toastWarning = (message, title = "")      => toast({ title, message, type: "warning" });
export const toastInfo    = (message, title = "")      => toast({ title, message, type: "info" });

/** Dismiss all active toasts immediately. */
export function clearAllToasts() {
  document.querySelectorAll(".toast").forEach(dismiss);
}
