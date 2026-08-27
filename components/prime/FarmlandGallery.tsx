"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { getAssetPath } from "@/lib/useBasePath";
import Reveal from "./ui/Reveal";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export default function FarmlandGallery({ images }: { images: GalleryImage[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    if (selectedImage) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [selectedImage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasScrolled && scrollRef.current) {
          setHasScrolled(true);
          triggerAutoScroll();
        }
      },
      { threshold: 0.3 }
    );

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => observer.disconnect();
  }, [hasScrolled]);

  const triggerAutoScroll = () => {
    if (!scrollRef.current) return;

    const element = scrollRef.current;
    const scrollAmount = 300;
    let scrollDirection = 1;
    let cycles = 0;

    const autoScroll = setInterval(() => {
      element.scrollLeft += scrollAmount * scrollDirection;
      cycles++;

      if (cycles >= 2) {
        scrollDirection *= -1;
        cycles = 0;
      }

      if (element.scrollLeft === 0) {
        clearInterval(autoScroll);
      }
    }, 600);
  };

  return (
    <section id="gallery" className="scroll-mt-16 bg-cream py-16 sm:py-24">
      <div className="prime-container">
        <Reveal>
          <p className="eyebrow mb-4">FARMLAND VIEWS</p>
          <h2 className="text-h2 text-forest-900">Explore the Property</h2>
          <p className="mt-2 text-body text-forest-900/70">
            Swipe through different areas of our lush farmland
          </p>
          <p className="mt-6 kannada text-xl leading-snug text-forest-900 sm:text-2xl">
            ಫೋಟೋದಲ್ಲಿ ಹೇಗಿದೆಯೋ, ಜಮೀನಿನಲ್ಲೂ ಹಾಗೆಯೇ ಇದೆ.
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
                <GalleryCard
                  image={image}
                  index={index}
                  onImageClick={() => setSelectedImage(image)}
                />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Desktop: Grid Gallery */}
        <Reveal delay={80} className="mt-8">
          <div className="hidden grid-cols-2 gap-4 lg:grid lg:grid-cols-3">
            {images.map((image, index) => (
              <GalleryCard
                key={image.src}
                image={image}
                index={index}
                onImageClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </Reveal>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest-950/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Container */}
            <div className="relative w-full overflow-hidden rounded-lg bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getAssetPath(selectedImage.src)}
                alt={selectedImage.alt}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function GalleryCard({
  image,
  index,
  onImageClick,
}: {
  image: GalleryImage;
  index: number;
  onImageClick: () => void;
}) {
  return (
    <Reveal delay={index * 40}>
      <button
        onClick={onImageClick}
        className="group relative w-full overflow-hidden rounded-xl2 shadow-card cursor-pointer transition-transform hover:scale-105"
      >
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
      </button>
    </Reveal>
  );
}
