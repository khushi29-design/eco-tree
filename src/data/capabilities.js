/**
 * capabilities.js — the eight capabilities (slide 6) and their detail pages.
 *
 * Every capability page answers five questions, in this order:
 *   whatItIs · whyItMatters · provides (what EcoTree Logics provides) · benefits · enquiry (handled by the shared form)
 *
 * `feature` picks a special interactive block for that page (see src/sections/CapabilityFeature.jsx):
 *   "restore-enrich-interpret" | "ridge-to-valley" | "habitats" | "learning-play" | "carbon-terms"
 *   | "digital" | "experiences" | "equipment"
 * `image` paths point to files in /public/images. Swap them for new photos at any time.
 */

export const capabilities = [
  {
    slug: "restoration-afforestation",
    letter: "A",
    title: "Restoration & Afforestation",
    short: "Native plantation, degraded-land rehabilitation, mini-forests, nursery planning, drip irrigation, maintenance",
    seoTitle: "Ecological Restoration & Native Afforestation Services in Maharashtra",
    seoDescription:
      "Native-species afforestation, degraded-land rehabilitation, mini-forests, nurseries and drip irrigation — restoration measured by survival, year after year. EcoTree Logics, Nagpur.",
    image: "/images/forest/native-saplings-drip-irrigation-rows",
    imageAlt: "Native saplings planted in rows with drip irrigation lines on a restoration site near Nagpur",
    whatItIs:
      "Restoration brings degraded land back to a living, self-sustaining landscape. We plant native species, rehabilitate degraded ground, create mini-forests and plan nurseries — and we keep caring for the site until the plantation can stand on its own.",
    whyItMatters:
      "Plantation is usually measured by saplings planted. But when species, soil and water are never planned together, survival falls after the photo opportunity. Restoration has to be measured by what is still alive, year after year.",
    provides: [
      "Site assessment and native species selection",
      "Soil-moisture conservation before planting",
      "Fencing or bio-fencing and drip irrigation",
      "Degraded-land rehabilitation and mini-forests",
      "Nursery planning and native planting stock",
      "Maintenance and survival monitoring for years",
    ],
    benefits: [
      "Higher plant survival because water, soil and protection are planned before planting",
      "Native cover that supports local birds, insects and soil life",
      "Labelled survival data you can report to CSR, ESG or departmental reviewers",
    ],
    feature: "restore-enrich-interpret",
  },
  {
    slug: "conservation-engineering-water",
    letter: "B",
    title: "Conservation Engineering & Water",
    short: "Rainwater harvesting, recharge wells and pits, check dams, gabions, bunds, ponds, stream and bank work",
    seoTitle: "Water Conservation & Soil Conservation Engineering — Ridge to Valley",
    seoDescription:
      "Rainwater harvesting, recharge pits and wells, check dams, gabions, bunds, ponds and stream-bank work, planned ridge to valley for the whole catchment. EcoTree Logics.",
    image: "/images/projects/gabion-structure-forest-drainage-line",
    imageAlt: "Stone gabion structure built across a forest drainage line to slow runoff and trap silt",
    whatItIs:
      "Conservation engineering uses soil and water structures — rainwater harvesting, recharge wells and pits, check dams, gabions, bunds, ponds, and stream and bank work — to slow, sink and store rain where it falls.",
    whyItMatters:
      "Structures built one at a time often silt up or run dry, because they were engineered for a point, not for the catchment that feeds them. 751 of India's 6,746 groundwater assessment units are over-exploited (CGWB, 2024).",
    provides: [
      "Ridge-to-valley water plans for the whole catchment",
      "Contour trenches and native cover on upper slopes",
      "Bunds and loose-boulder or gabion structures in drainage lines",
      "Check dams and ponds in the valley",
      "Recharge pits and wells that feed groundwater",
      "Stream and bank work",
    ],
    benefits: [
      "Water held at the root zone for plantations and green cover",
      "Silt trapped before it reaches ponds and check dams",
      "Each structure chosen for the site's hydrology, terrain, soil, permissions and technical feasibility",
    ],
    feature: "ridge-to-valley",
  },
  {
    slug: "biodiversity-habitats",
    letter: "C",
    title: "Biodiversity & Habitats",
    short: "Baseline studies, microhabitats, butterfly and firefly gardens, RET plant conservation parks",
    seoTitle: "Biodiversity Conservation, Baseline Studies & Habitat Design",
    seoDescription:
      "Biodiversity baseline studies, microhabitats, butterfly gardens, firefly-friendly zones and RET (rare, endangered, threatened) plant conservation parks. EcoTree Logics, Maharashtra.",
    image: "/images/forest/aerial-view-native-plantation-trenches",
    imageAlt: "Aerial view of young native trees and soil-moisture trenches on a restored plantation",
    whatItIs:
      "Biodiversity work turns greenery into habitat. We record what lives on a site, then design for it: microhabitats, butterfly gardens with host and nectar plants, firefly-friendly zones and conservation parks for rare, endangered and threatened (RET) plants.",
    whyItMatters:
      "Gardens are often chosen for looks. Habitats designed for butterflies, birds and native flora keep a landscape alive — and a recorded baseline is the only way to show what has changed.",
    provides: [
      "Flora, fauna and habitat baseline studies",
      "Microhabitats: log piles, rock piles, wetland edges",
      "Butterfly gardens with host and nectar plants",
      "Firefly-friendly zones (concept stage)",
      "RET plant conservation parks and mini-forests",
      "Nursery and propagation of species that are difficult to source",
    ],
    benefits: [
      "Shelter for insects, reptiles and birds",
      "A documented species record that grows over time",
      "Native plant conservation zones on campuses and industrial greenbelts",
    ],
    feature: "habitats",
  },
  {
    slug: "nature-education-interpretation",
    letter: "D",
    title: "Nature Education & Interpretation",
    short: "Interpretation centres, field journals, activity books, QR-enabled signage",
    seoTitle: "Nature Education, Interpretation Centres & QR Signage",
    seoDescription:
      "Interpretation centres, nature trails with learning stations, bilingual QR-enabled signage, field journals, activity books and learning-through-play for every age. EcoTree Logics.",
    image: "/images/gallery/nature-education-session-lined-pond",
    imageAlt: "Students gathered around a lined farm pond during a nature education session",
    whatItIs:
      "Interpretation helps people understand the landscape they are standing in. We design interpretation centres, nature trails with learning stations, QR species profiles, bilingual signage, field journals, checklists, activity books and school programmes.",
    whyItMatters:
      "Parks are opened but not understood when interpretation is added at the end. Visitors walk through without learning. A learning journey planned from the start changes that.",
    provides: [
      "Themed interpretation centres",
      "Nature trails with learning stations",
      "QR species profiles and bilingual signage (Marathi and English)",
      "Field journals, checklists and activity books",
      "School programmes and age-matched learning-through-play formats",
    ],
    benefits: [
      "Visitors who leave understanding the site, not just having seen it",
      "Learning material matched to age, site and one clear learning outcome",
      "Education that continues after the guided visit ends",
    ],
    feature: "learning-play",
  },
  {
    slug: "carbon-sustainability-consultancy",
    letter: "E",
    title: "Carbon & Sustainability Consultancy",
    short: "Carbon-stock and footprint assessment, green-asset inventories, nature-positive planning",
    seoTitle: "Carbon Stock Assessment, Carbon Footprint & Green-Asset Inventory",
    seoDescription:
      "Carbon-stock, sequestration and footprint assessment, tree inventories, green-asset inventories and nature-positive planning — clarity before claims. EcoTree Logics.",
    image: "/images/forest/sunset-over-restored-plantation-nagpur",
    imageAlt: "Sunset over a restored plantation with young trees and drip lines",
    whatItIs:
      "Carbon and sustainability consultancy measures what a site holds and what an organisation emits: carbon-stock and footprint assessment, tree inventories, green-asset inventories and nature-positive planning.",
    whyItMatters:
      "Impact is often claimed but cannot be shown, because no baseline was recorded and targets, estimates and results were mixed together. Clarity comes before claims.",
    provides: [
      "Scope and boundary definition",
      "Tree inventory and species identification",
      "Biomass and carbon-stock estimation",
      "Flora, fauna and habitat baseline",
      "GIS mapping (where available)",
      "Report and monitoring plan",
    ],
    benefits: [
      "Baselines, stated methods and clearly labelled evidence",
      "Reference frameworks applied where they fit: IPCC Guidelines for National GHG Inventories (AFOLU) and 2019 Refinement; GHG Protocol Corporate Standard",
      "A monitoring plan so change can be shown over time",
    ],
    disclaimer:
      "Assessments are estimates with stated assumptions. They are not third-party verification, accredited certification or carbon-credit issuance.",
    feature: "carbon-terms",
  },
  {
    slug: "digital-technology",
    letter: "F",
    title: "Digital Technology",
    short: "Biodiversity websites, species QR systems, digital content, eco-centre design support",
    seoTitle: "Biodiversity Websites, Species QR Systems & Digital Content",
    seoDescription:
      "Biodiversity websites, species QR systems, digital interpretation content and eco-centre design support for parks, campuses and restoration sites. EcoTree Logics.",
    image: "/images/forest/native-sapling-with-stake-drip-line",
    imageAlt: "Close-up of a native sapling supported by a stake beside a drip line",
    whatItIs:
      "Digital technology carries a site's story beyond its gate: biodiversity websites, species QR systems that link signage to species profiles, digital content and design support for eco-centres.",
    whyItMatters:
      "A signboard at the gate says little. A QR-enabled learning journey lets every visitor open a species profile on the spot, and keeps the site's record available long after the visit.",
    provides: [
      "Biodiversity websites for parks, campuses and projects",
      "Species QR systems linked to species profiles",
      "Digital interpretation content",
      "Eco-centre design support",
    ],
    benefits: [
      "Interpretation that can be updated without replacing signage",
      "A permanent, shareable record of a site's biodiversity",
      "Learning that reaches people who never visit in person",
    ],
    feature: "digital",
  },
  {
    slug: "nature-experiences-learning-play",
    letter: "G",
    title: "Nature Experiences & Learning Play",
    short: "Trails, forest hikes, safaris, corporate outings, field excursions, educational games",
    seoTitle: "Nature Trails, Wildlife Safaris & Corporate Nature Outings near Nagpur",
    seoDescription:
      "Guided nature trails, forest hikes, wildlife safaris through authorised channels, one-day corporate tours and field excursions near Nagpur — into the forest, with a purpose.",
    image: "/images/gallery/volunteers-building-gabion-structure",
    imageAlt: "Volunteers working together to build a stone gabion structure on a restoration site",
    whatItIs:
      "Nature experiences take people into the forest with a purpose: guided trails, forest hikes, wildlife safaris, one-day corporate tours, field excursions and educational games, planned end to end.",
    whyItMatters:
      "Day outings with no learning are soon forgotten. Trails, safaris and excursions built around a clear learning outcome turn a day out into understanding.",
    provides: [
      "Nature trails — guided interpretive walks with learning stations",
      "Forest hiking — trail hikes graded for fitness and age",
      "Wildlife safaris — booked through authorised forest department channels",
      "One-day corporate tours — team outings that combine nature, activity and learning",
      "Field excursions for schools, colleges and professional groups",
      "Event planning — transport, permits, guides, food and safety, end to end",
    ],
    benefits: [
      "A clear learning outcome for every trip",
      "Every trip follows park rules, uses authorised bookings and leaves no trace",
      "One team handles the logistics end to end",
    ],
    feature: "experiences",
  },
  {
    slug: "field-equipment-eco-products",
    letter: "H",
    title: "Field Equipment & Eco Products",
    short: "Field gear, uniforms, GPS, drones, water purification, eco-friendly products and kits",
    seoTitle: "Forest & Wildlife Field Equipment, Mobile Water Purification & Eco Products",
    seoDescription:
      "Field equipment for forest and wildlife management — NavIC GPS, binoculars, camera traps, drones, telemetry, uniforms — plus mobile water purification and eco-friendly products and kits.",
    image: "/images/projects/drip-irrigation-mainline-trench",
    imageAlt: "Drip irrigation mainline pipes laid in a trench on a restoration site",
    whatItIs:
      "We supply the tools for field work and the products that carry a conservation message: survey, patrol and monitoring equipment, uniforms and field gear, mobile water purification, and eco-friendly everyday products, educational material and kits.",
    whyItMatters:
      "Coordinating several suppliers slows projects down. One stop for services, field equipment and eco products keeps a programme moving — and seed pens and seed capsules turn a giveaway into a planting.",
    provides: [
      "Field equipment matched to the task: survey, patrol, monitoring or education",
      "Field uniforms for forest staff, guides and field professionals",
      "Torches, headlamps, backpacks, rain gear and field kits",
      "Mobile water purification (GALMOBILE vehicle)",
      "Everyday eco products, educational material and corporate kits",
    ],
    benefits: [
      "One accountable supplier alongside the project team",
      "Equipment chosen for the field task, not from a generic list",
      "Products that end their life as a plant, not as waste",
    ],
    feature: "equipment",
  },
];

