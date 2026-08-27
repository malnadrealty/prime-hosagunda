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
      {/* Gallery Component */}
      <FarmlandGallery images={galleryImages} />
    </>
  );
}
