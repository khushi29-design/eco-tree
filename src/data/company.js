/**
 * company.js — ALL company-wide text in one place.
 * Source: "EcoTree Logics Corporate Presentation v3" (23 slides) + the ECO·TREE·LOGICS name meaning.
 * Edit the words here; every page that shows them updates automatically.
 * Rule: never add a fact, number, client or certification that the company cannot back up.
 */

export const company = {
  name: "EcoTree Logics Private Limited",
  shortName: "EcoTree Logics",
  tagline: "Ecological Intelligence. Practical Restoration. Lasting Impact.",
  positioning: "Natural security through ecology-based solutions — at one stop.",
  disciplines: ["Environmental Solutions", "Conservation Engineering", "Biodiversity", "Sustainability"],

  contact: {
    website: "www.ecotreelogics.com",
    email: "ecotreelogicsprivatelimited@gmail.com",
    phoneDisplay: "+91 96658-20463",
    phoneLink: "+919665820463", // used for tel: and WhatsApp links
    whatsapp: "919665820463",
    location: "Maharashtra, India",
  },

  // Add real profile URLs when available; empty entries are hidden automatically.
  social: { instagram: "", linkedin: "", youtube: "", facebook: "" },

  hero: {
    titleLines: ["Nature Is Not Just Our Responsibility.", "It Is Our Foundation."],
    intro:
      "We bring together ecology, engineering, education and technology to restore landscapes, protect biodiversity and build a sustainable future.",
  },

  naturalSecurity:
    "The soil, water, green cover and biodiversity that a community, an industry or a city depends on, secured through ecology-based solutions, delivered at one stop.",
  vision:
    "Resilient landscapes and thriving ecosystems, sustained through science-led restoration and nature-positive solutions.",
  mission:
    "To deliver practical, site-specific solutions that bring together biodiversity, restoration, water, sustainability and technology and to measure what they achieve.",
  belief: "Land, water, life and people work as one system. So should the team that restores them.",
};

/* ---------- 01 · The problem (slide 2) — every figure carries its published source ---------- */
export const problemStats = [
  {
    value: 29.7, suffix: "%", decimals: 1,
    text: "of India's land was undergoing degradation in 2018–19: 97.85 million hectares",
    source: "ISRO-SAC Desertification & Land Degradation Atlas (2021)",
  },
  {
    value: 751, suffix: "", decimals: 0,
    text: "of 6,746 groundwater assessment units are over-exploited; 206 more are critical",
    source: "CGWB, Dynamic Ground Water Resources of India 2024",
  },
  {
    value: 25.17, suffix: "%", decimals: 2,
    text: "forest and tree cover, against the one-third goal of the National Forest Policy, 1988",
    source: "Forest Survey of India, ISFR 2023",
  },
  {
    display: "2.5–3 bn t",
    text: "CO₂e of additional carbon sink India has pledged through forest and tree cover by 2030",
    source: "India's Nationally Determined Contribution",
  },
];
export const problemClosing =
  "The targets are national. The delivery is local. Every hectare restored, every litre recharged and every tree that survives happens on one specific site, managed by one specific team.";

/* ---------- The problem behind the problem (slide 3) ---------- */
export const rootCauses = [
  { reported: "Saplings are counted when planted", cause: "Species, soil and water were never planned together, so survival falls after the photo opportunity" },
  { reported: "Structures are built, then silt up or run dry", cause: "They were engineered for a point, not for the catchment that feeds them" },
  { reported: "Parks are opened, but not understood", cause: "Interpretation was added at the end, so visitors walk through without learning" },
  { reported: "Impact is claimed, but cannot be shown", cause: "No baseline was recorded, and targets, estimates and results were mixed together" },
];
export const rootCauseThread =
  "The common thread: land, water, life and people are handled by separate hands, in separate contracts.";

/* ---------- What changes when we are on site (slide 5) ---------- */
export const withWithout = [
  ["Plantation measured by saplings planted", "Restoration measured by survival, year after year"],
  ["Water structures built one at a time", "Ridge-to-valley water plans for the whole catchment"],
  ["Gardens chosen for looks", "Habitats designed for butterflies, birds and native flora"],
  ["Signboards at the gate", "A learning journey with QR-enabled interpretation"],
  ["Carbon and impact claims", "Baselines, stated methods and clearly labelled evidence"],
  ["Day outings with no learning", "Trails, safaris and excursions with a clear learning outcome"],
  ["Several suppliers to coordinate", "One stop for services, field equipment and eco products"],
];

