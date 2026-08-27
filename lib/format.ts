// Indian number + currency formatting helpers.

/** 3200000 -> "32.00 Lakhs" */
export function formatLakhs(rupees: number): string {
  const lakhs = rupees / 100000;
  const rounded = Number.isInteger(lakhs) ? lakhs.toFixed(0) : lakhs.toFixed(2);
  return `${rounded} Lakhs`;
}

/** 3200000 -> "₹32.00 Lakhs" */
export function formatPriceLakhs(rupees: number): string {
  return `₹${formatLakhs(rupees)}`;
}

/**
 * Indian-convention price: crores at/above ₹1 crore, else lakhs.
 * 8745000 -> "₹87.45 Lakhs"; 12622500 -> "₹1.26 Cr".
 */
export function formatPriceINR(rupees: number): string {
  if (!rupees || rupees <= 0) return "Price on request";
  if (rupees >= 10000000) {
    return `₹${(rupees / 10000000).toFixed(2)} Cr`;
  }
  return `₹${(rupees / 100000).toFixed(2)} Lakhs`;
}

/** Trim trailing zeros: 76.5 -> "76.5", 53 -> "53". */
export function trimNumber(n: number): string {
  return Number.isInteger(n) ? String(n) : String(Number(n.toFixed(2)));
}

/** "53 Guntas" measurement label from a gunta count. */
export function formatGunta(gunta?: number): string | null {
  if (!gunta || gunta <= 0) return null;
  return `${trimNumber(gunta)} Guntas`;
}

/** "≈ 1.33 acres" secondary label. */
export function formatAcresApprox(acres: number): string {
  return `≈ ${acres.toFixed(2)} acres`;
}

/** 32000 -> "₹32,000" (Indian grouping) */
export function formatRupees(rupees: number): string {
  return `₹${rupees.toLocaleString("en-IN")}`;
}

/** 1 -> "1.00 Acre", 1.5 -> "1.50 Acres" */
export function formatAcres(acres: number): string {
  const label = acres === 1 ? "Acre" : "Acres";
  return `${acres.toFixed(2)} ${label}`;
}

/** Format an ISO / date-ish string to "20 May 2025". Falls back to raw string. */
export function formatDate(input?: string | null): string | null {
  if (!input) return null;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
