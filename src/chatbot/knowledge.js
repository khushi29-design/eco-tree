/**
 * knowledge.js — EcoBot's approved answers. EcoBot answers ONLY from this file.
 *
 * HOW TO UPDATE ECOBOT
 *   - Edit an `answer` to change what EcoBot says.
 *   - Add words people might type to `keywords` (lowercase). Multi-word phrases count extra.
 *   - Add a new block to `faq` for a new topic. `links` become buttons under the answer.
 *   - Capabilities, products and projects are ALSO added automatically from the data files
 *     (see buildKnowledge below), so new products are answerable without editing this file.
 */
import { company, clients, engagementModels, methodSteps, philosophy } from "@/data/company";
import { capabilities, destinations, galmobile, carbonTerms } from "@/data/capabilities";
import { products, categories } from "@/data/products";
import { projects, infrastructure } from "@/data/projects";

const c = company.contact;
const nis = projects.find((p) => p.slug === "nisargavedh");
const ret = projects.find((p) => p.slug === "ret-conservation-park");
const fig = (p) => p.figures.map((f) => `${f.value.toLocaleString("en-IN")}${f.suffix} ${f.label}`).join(" · ");

export const faq = [
  {
    id: "about",
    keywords: ["about ecotree", "about eco tree", "who are you", "ecotree", "eco tree", "company", "what is ecotree", "what do you do", "introduce", "overview"],
    answer: `${company.name} — ${company.tagline}\n\nWe offer ${company.positioning.toLowerCase()} We bring together ecology, engineering, education and technology to restore landscapes, protect biodiversity and build a sustainable future.\n\nVision: ${company.vision}`,
    links: [{ label: "About us", href: "/about/" }, { label: "Capabilities", href: "/capabilities/" }],
  },
  {
    id: "services",
    keywords: ["services", "service", "capabilities", "what services", "offer", "provide", "solutions", "work do you", "help with"],
    answer: `We offer eight capabilities through one accountable team:\n${capabilities.map((x) => `${x.letter}. ${x.title}`).join("\n")}\n\nYou can engage us for one stage or for the whole journey.`,
    links: [{ label: "All capabilities", href: "/capabilities/" }, { label: "Service enquiry", href: "/contact/?type=service" }],
  },
  {
    id: "nisargavedh",
    keywords: ["nisargavedh", "nisarga", "wakeshwar", "chandrapur road", "chip nagpur", "flagship"],
    answer: `${nis.name}: ${nis.summary}\nOur role: ${nis.role}.\n\nWork: ${nis.workstreams.map((w) => w.title.toLowerCase()).join(", ")}.\n\nReported figures: ${fig(nis)}.`,
    links: [{ label: "Project Nisargavedh", href: "/projects/nisargavedh/" }, { label: "Our impact", href: "/impact/" }],
  },
  {
    id: "ret",
    keywords: ["ret conservation park", "ret park", "ret", "rare", "endangered", "threatened", "butibori", "conservation park", "botanical", "medicinal"],
    answer: `${ret.name} (${ret.location}): ${ret.summary}\n\nIncludes nursery and propagation of RET species, bilingual Marathi–English signage and conservation education.\n\nReported figures: ${fig(ret)}.`,
    links: [{ label: "RET Conservation Park", href: "/projects/ret-conservation-park/" }],
  },
  {
    id: "impact",
    keywords: ["impact", "numbers", "achievements", "results", "how many trees", "acres", "survival", "bird species", "track record", "experience"],
    answer: `The numbers on the ground:\n• ${nis.name}: ${fig(nis)}\n• ${ret.name}: ${fig(ret)}\n\nEvery number we report is labelled: target, estimate, completed output or independently verified.`,
    links: [{ label: "Our impact", href: "/impact/" }, { label: "Projects", href: "/projects/" }],
  },
  {
    id: "products",
    keywords: ["products", "product", "eco products", "sustainable products", "catalogue", "catalog", "buy", "eco friendly", "kits", "gift", "shop"],
    answer: `Our Products & Eco Catalogue has four categories:\n${categories.map((k) => `• ${k.name}`).join("\n")}\n\nIt is an enquiry catalogue — send an enquiry or WhatsApp us for quantities and availability.`,
    links: [{ label: "Products catalogue", href: "/products/" }, { label: "Product enquiry", href: "/contact/?type=product" }],
  },
  {
    id: "price",
    keywords: ["price", "cost", "rate", "quote", "quotation", "how much", "budget", "charges", "fees"],
    answer: "Prices are not listed on the website. Scope, deliverables, budget and timeline are defined for each project, and product quotes depend on quantity and customisation. Please send an enquiry and the team will reply with a quote.",
    links: [{ label: "Send an enquiry", href: "/contact/" }],
  },
  {
    id: "corporate-outing",
    keywords: ["corporate outing", "corporate tour", "team outing", "team building", "offsite", "one day tour", "employee", "hr team", "outing"],
    answer: "We plan one-day corporate tours — team outings that combine nature, activity and learning — and handle event planning end to end: transport, permits, guides, food and safety. Every trip follows park rules, uses authorised bookings and leaves no trace.\n\nTell us your group size, preferred date and location, and we will propose a plan.",
    links: [{ label: "Nature experiences", href: "/capabilities/nature-experiences-learning-play/" }, { label: "Enquire", href: "/contact/?type=service" }],
  },
  {
    id: "safari",
    keywords: ["safari", "tiger", "tadoba", "pench", "umred", "bor", "wildlife trip", "jungle", "trek", "hike", "trail", "excursion", "field trip"],
    answer: `We organise nature trails, graded forest hikes, field excursions and wildlife safaris (booked through authorised forest department channels).\n\nExample destinations within reach of Nagpur:\n${destinations.map((d) => `• ${d}`).join("\n")}`,
    links: [{ label: "Nature experiences", href: "/capabilities/nature-experiences-learning-play/" }],
  },
  {
    id: "school",
    keywords: ["school", "students", "college", "children", "kids", "education programme", "learning", "games", "workshop", "university"],
    answer: "We run nature education for every age — from picture-matching and seed-sowing for ages 4–7 to citizen-science challenges for teenagers and sustainability workshops for adults. We also design interpretation centres, field journals, activity books and QR-enabled bilingual signage. Each format is matched to the learner's age, the site and one clear learning outcome.",
    links: [{ label: "Nature education", href: "/capabilities/nature-education-interpretation/" }],
  },
  {
    id: "water",
    keywords: ["water", "rainwater", "harvesting", "check dam", "gabion", "bund", "pond", "recharge", "groundwater", "watershed", "catchment", "trench"],
    answer: "We plan water from ridge to valley: Slow (native cover and contour trenches on upper slopes), Sink (bunds and loose-boulder or gabion structures in drainage lines), Store (check dams and ponds in the valley) and Recharge (pits and wells that feed groundwater). Each structure is chosen for the site's hydrology, terrain, soil, permissions and technical feasibility.",
    links: [{ label: "Conservation engineering & water", href: "/capabilities/conservation-engineering-water/" }],
  },
  {
    id: "carbon",
    keywords: ["carbon", "co2", "sequestration", "footprint", "emissions", "esg", "net zero", "ghg", "credit", "offset", "brsr"],
    answer: `We assess carbon stock, sequestration and footprint, prepare tree and green-asset inventories, and support nature-positive planning.\n\n${carbonTerms.map((t) => `• ${t.term}: ${t.text}`).join("\n")}\n\nImportant: assessments are estimates with stated assumptions. They are not third-party verification, accredited certification or carbon-credit issuance.`,
    links: [{ label: "Carbon & sustainability", href: "/capabilities/carbon-sustainability-consultancy/" }],
  },
  {
    id: "water-purification",
    keywords: ["purification", "drinking water", "galmobile", "water vehicle", "purifier", "flood relief", "emergency water", "ro"],
    answer: `${galmobile.name}:\n${galmobile.points.map((p) => `• ${p}`).join("\n")}\n\n${galmobile.note}`,
    links: [{ label: "Field equipment", href: "/capabilities/field-equipment-eco-products/" }, { label: "Product page", href: "/products/mobile-water-purification/" }],
  },
  {
    id: "clients",
    keywords: ["who do you work with", "clients", "customers", "serve", "csr", "government", "forest department", "ngo", "industry", "partner"],
    answer: `We serve:\n${clients.map((x) => `• ${x}`).join("\n")}\n\nEngagement models: ${engagementModels.map((m) => m.name).join(", ")}.`,
    links: [{ label: "About us", href: "/about/" }],
  },
  {
    id: "process",
    keywords: ["process", "how do you work", "method", "methodology", "steps", "approach", "start a project", "how to start", "begin"],
    answer: `Our engagements follow eight steps, in a closed loop (assess, design, implement, interpret, monitor, learn and adapt):\n${methodSteps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\nStart with one site — we will walk it with you and propose what it needs.`,
    links: [{ label: "How we work", href: "/about/#method" }, { label: "Project enquiry", href: "/contact/?type=project" }],
  },
  {
    id: "infrastructure",
    keywords: ["infrastructure", "drip", "irrigation", "nursery", "microhabitat", "field work", "implementation", "built"],
    answer: `Conservation infrastructure delivered on the ground (all marked completed):\n${infrastructure.map((i) => `• ${i.title} — ${i.purpose}`).join("\n")}`,
    links: [{ label: "Projects", href: "/projects/" }, { label: "Gallery", href: "/gallery/" }],
  },
  {
    id: "philosophy",
    keywords: ["name", "meaning", "eco tree logics meaning", "stands for", "philosophy", "values"],
    answer: philosophy.map((g) => `${g.word} — ${g.label}: ${g.items.map((i) => i.title).join(", ")}`).join("\n"),
    links: [{ label: "About us", href: "/about/" }],
  },
  {
    id: "contact",
    keywords: ["contact", "phone", "call", "email", "mail", "whatsapp", "number", "reach", "talk", "address", "location", "where are you", "office", "meet"],
    answer: `You can reach the EcoTree Logics team at:\n• Email: ${c.email}\n• Phone / WhatsApp: ${c.phoneDisplay}\n• Location: ${c.location}\n• Website: ${c.website}`,
    links: [{ label: "Contact page", href: "/contact/" }],
    contact: true,
  },
];

