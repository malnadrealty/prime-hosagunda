"use client";

import { getUtm } from "./utm";

// Lightweight analytics wrapper. Pushes to dataLayer (GTM) and gtag (GA4) when
// present; otherwise no-ops (and logs in dev). No analytics library is bundled.

type EventName =
  | "prime_page_view"
  | "prime_plot_view"
  | "prime_plot_interest"
  | "prime_whatsapp_click"
  | "prime_site_visit_open"
  | "prime_site_visit_submit"
  | "prime_gallery_open"
  | "prime_video_play"
  | "prime_faq_open"
  | "prime_masterplan_plot_select"
  | "prime_sketch_view"
  | "prime_sketch_download";

type Meta = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: EventName, meta: Meta = {}): void {
  if (typeof window === "undefined") return;
  const utm = getUtm() ?? {};
  const payload = { event, ...utm, ...meta };
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (typeof window.gtag === "function") {
      window.gtag("event", event, { ...utm, ...meta });
    }
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.debug("[analytics]", payload);
    }
  } catch {
    /* ignore */
  }
}
