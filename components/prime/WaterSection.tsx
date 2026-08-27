"use client";

import { usePrime } from "./PrimeContext";
import Reveal from "./ui/Reveal";

// Cinematic, editorial "Water" moment. Charcoal + red brand palette (no blue
// water theme). Only the two verified facts: good water table + 3 borewell
// points across 14 acres.
export default function WaterSection() {
  const { property } = usePrime();
  const w = property.waterSection;

  return (
    <section
      id="water"
      className="relative scroll-mt-16 overflow-hidden bg-forest-950 text-ivory"
    >
      <div className="grid grid-cols-1 lg:grid-cols-1">
        {/* Editorial content */}
        <div className="relative flex flex-col justify-center px-5 py-14 sm:px-8 lg:px-14 lg:py-20">
          {/* Extremely subtle water contour lines */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
            preserveAspectRatio="none"
            viewBox="0 0 400 600"
            fill="none"
            stroke="#f7f4ec"
            strokeWidth="1"
          >
            <path d="M-20 120 Q 100 90 200 120 T 420 120" />
            <path d="M-20 180 Q 100 150 200 180 T 420 180" />
            <path d="M-20 470 Q 100 440 200 470 T 420 470" />
            <path d="M-20 520 Q 100 490 200 520 T 420 520" />
          </svg>

          <div className="relative">
            <Reveal>
              <p className="eyebrow-light mb-4">{w.eyebrow}</p>
              <h2 className="text-3xl font-bold leading-[1.14] tracking-tight sm:text-4xl">
                {w.heading.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="kannada mt-4 text-xl leading-snug text-moss sm:text-2xl">
                {w.headingKannada.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ivory/70">{w.body}</p>
            </Reveal>

            {/* Subtle flowing ripple divider */}
            <Reveal delay={120}>
              <svg
                aria-hidden
                width="150"
                height="14"
                viewBox="0 0 150 14"
                fill="none"
                className="mt-8 text-brand-red"
              >
                <path
                  d="M1 7 Q 12.5 1, 25 7 T 50 7 T 75 7 T 100 7 T 125 7 T 149 7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </Reveal>

            {/* Dominant stat */}
            <Reveal delay={200}>
              <div className="mt-6 flex items-end gap-4">
                <span className="text-[5.5rem] font-extrabold leading-[0.82] tracking-tight text-ivory sm:text-[7rem] lg:text-[7.5rem]">
                  {w.borewellValue}
                </span>
                <span className="mb-3 text-xs font-bold uppercase leading-tight tracking-[0.2em] text-moss">
                  {w.borewellLabel.split(" ").map((word, i) => (
                    <span key={i} className="block">
                      {word}
                    </span>
                  ))}
                </span>
              </div>

              {/* Micro-supers */}
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory/60">
                <span>14 Acre Property</span>
                <span className="h-3 w-px bg-white/20" aria-hidden />
                <span>{w.tableLabel}</span>
              </div>

              <p className="accent-script mt-6 text-xl text-moss sm:text-2xl">{w.secondary}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
