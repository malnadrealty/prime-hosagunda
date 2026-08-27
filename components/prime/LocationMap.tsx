"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { PropertyConfig } from "@/config/types";

// ── Palette (map illustration keeps a natural terrain language) ──────────────
const GREEN = "#315C3C";
const GREEN_LIGHT = "#5C8163";
const TREE = "#9BB68C";
const RED = "#D7242A";
const CREAM = "#F7F4EC";
const INK = "#1c1c1c";
const GRAY = "#8F8F8F";

type NodeType = "highway" | "property" | "town";
type Node = {
  id: string;
  name: string;
  subtitle?: string;
  type: NodeType;
  x: number;
  y: number;
  label: "right" | "below";
  delay: number;
};

// Geography (per the real NH 206 corridor): the highway runs roughly west→east.
// Sagara sits to the west (left), Anandapura to the east (right); Hosagunda is
// just north of the highway, reached by a short 2 KM connector.
export default function LocationMap({ property }: { property: PropertyConfig }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    const fallback = window.setTimeout(() => setInView(true), 1800);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const conn = property.location_section.connectivity;
  const byNode = (n: string) => conn.find((c) => c.node === n);

  const nodes: Node[] = [
    { id: "sagara", name: "SAGARA", type: "town", x: 150, y: 180, label: "right", delay: 0.9 },
    {
      id: "nh206",
      name: "NH 206",
      subtitle: byNode("NH 206")?.subtitle,
      type: "highway",
      x: 560,
      y: 352,
      label: "right",
      delay: 1.3,
    },
    { id: "anandapura", name: "ANANDAPURA", type: "town", x: 866, y: 476, label: "below", delay: 1.1 },
    {
      id: "hosagunda",
      name: property.location.toUpperCase(),
      subtitle: property.taluk,
      type: "property",
      x: 486,
      y: 560,
      label: "right",
      delay: 1.7,
    },
  ];

  // NH 206 highway (solid road line) — comes from Sagara in the NW, bends at the
  // junction and continues SE to Anandapura. Drawn on reveal.
  const highway = { d: "M 150,205 C 320,300 440,318 560,352 C 690,384 786,442 864,470", delay: 0.4 };
  // Property's ~2 KM access route north to the highway junction (dotted).
  const connector = { d: "M 492,528 C 505,468 528,415 552,382", delay: 1.9 };

  const pills = [
    { id: "p1", text: byNode("NH 206")?.distance ?? "2 KM", x: 600, y: 470, delay: 2.2 },
    { id: "p2", text: byNode("Sagara")?.distance ?? "15 KM", x: 356, y: 262, delay: 2.35 },
    { id: "p3", text: byNode("Anandapura")?.distance ?? "10 KM", x: 742, y: 412, delay: 2.5 },
  ];

  return (
    <div
      ref={ref}
      className={`lm relative overflow-hidden rounded-xl2 ${inView ? "is-in" : ""}`}
      style={{ backgroundColor: CREAM }}
    >
      <svg
        viewBox="0 0 1000 720"
        preserveAspectRatio="xMidYMid meet"
        className="h-auto w-full"
        role="img"
        aria-label={`Stylised location map: ${property.location} lies ${byNode("NH 206")?.distance} from NH 206 (the Bangalore–Honnavar Highway), which connects Sagara ${byNode("Sagara")?.distance} to the west and Anandapura ${byNode("Anandapura")?.distance} to the east.`}
      >
        <defs>
          <filter id="lm-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={INK} floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Background terrain + contours (very subtle) */}
        <g className="lm-anim" style={{ ["--o" as string]: 0.5, ["--d" as string]: "0s" } as CSSProperties}>
          <Contours />
          <FaintRoads />
          <TreeCluster x={815} y={150} scale={0.85} />
          <TreeCluster x={140} y={430} scale={0.7} />
          <TreeCluster x={300} y={628} scale={0.62} />
          <TreeCluster x={690} y={620} scale={0.58} />
        </g>

        {/* NH 206 highway — solid road, drawn on reveal */}
        <mask id="mask-highway" maskUnits="userSpaceOnUse">
          <path
            d={highway.d}
            fill="none"
            stroke="#fff"
            strokeWidth="14"
            strokeLinecap="round"
            pathLength={1}
            className="lm-reveal"
            style={{ ["--d" as string]: `${highway.delay}s` } as CSSProperties}
          />
        </mask>
        <g mask="url(#mask-highway)">
          <path d={highway.d} fill="none" stroke={GREEN} strokeWidth="7" strokeLinecap="round" />
          <path d={highway.d} fill="none" stroke={GREEN_LIGHT} strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* 2 KM access connector — dotted, drawn on reveal */}
        <mask id="mask-connector" maskUnits="userSpaceOnUse">
          <path
            d={connector.d}
            fill="none"
            stroke="#fff"
            strokeWidth="20"
            strokeLinecap="round"
            pathLength={1}
            className="lm-reveal"
            style={{ ["--d" as string]: `${connector.delay}s` } as CSSProperties}
          />
        </mask>
        <path
          d={connector.d}
          fill="none"
          stroke={GREEN}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="1 12"
          mask="url(#mask-connector)"
        />

        {/* Distance pills */}
        {pills.map((p) => (
          <g key={p.id} className="lm-pill" style={{ ["--d" as string]: `${p.delay}s` } as CSSProperties}>
            <Pill x={p.x} y={p.y} text={p.text} />
          </g>
        ))}

        {/* Markers */}
        {nodes.map((n) => (
          <NodeMarker key={n.id} node={n} />
        ))}
      </svg>
    </div>
  );
}

