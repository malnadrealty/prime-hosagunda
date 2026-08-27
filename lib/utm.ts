"use client";

// UTM / campaign capture. Persists the first-touch campaign for the session so
// it can be attached to any lead submission.

export type Utm = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
};

const KEY = "mrp_utm";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export function captureUtm(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Utm = {};
    let has = false;
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) {
        found[k] = v;
        has = true;
      }
    }
    // Only overwrite stored campaign on a fresh campaign hit (first-touch wins
    // otherwise).
    const existing = getUtm();
    if (has || !existing) {
      const payload: Utm = {
        ...found,
        referrer: document.referrer || undefined,
      };
      window.sessionStorage.setItem(KEY, JSON.stringify(payload));
    }
  } catch {
    /* storage unavailable — ignore */
  }
}

export function getUtm(): Utm | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Utm) : null;
  } catch {
    return null;
  }
}
