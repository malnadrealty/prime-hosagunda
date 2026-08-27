"use client";

/**
 * Get the full path including basePath for an asset.
 * If deployed with basePath (e.g., /hosagunda), prepends it to root-relative paths.
 */
export function getAssetPath(src: string): string {
  if (!src || !src.startsWith("/")) return src;

  // Always prepend /hosagunda for root-relative paths
  // This is safe because with basePath, the app is served at /hosagunda
  return `/hosagunda${src}`;
}