// ── Marker ───────────────────────────────────────────────────────────────────
function NodeMarker({ node }: { node: Node }) {
  const isProperty = node.type === "property";
  const labelRight = node.label === "right";

  return (
    <g>
      {isProperty && (
        <>
          <circle
            cx={node.x}
            cy={node.y}
            r={50}
            fill="none"
            stroke={RED}
            strokeWidth="2"
            strokeDasharray="2 9"
            opacity="0.5"
            className="lm-anim"
            style={{ ["--o" as string]: 0.5, ["--d" as string]: `${node.delay + 0.2}s` } as CSSProperties}
          />
          <circle cx={node.x} cy={node.y} r={34} fill="none" stroke={RED} strokeWidth="2.5" className="lm-pulse" />
        </>
      )}

      {/* marker body (scales in) */}
      <g className="lm-marker" style={{ ["--d" as string]: `${node.delay}s` } as CSSProperties} filter="url(#lm-shadow)">
        {isProperty ? (
          <>
            <circle cx={node.x} cy={node.y} r={32} fill={RED} />
            <circle cx={node.x} cy={node.y} r={32} fill="none" stroke="#fff" strokeWidth="3" />
            <PinIcon cx={node.x} cy={node.y} />
          </>
        ) : node.type === "highway" ? (
          <>
            <circle cx={node.x} cy={node.y} r={22} fill={GREEN} />
            <circle cx={node.x} cy={node.y} r={22} fill="none" stroke="#fff" strokeWidth="2.5" />
            <RoadIcon cx={node.x} cy={node.y} />
          </>
        ) : (
          <>
            <circle cx={node.x} cy={node.y} r={17} fill={GREEN} />
            <circle cx={node.x} cy={node.y} r={6} fill="#fff" opacity="0.9" />
          </>
        )}
      </g>

      {/* label (fades in) */}
      <g className="lm-anim" style={{ ["--o" as string]: 1, ["--d" as string]: `${node.delay + 0.15}s` } as CSSProperties}>
        {node.type === "highway" ? (
          // Placed above-right so the subtitle clears the descending road line.
          <>
            <text
              x={node.x + 32}
              y={node.y - 30}
              style={{ fontSize: 27, fontWeight: 800, fill: INK, letterSpacing: "0.01em" }}
            >
              {node.name}
            </text>
            {node.subtitle && (
              <text x={node.x + 32} y={node.y - 9} style={{ fontSize: 15, fontWeight: 500, fill: GRAY }}>
                {node.subtitle}
              </text>
            )}
          </>
        ) : labelRight ? (
          <>
            <text
              x={node.x + 50}
              y={node.y - (node.subtitle ? 4 : 0)}
              dominantBaseline="middle"
              style={{ fontSize: 34, fontWeight: 800, fill: INK, letterSpacing: "0.01em" }}
            >
              {node.name}
            </text>
            {node.subtitle && (
              <text x={node.x + 50} y={node.y + 24} dominantBaseline="middle" style={{ fontSize: 17, fontWeight: 500, fill: GRAY }}>
                {node.subtitle}
              </text>
            )}
          </>
        ) : (
          <>
            <text
              x={node.x}
              y={node.y + 42}
              textAnchor="middle"
              style={{ fontSize: 24, fontWeight: 800, fill: INK, letterSpacing: "0.02em" }}
            >
              {node.name}
            </text>
            {node.subtitle && (
              <text x={node.x} y={node.y + 68} textAnchor="middle" style={{ fontSize: 15, fontWeight: 500, fill: GRAY }}>
                {node.subtitle}
              </text>
            )}
          </>
        )}
      </g>
    </g>
  );
}

