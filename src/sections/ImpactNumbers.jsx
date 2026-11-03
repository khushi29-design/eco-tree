/** ImpactNumbers.jsx — "The numbers on the ground" (slide 21), animated counters per project. */
import Link from "next/link";
import { projects } from "@/data/projects";
import Counter from "@/components/Counter";
import { Reveal, SplitWords } from "@/components/Reveal";

export default function ImpactNumbers({ light = true, showLink = true, heading = true }) {
  return (
    <section className={`section ${light ? "section--light" : ""}`} aria-labelledby={heading ? "impact-title" : undefined}>
      <div className="container">
        {heading && (
          <div className="section-head">
            <Reveal as="p" className="eyebrow">07 · What numbers have been impacted</Reveal>
            <SplitWords as="h2" id="impact-title" text="The numbers on the ground" />
          </div>
        )}
        {projects.map((p) => (
          <div key={p.slug} className="impact-block">
            <div className="impact-block__head">
              <h3>{p.name} <span className="muted small" style={{ fontFamily: "var(--font-body)" }}>· {p.shortLocation}</span></h3>
              <span className="figure-label">{p.figureLabel}</span>
            </div>
            <div className={`grid grid-${p.figures.length}`}>
              {p.figures.map((f, i) => (
                <Reveal key={f.label} delay={i * 0.08}>
                  <Counter value={f.value} decimals={f.decimals || 0} suffix={f.suffix} label={f.label} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
        <p className="note">Every number we report is labelled: target, estimate, completed output or independently verified.</p>
        {showLink && <Link className="text-link" href="/impact/">See our impact in detail →</Link>}
      </div>
    </section>
  );
}
