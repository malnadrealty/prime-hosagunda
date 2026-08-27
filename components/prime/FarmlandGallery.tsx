"use client";

import { useRef, type ReactNode } from "react";
import { getAssetPath } from "@/lib/useBasePath";
import Reveal from "./ui/Reveal";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export default function FarmlandGallery({ images }: { images: GalleryImage[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="gallery" className="scroll-mt-16 bg-cream py-16 sm:py-24">
      <div className="prime-container">
        <Reveal>
          <p className="eyebrow mb-4">FARMLAND VIEWS</p>
          <h2 className="text-h2 text-forest-900">Explore the Property</h2>
          <p className="mt-2 text-body text-forest-900/70">
            Swipe through different areas of our lush farmland
          </p>
        </Reveal>

        {/* Mobile: Horizontal Scroll Gallery */}
        <Reveal delay={80} className="mt-8">
          <div
            ref={scrollRef}
            className="no-scrollbar snap-x-mandatory -mx-5 flex gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:hidden"
          >
            {images.map((image, index) => (
              <div
                key={image.src}
                className="snap-start w-[70vw] flex-none sm:w-[45vw]"
              >
                <GalleryCard image={image} index={index} />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Desktop: Grid Gallery */}
        <Reveal delay={80} className="mt-8">
          <div className="hidden grid-cols-2 gap-4 lg:grid lg:grid-cols-3">
            {images.map((image, index) => (
              <GalleryCard key={image.src} image={image} index={index} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GalleryCard({
  image,
  index,
}: {
  image: GalleryImage;
  index: number;
}) {
  return (
    <Reveal delay={index * 40}>
      <div className="group relative overflow-hidden rounded-xl2 shadow-card">
        {/* Fixed 4:5 aspect ratio container */}
        <div className="relative w-full overflow-hidden bg-forest-100" style={{ aspectRatio: "4/5" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getAssetPath(image.src)}
            alt={image.alt}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Caption Overlay */}
        {image.caption && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/90 to-transparent p-3 sm:p-4">
            <p className="eyebrow text-ivory">{image.caption}</p>
          </div>
        )}
      </div>
    </Reveal>
  );
}
