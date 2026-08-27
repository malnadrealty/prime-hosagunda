"use client";

import Slot from "./ui/Slot";
import { usePrime } from "./PrimeContext";
import { track } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";
import { LeafIcon, PlayIcon, ArrowRightIcon, WhatsAppIcon } from "./ui/Icons";

const CROPS = ["Areca", "Coffee", "Rubber", "Coconut", "Pepper"];

export default function PrimeHero() {
  const { property } = usePrime();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92svh] w-full overflow-hidden bg-forest-950 pt-16 text-ivory">
      {/* Background */}
      <Slot
        src={`/properties/${property.slug}/hero.jpg`}
        alt="Established plantation at Hosagunda, Sagara Taluk"
        label=""
        eager
        className="absolute inset-0 h-full w-full"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 via-forest-950/45 to-forest-950/92" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/70 via-transparent to-transparent" />

      <div className="prime-container relative z-10 grid min-h-[calc(92svh-4rem)] grid-cols-1 items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left — messaging */}
        <div className="max-w-xl">
          <p className="eyebrow-light mb-5">{property.eyebrow}</p>

          <h1 className="kannada text-[2.15rem] font-semibold leading-[1.18] sm:text-5xl">
            {property.headlineKannada.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-md text-[20px] font-semibold leading-relaxed text-ivory">
            {property.heroSupport}
          </p>

          {/* Crop chips */}
          <ul className="mt-6 flex flex-wrap gap-2">
            {CROPS.map((c) => (
              <li
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[13px] font-medium text-ivory/90 backdrop-blur-sm"
              >
                <LeafIcon width={14} height={14} className="text-moss" />
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-forest-500/15 px-3.5 py-2 text-[13px] font-medium text-moss ring-1 ring-forest-400/30">
            <LeafIcon width={15} height={15} />
            {property.inventoryLine}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                track("prime_plot_view", { source: "hero_cta" });
                scrollTo("plots");
              }}
              className="btn-green"
            >
              View Available Plots
              <ArrowRightIcon width={18} height={18} />
            </button>
            <a
              href={whatsappUrl({ kind: "site-visit" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("prime_site_visit_open", { source: "hero_cta" })}
              className="btn-outline-light"
            >
              <WhatsAppIcon width={17} height={17} />
              Plan a Site Visit
            </a>
          </div>
        </div>

        {/* Right — video card + stat panel (desktop-weighted) */}
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => scrollTo("video")}
            className="group relative block aspect-video w-full overflow-hidden rounded-xl2 ring-1 ring-white/15"
            aria-label="Watch property video"
          >
            <Slot
              src={`/properties/${property.slug}/video-poster.jpg`}
              alt="Property video poster"
              label="PROPERTY VIDEO"
              className="absolute inset-0 h-full w-full"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <span className="absolute inset-0 bg-forest-950/25 transition-colors group-hover:bg-forest-950/10" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory/95 text-forest-700 shadow-float">
                <PlayIcon width={22} height={22} className="ml-0.5" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory">
                Watch Property Video
              </span>
            </span>
          </button>

          <div className="hidden grid-cols-3 gap-2.5 rounded-xl2 bg-forest-900/70 p-4 ring-1 ring-white/10 backdrop-blur-sm lg:grid">
            {property.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className={`text-xl font-bold leading-none sm:text-2xl ${
                    s.emphasis ? "text-brand-red" : "text-ivory"
                  }`}
                >
                  {s.value}
                </div>
                {s.unit && (
                  <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-moss">
                    {s.unit}
                  </div>
                )}
                <div className="mt-1 text-[10px] leading-tight text-ivory/55">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
