"use client";

import { usePrime } from "./PrimeContext";
import Reveal from "./ui/Reveal";
import VideoCard from "./VideoCard";
import { CheckIcon, ShieldCheckIcon } from "./ui/Icons";

// Trust & Verification + Property Video, side by side on one light band.
export default function PricingTrustVideo() {
  const { property } = usePrime();
  const v = property.verification;

  return (
    <section id="video" className="scroll-mt-16 bg-ivory py-16 sm:py-24">
      <div className="prime-container grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Trust */}
        <Reveal>
          <p className="eyebrow mb-4">TRUST &amp; VERIFICATION</p>
          {v.introKannada && (
            <p className="kannada mb-4 text-lg font-semibold text-forest-900">
              {Array.isArray(v.introKannada) ? v.introKannada.join(" ") : v.introKannada}
            </p>
          )}
          <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-500/10 text-forest-600 ring-1 ring-forest-500/20">
            <ShieldCheckIcon width={32} height={32} />
          </span>
          <h2 className="text-3xl font-bold leading-[1.14] tracking-tight text-forest-900 sm:text-4xl">
            {v.headline.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-forest-900/70">{v.detail}</p>
          {v.closingKannada && (
            <p className="kannada mt-4 max-w-md text-sm text-forest-900/75">{v.closingKannada}</p>
          )}
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {v.legalTitle && (
              <li className="inline-flex items-center gap-2 text-sm font-medium text-forest-600">
                <CheckIcon width={16} height={16} /> 100% Legal Titles
              </li>
            )}
            {v.verifiedByMalnadRealty && (
              <li className="inline-flex items-center gap-2 text-sm font-medium text-forest-600">
                <CheckIcon width={16} height={16} /> Verified by Malnad Realty
              </li>
            )}
          </ul>
        </Reveal>

        {/* Video */}
        <Reveal delay={120}>
          <VideoCard />
        </Reveal>
      </div>
    </section>
  );
}
