import type { PropertyConfig, Plot } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// HOSAGUNDA — verified property data + approved production copy.
// All imagery paths are placeholders under /public/properties/hosagunda/*.
// Drop the real photographs into those paths to replace the labeled slots.
// ─────────────────────────────────────────────────────────────────────────────

const IMG = "/properties/hosagunda";

export const hosagunda: PropertyConfig = {
  propertyId: "HOSAGUNDA-PRIME",
  slug: "hosagunda",
  name: "Hosagunda",
  brand: "MALNAD REALTY PRIME",

  location: "Hosagunda",
  taluk: "Sagara Taluk",
  district: "Karnataka",
  region: "Malnad region",

  totalAcres: 14,
  parcelCount: 6,

  premiumPlots: ["03", "04", "05"],
  premiumLabel: "PRIME",

  eyebrow: "HOSAGUNDA · SAGARA TALUK",
  headlineKannada: ["ಜಮೀನು ಹುಡುಕುತ್ತಿದ್ದೀರಾ?", "ಒಮ್ಮೆ ಈ ತೋಟ ನೋಡಿ."],
  headlineEnglish: ["Looking for land?", "See this plantation."],
  heroSupport: "6 Private Farm Plots in 14 Acres of Lush Green",
  cropLine: "Areca · Coffee · Rubber · Coconut · Pepper",
  inventoryLine: "2 KM from NH 206 · Bangalore–Honnavar Highway",

  crops: [
    {
      key: "arecanut",
      name: "Arecanut",
      nameKannada: "ಅಡಿಕೆ",
      age: "3 ವರ್ಷಗಳ ಬೆಳವಣಿಗೆ",
      descriptor: "Growing arecanut plantation.",
      image: `${IMG}/crops/arecanut.jpg`,
      alt: "Arecanut palms growing in the Hosagunda plantation",
    },
    {
      key: "coffee",
      name: "Coffee",
      nameKannada: "ಕಾಫಿ",
      age: "2 ವರ್ಷಗಳ ಬೆಳವಣಿಗೆ",
      descriptor: "Young coffee plants already growing.",
      image: `${IMG}/crops/coffee.jpg`,
      alt: "Coffee plants with ripening berries at Hosagunda",
    },
    {
      key: "rubber",
      name: "Rubber",
      nameKannada: "ರಬ್ಬರ್",
      age: "20 ವರ್ಷಗಳ ಹಳೆಯ ತೋಟ",
      descriptor: "Established rubber plantation.",
      image: `${IMG}/crops/rubber.jpg`,
      alt: "Mature rubber trees being tapped at Hosagunda",
    },
    {
      key: "pepper",
      name: "Pepper",
      nameKannada: "ಕಾಳುಮೆಣಸು",
      age: "3 ವರ್ಷಗಳ ಬೆಳವಣಿಗೆ",
      descriptor: "Pepper growing in the plantation.",
      image: `${IMG}/crops/pepper.jpg`,
      alt: "Pepper vines climbing support trees at Hosagunda",
    },
    {
      key: "coconut",
      name: "Coconut",
      nameKannada: "ತೆಂಗು",
      age: "ಈಗಾಗಲೇ ಇರುವ ತೋಟ",
      descriptor: "Coconut trees already form part of the green landscape.",
      image: `${IMG}/crops/coconut.jpg`,
      alt: "Coconut palms across the Hosagunda plantation",
    },
  ],

  timeline: [
    { years: "20 YEARS", crop: "Rubber", key: "rubber" },
    { years: "3 YEARS", crop: "Arecanut", key: "arecanut" },
    { years: "3 YEARS", crop: "Pepper", key: "pepper" },
    { years: "2 YEARS", crop: "Coffee", key: "coffee" },
  ],
  timelineClosing: [
    "Different crops.",
    "Different stages of growth.",
    "One established plantation.",
  ],

  soil: "Good red soil, very fertile agricultural land.",
  water: "Good water table with 3 borewell points across the 14 acres.",

  stats: [
    { value: "14", unit: "ACRES", label: "Total plantation", icon: "acres" },
    { value: "6", unit: "PARCELS", label: "Limited inventory", icon: "parcels" },
    { value: "5", unit: "CROPS", label: "Already growing", icon: "crops" },
    { value: "3", unit: "BOREWELLS", label: "Across the property", icon: "borewells" },
    { value: "RED", unit: "SOIL", label: "Fertile land", emphasis: true, icon: "soil" },
    { value: "2", unit: "KM", label: "From NH 206", icon: "distance" },
  ],

  story: {
    eyebrow: "THE STORY OF THIS LAND",
    headingKannada: ["ಇದು ಖಾಲಿ ಜಮೀನು ಅಲ್ಲ.", "ಇಲ್ಲಿ ತೋಟ ಈಗಾಗಲೇ ಇದೆ."],
    paragraphs: [
      "ಒಂದು ಕಡೆ ಹಳೆಯ Rubber ಮರಗಳು.",
      "ಇನ್ನೊಂದು ಕಡೆ ಬೆಳೆದ Arecanut.",
      "Coffee, Pepper ಮತ್ತು Coconut ಕೂಡ ಇಲ್ಲಿವೆ.",
      "ಅಂದರೆ, ನೀವು ಶೂನ್ಯದಿಂದ ಶುರು ಮಾಡಬೇಕಿಲ್ಲ.",
      "ಈಗಾಗಲೇ ಬೆಳೆಯುತ್ತಿರುವ ತೋಟದ ನಡುವೆ",
      "ನಿಮ್ಮದೇ ಒಂದು ಪ್ಲಾಟ್ ಆಯ್ಕೆ ಮಾಡಿಕೊಳ್ಳಬಹುದು.",
    ],
    closing: "14 Acres · 6 Plots · Hosagunda, Sagara Taluk",
  },

  plantation: {
    eyebrow: "THE PLANTATION",
    headingKannada: "ಈ ಜಮೀನಿನಲ್ಲಿ ಏನು ಬೆಳೆಯುತ್ತಿದೆ?",
    subheading: "ಒಂದೇ ತೋಟದಲ್ಲಿ 5 ಬೆಳೆಗಳು.",
  },

  waterSection: {
    eyebrow: "WATER",
    heading: ["GOOD WATER TABLE", "ನೀರಿನ ಲಭ್ಯತೆ ಉತ್ತಮವಾಗಿದೆ."],
    headingKannada: ["ತೋಟಕ್ಕೆ ನೀರು.", "ಜಮೀನಿಗೆ ಜೀವ."],
    body: "ಈಗಾಗಲೇ ಬೆಳೆ ಬೆಳೆಯುತ್ತಿರುವ ತೋಟಕ್ಕೆ ನೀರಿನ ವ್ಯವಸ್ಥೆಯೂ ಇದೆ.",
    secondary: "ತೋಟ ಬೆಳೆಯುತ್ತಿದೆ. ಅದಕ್ಕೆ ಬೇಕಾದ ನೀರೂ ಇಲ್ಲಿದೆ.",
    borewellValue: "03",
    borewellLabel: "BOREWELL POINTS",
    tableLabel: "14 ಎಕರೆ ಜಮೀನಿನಾದ್ಯಂತ",
    extentLabel: "",
    image: `${IMG}/Water.webp`,
    imageLabel: "PLANTATION WATER POINT",
  },

  location_section: {
    headingKannada: ["ಜಮೀನು ಹಸಿರಿನ ನಡುವೆ.", "ತಲುಪೋದು ಸುಲಭ."],
    support: "ನಗರಕ್ಕೆ ಹತ್ತಿರ. ಗದ್ದಲದಿಂದ ದೂರ.",
    connectivity: [
      { distance: "2 KM", place: "NH 206", node: "NH 206", subtitle: "Bangalore–Honnavar Highway" },
      { distance: "10 KM", place: "ANANDAPURA", node: "Anandapura" },
      { distance: "15 KM", place: "SAGARA", node: "Sagara" },
    ],
    privacyNote:
      "ನಿಖರವಾದ Property Location onlineನಲ್ಲಿ ಇಲ್ಲ. ನಿಜವಾದ ಆಸಕ್ತರಿಗೆ Site Visit ಸಮಯದಲ್ಲಿ ನಿಖರವಾದ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತದೆ.",
  },

  // Six parcels laid out on a 0..100 grid — a clean 3×2 masterplan sketch.
  masterplan: {
    headingKannada: "ನಿಮ್ಮ ಪ್ಲಾಟ ಯಾವುದು?",
    mainLine: "14 ಎಕರೆ. 6 ಪ್ಲಾಟ್ ಗಳು.",
    supportingLine: "1 ಎಕರೆದಿಂದ 2 ಎಕರೆವರೆಗೆ",
    description: "ಈ ಜಮೀನನ್ನು 6 ಪ್ರತ್ಯೇಕ ಪ್ಲಾಟ್ ಗಳಾಗಿ ವಿಂಗಡಿಸಲಾಗಿದೆ.",
    highlight: "ನಿಮಗೆ ಸರಿಹೊಂದುವ ಪ್ಲಾಟವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.",
    tapInstruction: "ಪ್ಲಾಟದ ಮೇಲೆ Tap ಮಾಡಿ",
    tapDetails: "ಗಾತ್ರ · ಬೆಲೆ · ಲಭ್ಯತೆ",
    plots: [
      { plotNumber: "01", points: "4,6 35,6 35,50 4,50", label: { x: 19.5, y: 28 } },
      { plotNumber: "02", points: "35,6 66,6 66,50 35,50", label: { x: 50.5, y: 28 } },
      { plotNumber: "03", points: "66,6 96,6 96,50 66,50", label: { x: 81, y: 28 } },
      { plotNumber: "04", points: "4,50 35,50 35,94 4,94", label: { x: 19.5, y: 72 } },
      { plotNumber: "05", points: "35,50 66,50 66,94 35,94", label: { x: 50.5, y: 72 } },
      { plotNumber: "06", points: "66,50 96,50 96,94 66,94", label: { x: 81, y: 72 } },
    ],
  },

  plotInventory: {
    headingKannada: "AVAILABLE PLOTS",
    subheadingKannada: "Choose Your Farm Plot",
  },

  pricing: {
    headingKannada: "ಬೆಲೆ ತಿಳಿಯಲು Call ಮಾಡಬೇಕಿಲ್ಲ.",
    mainLineKannada: "ಎಲ್ಲಾ ವಿವರಗಳು ಇಲ್ಲೇ ಸ್ಪಷ್ಟವಾಗಿವೆ.",
    checklist: [
      "ಪ್ಲಾಟದ ಗಾತ್ರ",
      "ಪ್ರತಿ ಗುಂಟೆಯ ಬೆಲೆ",
      "ಒಟ್ಟು ಬೆಲೆ",
      "ಲಭ್ಯತೆ",
    ],
    updatedNote: "Prices and availability are updated regularly.",
    closingKannada: "ನಿಮ್ಮ Budgetಗೆ ಹೊಂದುವ ಪ್ಲಾಟವನ್ನು ಇಲ್ಲೇ ಆಯ್ಕೆ ಮಾಡಿ.",
    disclaimer:
      "Applicable registration, government and other charges, if any, will be communicated clearly before purchase.",
  },

  verification: {
    legalTitle: true,
    verifiedByMalnadRealty: true,
    introKannada: ["ಜಮೀನು ಕೊಳ್ಳುವಾಗ", "ಮೊದಲ ಪ್ರಶ್ನೆ - ದಾಖಲೆಗಳು ಸರಿಯಾಗಿವೆಯೇ?"],
    headline: ["100% LEGAL TITLES", "Verified by Malnad Realty"],
    detail:
      "Property details and ownership documents have been verified by Malnad Realty.",
    closingKannada: "ನಿಮ್ಮ ನಿರ್ಧಾರಕ್ಕೆ ಬೇಕಾದ ಮೂಲ ಮಾಹಿತಿಯನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ನೀಡುವುದು ನಮ್ಮ ಜವಾಬ್ದಾರಿ.",
  },

  gallery: {
    headingKannada: ["ಫೋಟೋದಲ್ಲಿ ಹೇಗಿದೆಯೋ,", "ಜಮೀನಿನಲ್ಲೂ ಹಾಗೆಯೇ ಇದೆ."],
    subtitle: ["NO RENDERS.", "NO ARTIFICIAL VIEWS."],
    supporting: "ಈ ಫೋಟೋಗಳು ಇದೇ ಜಮೀನಿನಲ್ಲಿ ತೆಗೆದವು.",
    items: [
      { src: `${IMG}/gallery/farmland-01.jpg`, alt: "Farmland at Hosagunda - Area 1" },
      { src: `${IMG}/gallery/farmland-02.jpg`, alt: "Farmland at Hosagunda - Area 2" },
      { src: `${IMG}/gallery/farmland-03.jpg`, alt: "Farmland at Hosagunda - Area 3" },
      { src: `${IMG}/gallery/farmland-04.jpg`, alt: "Farmland at Hosagunda - Area 4" },
    ],
  },

  video: {
    type: "youtube",
    url: "",
    id: "",
    poster: `${IMG}/video-poster.jpg`,
    available: false,
  },

  finalCTA: {
    headingKannada: ["ಫೋಟೋದಲ್ಲಿ ನೋಡಿದಿರಿ.", "ಈಗ ಪ್ಲಾಟ್ ಗೆ ಬಂದು ನೋಡಿ."],
    statements: [
      "ತೋಟವನ್ನು ನೋಡಿ.",
      "ಮಣ್ಣನ್ನು ಕೈಯಲ್ಲಿ ಹಿಡಿದು ನೋಡಿ.",
      "ಪ್ಲಾಟವನ್ನು ನಡೆದು ನೋಡಿ.",
      "ನಿಮಗೆ ಇಷ್ಟವಾದ ಪ್ಲಾಟವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.",
    ],
    ctaHeading: "COME SEE THE LAND.",
    ctaPrimary: "SCHEDULE A SITE VISIT",
    ctaSecondary: "WHATSAPP MALNAD REALTY",
    closingKannada: ["ಬೆಳೆದಿರುವ ತೋಟದ ನಡುವೆ", "ನಿಮ್ಮದೇ ಒಂದು ಪ್ಲಾಟ್."],
    tagline: "14 Acres · 6 Plots · Hosagunda",
    finalMessage: "ನಿಮ್ಮ ಪ್ಲಾಟ ಇಲ್ಲಿರಬಹುದು.",
  },

  faq: [
    {
      q: "ಈ ಜಮೀನು ಎಲ್ಲಿದೆ?",
      a: "Hosagunda, Sagara Taluk.",
    },
    {
      q: "ಒಟ್ಟು ಎಷ್ಟು ಎಕರೆ?",
      a: "14 Acres.",
    },
    {
      q: "ಎಷ್ಟು ಪ್ಲಾಟ್ ಗಳಿವೆ?",
      a: "ಒಟ್ಟು 6 ಪ್ಲಾಟ್ ಗಳು.",
    },
    {
      q: "ಪ್ಲಾಟ್ ಗಳ ಗಾತ್ರ ಎಷ್ಟು?",
      a: "1 ಎಕರೆದಿಂದ 2 ಎಕರೆವರೆಗೆ.",
    },
    {
      q: "ಯಾವ ಬೆಳೆಗಳಿವೆ?",
      a: "Areca, Coffee, Rubber, Coconut ಮತ್ತು Pepper.",
    },
    {
      q: "Rubber ತೋಟ ಎಷ್ಟು ಹಳೆಯದು?",
      a: "ಸುಮಾರು 20 ವರ್ಷ.",
    },
    {
      q: "Arecanut ಎಷ್ಟು ವರ್ಷ?",
      a: "ಸುಮಾರು 3 ವರ್ಷ.",
    },
    {
      q: "Coffee ಎಷ್ಟು ವರ್ಷ?",
      a: "ಸುಮಾರು 2 ವರ್ಷ.",
    },
    {
      q: "Pepper ಎಷ್ಟು ವರ್ಷ?",
      a: "ಸುಮಾರು 3 ವರ್ಷ.",
    },
    {
      q: "ನೀರಿನ ವ್ಯವಸ್ಥೆ ಹೇಗಿದೆ?",
      a: "ಉತ್ತಮ Water Table ಮತ್ತು 3 Borewell Points.",
    },
    {
      q: "ಮಣ್ಣು ಹೇಗಿದೆ?",
      a: "ಉತ್ತಮ ಹಾಗೂ ಫಲವತ್ತಾದ ಕೆಂಪು ಮಣ್ಣು.",
    },
    {
      q: "NH 206 ಎಷ್ಟು ದೂರ?",
      a: "ಸುಮಾರು 2 KM.",
    },
    {
      q: "Anandapura ಎಷ್ಟು ದೂರ?",
      a: "ಸುಮಾರು 10 KM.",
    },
    {
      q: "Sagara ಎಷ್ಟು ದೂರ?",
      a: "ಸುಮಾರು 15 KM.",
    },
    {
      q: "Exact location onlineನಲ್ಲಿ ಏಕೆ ಇಲ್ಲ?",
      a: "ನಿಜವಾದ ಆಸಕ್ತರಿಗೆ Site Visit ಸಮಯದಲ್ಲಿ ನಿಖರವಾದ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತದೆ.",
    },
    {
      q: "Site Visit ಮಾಡಬಹುದೇ?",
      a: "ಹೌದು. Malnad Realty ಮೂಲಕ Site Visit schedule ಮಾಡಬಹುದು.",
    },
  ],

  seo: {
    title: "Hosagunda Plantation Land for Sale | Malnad Realty PRIME",
    description:
      "Explore an established 14-acre plantation in Hosagunda, Sagara Taluk with areca, coffee, rubber, coconut and pepper. View available parcels, pricing and site visit details.",
    keywords: [
      "Hosagunda farmland",
      "Hosagunda agricultural land",
      "farmland for sale in Sagara",
      "plantation land in Sagara",
      "agricultural land near Sagara",
      "farmland near NH 206",
      "plantation land near Anandapura",
      "farmland plots in Sagara Taluk",
    ],
  },
};

