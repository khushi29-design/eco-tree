/** CapabilityGrid.jsx — the eight capabilities (A–H) as interactive cards. */
import Link from "next/link";
import { capabilities } from "@/data/capabilities";
import { Reveal, SplitWords } from "@/components/Reveal";

export default function CapabilityGrid({ heading = true }) {
  return (
    <section className="section" aria-labelledby={heading ? "cap-title" : undefined}>
      <div className="container">
        {heading && (
          <div className="section-head">
            <Reveal as="p" className="eyebrow">One stop</Reveal>
            <SplitWords as="h2" id="cap-title" text="Eight capabilities, one accountable team" />
          </div>
        )}
        <div className="cap-grid">
          {capabilities.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 4) * 0.08} variant="scale">
              <Link className="card cap-card" href={`/capabilities/${c.slug}/`} style={{ height: "100%" }}>
                <span className="cap-letter" aria-hidden="true">{c.letter}</span>
                <h3>{c.title}</h3>
                <p>{c.short}</p>
                <span className="more">Explore →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
