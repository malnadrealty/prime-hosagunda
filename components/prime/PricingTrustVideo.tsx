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
          <div className="space-y-6">
            {/* Eyebrow */}
            <p className="eyebrow text-red-600">TRUST &amp; VERIFICATION</p>

            {/* Shield Icon — Large and Prominent */}
            <div className="inline-flex">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-forest-500/15 to-forest-400/5 text-forest-600 ring-1 ring-forest-500/25 shadow-sm">
                <ShieldCheckIcon width={48} height={48} />
              </div>
            </div>

            {/* Question Intro — Secondary Text */}
            {v.introKannada && (
              <p className="kannada text-base font-medium leading-relaxed text-forest-900/80 max-w-lg">
                {Array.isArray(v.introKannada) ? v.introKannada.join(" ") : v.introKannada}
              </p>
            )}

            {/* Supporting Detail */}
            <p className="max-w-xl text-[15px] leading-relaxed text-forest-900/70">{v.detail}</p>

            {/* Closing Statement — Emphasized Box */}
            {v.closingKannada && (
              <div className="rounded-xl bg-gradient-to-r from-forest-50 to-forest-25 border border-forest-200/50 px-5 py-4">
                <p className="kannada text-[14px] leading-relaxed text-forest-900/80">{v.closingKannada}</p>
              </div>
            )}

            {/* Trust Verification Badges */}
            <div className="space-y-3 pt-2">
              {v.legalTitle && (
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-600">
                    <CheckIcon width={14} height={14} />
                  </div>
                  <span className="text-sm font-medium text-forest-900">100% Legal Titles</span>
                </div>
              )}
              {v.verifiedByMalnadRealty && (
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-600">
                    <CheckIcon width={14} height={14} />
                  </div>
                  <span className="text-sm font-medium text-forest-900">Verified by Malnad Realty</span>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* Video */}
        <Reveal delay={120}>
          <VideoCard />
        </Reveal>
      </div>
    </section>
  );
}