// ─── Local inventory seed ────────────────────────────────────────────────────
// Mirrors the live Google Sheet so the page degrades gracefully if the sheet is
// temporarily unavailable. The SHEET is the source of truth at runtime — this is
// only a fallback. 40 gunta = 1 acre.
export const hosagundaSeedPlots: Plot[] = [
  { propertyId: "HOSAGUNDA-PRIME", plotNumber: "01", areaAcres: 53 / 40, areaGunta: 53, pricePerGunta: 165000, totalPrice: 8745000, status: "AVAILABLE" },
  { propertyId: "HOSAGUNDA-PRIME", plotNumber: "02", areaAcres: 76.5 / 40, areaGunta: 76.5, pricePerGunta: 165000, totalPrice: 12622500, status: "AVAILABLE" },
  { propertyId: "HOSAGUNDA-PRIME", plotNumber: "03", areaAcres: 71 / 40, areaGunta: 71, pricePerGunta: 165000, totalPrice: 11715000, status: "AVAILABLE" },
  { propertyId: "HOSAGUNDA-PRIME", plotNumber: "04", areaAcres: 69 / 40, areaGunta: 69, pricePerGunta: 165000, totalPrice: 11385000, status: "AVAILABLE" },
  { propertyId: "HOSAGUNDA-PRIME", plotNumber: "05", areaAcres: 80 / 40, areaGunta: 80, pricePerGunta: 165000, totalPrice: 13200000, status: "AVAILABLE" },
  { propertyId: "HOSAGUNDA-PRIME", plotNumber: "06", areaAcres: 57 / 40, areaGunta: 57, pricePerGunta: 165000, totalPrice: 9405000, status: "AVAILABLE" },
];

// Registry — future PRIME properties get added here, keyed by slug.
export const properties: Record<string, PropertyConfig> = {
  hosagunda,
};

export const seedInventory: Record<string, Plot[]> = {
  "HOSAGUNDA-PRIME": hosagundaSeedPlots,
};

export function getProperty(slug: string): PropertyConfig | undefined {
  return properties[slug];
}
