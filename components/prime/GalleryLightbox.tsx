"use client";

import { useEffect, useRef } from "react";
import Slot from "./ui/Slot";
import type { GalleryItem } from "@/config/types";
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from "./ui/Icons";

export default function GalleryLightbox({
  open,
  index,
  items,
  onClose,
  onIndex,
}: {
  open: boolean;
  index: number;
  items: GalleryItem[];
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const touchStartX = useRef<number | null>(null);
  const count = items.length;

  const prev = () => onIndex((index - 1 + count) % count);
  const next = () => onIndex((index + 1) % count);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, count]);

  if (!open) return null;
  const item = items[index];
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex animate-fade-in flex-col bg-forest-950/95 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${count}: ${item.caption}`}
    >
      <div className="flex items-center justify-between px-4 py-4 text-ivory">
        <span className="text-sm text-ivory/70">
          {index + 1} / {count}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
        >
          <CloseIcon />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-4"
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (dx > 50) prev();
          else if (dx < -50) next();
          touchStartX.current = null;
        }}
      >
        <button
          type="button"
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-ivory hover:bg-white/20 sm:left-6"
        >
          <ChevronLeftIcon width={22} height={22} />
        </button>

        <figure className="max-h-full w-full max-w-4xl">
          <Slot
            src={item.src}
            alt={item.alt}
            label={item.caption.toUpperCase()}
            variant={item.category === "SOIL" ? "soil" : "forest"}
            className="mx-auto aspect-[3/2] w-full rounded-xl2"
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
          <figcaption className="mt-3 text-center text-sm text-ivory/75">
            {item.caption}
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-ivory hover:bg-white/20 sm:right-6"
        >
          <ChevronRightIcon width={22} height={22} />
        </button>
      </div>
    </div>
  );
}
