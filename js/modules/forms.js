/**
 * SwiftCart — Form Utilities
 *
 * Covers:
 * - Field validation engine (rules-based)
 * - Per-field error display / clear
 * - Form serialisation
 * - Async submission wrapper (fetch + loading states)
 * - Status message helper
 *
 * Usage:
 *   import { initContactForm } from "./modules/forms.js";
 *   initContactForm("#contact-form");
 */

import { qs, on } from "./dom.js";


/* ─────────────────────────────────────────────────────────
   SERIALISATION
───────────────────────────────────────────────────────── */

/** Collect all named form inputs into a plain object. */
export function serializeForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}


/* ─────────────────────────────────────────────────────────
   STATUS MESSAGE
───────────────────────────────────────────────────────── */

/**
 * Set a form-level status message element.
 * @param {HTMLElement} node  – The .form-status element
 * @param {string}      msg   – Display message
 * @param {string}      type  – "success" | "error" | "loading" | "warning"
 */
export function setFormStatus(node, msg, type = "success") {
  if (!node) return;
  node.textContent = msg;
  node.className = `form-status form-status--${type}`;
  node.removeAttribute("hidden");
  node.setAttribute("role", type === "error" ? "alert" : "status");
}

/** Clear a form-level status message. */
export function clearFormStatus(node) {
  if (!node) return;
  node.textContent = "";
  node.className = "form-status";
  node.setAttribute("hidden", "");
}


/* ─────────────────────────────────────────────────────────
   PER-FIELD ERROR HANDLING
───────────────────────────────────────────────────────── */

/**
 * Mark a field as invalid and show its error message.
 * Looks for .form-field wrapping the input, then a
 * sibling [data-error] element for the message.
 */
export function showFieldError(input, message) {
  const field = input.closest(".form-field");
  if (!field) return;

  field.classList.add("form-field--error");
  field.classList.remove("form-field--success");
  input.setAttribute("aria-invalid", "true");

  let errEl = field.querySelector("[data-error]");
  if (!errEl) {
    errEl = document.createElement("p");
    errEl.className = "form-help";
    errEl.setAttribute("data-error", "");
    errEl.setAttribute("role", "alert");
    field.appendChild(errEl);
  }
  errEl.textContent = message;
  errEl.removeAttribute("hidden");
}

/** Remove the error state from a single field. */
export function clearFieldError(input) {
  const field = input.closest(".form-field");
  if (!field) return;

  field.classList.remove("form-field--error");
  input.removeAttribute("aria-invalid");

  const errEl = field.querySelector("[data-error]");
  if (errEl) errEl.setAttribute("hidden", "");
}

/** Mark a field as valid (green border). */
export function markFieldValid(input) {
  const field = input.closest(".form-field");
  if (!field) return;

  field.classList.remove("form-field--error");
  field.classList.add("form-field--success");
  input.removeAttribute("aria-invalid");

  const errEl = field.querySelector("[data-error]");
  if (errEl) errEl.setAttribute("hidden", "");
}

/** Clear all field errors in a form. */
export function clearAllErrors(form) {
  form.querySelectorAll(".form-field--error, .form-field--success").forEach((field) => {
    field.classList.remove("form-field--error", "form-field--success");
  });

  form.querySelectorAll("[aria-invalid]").forEach((el) => {
    el.removeAttribute("aria-invalid");
  });

  form.querySelectorAll("[data-error]").forEach((el) => {
    el.setAttribute("hidden", "");
    el.textContent = "";
  });
}


/* ─────────────────────────────────────────────────────────
   VALIDATION ENGINE
───────────────────────────────────────────────────────── */

const VALIDATORS = {
  required: (val) =>
    val.trim().length > 0 || "This field is required.",

  email: (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim()) ||
    "Please enter a valid email address.",

  phone: (val) =>
    /^[+]?[\d\s\-().]{7,15}$/.test(val.trim()) ||
    "Please enter a valid phone number.",

  minLength: (min) => (val) =>
    val.trim().length >= min || `Must be at least ${min} characters.`,

  maxLength: (max) => (val) =>
    val.trim().length <= max || `Must be no more than ${max} characters.`,

  pattern: (regex, msg) => (val) =>
    regex.test(val.trim()) || msg,

  match: (otherSelector, msg) => (val, form) => {
    const other = form.querySelector(otherSelector);
    return !other || val === other.value || msg;
  },
};