/** Turn every capability, product and project in the data files into answerable topics. */
export function buildKnowledge() {
  const capEntries = capabilities.map((x) => ({
    id: `cap-${x.slug}`,
    keywords: [x.title.toLowerCase(), ...x.title.toLowerCase().split(/[ &,]+/).filter((w) => w.length > 4), ...x.short.toLowerCase().split(/, | and /)],
    answer: `${x.title}\n\n${x.whatItIs}\n\nWhat we provide:\n${x.provides.map((p) => `• ${p}`).join("\n")}${x.disclaimer ? `\n\n${x.disclaimer}` : ""}`,
    links: [{ label: x.title, href: `/capabilities/${x.slug}/` }, { label: "Enquire", href: `/contact/?type=service&subject=${encodeURIComponent(x.title)}` }],
    weight: 0.9,
  }));
  const prodEntries = products.map((p) => ({
    id: `prod-${p.slug}`,
    keywords: [p.name.toLowerCase(), ...p.name.toLowerCase().replace(/[()&/]/g, " ").split(/\s+/).filter((w) => w.length > 3)],
    answer: `${p.name} — ${p.summary}${p.uses.length ? `\n\nUseful for: ${p.uses.join(", ")}.` : ""}\n\nPrices and availability are shared on enquiry.`,
    links: [{ label: p.name, href: `/products/${p.slug}/` }, { label: "Enquire", href: `/contact/?type=product&subject=${encodeURIComponent(p.name)}` }],
    weight: 1.1,
  }));
  return [...faq, ...capEntries, ...prodEntries];
}

export const suggestions = [
  "Tell me about EcoTree Logics",
  "What services do you provide?",
  "What is Project Nisargavedh?",
  "What are your sustainable products?",
  "How can I arrange a corporate nature outing?",
  "How can I contact your team?",
];

export const greeting =
  "Namaste! I'm EcoBot, your nature guide. I can answer questions about EcoTree Logics — our services, projects, products, nature experiences and how to contact the team. What would you like to know?";
