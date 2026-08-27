"use client";

import { usePrime } from "./PrimeContext";
import Reveal from "./ui/Reveal";
import { LeafIcon } from "./ui/Icons";

export default function StorySection() {
  const { property } = usePrime();
  const s = property.story;
  // Split the body into two balanced columns (reference uses a 2-column read).
  const mid = Math.ceil(s.paragraphs.length / 2);
  const colA = s.paragraphs.slice(0, mid);
  const colB = s.paragraphs.slice(mid);

  return (
    <section id="story" className="scroll-mt-16 bg-cream py-16 sm:py-24">
      <div className="prime-container grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-start lg:gap-14">
        <Reveal>
          <p className="eyebrow mb-4">{s.eyebrow}</p>
          <h2 className="kannada-h2 flex items-start gap-2 text-forest-900">
            <span>
              {s.headingKannada.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </span>
            <LeafIcon width={26} height={26} className="mt-2 flex-none text-forest-500" />
          </h2>

          {/* Two-column body */}
          <div className="mt-7 grid grid-cols-1 gap-x-8 gap-y-4 text-body text-forest-900/75 sm:grid-cols-2">
            <div className="space-y-4">
              {colA.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="space-y-4">
              {colB.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <p className="accent-script mt-8 text-[1.5rem] sm:text-[1.75rem] font-semibold leading-[1.35]">{s.closing}</p>
        </Reveal>

      </div>
    </section>
  );
}