/**
 * Validate a single field against an array of rule names or functions.
 * Returns null if valid, error string if invalid.
 *
 * Rule examples:
 *   "required"
 *   "email"
 *   "phone"
 *   ["minLength", 10]
 *   ["maxLength", 500]
 *   ["pattern", /^\d{11}$/, "Must be 11 digits."]
 *   (val, form) => val === "something" || "Custom error"
 */
function validateField(input, rules, form) {
  const val = input.value ?? "";

  for (const rule of rules) {
    let fn;

    if (typeof rule === "function") {
      fn = rule;
    } else if (typeof rule === "string") {
      fn = VALIDATORS[rule];
    } else if (Array.isArray(rule)) {
      const [name, ...args] = rule;
      fn = VALIDATORS[name]?.(...args);
    }

    if (!fn) continue;

    const result = fn(val, form);
    if (result !== true) return result; // error string
  }

  return null; // valid
}

/**
 * Validate every registered field in a form.
 * @param {HTMLFormElement} form
 * @param {Object}          rules  — { fieldName: ["required", "email", ...] }
 * @returns {boolean}              — true if all fields pass
 */
export function validateForm(form, rules) {
  let allValid = true;

  Object.entries(rules).forEach(([name, fieldRules]) => {
    const input = form.querySelector(`[name="${name}"]`);
    if (!input) return;

    const error = validateField(input, fieldRules, form);
    if (error) {
      showFieldError(input, error);
      if (allValid) input.focus(); // focus first error
      allValid = false;
    } else {
      clearFieldError(input);
    }
  });

  return allValid;
}


/* ─────────────────────────────────────────────────────────
   SUBMIT BUTTON STATE
───────────────────────────────────────────────────────── */

export function setButtonLoading(btn, loading) {
  if (!btn) return;
  if (loading) {
    btn.dataset.originalText = btn.textContent;
    btn.textContent = btn.dataset.loadingText || "Submitting…";
    btn.disabled = true;
    btn.setAttribute("aria-busy", "true");
  } else {
    btn.textContent = btn.dataset.originalText || btn.textContent;
    btn.disabled = false;
    btn.removeAttribute("aria-busy");
  }
}


/* ─────────────────────────────────────────────────────────
   ASYNC FORM SUBMISSION
───────────────────────────────────────────────────────── */

/**
 * Handle async form submission to a URL or custom handler.
 *
 * @param {object} options
 * @param {HTMLFormElement}  options.form
 * @param {object}           options.rules          – Validation rules map
 * @param {string}           [options.endpoint]     – POST URL (optional)
 * @param {Function}         [options.onSubmit]     – Custom async fn(data) → void
 * @param {HTMLElement}      [options.statusEl]     – .form-status element
 * @param {HTMLButtonElement}[options.submitBtn]    – Submit button
 * @param {string}           [options.successMsg]  – Message on success
 * @param {Function}         [options.onSuccess]   – Callback after success
 */
export function initFormSubmit({
  form,
  rules = {},
  endpoint,
  onSubmit,
  statusEl,
  submitBtn,
  successMsg = "Thank you! We'll be in touch shortly.",
  onSuccess,
} = {}) {
  if (!form) return;

  // Live validation — clear error on input
  on(form, "input", (e) => {
    const input = e.target;
    if (input.tagName !== "INPUT" && input.tagName !== "TEXTAREA" && input.tagName !== "SELECT") return;
    if (input.closest(".form-field--error")) {
      clearFieldError(input);
    }
  });

  on(form, "submit", async (e) => {
    e.preventDefault();
    clearAllErrors(form);
    clearFormStatus(statusEl);

    // Validate
    const valid = validateForm(form, rules);
    if (!valid) {
      setFormStatus(statusEl, "Please fix the errors above before submitting.", "error");
      return;
    }

    // Loading
    setButtonLoading(submitBtn, true);
    setFormStatus(statusEl, "Sending…", "loading");

    const data = serializeForm(form);

    try {
      if (typeof onSubmit === "function") {
        // Custom handler (e.g. send to Supabase edge function)
        await onSubmit(data);
      } else if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
      }

      // Success
      setFormStatus(statusEl, successMsg, "success");
      form.reset();
      if (typeof onSuccess === "function") onSuccess(data);

    } catch (err) {
      console.error("[SwiftCart] Form submission error:", err);
      setFormStatus(
        statusEl,
        "Something went wrong. Please try again or contact support@swiftcartapp.co.",
        "error"
      );
    } finally {
      setButtonLoading(submitBtn, false);
    }
  });
}
