"use client";

/**
 * Get asset path - for sketch component, just return the path as-is
 * Next.js handles public folder assets correctly with basePath
 */
export function getAssetPath(src: string): string {
  return src;
}
