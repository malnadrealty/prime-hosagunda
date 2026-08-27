"use client";

import { usePrime } from "./PrimeContext";
import Reveal from "./ui/Reveal";
import { track } from "@/lib/analytics";

// "Explore the Property" — the real plot sketch, shown cleanly with a
// full-screen viewer and a download for viewing on the phone anytime.
export default function Masterplan() {
  const { property } = usePrime();

  return (
    <section id="explore" className="scroll-mt-16 bg-forest-950 py-16 text-ivory sm:py-24">
      <div className="prime-container">
        <Reveal>
          <p className="eyebrow-light mb-4">{property.masterplan.headingKannada}</p>
          <h2 className="kannada-h2 text-ivory">
            {property.masterplan.mainLine}
          </h2>
          <p className="mt-2 text-label font-semibold tracking-wide text-moss">
            {property.masterplan.supportingLine}
          </p>
          <p className="mt-4 max-w-xl text-body text-ivory/70">
            {property.masterplan.description}
          </p>
          <p className="mt-2 text-label font-medium text-ivory">
            {property.masterplan.highlight}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-9 max-w-lg">
            <p className="text-center text-body text-ivory/70">
              Plot sizes are marked on the sketch. Current pricing &amp; availability are shown below.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
