/**
 * Seo.jsx — every page renders <Seo …/> once. It writes the <title>, meta description,
 * canonical URL, Open Graph + Twitter cards and any JSON-LD structured data.
 */
import Head from "next/head";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/data/seo";

export default function Seo({ title, description, path = "/", image = DEFAULT_OG_IMAGE, imageAlt, schema = [], noindex = false, type = "website" }) {
  const url = `${SITE_URL}${path}`;
  const img = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const schemas = Array.isArray(schema) ? schema : [schema];
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:alt" content={imageAlt || title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {schemas.filter(Boolean).map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </Head>
  );
}