/* ---------- Extra content used by the special feature blocks ---------- */

// slide 7 — Slow it, sink it, store it
export const waterLogic = [
  { step: "Slow", text: "Native cover and contour trenches on the upper slopes" },
  { step: "Sink", text: "Bunds and loose-boulder or gabion structures in drainage lines" },
  { step: "Store", text: "Check dams and ponds in the valley" },
  { step: "Recharge", text: "Pits and wells that feed groundwater" },
];
export const waterNote =
  "Conceptual ridge-to-valley illustration, not to scale. Structures shown are examples, not a standard package.";

// slide 8 — Restore, enrich, interpret, in that order
export const restoreEnrichInterpret = [
  { stage: "Restore", tagline: "Survival is the goal", items: ["Site assessment and native species selection", "Soil-moisture conservation before planting", "Fencing or bio-fencing, drip irrigation", "Maintenance and survival monitoring for years"] },
  { stage: "Enrich", tagline: "Habitats, not just greenery", items: ["Microhabitats: log piles, rock piles, wetland edges", "Butterfly gardens with host and nectar plants", "Firefly-friendly zones (concept stage)", "RET plant conservation and mini-forests"] },
  { stage: "Interpret", tagline: "Landscapes people understand", items: ["Nature trails with learning stations", "Themed interpretation centres", "QR species profiles and bilingual signage", "Journals, checklists and school programmes"] },
];

