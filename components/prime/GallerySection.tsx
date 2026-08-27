"use client";

import { usePrime } from "./PrimeContext";
import Slot from "./ui/Slot";
import Reveal from "./ui/Reveal";

export default function GallerySection() {
  const { property, openGallery } = usePrime();
  const items = property.gallery;

  return (
    <section id="gallery" className="scroll-mt-16 bg-cream py-16 sm:py-24">
      <div className="prime-container grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr] lg:items-center lg:gap-10">
        {/* Left — heading */}
        <Reveal>
          <p className="eyebrow mb-4">SEE IT AS IT IS</p>
          <h2 className="text-3xl font-bold leading-[1.12] tracking-tight text-forest-900 sm:text-[2.2rem]">
            No Renders.
            <br />
            <span className="text-forest-600">No Artificial Views.</span>
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-forest-900/65">
            What you see is what exists on the land today.
          </p>
        </Reveal>

        {/* Right — captioned thumbnail strip */}
        <Reveal delay={100}>
          <div className="no-scrollbar snap-x-mandatory -mx-5 flex gap-3 overflow-x-auto px-5 pb-1 lg:mx-0 lg:px-0">
            {items.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => openGallery(index)}
                className="snap-start w-[42vw] flex-none sm:w-[28vw] lg:w-auto lg:flex-1"
                aria-label={`Open image: ${item.caption}`}
              >
                <div className="group relative overflow-hidden rounded-xl2 shadow-card">
                  <Slot
                    src={item.src}
                    alt={item.alt}
                    label={item.caption.toUpperCase()}
                    variant={item.category === "SOIL" ? "soil" : "forest"}
                    className="aspect-[3/4] w-full"
                    imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    sizes="(min-width: 1024px) 12vw, 42vw"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/80 to-transparent p-2.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ivory">
                      {item.caption}
                    </span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
