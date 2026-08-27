"use client";

import { usePrime } from "./PrimeContext";
import Slot from "./ui/Slot";
import Reveal from "./ui/Reveal";
import { LeafIcon } from "./ui/Icons";

export default function PlantationSection() {
  const { property } = usePrime();
  const p = property.plantation;

  return (
    <section
      id="plantation"
      className="scroll-mt-16 bg-forest-950 py-16 text-ivory sm:py-24"
    >
      <div className="prime-container grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[1fr_320px]">
        {/* Left heading */}
        <Reveal>
          <p className="eyebrow-light mb-4">{p.eyebrow}</p>
          <h2 className="kannada-h2 flex items-center gap-2 text-ivory">
            {p.headingKannada}
            <LeafIcon width={24} height={24} className="flex-none text-moss" />
          </h2>
          <p className="mt-3 text-subtitle text-moss">{p.subheading}</p>
        </Reveal>

        {/* Right heading */}
        <Reveal delay={80} className="lg:pt-2">
          <h3 className="text-h3 uppercase text-ivory">
            Years of Growth.
            <br />
            <span className="text-moss">Already on the Land.</span>
          </h3>
        </Reveal>

        {/* Left — 5 crop cards */}
        <div className="lg:col-start-1 lg:row-start-2">
          <div className="no-scrollbar snap-x-mandatory -mx-5 flex gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-5 lg:overflow-visible">
            {property.crops.map((crop, i) => (
              <Reveal
                key={crop.key}
                delay={i * 50}
                className="snap-start w-[60vw] flex-none sm:w-[38vw] lg:w-auto"
              >
                <article className="group h-full overflow-hidden rounded-xl2 bg-forest-900 ring-1 ring-white/8">
                  <Slot
                    src={crop.image}
                    alt={crop.alt}
                    label={crop.name.toUpperCase()}
                    className="aspect-[4/5] w-full"
                    imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    sizes="(min-width: 1024px) 14vw, 60vw"
                  />
                  <div className="p-3">
                    <h4 className="text-label font-bold text-ivory">{crop.name}</h4>
                    <p className="mt-0.5 eyebrow text-moss">
                      {crop.age}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right — vertical timeline */}
        <div className="lg:col-start-2 lg:row-start-2">
          <Reveal delay={80}>
            <ol className="space-y-3">
              {property.timeline.map((t) => {
                const number = t.years.split(" ")[0];
                return (
                  <li
                    key={t.crop}
                    className="flex items-center gap-4 rounded-xl2 bg-forest-900/60 px-4 py-3 ring-1 ring-white/8"
                  >
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border-2 border-moss/60 text-label font-extrabold text-ivory">
                      {number}
                    </span>
                    <span>
                      <span className="block eyebrow text-moss">
                        Years
                      </span>
                      <span className="block text-label font-semibold text-ivory">{t.crop}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>

        {/* Closing line — full width */}
        <Reveal delay={120} className="lg:col-span-2">
          <p className="text-body leading-relaxed text-ivory/70">
            {property.timelineClosing.map((line, i) => (
              <span key={i} className={i === property.timelineClosing.length - 1 ? "text-ivory" : ""}>
                {line}{" "}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
