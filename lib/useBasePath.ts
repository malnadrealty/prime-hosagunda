"use client";

/**
 * Get the full path including basePath for an asset.
 * If deployed with basePath (e.g., /hosagunda), prepends it to root-relative paths.
 */
export function getAssetPath(src: string): string {
  if (!src || !src.startsWith("/")) return src;

  // Check if we're in a basePath deployment by looking at window location
  if (typeof window === "undefined") return src;

  const pathname = window.location.pathname;
  // If pathname includes /hosagunda, we're in basePath mode
  if (pathname.includes("/hosagunda")) {
    return `/hosagunda${src}`;
  }

  return src;
}
