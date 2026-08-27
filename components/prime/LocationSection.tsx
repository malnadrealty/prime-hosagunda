"use client";

import { usePrime } from "./PrimeContext";
import Reveal from "./ui/Reveal";
import LocationMap from "./LocationMap";
import { ShieldCheckIcon } from "./ui/Icons";

export default function LocationSection() {
  const { property } = usePrime();
  const loc = property.location_section;

  return (
    <section id="location" className="scroll-mt-16 bg-ivory py-16 sm:py-24">
      <div className="prime-container grid grid-cols-1 gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-14">
        {/* Left — information panel */}
        <Reveal>
          <p className="eyebrow mb-4">LOCATION &amp; CONNECTIVITY</p>
          <h2 className="text-h2 text-forest-900">
            {property.location},<br className="hidden sm:block" /> {property.taluk}
          </h2>
          <p className="kannada-h3 mt-3 text-forest-600">
            {loc.headingKannada.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
          <p className="mt-5 max-w-sm text-body text-forest-900/70">
            {loc.support}
          </p>

          {/* Editorial connectivity list */}
          <ul className="mt-8">
            {loc.connectivity.map((c, i) => (
              <li
                key={c.place}
                className={`flex items-center gap-4 py-4 ${
                  i === 0 ? "" : "border-t border-forest-700/10"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 flex-none rounded-full"
                  style={{ backgroundColor: "#315C3C" }}
                  aria-hidden
                />
                <span className="w-[4.5rem] flex-none text-h3 font-extrabold tracking-tight text-forest-900">
                  {c.distance}
                </span>
                <span>
                  <span className="block text-label font-semibold text-forest-900">{c.place}</span>
                  {c.subtitle && (
                    <span className="block text-tiny text-brand-gray">{c.subtitle}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          {/* Privacy card */}
          <div className="mt-6 flex items-start gap-3 rounded-xl2 border border-forest-700/10 bg-cream p-4">
            <ShieldCheckIcon width={20} height={20} className="mt-0.5 flex-none text-forest-600" />
            <p className="text-label leading-snug text-forest-900/70">{loc.privacyNote}</p>
          </div>
        </Reveal>

        {/* Right — animated SVG map */}
        <Reveal delay={100}>
          <LocationMap property={property} />
        </Reveal>
      </div>
    </section>
  );
}
