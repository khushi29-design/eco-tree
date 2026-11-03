/**
 * engine.js — EcoBot's matching logic (runs entirely in the visitor's browser, no AI service).
 *
 * How it decides:
 *   1. Greetings / thanks get a friendly reply.
 *   2. Every knowledge entry gets a score: phrase matches count more than single words.
 *   3. The best entry above a threshold is returned.
 *   4. Questions clearly outside EcoTree Logics get a polite "I only help with EcoTree Logics" reply.
 *   5. Anything else: an honest "I don't have that information" with contact options.
 * It never makes up an answer — every reply comes from knowledge.js.
 */
import { buildKnowledge } from "./knowledge";
import { company } from "@/data/company";

const KB = buildKnowledge();
const STOP = new Set("a an the is are was do does did you your yours i me my we our us of to in on for and or with what how can could would should tell about please there this that it its be have has any some".split(" "));

// common spellings / synonyms people use
const SYNONYMS = {
  plantation: "restoration & afforestation", planting: "restoration & afforestation", plant: "restoration & afforestation", trees: "restoration & afforestation", tree: "restoration & afforestation", forest: "restoration & afforestation", afforestation: "restoration & afforestation", restore: "restoration & afforestation", miyawaki: "mini-forests",
  wildlife: "safari", birds: "bird species", butterfly: "butterfly", butterflies: "butterfly",
  qr: "species qr", signage: "signage", website: "biodiversity websites", app: "digital",
  gps: "handheld gps", drone: "drones", camera: "camera traps", binocular: "binoculars", uniform: "field uniforms", torch: "torches",
  csr: "csr", cost: "price", costs: "price", pricing: "price",
  mail: "email", mobile: "phone", whatsapp: "whatsapp", contact: "contact",
};

const OFF_TOPIC = /\b(weather|cricket|movie|film star|recipe|stock market|bitcoin|crypto|election|politic|joke|poem|song|lyrics|homework|math|code|programming|news|horoscope|celebrity|football|ipl)\b/;
const GREETING = /^(hi|hello|hey|namaste|namaskar|good (morning|afternoon|evening)|hii+|yo)\b/;
const THANKS = /\b(thank|thanks|thx|dhanyavad|great|awesome|helpful)\b/;

const normalise = (s) => s.toLowerCase().replace(/[^a-z0-9\s&-]/g, " ").replace(/\s+/g, " ").trim();

function expand(text) {
  const words = text.split(" ").filter((w) => w && !STOP.has(w));
  const extra = words.map((w) => SYNONYMS[w]).filter(Boolean);
  return { words, text: `${text} ${extra.join(" ")}` };
}

function score(entry, q) {
  let s = 0;
  for (const kw of entry.keywords) {
    if (!kw) continue;
    if (kw.includes(" ")) {
      if (q.text.includes(kw)) s += 3 + kw.split(" ").length;
    } else if (q.words.includes(kw) || new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(q.text)) {
      s += kw.length > 5 ? 2 : 1.5;
    }
  }
  return s * (entry.weight || 1);
}

export function answer(input) {
  const raw = normalise(input || "");
  if (!raw) return { text: "Please type a question about EcoTree Logics.", links: [] };

  if (GREETING.test(raw) && raw.split(" ").length <= 3) {
    return { text: `Hello! I'm EcoBot. Ask me about ${company.shortName} services, Project Nisargavedh, the RET Conservation Park, our eco products or nature outings.`, links: [] };
  }
  if (THANKS.test(raw) && raw.split(" ").length <= 5) {
    return { text: "You're welcome! If you'd like to talk to the team, use the contact page or WhatsApp.", links: [{ label: "Contact", href: "/contact/" }] };
  }

  const q = expand(raw);
  const ranked = KB.map((e) => ({ e, s: score(e, q) })).filter((r) => r.s > 0).sort((a, b) => b.s - a.s);
  const best = ranked[0];

  if (best && best.s >= 1.5) {
    const links = [...(best.e.links || [])];
    // offer a contact route on enquiries that sound like a request
    if (!best.e.contact && /\b(want|need|interested|arrange|book|hire|order|quote|enquir|inquir|start)\b/.test(raw)) {
      links.push({ label: "Contact the team", href: "/contact/" });
    }
    return { text: best.e.answer, links, id: best.e.id };
  }

  if (OFF_TOPIC.test(raw)) {
    return {
      text: "I can only help with questions about EcoTree Logics — our services, projects, products, nature experiences and contact details. Is there something about EcoTree Logics I can help with?",
      links: [{ label: "Our capabilities", href: "/capabilities/" }],
    };
  }

  return {
    text: `I'm sorry, I don't have that information on the website. The EcoTree Logics team can help directly:\n• Email: ${company.contact.email}\n• Phone / WhatsApp: ${company.contact.phoneDisplay}`,
    links: [{ label: "Contact page", href: "/contact/" }],
    unknown: true,
  };
}
