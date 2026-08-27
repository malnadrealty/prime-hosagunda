import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (props: P) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  // Decorative by default — icons sit beside visible text or inside labeled
  // controls, so hide them from the accessibility tree (callers can override).
  "aria-hidden": true,
  focusable: "false" as const,
  ...props,
});

export const WhatsAppIcon = (props: P) => (
  <svg {...base({ ...props, strokeWidth: 0, fill: "currentColor" })} viewBox="0 0 24 24">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z M12.05 2C6.5 2 2 6.5 2 12.05c0 1.77.46 3.5 1.35 5.02L2 22l5.05-1.32a10 10 0 0 0 4.99 1.32h.01c5.55 0 10.05-4.5 10.05-10.05C22.1 6.5 17.6 2 12.05 2Zm0 18.2h-.01a8.14 8.14 0 0 1-4.15-1.14l-.3-.18-3 .78.8-2.92-.2-.3a8.13 8.13 0 0 1-1.25-4.34c0-4.5 3.66-8.15 8.16-8.15 2.18 0 4.23.85 5.77 2.4a8.1 8.1 0 0 1 2.39 5.77c0 4.5-3.66 8.15-8.16 8.15Z" />
  </svg>
);

export const MenuIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const CloseIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const PlayIcon = (props: P) => (
  <svg {...base({ ...props, strokeWidth: 0, fill: "currentColor" })} viewBox="0 0 24 24">
    <path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5Z" />
  </svg>
);

export const CheckIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const ShieldCheckIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 3 5 6v5c0 4.5 3 8.3 7 9.5 4-1.2 7-5 7-9.5V6l-7-3Z" />
    <path d="m9.2 11.8 1.9 1.9 3.7-3.7" />
  </svg>
);

export const ChevronDownIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronLeftIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const ChevronRightIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const PinIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const CalendarIcon = (props: P) => (
  <svg {...base(props)}>
    <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
    <path d="M3 9h18M8 3v3M16 3v3" />
  </svg>
);

export const DropletIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 3s6 6.4 6 10.5A6 6 0 0 1 6 13.5C6 9.4 12 3 12 3Z" />
  </svg>
);

export const RoadIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M4 21 8 3M20 21 16 3M12 5v2M12 11v2M12 17v2" />
  </svg>
);

export const SproutIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 20v-8" />
    <path d="M12 12C12 8 9 6 4 6c0 4 3 6 8 6Z" />
    <path d="M12 11c0-3.3 2.5-5 6.5-5 0 3.3-2.5 5-6.5 5Z" />
  </svg>
);

// A compact leaf glyph for crop chips.
export const LeafIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 9-10 1 5-1 11-8 12" />
    <path d="M11 20c0-4 1.5-8 5-10" />
  </svg>
);

export const ArrowRightIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const DownloadIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 3v12M7 11l5 5 5-5M5 21h14" />
  </svg>
);

export const ExpandIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
);

export const GridIcon = (props: P) => (
  <svg {...base(props)}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.4" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.4" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.4" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.4" />
  </svg>
);

export const LayersIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 3 2.5 8 12 13l9.5-5L12 3Z" />
    <path d="m2.5 12 9.5 5 9.5-5" />
    <path d="m2.5 16 9.5 5 9.5-5" />
  </svg>
);

export const StarIcon = (props: P) => (
  <svg {...base({ ...props, strokeWidth: 0, fill: "currentColor" })} viewBox="0 0 24 24">
    <path d="M12 2.5l2.7 5.9 6.4.7-4.8 4.3 1.3 6.3L12 16.9 6.4 19.7l1.3-6.3L2.9 9.1l6.4-.7L12 2.5Z" />
  </svg>
);

export const BuildingIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M15 10h3a1 1 0 0 1 1 1v10M3 21h18" />
    <path d="M8 8h.01M11.5 8h.01M8 12h.01M11.5 12h.01M8 16h.01M11.5 16h.01" />
  </svg>
);

export const TempleIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 3 4 8h16L12 3Z" />
    <path d="M6 8v9M18 8v9M10 8v9M14 8v9M4 21h16M9 21v-4a3 3 0 0 1 6 0v4" />
  </svg>
);
