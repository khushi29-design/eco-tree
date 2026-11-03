/**
 * schema.js — Schema.org structured data (JSON-LD) for Google.
 * Only facts that exist in the company data are used. No ratings, prices or addresses are invented.
 * LocalBusiness is intentionally NOT used: the company has published "Maharashtra, India" but no street address.
 */
import { company } from "@/data/company";
import { SITE_URL } from "@/data/seo";

const abs = (path) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: company.name,
  alternateName: company.shortName,
  url: `${SITE_URL}/`,
  logo: abs("/images/logo/ecotree-logics-logo-colour.png"),
  slogan: company.tagline,
  description: company.positioning,
  email: company.contact.email,
  telephone: company.contact.phoneDisplay,
  address: { "@type": "PostalAddress", addressRegion: "Maharashtra", addressCountry: "IN" },
  areaServed: { "@type": "State", name: "Maharashtra" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: company.contact.phoneDisplay,
    email: company.contact.email,
    contactType: "customer service",
    availableLanguage: ["English", "Marathi", "Hindi"],
  },
  sameAs: Object.values(company.social).filter(Boolean),
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: company.shortName,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
});

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.label,
    item: abs(it.href),
  })),
});

export const serviceSchema = (cap) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: cap.title,
  serviceType: cap.title,
  description: cap.seoDescription,
  url: abs(`/capabilities/${cap.slug}/`),
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "State", name: "Maharashtra" },
});

/** Product schema WITHOUT offers/price — this is an enquiry catalogue. */
export const productSchema = (product, categoryName) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.summary,
  category: categoryName,
  url: abs(`/products/${product.slug}/`),
  ...(product.image ? { image: abs(product.image) } : {}),
  brand: { "@type": "Brand", name: company.shortName },
});

export const articleSchema = ({ title, description, path, image }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  url: abs(path),
  image: image ? abs(image) : undefined,
  author: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
});
