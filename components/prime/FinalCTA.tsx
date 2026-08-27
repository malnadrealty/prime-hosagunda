"use client";

import { usePrime } from "./PrimeContext";
import Slot from "./ui/Slot";
import Reveal from "./ui/Reveal";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { WhatsAppIcon, CalendarIcon, LeafIcon, ShieldCheckIcon, CheckIcon } from "./ui/Icons";

const STATS = [
  { value: "14", unit: "ACRES", label: "Total Plantation", Icon: LeafIcon },
  { value: "6", unit: "PARCELS", label: "Private Ownership", Icon: ShieldCheckIcon },
  { value: "1", unit: "RIGHT CHOICE", label: "Your Own Piece of Land", Icon: CheckIcon },
];

export default function FinalCTA() {
  const { property } = usePrime();
  const wa = whatsappUrl({ kind: "site-visit" });

  return (
    <section className="relative overflow-hidden bg-forest-950 text-ivory">
      <Slot
        src={`/properties/${property.slug}/closing.jpg`}
        alt="Plantation landscape at Hosagunda"
        label=""
        className="absolute inset-0 h-full w-full opacity-35"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/85 to-forest-950/95" />

      <div className="prime-container relative z-10 grid grid-cols-1 items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left — CTA */}
        <Reveal>
          <h2 className="kannada text-3xl font-bold leading-[1.15] sm:text-4xl">
            {property.finalCTA.headingKannada?.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <div className="mt-5 max-w-lg space-y-2 text-[15px] text-ivory/70">
            {property.finalCTA.statements?.map((stmt, i) => (
              <p key={i} className={i === property.finalCTA.statements!.length - 1 ? "text-ivory font-medium" : ""}>
                {stmt}
              </p>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("prime_site_visit_open", { source: "final_cta" })}
              className="btn-green"
            >
              <CalendarIcon width={18} height={18} />
              {property.finalCTA.ctaPrimary}
            </a>
            <a
              href={whatsappUrl({ kind: "general" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("prime_whatsapp_click", { source: "final_cta" })}
              className="btn-outline-light"
            >
              <WhatsAppIcon width={17} height={17} />
              {property.finalCTA.ctaSecondary}
            </a>
          </div>
        </Reveal>

        {/* Right — stat strip */}
        <Reveal delay={100}>
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
            {STATS.map(({ value, unit, label, Icon }) => (
              <div
                key={unit}
                className="flex flex-col items-center gap-1 rounded-xl2 bg-forest-900/50 p-4 text-center ring-1 ring-white/10 lg:flex-row lg:gap-4 lg:text-left"
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-forest-500/15 text-moss">
                  <Icon width={20} height={20} />
                </span>
                <span>
                  <span className="text-2xl font-extrabold leading-none text-ivory">{value}</span>{" "}
                  <span className="text-xs font-bold uppercase tracking-wider text-moss">{unit}</span>
                  <span className="mt-0.5 block text-[11px] text-ivory/55">{label}</span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Closing Kannada line */}
      <div className="prime-container relative z-10 border-t border-white/10 py-8 text-center">
        <p className="kannada text-lg font-semibold leading-relaxed text-moss">
          {property.finalCTA.closingKannada?.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>
        <p className="mt-3 text-sm text-ivory/60">{property.finalCTA.tagline}</p>
        <p className="mt-2 kannada text-sm text-ivory">{property.finalCTA.finalMessage}</p>
      </div>
    </section>
  );
}
