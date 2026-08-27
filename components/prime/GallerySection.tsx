"use client";

import { usePrime } from "./PrimeContext";
import Reveal from "./ui/Reveal";

export default function GallerySection() {
  const { property } = usePrime();
  const galleryData = property.gallery;
  const items = galleryData.items;

  return (
    <section id="gallery" className="scroll-mt-16 bg-cream py-16 sm:py-24">
      <div className="prime-container grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr] lg:items-center lg:gap-10">
        {/* Left — heading */}
        <Reveal>
          <h2 className="kannada-h2 text-forest-900">
            {galleryData.headingKannada?.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-3 text-label font-semibold uppercase text-forest-600">
            {galleryData.subtitle?.map((line, i) => (
              <span key={i}>{line} </span>
            ))}
          </p>
          <p className="mt-2 text-body leading-relaxed text-forest-900/65">
            {galleryData.supporting}
          </p>
        </Reveal>

        {/* Right — captions only (images coming soon) */}
        <Reveal delay={100}>
          <div className="no-scrollbar snap-x-mandatory -mx-5 flex gap-3 overflow-x-auto px-5 pb-1 lg:mx-0 lg:px-0">
            {items.map((item) => (
              <div
                key={item.src}
                className="snap-start w-[42vw] flex-none sm:w-[28vw] lg:w-auto lg:flex-1"
              >
                <div className="rounded-xl2 bg-forest-900/50 p-4">
                  <span className="eyebrow text-ivory">
                    {item.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
