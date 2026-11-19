/**
 * asset.js — makes file paths work wherever the website is hosted.
 *
 * On Hostinger the site lives at the domain root:   https://www.ecotreelogics.com/images/...
 * On GitHub Pages it lives in a sub-folder:         https://<user>.github.io/ecotree-logics/images/...
 *
 * Always write paths from the root ("/images/logo.png") and wrap them in asset() wherever
 * they are put into src / poster / fetch. The sub-folder (NEXT_PUBLIC_BASE_PATH) is added
 * automatically at build time; it is empty for Hostinger and local runs.
 * Page links made with <Link href="/about/"> do NOT need this — Next.js adds it itself.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

export function asset(path) {
  if (!path || typeof path !== "string" || !path.startsWith("/") || path.startsWith("//")) return path;
  if (BASE_PATH && path.startsWith(`${BASE_PATH}/`)) return path;
  return `${BASE_PATH}${path}`;
}

/** asset() for every URL in a srcSet string: "/a-sm.webp 800w, /a.webp 1920w" */
export function assetSrcSet(srcSet) {
  if (!srcSet) return srcSet;
  return srcSet.split(",").map((part) => {
    const [url, ...rest] = part.trim().split(/\s+/);
    return [asset(url), ...rest].join(" ");
  }).join(", ");
}