// slide 9 — three terms often confused
export const carbonTerms = [
  { term: "Carbon stock", text: "How much carbon is held in a pool (trees, deadwood, soil) at one point in time.", unit: "t C or t CO₂e" },
  { term: "Carbon sequestration", text: "The rate at which a site removes CO₂ from the air into those pools over a period.", unit: "t CO₂e per year" },
  { term: "Carbon footprint", text: "Greenhouse-gas emissions caused by an organisation or activity within a defined boundary.", unit: "t CO₂e (Scopes 1, 2, 3)" },
];

// slide 10 — learning through play
export const learningPlay = [
  { ages: "Ages 4–7", theme: "Wonder", items: ["Picture-matching and memory cards", "Nature colouring and sticker books", "Sound, touch and smell games", "Seed-sowing activities"] },
  { ages: "Ages 8–12", theme: "Discover", items: ["Nature treasure hunts", "Food-chain card games", "Biodiversity bingo and puzzles", "Habitat jigsaw maps"] },
  { ages: "Ages 13–17", theme: "Investigate", items: ["Eco-quizzes and debates", "Citizen-science challenges", "Role-play on conservation dilemmas", "Field journals and checklists"] },
  { ages: "Adults & teams", theme: "Connect", items: ["Team challenges on trails", "Ecosystem simulation games", "Sustainability workshops", "Guided nature walks"] },
];
export const learningNote =
  "Each format is matched to the learner's age, the site and one clear learning outcome. Fun is the method; understanding is the goal.";

// slide 11 — example destinations within reach of Nagpur
export const destinations = [
  "Tadoba-Andhari Tiger Reserve",
  "Pench Tiger Reserve",
  "Umred-Paoni-Karhandla Wildlife Sanctuary",
  "Bor Tiger Reserve",
  "Local forest trails and restoration sites",
];

// slide 13 — mobile water purification (manufacturer's published specifications)
export const galmobile = {
  name: "GALMOBILE · Water purification vehicle",
  flow: ["Source", "Treatment", "Storage", "Distribution"],
  points: [
    "Treats rivers, lakes, sea, brackish water, wells and high-turbidity sources to WHO drinking-water standards",
    "Self-contained and automatic, with an independent energy source",
    "Deployed in under 30 minutes by two people; tablet control up to 200 m",
    "Integrated storage from 1,000 litres up to 10,000 litres",
    "Uses: emergencies, remote communities, villages in crisis, field operations",
  ],
  note: "Specifications as published by the manufacturer, which reports deployments across Gujarat since 2020.",
};

export const getCapability = (slug) => capabilities.find((c) => c.slug === slug);
