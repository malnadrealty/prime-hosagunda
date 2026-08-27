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
  headlineKannada: ["ಬೆಳೆದಿರುವ ತೋಟ.", "ಫಲವತ್ತಾದ ಮಣ್ಣು.", "ನಿಮ್ಮದೇ ಒಂದು ಎಕರೆ."],
  headlineEnglish: ["A Living Plantation.", "6 Private Parcels."],
  heroSupport: "14 Acres of established plantation land in Hosagunda, Sagara Taluk.",
  cropLine: "Areca · Coffee · Rubber · Coconut · Pepper",
  inventoryLine: "6 Private Parcels  |  From 1 Acre onwards",

  crops: [
    {
      key: "arecanut",
      name: "Arecanut",
      nameKannada: "ಅಡಿಕೆ",
      age: "3 years old",
      descriptor: "Growing arecanut plantation.",
      image: `${IMG}/crops/arecanut.jpg`,
      alt: "Arecanut palms growing in the Hosagunda plantation",
    },
    {
      key: "coffee",
      name: "Coffee",
      nameKannada: "ಕಾಫಿ",
      age: "2 years old",
      descriptor: "Young coffee plants already growing.",
      image: `${IMG}/crops/coffee.jpg`,
      alt: "Coffee plants with ripening berries at Hosagunda",
    },
    {
      key: "rubber",
      name: "Rubber",
      nameKannada: "ರಬ್ಬರ್",
      age: "20 years old",
      descriptor: "Established rubber plantation.",
      image: `${IMG}/crops/rubber.jpg`,
      alt: "Mature rubber trees being tapped at Hosagunda",
    },
    {
      key: "pepper",
      name: "Pepper",
      nameKannada: "ಕಾಳುಮೆಣಸು",
      age: "3 years old",
      descriptor: "Pepper growing in the plantation.",
      image: `${IMG}/crops/pepper.jpg`,
      alt: "Pepper vines climbing support trees at Hosagunda",
    },
    {
      key: "coconut",
      name: "Coconut",
      nameKannada: "ತೆಂಗು",
      age: "Existing plantation",
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
    headingKannada: ["ಇದು ಬರೀ ಜಮೀನು ಅಲ್ಲ.", "ಈಗಾಗಲೇ ಬೆಳೆದಿರುವ ತೋಟ."],
    paragraphs: [
      "Some farmland begins with an empty piece of land and a promise of what it could become.",
      "This one already has a story.",
      "Across these 14 acres, areca, coffee, rubber, coconut and pepper are already growing.",
      "The land has good red soil, fertile agricultural ground and a good water table, supported by 3 borewell points across the property.",
      "The rubber plantation is around 20 years old. Arecanut and pepper are around 3 years old, while the coffee plantation is around 2 years old.",
      "Now, this established plantation is being offered as 6 private parcels.",
    ],
    closing: "A piece of land that is already alive.",
  },

  plantation: {
    eyebrow: "THE PLANTATION",
    headingKannada: "ಈಗಾಗಲೇ ಬೆಳೆಯುತ್ತಿರುವ ತೋಟ.",
    subheading: "Five Crops. One Living Landscape.",
  },

  waterSection: {
    eyebrow: "WATER",
    heading: ["A Good Water Table.", "A Healthy Foundation for the Land."],
    headingKannada: ["ತೋಟಕ್ಕೆ ನೀರು.", "ಜಮೀನಿಗೆ ಜೀವ."],
    body: "The property has a good water table, with 3 borewell points spread across the 14-acre land.",
    secondary: "Water is already part of this land's story.",
    borewellValue: "03",
    borewellLabel: "Borewell Points",
    tableLabel: "Good Water Table",
    extentLabel: "Across 14 Acres",
    image: `${IMG}/water.jpg`,
    imageLabel: "PLANTATION WATER POINT",
  },

  location_section: {
    headingKannada: ["ನಗರದಿಂದ ದೂರವಲ್ಲ.", "ಗದ್ದಲದಿಂದ ದೂರ."],
    support: "Well connected to major roads and key places around.",
    connectivity: [
      { distance: "2 KM", place: "From NH 206", node: "NH 206", subtitle: "Bangalore–Honnavar Highway" },
      { distance: "10 KM", place: "From Anandapura", node: "Anandapura" },
      { distance: "15 KM", place: "From Sagara", node: "Sagara" },
    ],
    privacyNote:
      "Exact property location is shared with genuine prospects during site-visits.",
  },

  // Six parcels laid out on a 0..100 grid — a clean 3×2 masterplan sketch.
  masterplan: {
    plots: [
      { plotNumber: "01", points: "4,6 35,6 35,50 4,50", label: { x: 19.5, y: 28 } },
      { plotNumber: "02", points: "35,6 66,6 66,50 35,50", label: { x: 50.5, y: 28 } },
      { plotNumber: "03", points: "66,6 96,6 96,50 66,50", label: { x: 81, y: 28 } },
      { plotNumber: "04", points: "4,50 35,50 35,94 4,94", label: { x: 19.5, y: 72 } },
      { plotNumber: "05", points: "35,50 66,50 66,94 35,94", label: { x: 50.5, y: 72 } },
      { plotNumber: "06", points: "66,50 96,50 96,94 66,94", label: { x: 81, y: 72 } },
    ],
  },

  pricing: {
    checklist: [
      "No hidden pricing",
      'No "Call for Price"',
      "Plot measurement",
      "Price per Gunta",
      "Total plot price",
      "Current booking status",
    ],
    updatedNote: "Prices and availability are updated regularly.",
    disclaimer:
      "Applicable registration, government and other charges, if any, will be communicated clearly before purchase.",
  },

  verification: {
    legalTitle: true,
    verifiedByMalnadRealty: true,
    headline: ["100% Legal Titles.", "Verified by Malnad Realty."],
    support: "We believe buying land should begin with clarity and trust.",
    detail:
      "Property details and ownership documentation have been verified by Malnad Realty as part of our property verification process.",
  },

  gallery: [
    { src: `${IMG}/gallery/areca.jpg`, alt: "Areca palms at Hosagunda", caption: "Areca", category: "CROPS" },
    { src: `${IMG}/gallery/coffee.jpg`, alt: "Coffee plants at Hosagunda", caption: "Coffee", category: "CROPS" },
    { src: `${IMG}/gallery/rubber.jpg`, alt: "Rubber tapping at Hosagunda", caption: "Rubber", category: "CROPS" },
    { src: `${IMG}/gallery/pepper.jpg`, alt: "Pepper vines at Hosagunda", caption: "Pepper", category: "CROPS" },
    { src: `${IMG}/gallery/coconut.jpg`, alt: "Coconut palms at Hosagunda", caption: "Coconut", category: "CROPS" },
    { src: `${IMG}/gallery/red-soil.jpg`, alt: "Fertile red soil at Hosagunda", caption: "Red Soil", category: "SOIL" },
    { src: `${IMG}/gallery/landscape.jpg`, alt: "Plantation landscape at Hosagunda", caption: "Landscape", category: "LAND" },
  ],

  video: {
    type: "youtube",
    url: "",
    id: "",
    poster: `${IMG}/video-poster.jpg`,
    available: false,
  },

  faq: [
    {
      q: "What is the total extent of the property?",
      a: "The total property extends across 14 acres.",
    },
    {
      q: "How many parcels are available?",
      a: "The property has been divided into 6 individual parcels.",
    },
    {
      q: "What crops are currently growing?",
      a: "The plantation includes areca, coffee, rubber, coconut and pepper.",
    },
    {
      q: "How old are the plantations?",
      a: "Rubber is approximately 20 years old, arecanut and pepper are approximately 3 years old, and coffee is approximately 2 years old.",
    },
    {
      q: "How is the water availability?",
      a: "The property has a good water table with 3 borewell points across the 14-acre property.",
    },
    {
      q: "What type of soil does the property have?",
      a: "The property has good red soil and fertile agricultural land.",
    },
    {
      q: "How far is the property from NH 206?",
      a: "Approximately 2 km from NH 206.",
    },
    {
      q: "How far is Anandapura?",
      a: "Approximately 10 km from Anandapura.",
    },
    {
      q: "How far is Sagara?",
      a: "Approximately 15 km from Sagara.",
    },
    {
      q: "Can I choose a specific parcel?",
      a: "Yes. You can choose from the currently available parcels, subject to availability.",
    },
    {
      q: "Can I visit the property?",
      a: "Yes. Site visits can be scheduled with Malnad Realty.",
    },
    {
      q: "Is the exact location available online?",
      a: "The exact property location is not publicly displayed. It will be shared with genuine prospects as part of the site-visit process.",
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