// ── Distance pill ─────────────────────────────────────────────────────────────
function Pill({ x, y, text }: { x: number; y: number; text: string }) {
  const w = text.length * 12 + 34;
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - 20}
        width={w}
        height={40}
        rx={20}
        fill={CREAM}
        stroke={GREEN}
        strokeOpacity="0.4"
        strokeWidth="1.5"
        filter="url(#lm-shadow)"
      />
      <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 20, fontWeight: 700, fill: GREEN, letterSpacing: "0.03em" }}>
        {text}
      </text>
    </g>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function PinIcon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx}, ${cy})`} fill="#fff">
      <path d="M0,-13 C7,-13 12,-8 12,-1 C12,7 0,19 0,19 C0,19 -12,7 -12,-1 C-12,-8 -7,-13 0,-13 Z" />
      <circle cx={0} cy={-1} r={4.4} fill={RED} />
    </g>
  );
}

function RoadIcon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx}, ${cy})`} stroke="#fff" strokeWidth="2.4" strokeLinecap="round" fill="none">
      <path d="M-6,8 L-3,-8" />
      <path d="M6,8 L3,-8" />
      <path d="M0,-6 v2.5 M0,-1 v2.5 M0,4 v2.5" strokeWidth="2" />
    </g>
  );
}

// ── Decorative terrain ────────────────────────────────────────────────────────
function Contours() {
  return (
    <g stroke={GREEN} strokeWidth="1.4" fill="none" opacity="0.1">
      <path d="M-40,150 C 180,90 360,200 540,150 S 900,60 1040,150" />
      <path d="M-40,200 C 180,140 360,250 560,200 S 900,110 1040,200" />
      <path d="M-40,610 C 220,560 420,650 640,610 S 940,540 1060,610" />
      <path d="M-40,660 C 220,620 420,700 640,660 S 940,590 1060,660" />
      <path d="M120,40 C 260,110 300,210 240,330" opacity="0.7" />
      <path d="M880,50 C 760,150 800,270 900,380" opacity="0.7" />
    </g>
  );
}

function FaintRoads() {
  return (
    <g stroke={GRAY} strokeWidth="2" fill="none" opacity="0.14">
      <path d="M60,-20 C 90,140 40,300 110,470 S 60,680 90,740" />
      <path d="M940,-20 C 910,140 970,300 900,470 S 960,680 920,740" />
    </g>
  );
}

function TreeCluster({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} opacity="0.5">
      <Tree x={0} y={0} r={26} />
      <Tree x={30} y={10} r={20} />
      <Tree x={14} y={22} r={16} />
    </g>
  );
}

function Tree({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <path d={`M0,${r * 0.9} v${r * 0.5}`} stroke="#7d6a52" strokeWidth={r * 0.14} strokeLinecap="round" />
      <circle cx={0} cy={0} r={r} fill={TREE} />
      <circle cx={-r * 0.35} cy={r * 0.2} r={r * 0.6} fill={TREE} />
      <circle cx={r * 0.35} cy={r * 0.2} r={r * 0.6} fill={TREE} />
    </g>
  );
}
