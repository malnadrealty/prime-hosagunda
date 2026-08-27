import "server-only";
import type { Plot, PlotStatus, InventoryResult } from "@/config/types";
import { seedInventory } from "@/config/properties";

// ─────────────────────────────────────────────────────────────────────────────
// Inventory data access — SERVER-ONLY.
//
// Source priority:
//   1. INVENTORY_SHEET_URL  → Google Apps Script Web App returning JSON.
//   2. INVENTORY_SHEET_ID + GOOGLE_SHEETS_API_KEY → Sheets API v4.
//   3. INVENTORY_SHEET_ID (public "anyone with link" sheet) → gviz JSON.
//   4. Local seed (config/properties.ts) as graceful fallback.
//
// The live Hosagunda sheet is a public Google Sheet with columns:
//   Plot No. | Measurement | Per Gunta Price | Total Price | Booking Status
// The gviz parser maps columns by header label, so it also handles the
// spec-recommended column layout and future PRIME sheets.
//
// All fetching happens server-side with Next revalidate caching, so a Sheet
// request is never made on every UI interaction, and no credentials or private
// URLs reach the browser.
// ─────────────────────────────────────────────────────────────────────────────

const GUNTA_PER_ACRE = 40;
const VALID_STATUSES: PlotStatus[] = ["AVAILABLE", "BOOKED", "HOLD", "SOLD"];

function revalidateSeconds(): number {
  const n = Number(process.env.INVENTORY_REVALIDATE_SECONDS);
  return Number.isFinite(n) && n > 0 ? n : 120;
}

