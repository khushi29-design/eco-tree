/** ProjectCards.jsx — featured project cards (Nisargavedh, RET Conservation Park). */
import Link from "next/link";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/Reveal";

const fmt = (f) => `${f.value.toLocaleString("en-IN", { minimumFractionDigits: f.decimals || 0 })}${f.suffix}`;

export default function ProjectCards() {
  return (
    <div className="grid grid-2">
      {projects.map((p, i) => (
        <Reveal key={p.slug} delay={i * 0.12}>
          <Link className="project-card" href={`/projects/${p.slug}/`}>
            <img src={`${p.heroImage}.webp`} srcSet={`${p.heroImage}-sm.webp 800w, ${p.heroImage}.webp 1920w`} sizes="(max-width: 620px) 100vw, 50vw" alt={p.heroAlt} loading="lazy" />
            <div className="project-card__body">
              <span className="tag">{p.shortLocation}</span>
              <h3>{p.name}</h3>
              <p className="muted" style={{ margin: 0 }}>{p.tagline}</p>
              <div className="stats">
                {p.figures.slice(0, 3).map((f) => (
                  <span key={f.label}><strong>{fmt(f)}</strong>{f.label}</span>
                ))}
              </div>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
