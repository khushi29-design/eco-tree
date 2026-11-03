/**
 * products.js — the Products & Eco Catalogue.
 *
 * HOW TO ADD A PRODUCT
 *   1. Put a square photo (min 1200×1200, plain background) in  public/images/products/
 *      e.g. public/images/products/bamboo-toothbrush.webp
 *   2. Copy any block below, paste it at the end of the `products` list and edit it:
 *        slug     — the web address: /products/<slug>/   (lowercase, words joined with -)
 *        category — one of the `categories` ids below
 *        image    — "/images/products/bamboo-toothbrush.webp"   (null = clearly labelled placeholder)
 *        specs    — ONLY real specifications from the supplier. Leave [] if you have none.
 *   3. Save. The catalogue, filters, search, product page, sitemap and Google product data update by themselves.
 *
 * Rules: no prices, stock levels or specifications that you have not confirmed. This is an enquiry catalogue,
 * not a shop — every product has "Enquire" and "WhatsApp" buttons.
 */

export const categories = [
  { id: "everyday", name: "Everyday Eco Products", text: "Small swaps that carry a big message." },
  { id: "educational", name: "Educational Material", text: "Seed pens and seed capsules turn a giveaway into a planting: the product ends its life as a plant, not as waste." },
  { id: "kits", name: "Corporate Kits", text: "Curated kits for gifting, events, CSR drives and campuses." },
  { id: "field", name: "Field Equipment", text: "Equipment for forest and wildlife management, matched to the task: survey, patrol, monitoring or education." },
];

const p = (slug, name, category, summary, uses = [], extra = {}) => ({
  slug, name, category, summary, uses, specs: [], image: null, gallery: [], ...extra,
});

export const products = [
  // A. EVERYDAY ECO PRODUCTS (slide 14)
  p("bamboo-toothbrush", "Bamboo Toothbrush", "everyday", "A toothbrush with a bamboo handle — a simple everyday swap away from plastic.", ["Personal use", "Eco gift and CSR kits", "Hotel and guest-house amenities"]),
  p("wooden-bamboo-comb", "Wooden & Bamboo Combs", "everyday", "Combs made from wood and bamboo instead of plastic.", ["Personal use", "Eco gift kits", "Event giveaways"]),
  p("steel-straw", "Steel Straws", "everyday", "Reusable steel straws that replace single-use plastic straws.", ["Personal use", "Cafés and canteens", "Conference and event kits"]),
  p("wooden-cutlery", "Wooden Forks & Spoons", "everyday", "Wooden forks and spoons as an alternative to plastic cutlery.", ["Events and canteens", "Travel kits", "Corporate gifting"]),

  // B. EDUCATIONAL MATERIAL (slide 14)
  p("paper-pen", "Paper Pens", "educational", "Pens with a body made of paper, reducing plastic in everyday stationery.", ["Schools and colleges", "Conferences", "Awareness programmes"]),
  p("seed-pen", "Seed Pens", "educational", "Pens that carry seeds, so the pen can be planted when it is used up.", ["Plantation drives", "School programmes", "CSR giveaways"]),
  p("paper-pencil", "Paper Pencils", "educational", "Pencils made with a paper body instead of wood.", ["Schools", "Workshops", "Awareness kits"]),
  p("seed-capsule", "Seed Capsules", "educational", "Seeds packed in capsules for easy sowing and gifting.", ["Plantation drives", "Learning-through-play activities", "Event giveaways"]),

  // C. CORPORATE KITS (slide 14)
  p("eco-gift-kit", "Eco Gift Kits", "kits", "Curated sets of eco-friendly products for gifting.", ["Festive and corporate gifting", "Employee welcome kits", "Client gifts"]),
  p("conference-event-kit", "Conference & Event Kits", "kits", "Eco-friendly kits for conferences, seminars and events.", ["Delegate kits", "Workshops", "Award ceremonies"]),
  p("csr-drive-kit", "CSR Drive Kits", "kits", "Kits assembled for CSR plantation and awareness drives.", ["Plantation drives", "Community awareness programmes", "Employee volunteering days"]),
  p("school-campus-kit", "School & Campus Kits", "kits", "Kits for schools, colleges and campus green programmes.", ["Eco clubs", "Nature education sessions", "Campus green days"]),

  // D. FIELD EQUIPMENT (slide 12)
  p("handheld-gps-navic", "Handheld GPS (NavIC)", "field", "Handheld GPS units with NavIC support for field navigation and location records.", ["Surveys and mapping", "Patrol routes", "Plantation geo-tagging"]),
  p("binoculars", "Binoculars", "field", "Binoculars for wildlife observation and bird surveys.", ["Bird surveys", "Wildlife monitoring", "Nature education"]),
  p("camera-traps", "Camera Traps", "field", "Motion-triggered cameras for recording wildlife.", ["Wildlife monitoring", "Biodiversity baselines", "Research"]),
  p("surveying-equipment", "Surveying Equipment", "field", "Equipment for land and site surveys.", ["Site assessment", "Water-structure planning", "Mapping"]),
  p("telemetry-equipment", "Telemetry Equipment", "field", "Equipment for tracking and monitoring animal movement.", ["Wildlife research", "Monitoring programmes"]),
  p("drones", "Drones", "field", "Drones for aerial survey, monitoring and documentation.", ["Aerial survey", "Plantation monitoring", "Documentation"]),
  p("fish-finder-echo-sounder", "Fish Finder / Echo Sounder", "field", "Sonar equipment for water-body survey.", ["Water-body survey", "Aquatic monitoring"]),
  p("range-finders", "Range Finders", "field", "Instruments for measuring distance in the field.", ["Surveys", "Wildlife census", "Tree measurement"]),
  p("telescopes", "Telescopes", "field", "Telescopes for long-range observation.", ["Bird watching", "Wildlife observation", "Nature education"]),
  p("field-uniforms", "Field Uniforms", "field", "Uniforms for forest staff, guides and field professionals.", ["Forest staff", "Guides", "Field teams"]),
  p("torches-headlamps", "Torches & Headlamps", "field", "Lighting for night patrols, surveys and camps.", ["Night patrols", "Night surveys", "Camps"]),
  p("field-gear", "Field Gear", "field", "Backpacks, rain gear and field kits.", ["Field surveys", "Patrols", "Excursions"]),
  p("mobile-water-purification", "Mobile Water Purification Vehicle (GALMOBILE)", "field",
    "A self-contained, automatic water purification vehicle that treats rivers, lakes, sea, brackish water, wells and high-turbidity sources to WHO drinking-water standards.",
    ["Emergencies", "Remote communities", "Villages in crisis", "Field operations"],
    {
      specs: [
        ["Water sources", "Rivers, lakes, sea, brackish water, wells, high-turbidity sources"],
        ["Output standard", "WHO drinking-water standards"],
        ["Power", "Independent energy source"],
        ["Deployment", "Under 30 minutes, two people"],
        ["Control", "Tablet control up to 200 m"],
        ["Storage", "Integrated, 1,000 to 10,000 litres"],
      ],
      specsNote: "Specifications as published by the manufacturer, which reports deployments across Gujarat since 2020.",
    }),
];

export const getProduct = (slug) => products.find((x) => x.slug === slug);
export const getCategory = (id) => categories.find((c) => c.id === id);
