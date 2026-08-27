"use client";

/**
 * With basePath, public folder assets are served at their root paths.
 * No transformation needed - just return the path as-is.
 */
export function getAssetPath(src: string): string {
  // Public folder assets don't need basePath prepended
  // They are served at /path regardless of basePath setting
  return src;
}
