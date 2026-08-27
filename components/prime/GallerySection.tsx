"use client";

import { usePrime } from "./PrimeContext";
import Reveal from "./ui/Reveal";
import FarmlandGallery from "./FarmlandGallery";

export default function GallerySection() {
  const { property } = usePrime();
  const galleryData = property.gallery;
  const items = galleryData.items;

  // Convert gallery items to FarmlandGallery format (no captions)
  const galleryImages = items.map((item) => ({
    src: item.src,
    alt: item.alt,
  }));

  return (
    <>
      {/* Heading Section */}
      <section className="scroll-mt-16 bg-cream py-12 sm:py-16">
        <div className="prime-container">
          <Reveal>
            <h2 className="kannada-h2 text-forest-900">
              {galleryData.headingKannada?.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Gallery Component */}
      <FarmlandGallery images={galleryImages} />
    </>
  );
}
