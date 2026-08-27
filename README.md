# Malnad Realty PRIME

A production-quality, **reusable** property-landing system for Malnad Realty PRIME.
Mobile-first, image-led, with **live inventory from Google Sheets** and WhatsApp /
site-visit lead capture. The flagship page is **Hosagunda** at `/hosagunda`; new
properties are added by dropping in data — no component changes.

Stack: **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS**.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values (see below)
npm run dev                  # http://localhost:3000  → redirects to /hosagunda
npm run build && npm start   # production
```

## Environment (`.env.local`)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number, digits only (e.g. `919999999999`). **Set the real number.** |
| `INVENTORY_SHEET_ID` + `INVENTORY_SHEET_GID` | Public ("anyone with the link") Google Sheet — read server-side via gviz, no key. Already pointed at the live Hosagunda sheet. |
| `INVENTORY_SHEET_URL` | Alternative: a Google Apps Script Web App returning plot JSON. |
| `GOOGLE_SHEETS_API_KEY` + `INVENTORY_SHEET_RANGE` | Alternative: a private sheet via the Sheets API (server-side only). |
| `INVENTORY_REVALIDATE_SECONDS` | Inventory cache TTL (default 120). |
| `LEAD_WEBHOOK_URL` | Optional. Where lead-form submissions are POSTed (e.g. an Apps Script). |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional GA4 id (`G-XXXX`). Analytics events fire with or without it. |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL for metadata + JSON-LD. |

Secrets stay server-side — nothing sensitive is shipped to the browser.

## Live inventory

The sheet is the source of truth. Columns are matched by header label, so the
current live sheet works as-is:

```
Plot No. | Measurement | Per Gunta Price | Total Price | Booking Status
```

- `Booking Status` of `Available` shows the parcel + an interest CTA; anything else
  (`Booked` / `Sold` / `Hold`) renders as **Booked** with no CTA.
- Update availability or price in the sheet → the site reflects it within the cache
  window (or immediately via the **Refresh availability** button). No code changes.
- If the sheet is ever unreachable, the page falls back to the local seed
  (`config/properties.ts`) and shows a graceful "temporarily updating" note.

## Adding real photos

Drop images into `public/properties/hosagunda/` — filenames are listed in that
folder's `README.md`. Labeled placeholders are shown until the real files exist,
then they load automatically.

## Adding a new PRIME property

1. Add a config object in `config/properties.ts` (copy `hosagunda`) and register it
   in the `properties` map under its slug.
2. Add a seed to `seedInventory` and point `INVENTORY_SHEET_*` (or per-property
   source) at its sheet.
3. Add photos under `public/properties/<slug>/`.

It's served automatically at `/<slug>` by the shared template in
`app/[location]/page.tsx`.

## Architecture

```
app/                     layout, / → /hosagunda, /[location] template, /api/{inventory,lead}
components/prime/         Header, Hero, Stats, Story, Plantation, Location, Masterplan,
                          PlotInventory, Pricing, Verification, Video, Gallery(+Lightbox),
                          FAQ, FinalCTA, Footer, StickyCTA, BottomSheet, LeadModal, …
config/                  types.ts, properties.ts  (content, fully separated from UI)
lib/                     inventory.ts (server-only), whatsapp.ts, analytics.ts, utm.ts, format.ts
public/properties/…      per-property imagery
```

Notes: exact map location is deliberately **not** exposed (stylised conceptual map
only); no fabricated amenities, yields, ratings or reviews; UTM/campaign params are
captured and attached to leads; motion respects `prefers-reduced-motion`.
