/**
 * Next.js configuration
 *
 * output: 'export'   -> `npm run build` writes a fully static website to /out
 *                       (plain HTML/CSS/JS — works on any Hostinger plan, no Node server needed).
 * trailingSlash      -> every page is exported as /page-name/index.html so that direct
 *                       links such as ecotreelogics.com/about/ open correctly on Hostinger.
 * images.unoptimized -> the Next image server does not exist on static hosting; we ship
 *                       pre-optimised WebP files instead (see scripts/prepare-media.py).
 */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
