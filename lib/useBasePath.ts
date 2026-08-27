"use client";

/**
 * With basePath deployment, prepend basePath to asset URLs.
 */
export function getAssetPath(src: string): string {
  if (!src || !src.startsWith("/")) return src;

  // For production deployment with basePath /hosagunda
  // Always prepend it to root-relative paths
  return `/hosagunda${src}`;
}
