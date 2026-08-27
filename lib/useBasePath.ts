"use client";

/**
 * With basePath /hosagunda, prepend it to all root-relative asset paths
 */
export function getAssetPath(src: string): string {
  if (!src || !src.startsWith("/")) return src;
  return `/hosagunda${src}`;
}