/* ---------- ECO · TREE · LOGICS — what the name stands for ---------- */
export const philosophy = [
  {
    word: "ECO", label: "What we do",
    items: [
      { letter: "E", title: "Experience & Equip", text: "We bring people into nature and give field teams the tools to protect it." },
      { letter: "C", title: "Conserve & Restore", text: "We heal land and water so ecosystems can function again." },
      { letter: "O", title: "Original Biodiversity", text: "We bring back native species and habitats as nature intended." },
    ],
  },
  {
    word: "TREE", label: "How we work",
    items: [
      { letter: "T", title: "Thoughtful", text: "Every step is planned with care and evidence." },
      { letter: "R", title: "Rooted", text: "Our work is grounded in science, local ecology and community." },
      { letter: "E", title: "Enduring", text: "It's built to last beyond the project, not just the photo opportunity." },
      { letter: "E", title: "Effective", text: "We measure the impact we make." },
    ],
  },
  {
    word: "LOGICS", label: "Why it matters for the years ahead",
    items: [
      { letter: "L", title: "Living Landscapes", text: "Places that stay alive and keep renewing themselves." },
      { letter: "O", title: "One Earth", text: "Every site is part of one shared planet." },
      { letter: "G", title: "Generations Ahead", text: "We plant today for people not yet born." },
      { letter: "I", title: "Inclusive", text: "Communities, institutions and nature all have a place in the work." },
      { letter: "C", title: "Climate-Resilient", text: "Landscapes that can absorb drought, floods and heat." },
      { letter: "S", title: "Sustainable", text: "Work that keeps giving back to the Earth." },
    ],
  },
];

/* ---------- Why us (slide 15) ---------- */
export const positioning = [
  { name: "Study-led", text: "Strong analysis; limited execution on the ground", x: 0, y: 1 },
  { name: "Integrated", text: "Science-led design, field delivery and monitoring: where EcoTree Logics positions itself", x: 1, y: 1, highlight: true },
  { name: "Activity-led", text: "Drives and events; limited design or follow-up", x: 0, y: 0 },
  { name: "Execution-led", text: "Fast delivery; limited ecological design", x: 1, y: 0 },
];
export const positioningNote = "Illustrative positioning of delivery approaches, not a ranking of organisations.";
export const whyUs = [
  { title: "One accountable team", text: "From first survey to final monitoring report" },
  { title: "Lower risk of failure", text: "Species, water and protection planned before planting" },
  { title: "Evidence you can report", text: "Labelled outcomes for CSR, ESG and departmental review" },
  { title: "Depth on demand", text: "Specialists brought in where the work needs them" },
];

/* ---------- How we work (slide 16) ---------- */
export const methodLoop = ["Assess", "Design", "Implement", "Interpret", "Monitor", "Learn and adapt"];
export const methodSteps = [
  "Consultation and scope definition",
  "Site visit and baseline assessment",
  "Technical concept and feasibility",
  "Detailed proposal and budget",
  "Implementation planning and coordination",
  "Execution and quality monitoring",
  "Documentation and handover",
  "Maintenance and impact monitoring",
];

/* ---------- Engagement models and clients (slide 17) ---------- */
export const engagementModels = [
  { name: "Advise", items: ["Environmental consultancy", "Site assessment and feasibility"] },
  { name: "Design", items: ["Concepts and detailed plans", "Trail and interpretation design"] },
  { name: "Deliver", items: ["Restoration and conservation works", "Turnkey coordination*", "Nature experiences and events"] },
  { name: "Sustain", items: ["Monitoring and maintenance", "Long-term support"] },
  { name: "Supply", items: ["Field equipment and uniforms", "Eco products and kits", "Learning and play material"] },
];
export const engagementNote =
  "Scope, deliverables, budget and timeline are defined for each project. *Where contractually appropriate.";
export const clients = [
  "Forest & biodiversity departments",
  "Government & urban local bodies",
  "Corporate CSR, ESG & HR teams",
  "Industries & infrastructure",
  "Schools, colleges & universities",
  "Environmental NGOs",
  "Landowners & campuses",
  "Families & nature enthusiasts",
];

/* ---------- Why we are unique (slide 22) ---------- */
export const fourDisciplines = [
  { name: "Ecology", text: "Native species, habitats, biodiversity science" },
  { name: "Engineering", text: "Water, soil and civil conservation works" },
  { name: "Education", text: "Interpretation, trails, community learning" },
  { name: "Evidence", text: "Baselines, carbon, monitoring, honest labels" },
];
export const uniqueClosing =
  "Most sites need all four, yet they are usually bought separately. We bring them as one team with one plan, and supply the tools and products to go with it.";

/* ---------- Closing invitation (slide 23) ---------- */
export const closingCta = {
  title: "Let's build nature-positive landscapes together",
  text: "Start with one site. We will walk it with you, read its land, water and life, and propose what it needs: nothing more, nothing less.",
};