function num(v: unknown): number {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const cleaned = v.replace(/[^0-9.\-]/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function normalizeStatus(v: unknown): PlotStatus {
  const s = String(v ?? "").trim().toUpperCase();
  if (s.startsWith("AVAIL")) return "AVAILABLE";
  if (s.startsWith("BOOK")) return "BOOKED";
  if (s.startsWith("HOLD")) return "HOLD";
  if (s.startsWith("SOLD")) return "SOLD";
  return (VALID_STATUSES as string[]).includes(s) ? (s as PlotStatus) : "AVAILABLE";
}

function mostRecent(plots: Plot[]): string | null {
  const dates = plots
    .map((p) => p.lastUpdated)
    .filter((d): d is string => !!d)
    .sort();
  return dates.length ? dates[dates.length - 1] : null;
}

function forProperty(plots: Plot[], propertyId: string): Plot[] {
  return plots
    .filter((p) => !p.propertyId || p.propertyId === propertyId)
    .map((p) => ({ ...p, propertyId }))
    .sort((a, b) => a.plotNumber.localeCompare(b.plotNumber, undefined, { numeric: true }));
}

// ─── Row → Plot from a header-keyed object ───────────────────────────────────

function buildPlot(row: Record<string, unknown>, propertyId: string): Plot | null {
  const plotRaw = String(
    row.plot_number ?? row.plotNumber ?? row.plot ?? row["plot no."] ?? ""
  ).trim();
  if (!plotRaw) return null;

  // Measurement can be "53 Guntas" (string) or a numeric gunta/acre column.
  const measurement = row.measurement ?? row.area ?? "";
  let areaGunta = num(row.area_gunta ?? row.areaGunta);
  let areaAcres = num(row.area_acres ?? row.areaAcres);
  if (!areaGunta && measurement) areaGunta = num(measurement);
  if (!areaAcres && areaGunta) areaAcres = areaGunta / GUNTA_PER_ACRE;
  if (!areaGunta && areaAcres) areaGunta = Math.round(areaAcres * GUNTA_PER_ACRE * 10) / 10;

  const pricePerGunta = num(
    row.price_per_gunta ?? row.pricePerGunta ?? row["per gunta price"]
  );
  const totalPrice =
    num(row.total_price ?? row.totalPrice ?? row["total price"]) ||
    (areaGunta && pricePerGunta ? areaGunta * pricePerGunta : 0);

  return {
    propertyId,
    plotNumber: plotRaw.replace(/[^0-9]/g, "").padStart(2, "0") || plotRaw,
    areaAcres,
    areaGunta: areaGunta || undefined,
    pricePerGunta,
    totalPrice,
    status: normalizeStatus(row.status ?? row["booking status"] ?? row.booking_status),
    roadAccess: row.road_access ? String(row.road_access) : undefined,
    borewellAccess: row.borewell_access ? String(row.borewell_access) : undefined,
    notes: row.notes ? String(row.notes) : undefined,
    lastUpdated: row.last_updated ? String(row.last_updated) : undefined,
  };
}

// ─── Parsers ─────────────────────────────────────────────────────────────────

function parseAppsScript(json: unknown, propertyId: string): Plot[] {
  const rows: unknown[] = Array.isArray(json)
    ? json
    : Array.isArray((json as { plots?: unknown[] })?.plots)
      ? (json as { plots: unknown[] }).plots
      : Array.isArray((json as { data?: unknown[] })?.data)
        ? (json as { data: unknown[] }).data
        : [];
  return rows
    .map((r) => buildPlot(r as Record<string, unknown>, propertyId))
    .filter((p): p is Plot => p !== null);
}

function parseSheetsApi(json: unknown, propertyId: string): Plot[] {
  const values = (json as { values?: unknown[][] })?.values;
  if (!Array.isArray(values) || values.length === 0) return [];
  const header = (values[0] as unknown[]).map((h) => String(h).trim().toLowerCase());
  const looksLikeHeader = header.some((h) => /plot|measure|price|status|area/.test(h));
  const startRow = looksLikeHeader ? 1 : 0;
  const cols = looksLikeHeader
    ? header
    : ["property_id", "plot_number", "area_acres", "area_gunta", "price_per_gunta", "total_price", "status"];
  return values
    .slice(startRow)
    .map((rowArr) => {
      const row: Record<string, unknown> = {};
      cols.forEach((c, i) => (row[c] = (rowArr as unknown[])[i]));
      return buildPlot(row, propertyId);
    })
    .filter((p): p is Plot => p !== null);
}

type GvizCell = { v: unknown; f?: string } | null;
type GvizTable = {
  cols: { label?: string; id?: string }[];
  rows: { c: GvizCell[] }[];
};

function parseGviz(text: string, propertyId: string): Plot[] {
  // Strip the "/*O_o*/\ngoogle.visualization.Query.setResponse(...)" wrapper.
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) return [];
  const parsed = JSON.parse(text.slice(start, end + 1)) as {
    table?: GvizTable;
  };
  const table = parsed.table;
  if (!table?.rows) return [];
  const labels = table.cols.map((c, i) =>
    (c.label && c.label.trim() ? c.label : c.id || String(i)).trim().toLowerCase()
  );
  return table.rows
    .map((r) => {
      const row: Record<string, unknown> = {};
      labels.forEach((label, i) => {
        const cell = r.c[i];
        row[label] = cell ? (cell.v ?? cell.f) : undefined;
      });
      return buildPlot(row, propertyId);
    })
    .filter((p): p is Plot => p !== null);
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function getInventory(propertyId: string): Promise<InventoryResult> {
  const seed = seedInventory[propertyId] ?? [];
  const seedResult: InventoryResult = {
    plots: forProperty(seed, propertyId),
    lastUpdated: mostRecent(seed),
    source: "seed",
  };

  const sheetUrl = process.env.INVENTORY_SHEET_URL?.trim();
  const sheetId = process.env.INVENTORY_SHEET_ID?.trim();
  const sheetGid = process.env.INVENTORY_SHEET_GID?.trim();
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY?.trim();
  const range = process.env.INVENTORY_SHEET_RANGE?.trim() || "A1:K";
  const revalidate = revalidateSeconds();

  try {
    // 1. Apps Script web app.
    if (sheetUrl) {
      const url = new URL(sheetUrl);
      url.searchParams.set("property_id", propertyId);
      const res = await fetch(url.toString(), { next: { revalidate } });
      if (!res.ok) throw new Error(`Sheet responded ${res.status}`);
      const plots = forProperty(parseAppsScript(await res.json(), propertyId), propertyId);
      return plots.length ? { plots, lastUpdated: mostRecent(plots) || todayISO(), source: "sheet" } : seedResult;
    }

    // 2. Sheets API v4 (private sheet + key).
    if (sheetId && apiKey) {
      const api = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
        range
      )}?key=${apiKey}`;
      const res = await fetch(api, { next: { revalidate } });
      if (!res.ok) throw new Error(`Sheets API responded ${res.status}`);
      const plots = forProperty(parseSheetsApi(await res.json(), propertyId), propertyId);
      return plots.length ? { plots, lastUpdated: mostRecent(plots) || todayISO(), source: "sheet" } : seedResult;
    }

    // 3. Public sheet via gviz (no credentials needed).
    if (sheetId) {
      const gviz = new URL(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`);
      gviz.searchParams.set("tqx", "out:json");
      if (sheetGid) gviz.searchParams.set("gid", sheetGid);
      const res = await fetch(gviz.toString(), { next: { revalidate } });
      if (!res.ok) throw new Error(`Public sheet responded ${res.status}`);
      const plots = forProperty(parseGviz(await res.text(), propertyId), propertyId);
      return plots.length ? { plots, lastUpdated: mostRecent(plots) || todayISO(), source: "sheet" } : seedResult;
    }

    return seedResult;
  } catch (err) {
    return {
      ...seedResult,
      source: "error",
      error: err instanceof Error ? err.message : "Unknown inventory error",
    };
  }
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Statuses shown publicly with full distinction for UI coloring. */
export function publicStatus(status: PlotStatus): PlotStatus {
  return status;
}
