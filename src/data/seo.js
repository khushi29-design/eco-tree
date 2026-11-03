/**
 * seo.js — page titles, descriptions and social images for every fixed page.
 * (Capability, project and product pages take their SEO text from their own data files.)
 *
 * Tips: title ≈ 50–60 characters, description ≈ 140–160 characters, keywords used naturally.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ecotreelogics.com").replace(/\/$/, "");
export const SITE_NAME = "EcoTree Logics";
export const DEFAULT_OG_IMAGE = "/images/og/ecotree-logics-social-card.jpg";

export const pageSeo = {
  home: {
    title: "EcoTree Logics | Ecological Restoration & Environmental Consultancy, Nagpur",
    description:
      "Ecology, engineering, education and evidence at one stop: native afforestation, water conservation, biodiversity, carbon assessment and nature education in Nagpur and Maharashtra.",
  },
  about: {
    title: "About EcoTree Logics | Natural Security Through Ecology-Based Solutions",
    description:
      "Why EcoTree Logics exists: India's natural infrastructure deficit, our vision and mission, the ECO·TREE·LOGICS philosophy and our eight-step way of working.",
  },
  capabilities: {
    title: "Our Capabilities | Restoration, Water, Biodiversity, Carbon & Education",
    description:
      "Eight environmental capabilities, one accountable team: restoration, conservation engineering, biodiversity, education, carbon consultancy, digital, nature experiences and field equipment.",
  },
  products: {
    title: "Sustainable Products & Field Equipment Catalogue | EcoTree Logics",
    description:
      "Eco-friendly everyday products, seed pens and educational material, corporate and CSR kits, and forest and wildlife field equipment. Enquire by form or WhatsApp.",
  },
  projects: {
    title: "Environmental Projects in Nagpur | Project Portfolio — EcoTree Logics",
    description:
      "Project Nisargavedh, the RET Conservation Park at Butibori and conservation infrastructure: gabions, bunds, drip irrigation, check dams, nurseries and microhabitats.",
  },
  impact: {
    title: "Our Impact | Acres Restored, Trees Planted, Species Documented",
    description:
      "70+ acres restored, 56,500+ native trees planted, 98% survival and 147+ bird species documented at Project Nisargavedh — plus 5.5 ha RET Conservation Park, Butibori.",
  },
  gallery: {
    title: "Project Gallery | Restoration Photos & Drone Videos — EcoTree Logics",
    description:
      "Photos and drone videos from restoration, water conservation, nursery and nature education work around Nagpur, Maharashtra.",
  },
  contact: {
    title: "Contact EcoTree Logics | Environmental Project & Product Enquiries",
    description:
      "Start with one site. Contact EcoTree Logics for restoration, water conservation, biodiversity, carbon assessment, nature experiences, field equipment and eco products.",
  },
};
