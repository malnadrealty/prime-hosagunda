// ─────────────────────────────────────────────────────────────────────────────
// Malnad Realty PRIME — shared content + inventory type model.
// Content is fully separated from UI so future PRIME properties reuse the
// same components by swapping data only.
// ─────────────────────────────────────────────────────────────────────────────

export type PlotStatus = "AVAILABLE" | "BOOKED" | "HOLD" | "SOLD";

/** A single parcel. Mirrors the Google Sheet row shape. */
export type Plot = {
  propertyId: string;
  plotNumber: string; // "01", "02", ...
  areaAcres: number;
  areaGunta?: number;
  pricePerGunta: number;
  totalPrice: number;
  status: PlotStatus;
  roadAccess?: string;
  borewellAccess?: string;
  notes?: string;
  lastUpdated?: string;
};

export type InventoryResult = {
  plots: Plot[];
  lastUpdated: string | null;
  source: "sheet" | "seed" | "error";
  error?: string;
};

/** Client-safe plot: public fields only, status collapsed to two values. */
export type PublicPlot = {
  plotNumber: string;
  areaAcres: number;
  areaGunta?: number;
  pricePerGunta: number;
  totalPrice: number;
  status: "AVAILABLE" | "BOOKED";
};

export type PublicInventory = {
  plots: PublicPlot[];
  lastUpdated: string | null;
  source: "sheet" | "seed" | "error";
};

export type Crop = {
  key: string;
  name: string; // English label
  nameKannada?: string;
  age: string; // "3 years old" | "Existing plantation"
  descriptor: string; // one-line
  image: string; // /properties/<slug>/crops/<file>
  alt: string;
};

export type TimelineItem = {
  years: string; // "20 YEARS" | "2 YEARS"
  crop: string;
  key: string;
};

export type StatItem = {
  value: string; // "14", "RED", "2 KM"
  unit?: string; // "ACRES"
  label: string; // "Total plantation"
  emphasis?: boolean; // render with brand accent (e.g. RED SOIL)
  icon?: string; // icon key: acres | parcels | crops | borewells | soil | distance
};

export type ConnectivityItem = {
  distance: string; // "2 KM"
  place: string; // "From NH 206"
  node: string; // short map node label
  subtitle?: string; // e.g. "Bangalore–Honnavar Highway"
};

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  width?: number;
  height?: number;
};

export type GalleryCategory =
  | "PLANTATION"
  | "CROPS"
  | "LAND"
  | "SOIL"
  | "SURROUNDINGS"
  | "AERIAL";

export type FaqItem = { q: string; a: string };

export type PropertyVideo = {
  type: "youtube" | "vimeo" | "mp4";
  url: string; // watch url / file url
  id?: string; // youtube/vimeo id when applicable
  poster: string;
  available: boolean;
};

/** A boundary polygon on the masterplan, expressed in a 0–100 viewBox. */
export type MasterplanPlot = {
  plotNumber: string;
  // SVG polygon points in a 0..100 x 0..100 coordinate space.
  points: string;
  // Anchor for the plot label.
  label: { x: number; y: number };
};

export type PropertyConfig = {
  propertyId: string;
  slug: string;
  name: string; // "Hosagunda"
  brand: string; // "MALNAD REALTY PRIME"

  location: string; // "Hosagunda"
  taluk: string; // "Sagara Taluk"
  district: string; // "Karnataka"
  region: string; // "Malnad region"

  totalAcres: number;
  parcelCount: number;

  // Plot numbers marked as premium / prime parcels (e.g. ["03","04","05"]).
  premiumPlots?: string[];
  premiumLabel?: string; // badge text, defaults to "PRIME"

  eyebrow: string; // "HOSAGUNDA · SAGARA TALUK"
  headlineKannada: string[]; // hero lines
  headlineEnglish: string[];
  heroSupport: string;
  cropLine: string;
  inventoryLine: string;

  crops: Crop[];
  timeline: TimelineItem[];
  timelineClosing: string[];

  soil: string;
  water: string;

  stats: StatItem[];

  story: {
    eyebrow: string;
    headingKannada: string[];
    paragraphs: string[];
    closing: string;
  };

  plantation: {
    eyebrow: string;
    headingKannada: string;
    subheading: string;
  };

  waterSection: {
    eyebrow: string;
    heading: string[]; // English headline lines
    headingKannada: string[];
    body: string;
    secondary: string;
    borewellValue: string; // "03"
    borewellLabel: string; // "Borewell Points"
    tableLabel: string; // "Good Water Table"
    extentLabel: string; // "Across 14 Acres"
    image: string;
    imageLabel: string; // placeholder label
  };

  location_section: {
    headingKannada: string[];
    support: string;
    connectivity: ConnectivityItem[];
    privacyNote: string;
  };

  masterplan: {
    image?: string; // optional sketch image behind polygons
    plots: MasterplanPlot[];
  };

  pricing: {
    checklist: string[];
    updatedNote: string;
    disclaimer: string;
  };

  verification: {
    legalTitle: boolean;
    verifiedByMalnadRealty: boolean;
    headline: string[];
    support: string;
    detail: string;
  };

  gallery: GalleryItem[];
  video: PropertyVideo;

  faq: FaqItem[];

  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};
