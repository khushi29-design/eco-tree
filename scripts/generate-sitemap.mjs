/**
 * generate-sitemap.mjs — runs automatically after `npm run build`.
 * Scans the exported /out folder for every page and writes:
 *   out/sitemap.xml  — the list of pages for Google
 *   out/robots.txt   — tells search engines what to crawl and where the sitemap is
 * Uses NEXT_PUBLIC_SITE_URL from .env.local (or the default domain).
 */
import { readdirSync, statSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../out/", import.meta.url));

// read NEXT_PUBLIC_SITE_URL from .env.local / .env if present
let site = process.env.NEXT_PUBLIC_SITE_URL;
for (const f of [".env.local", ".env.production", ".env"]) {
  const p = fileURLToPath(new URL(`../${f}`, import.meta.url));
  if (!site && existsSync(p)) {
    const m = readFileSync(p, "utf8").match(/^NEXT_PUBLIC_SITE_URL=(.+)$/m);
    if (m) site = m[1].trim();
  }
}
site = (site || "https://www.ecotreelogics.com").replace(/\/$/, "");

const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (["_next", "images", "videos", "frames", "favicon", "icons", "api"].includes(name)) continue;
      walk(full);
    } else if (name === "index.html") {
      const rel = "/" + relative(OUT, dir).replace(/\\/g, "/");
      const path = rel === "/" ? "/" : `${rel}/`;
      if (path.startsWith("/404")) continue;
      pages.push(path);
    }
  }
})(OUT);

const priority = (p) => (p === "/" ? "1.0" : p.split("/").length <= 3 ? "0.8" : "0.6");
const today = new Date().toISOString().slice(0, 10);
pages.sort();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${site}${p}</loc><lastmod>${today}</lastmod><priority>${priority(p)}</priority></url>`).join("\n")}
</urlset>
`;
writeFileSync(join(OUT, "sitemap.xml"), xml);
writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site}/sitemap.xml\n`);
console.log(`sitemap.xml: ${pages.length} pages for ${site}`);
