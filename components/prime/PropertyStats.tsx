"use client";

import { usePrime } from "./PrimeContext";
import Reveal from "./ui/Reveal";

// Mobile-only "At a Glance". On desktop the hero panel carries these figures.
// Typography-led stat cards — no icons.
export default function PropertyStats() {
  const { property } = usePrime();

  return (
    <section className="bg-ivory py-14 lg:hidden" aria-labelledby="glance-heading">
      <div className="prime-container">
        <Reveal>
          <p className="eyebrow mb-3">AT A GLANCE</p>
          <h2
            id="glance-heading"
            className="text-[1.7rem] font-bold leading-[1.15] tracking-tight text-forest-900"
          >
            14 Acres. 6 Plots.
            <br />
            <span className="text-forest-600">One Established Plantation.</span>
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {property.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 45}>
              <div className="flex h-full flex-col rounded-2xl border border-forest-700/10 bg-white px-5 py-6 shadow-card">
                <div className="flex flex-wrap items-baseline gap-x-1.5">
                  <span
                    className={`text-[2.5rem] font-extrabold leading-[0.9] tracking-tight ${
                      s.emphasis ? "text-brand-red" : "text-forest-900"
                    }`}
                  >
                    {s.value}
                  </span>
                  {s.unit && (
                    <span
                      className={`text-[11px] font-bold uppercase tracking-[0.16em] ${
                        s.emphasis ? "text-brand-red" : "text-forest-500"
                      }`}
                    >
                      {s.unit}
                    </span>
                  )}
                </div>

                <span
                  className={`mt-4 block h-[3px] w-9 rounded-full ${
                    s.emphasis ? "bg-brand-red/70" : "bg-forest-500/60"
                  }`}
                  aria-hidden
                />

                <p className="mt-3 text-[13px] font-medium leading-snug text-forest-900/70">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
