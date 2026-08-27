"use client";

import { getAssetPath } from "@/lib/useBasePath";

// Malnad Realty PRIME logo. Two artworks — a white wordmark for dark
// backgrounds and a black wordmark for light backgrounds. Both are rendered and
// toggled by `tone` so switching on scroll never flickers (both load once).
export default function Logo({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  // tone "light" = a light (white) logo for dark backgrounds → the *_dark file.
  // tone "dark"  = a dark (black) logo for light backgrounds → the *_light file.
  const onDark = tone === "light";
  const imgCls = "h-7 w-auto sm:h-9";

  return (
    <span className={`inline-flex items-center ${className}`}>
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src={getAssetPath("/brand/mr-prime-logo-dark.webp")}
        alt="Malnad Realty PRIME"
        width={3169}
        height={466}
        decoding="async"
        className={`${imgCls} ${onDark ? "block" : "hidden"}`}
      />
      <img
        src={getAssetPath("/brand/mr-prime-logo-light.webp")}
        alt="Malnad Realty PRIME"
        width={3169}
        height={466}
        decoding="async"
        className={`${imgCls} ${onDark ? "hidden" : "block"}`}
        aria-hidden={onDark}
      />
      {/* eslint-enable @next/next/no-img-element */}
    </span>
  );
}
