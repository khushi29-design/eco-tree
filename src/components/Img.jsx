/**
 * Img.jsx — responsive, lazy-loaded WebP image.
 * Pass `src` WITHOUT the extension, e.g. "/images/forest/aerial-view-native-plantation-trenches".
 * It loads the small "-sm.webp" on phones and the full ".webp" on larger screens.
 */
import { asset, assetSrcSet } from "@/utils/asset";

export default function Img({ src, alt, className, sizes = "(max-width: 800px) 100vw, 60vw", priority = false, width, height, style }) {
  if (!src) return null;
  return (
    <img
      src={asset(`${src}.webp`)}
      srcSet={assetSrcSet(`${src}-sm.webp 800w, ${src}.webp 1920w`)}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      width={width}
      height={height}
      style={style}
    />
  );
}
