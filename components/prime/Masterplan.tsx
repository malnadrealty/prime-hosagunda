"use client";

import { useEffect, useState } from "react";
import { usePrime } from "./PrimeContext";
import Reveal from "./ui/Reveal";
import { track } from "@/lib/analytics";
import { getAssetPath } from "@/lib/useBasePath";
import { ExpandIcon, DownloadIcon, CloseIcon } from "./ui/Icons";

// "Explore the Property" — the real plot sketch, shown cleanly with a
// full-screen viewer and a download for viewing on the phone anytime.
export default function Masterplan() {
  const { property } = usePrime();
  const sketch = `/properties/${property.slug}/hosagunda-sketch.jpeg`;
  const downloadName = "Hosagunda-Plot-Sketch.jpg";
  const [zoom, setZoom] = useState(false);

  const openZoom = () => {
    setZoom(true);
    track("prime_sketch_view", { property_id: property.propertyId });
  };
  const onDownload = () =>
    track("prime_sketch_download", { property_id: property.propertyId });

  return (
    <section id="explore" className="scroll-mt-16 bg-forest-950 py-16 text-ivory sm:py-24">
      <div className="prime-container">
        <Reveal>
          <p className="eyebrow-light mb-4">{property.masterplan.headingKannada}</p>
          <h2 className="kannada text-3xl font-bold leading-[1.12] sm:text-4xl">
            {property.masterplan.mainLine}
          </h2>
          <p className="mt-2 text-sm font-semibold tracking-wide text-moss">
            {property.masterplan.supportingLine}
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ivory/70">
            {property.masterplan.description}
          </p>
          <p className="mt-2 font-medium text-ivory">
            {property.masterplan.highlight}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-9 max-w-lg">
            {/* Framed sketch */}
            <button
              type="button"
              onClick={openZoom}
              aria-label="View the plot sketch full-screen"
              className="group relative block w-full overflow-hidden rounded-xl2 bg-ivory p-2.5 shadow-float ring-1 ring-white/10 transition-transform sm:p-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getAssetPath(sketch)}
                alt="Hosagunda Farm Land — plot sketch showing all 6 parcels, sizes, roads and boundaries"
                width={749}
                height={1058}
                className="block h-auto w-full rounded-lg"
                loading="lazy"
              />
              <span className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-forest-950/75 px-3 py-1.5 text-[11px] font-semibold text-ivory backdrop-blur">
                <ExpandIcon width={13} height={13} /> Tap to zoom
              </span>
            </button>

            {/* Actions */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={openZoom} className="btn-outline-light flex-1">
                <ExpandIcon width={17} height={17} />
                View Full Sketch
              </button>
              <a
                href={sketch}
                download={downloadName}
                onClick={onDownload}
                className="btn-green flex-1"
              >
                <DownloadIcon width={17} height={17} />
                Download Sketch
              </a>
            </div>
            <p className="mt-3 text-center text-xs text-ivory/50">
              Plot sizes are marked on the sketch. Current pricing &amp; availability are in
              Available Plots below.
            </p>
          </div>
        </Reveal>
      </div>

      {zoom && (
        <SketchViewer
          src={sketch}
          downloadName={downloadName}
          onDownload={onDownload}
          onClose={() => setZoom(false)}
        />
      )}
    </section>
  );
}

// ── Full-screen viewer ────────────────────────────────────────────────────────
function SketchViewer({
  src,
  downloadName,
  onDownload,
  onClose,
}: {
  src: string;
  downloadName: string;
  onDownload: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex animate-fade-in flex-col bg-forest-950/95 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label="Plot sketch"
    >
      <div
        className="flex items-center justify-between gap-3 px-4 py-3"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <span className="text-sm font-semibold text-ivory/80">Plot Sketch</span>
        <div className="flex items-center gap-2">
          <a
            href={src}
            download={downloadName}
            onClick={onDownload}
            className="inline-flex items-center gap-1.5 rounded-lg bg-forest-500 px-3 py-2 text-xs font-semibold text-ivory hover:bg-forest-600"
          >
            <DownloadIcon width={15} height={15} /> Download
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-ivory hover:bg-white/20"
          >
            <CloseIcon width={18} height={18} />
          </button>
        </div>
      </div>

      {/* Scrollable image area (portrait sketch scrolls; pinch-zoom allowed) */}
      <div
        className="flex-1 overflow-auto px-3 pb-6"
        style={{ touchAction: "pinch-zoom", WebkitOverflowScrolling: "touch" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getAssetPath(src)}
          alt="Hosagunda Farm Land — plot sketch showing all 6 parcels, sizes, roads and boundaries"
          className="mx-auto block h-auto w-full max-w-2xl rounded-lg bg-ivory"
        />
        <p className="mx-auto mt-4 max-w-sm text-center text-xs text-ivory/50">
          Pinch to zoom, or download the sketch to view it anytime.
        </p>
      </div>
    </div>
  );
}

// Placeholder shown only if the sketch file is missing.
function SketchPlaceholder() {
  return (
    <div className="img-slot--cream flex aspect-[749/1058] w-full items-center justify-center rounded-lg">
      <span className="img-slot__label">HOSAGUNDA PLOT SKETCH</span>
    </div>
  );
}
