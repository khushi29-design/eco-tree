/**
 * projects.js — project portfolio (slides 18–21).
 *
 * `figureLabel`: the presentation states that every reported number is labelled
 * "target, estimate, completed output or independently verified". Set the correct
 * label for each figure below once confirmed — it is shown next to the number on the site.
 */

export const projects = [
  {
    slug: "nisargavedh",
    name: "Project Nisargavedh",
    tagline: "Degraded land, brought back",
    location: "Village Wakeshwar, off the Nagpur–Chandrapur Road, Nagpur",
    shortLocation: "Wakeshwar, Nagpur",
    role: "Conservation consultant & lead",
    summary:
      "A long-term restoration of degraded land at Village Wakeshwar, off the Nagpur–Chandrapur Road, run by CHIP Nagpur.",
    seoTitle: "Project Nisargavedh — Native Afforestation & Land Restoration, Wakeshwar, Nagpur",
    seoDescription:
      "Project Nisargavedh: long-term restoration of degraded land at Wakeshwar, Nagpur — native afforestation, soil-moisture conservation, site protection, bird documentation and education.",
    workstreams: [
      { title: "Native afforestation", text: "Indigenous species, planted and maintained" },
      { title: "Soil-moisture conservation", text: "Degraded land brought back to productivity" },
      { title: "Site protection", text: "Long-term care of the plantation" },
      { title: "Biodiversity documentation", text: "A cumulative bird species record" },
      { title: "Education and outreach", text: "Learning on a working restoration site" },
    ],
    figures: [
      { value: 70, suffix: "+", label: "acres restored" },
      { value: 56500, suffix: "+", label: "native trees planted" },
      { value: 98, suffix: "%", label: "plant survival rate" },
      { value: 147, suffix: "+", label: "bird species documented" },
    ],
    figureLabel: "Reported project figures",
    heroImage: "/images/forest/aerial-view-native-plantation-trenches",
    heroAlt: "Aerial view of the restored native plantation at Project Nisargavedh, Wakeshwar",
    video: "nisargavedh-drone-gabion-to-plantation",
    videoCaption: "Drone footage: from a gabion structure up over the native plantation, with its rows of soil-moisture pits.",
  },
  {
    slug: "ret-conservation-park",
    name: "RET Conservation Park",
    tagline: "Conserving rare, endangered and threatened plants",
    location: "Butibori, Nagpur",
    shortLocation: "Butibori, Nagpur",
    role: "Ecology-based landscaping · Plantation plan · 70+ native species · 4,000 plants procured",
    summary:
      "A conservation park for rare, endangered and threatened (RET) plants at Butibori, Nagpur, with ecology-based landscaping, a plantation plan of 70+ native species and 4,000 plants procured.",
    seoTitle: "RET Conservation Park, Butibori, Nagpur — Rare & Threatened Plant Conservation",
    seoDescription:
      "RET Conservation Park, Butibori, Nagpur: 5.5 ha, 4,000+ plants, 70+ native species — nursery and propagation, bilingual Marathi–English signage and conservation education.",
    workstreams: [
      { title: "Nursery & propagation", text: "Raising RET species that are difficult to source" },
      { title: "Bilingual signage", text: "Interpretation in Marathi and English" },
      { title: "Conservation education", text: "Visitor learning around threatened flora, with guided educational content" },
    ],
    figures: [
      { value: 5.5, decimals: 1, suffix: " ha", label: "park area planned and landscaped" },
      { value: 4000, suffix: "+", label: "plants procured" },
      { value: 70, suffix: "+", label: "native species" },
    ],
    figureLabel: "Reported project figures",
    transfers: [
      "Botanical and medicinal-plant parks",
      "Native plant conservation zones on campuses and industrial greenbelts",
      "Nurseries supplying restoration programmes",
      "Species-selection lists for afforestation projects",
      "Interpretation for schools and visitors",
    ],
    heroImage: "/images/projects/nursery-shade-net-frame-footings-nagpur",
    heroAlt: "Shade-net nursery frame being erected with poles set in concrete footings",
    // NOTE: the drone video DJI_0192 is NOT linked here until it is confirmed to show this park.
    video: null,
  },
];

// slide 20 — conservation infrastructure and field implementation
export const infrastructure = [
  { title: "Gabion structures & bunds", purpose: "Slow runoff, trap silt", status: "Completed", image: "/images/projects/gabion-structure-forest-drainage-line", alt: "Stone gabion structure in a forest drainage line" },
  { title: "Soil & moisture conservation", purpose: "Hold water at the root zone", status: "Completed", image: "/images/forest/aerial-view-native-plantation-trenches", alt: "Soil-moisture trenches around young native trees, seen from above" },
  { title: "Plantation with drip irrigation", purpose: "Establish native saplings", status: "Completed", image: "/images/forest/native-saplings-drip-irrigation-rows", alt: "Native saplings with drip irrigation lines" },
  { title: "Pond / check-dam restoration", purpose: "Store and recharge water", status: "Completed", image: "/images/projects/check-dam-overflow-water-conservation", alt: "Water flowing over a restored check dam" },
  { title: "Nursery development", purpose: "Raise native planting stock", status: "Completed", image: "/images/projects/nursery-site-after-shade-net", alt: "Completed shade-net nursery with planting stock" },
  { title: "Microhabitat management", purpose: "Shelter for insects, reptiles and birds", status: "Completed", image: "/images/gallery/volunteers-building-gabion-structure", alt: "Volunteers placing stones for a structure that also shelters small animals" },
];

export const getProject = (slug) => projects.find((x) => x.slug === slug);
