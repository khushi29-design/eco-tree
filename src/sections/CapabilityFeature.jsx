/**
 * CapabilityFeature.jsx — the special interactive block on each capability page.
 * Which block appears is set by `feature` in src/data/capabilities.js.
 */
import { useState } from "react";
import Link from "next/link";
import { restoreEnrichInterpret, carbonTerms, learningPlay, learningNote, destinations, galmobile } from "@/data/capabilities";
import { products, categories } from "@/data/products";
import RidgeToValley from "@/components/RidgeToValley";
import BeforeAfter from "@/components/BeforeAfter";
import Img from "@/components/Img";
import { Reveal, SplitWords } from "@/components/Reveal";

function Section({ eyebrow, title, light = true, children }) {
  return (
    <section className={`section ${light ? "section--light" : ""}`}>
      <div className="container">
        <div className="section-head">
          {eyebrow && <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>}
          <SplitWords as="h2" text={title} />
        </div>
        {children}
      </div>
    </section>
  );
}

function StageCols({ stages }) {
  return (
    <div className="stage-cols">
      {stages.map((s, i) => (
        <Reveal className="stage-col" key={s.stage} delay={i * 0.1}>
          <h3>{s.stage}</h3>
          <p className="tl">{s.tagline}</p>
          <ul className="check-list">{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
        </Reveal>
      ))}
    </div>
  );
}

function LearningTabs() {
  const [a, setA] = useState(0);
  const g = learningPlay[a];
  return (
    <>
      <div className="tabs-list" role="tablist" aria-label="Age groups">
        {learningPlay.map((x, i) => (
          <button key={x.ages} role="tab" aria-selected={a === i} onClick={() => setA(i)}>
            <small>{x.ages}</small><strong>{x.theme}</strong>
          </button>
        ))}
      </div>
      <div className="tab-panel" role="tabpanel" key={a}>
        <ul className="pill-list">{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
      </div>
      <p className="note" style={{ marginTop: 20 }}>{learningNote}</p>
    </>
  );
}

export default function CapabilityFeature({ feature }) {
  switch (feature) {
    case "restore-enrich-interpret":
      return (
        <>
          <Section eyebrow="From planting to living landscape" title="Restore, enrich, interpret, in that order"><StageCols stages={restoreEnrichInterpret} /></Section>
          <Section eyebrow="On the ground" title="A nursery site, before and after" light={false}>
            <div className="split">
              <BeforeAfter before="/images/projects/nursery-site-before.webp" after="/images/projects/nursery-site-after-shade-net.webp"
                beforeAlt="Nursery site before work: bare ground with trenches and pipes" afterAlt="The same site after: a completed shade-net nursery" />
              <div>
                <p className="lead muted">Drag the slider to compare. Nursery development raises native planting stock for restoration — one of the field implementations marked completed in our portfolio.</p>
                <Link className="text-link" href="/projects/">See project infrastructure →</Link>
              </div>
            </div>
          </Section>
        </>
      );
    case "ridge-to-valley":
      return (
        <Section eyebrow="Water and soil — the foundation" title="Slow it, sink it, store it: from ridge to valley" light={false}>
          <RidgeToValley />
        </Section>
      );
    case "habitats":
      return <Section eyebrow="Habitats, not just greenery" title="Restore, enrich, interpret"><StageCols stages={restoreEnrichInterpret} /></Section>;
    case "learning-play":
      return (
        <Section eyebrow="Learning through play" title="Serious ideas, playful formats, for every age">
          <LearningTabs />
        </Section>
      );
    case "carbon-terms":
      return (
        <Section eyebrow="Carbon and biodiversity assessment" title="Clarity before claims: three terms often confused">
          <div className="term-cards">
            {carbonTerms.map((t, i) => (
              <Reveal className="term-card" key={t.term} delay={i * 0.1}>
                <h3>{t.term}</h3><p>{t.text}</p><span className="unit">Unit: {t.unit}</span>
              </Reveal>
            ))}
          </div>
          <h3 style={{ marginTop: 60 }}>How an assessment runs</h3>
          <ol className="process-row">
            {["Scope & boundary", "Tree inventory & species ID", "Biomass / stock estimation", "Flora, fauna & habitat baseline", "GIS mapping (where available)", "Report & monitoring plan"].map((s) => <li key={s}>{s}</li>)}
          </ol>
        </Section>
      );
    case "digital":
      return (
        <Section eyebrow="Interpretation that goes digital" title="From a signboard at the gate to a learning journey">
          <div className="split">
            <div>
              <ul className="check-list">
                <li>A QR code on each species sign opens that species&apos; profile on the visitor&apos;s phone</li>
                <li>Bilingual content (Marathi and English) for signage and digital profiles</li>
                <li>A biodiversity website that records what the site holds and grows with every survey</li>
                <li>Design support for eco-centres and interpretation centres</li>
              </ul>
            </div>
            <Reveal className="feature-photo mask-soft"><Img src="/images/gallery/nature-education-session-lined-pond" alt="Visitors learning on a restoration site" /></Reveal>
          </div>
        </Section>
      );
    case "experiences":
      return (
        <>
          <Section eyebrow="Within reach of Nagpur" title="Example destinations for safaris, trails and excursions">
            <ul className="pill-list">{destinations.map((d) => <li key={d}>{d}</li>)}</ul>
            <p className="note" style={{ marginTop: 18 }}>Every trip follows park rules, uses authorised bookings and leaves no trace.</p>
          </Section>
          <Section eyebrow="Learning through play" title="Serious ideas, playful formats, for every age" light={false}>
            <LearningTabsDark />
          </Section>
        </>
      );
    case "equipment": {
      const field = products.filter((p) => p.category === "field" && p.slug !== "mobile-water-purification");
      return (
        <>
          <Section eyebrow="Field equipment for forest and wildlife management" title="Equipped for the field">
            <ul className="pill-list">{field.map((p) => <li key={p.slug}><Link href={`/products/${p.slug}/`} style={{ textDecoration: "none" }}>{p.name}</Link></li>)}</ul>
            <p className="muted" style={{ marginTop: 18 }}>Matched to the task: survey, patrol, monitoring or education.</p>
          </Section>
          <Section eyebrow="Mobile water purification" title="Safe drinking water, wherever the need is" light={false}>
            <div className="split">
              <div>
                <h3>{galmobile.name}</h3>
                <div className="galmobile-flow" aria-label="Process">{galmobile.flow.map((f, i) => <span key={f} style={{ display: "contents" }}><span>{f}</span>{i < galmobile.flow.length - 1 && <i>→</i>}</span>)}</div>
                <ul className="check-list">{galmobile.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <p className="note" style={{ marginTop: 16 }}>{galmobile.note}</p>
                <Link className="text-link" href="/products/mobile-water-purification/">Product details &amp; enquiry →</Link>
              </div>
              <div className="card" style={{ minHeight: 320, display: "grid", placeItems: "center", textAlign: "center" }}>
                <p className="muted small">Photo placeholder — a manufacturer-approved image of the GALMOBILE vehicle will appear here.</p>
              </div>
            </div>
          </Section>
          <Section eyebrow="Sustainable products and kits" title="Small swaps that carry a big message">
            <div className="grid grid-3">
              {categories.filter((c) => c.id !== "field").map((c) => (
                <Link key={c.id} className="card" href={`/products/?category=${c.id}`} style={{ textDecoration: "none" }}>
                  <h3>{c.name}</h3><p className="muted">{c.text}</p><span className="text-link">View →</span>
                </Link>
              ))}
            </div>
          </Section>
        </>
      );
    }
    default:
      return null;
  }
}

/* same tabs, styled for a dark section */
function LearningTabsDark() {
  const [a, setA] = useState(0);
  const g = learningPlay[a];
  return (
    <div>
      <div className="filter-bar" role="tablist" aria-label="Age groups">
        {learningPlay.map((x, i) => (
          <button key={x.ages} role="tab" aria-selected={a === i} aria-pressed={a === i} onClick={() => setA(i)}>{x.ages} · {x.theme}</button>
        ))}
      </div>
      <ul className="check-list" key={a}>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
      <p className="note" style={{ marginTop: 20 }}>{learningNote}</p>
    </div>
  );
}
