/**
 * SwiftCart — Analytics loader
 *
 * Supports two providers; enable whichever you use by filling the config in
 * js/main.js. Nothing loads and no cookies are set until you supply an id/domain,
 * so the site ships analytics-ready without tracking anyone by default.
 *
 *   • Google Analytics 4  — free, ubiquitous, SETS COOKIES (may require a consent
 *                           notice under the NDPA/GDPR). Provide a "G-XXXXXXXXXX" id.
 *   • Plausible           — privacy-friendly, COOKIELESS (no consent banner needed).
 *                           Provide your site domain, e.g. "swiftcartapp.co".
 *
 * Custom events are sent to whichever provider is active via trackEvent().
 */

let ready = false;

export function initAnalytics({ ga = "", plausibleDomain = "" } = {}) {
  // Google Analytics 4
  if (ga && /^G-[A-Z0-9]+$/i.test(ga)) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", ga, { anonymize_ip: true });
    ready = true;
  }

  // Plausible (cookieless) — can run alongside or instead of GA
  if (plausibleDomain) {
    const s = document.createElement("script");
    s.defer = true;
    s.setAttribute("data-domain", plausibleDomain);
    s.src = "https://plausible.io/js/script.js";
    document.head.appendChild(s);
    // queue for custom events before the script finishes loading
    window.plausible = window.plausible || function () {
      (window.plausible.q = window.plausible.q || []).push(arguments);
    };
    ready = true;
  }
}

/** Fire a custom event to whichever provider(s) are active. No-op until configured. */
export function trackEvent(name, params = {}) {
  if (!ready) return;
  if (typeof window.gtag === "function") window.gtag("event", name, params);
  if (typeof window.plausible === "function") window.plausible(name, { props: params });
}
