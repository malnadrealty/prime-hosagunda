"use client";

import { useEffect, useRef, useState } from "react";

// Labeled placeholder image slot. When a real photo exists at `src` it loads and
// fades in over the placeholder; until then (or on error) the styled placeholder
// with a caption label is shown. Drop real photos into /public to replace slots
// automatically — no code change needed.
export default function Slot({
  src,
  alt,
  label,
  variant = "forest",
  className = "",
  imgClassName = "",
  eager = false,
  sizes,
}: {
  src?: string;
  alt: string;
  label?: string;
  variant?: "forest" | "soil" | "cream";
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  sizes?: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showImg = src && !failed;
  const variantClass =
    variant === "soil" ? "img-slot--soil" : variant === "cream" ? "img-slot--cream" : "";

  // A cached image can finish loading before React attaches onLoad, so the event
  // never fires. Check `complete` on mount (and when src changes) to catch that.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete) {
      if (el.naturalWidth > 0) setLoaded(true);
      else setFailed(true);
    }
  }, [src]);

  return (
    <div className={`img-slot ${variantClass} ${className}`} aria-hidden={false}>
      {label && !loaded && (
        <span className="img-slot__label" role="img" aria-label={alt}>
          {label}
        </span>
      )}
      {showImg && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
        />
      )}
    </div>
  );
}
