/** About Us — problem, purpose, philosophy, method, engagement models and clients (slides 2–5, 15–17, 22). */
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import MethodCircle from "@/components/MethodCircle";
import Counter from "@/components/Counter";
import Img from "@/components/Img";
import { Reveal, SplitWords } from "@/components/Reveal";
import Philosophy from "@/sections/Philosophy";
import WhyUs from "@/sections/WhyUs";
import CtaBand from "@/sections/CtaBand";
import { pageSeo } from "@/data/seo";
import { company, problemStats, problemClosing, rootCauses, rootCauseThread, fourDisciplines, uniqueClosing, engagementModels, engagementNote, clients } from "@/data/company";
import { breadcrumbSchema, articleSchema } from "@/utils/schema";

const crumbs = [{ label: "Home", href: "/" }, { label: "About Us", href: "/about/" }];

export default function About() {
  return (
    <>
      <Seo title={pageSeo.about.title} description={pageSeo.about.description} path="/about/"
        schema={[breadcrumbSchema(crumbs), articleSchema({ title: pageSeo.about.title, description: pageSeo.about.description, path: "/about/" })]} />

      <PageHero crumbs={crumbs} eyebrow="About EcoTree Logics" title={company.belief} intro={company.positioning}
        image="/images/forest/sunset-over-restored-plantation-nagpur" imageAlt="Sunset over a restored native plantation near Nagpur" />

      <section className="section">
        <div className="container split">
          <div>
            <Reveal as="p" className="eyebrow">Natural security</Reveal>
            <SplitWords as="h2" text="What a community, an industry or a city depends on" />
            <Reveal as="p" className="lead muted">{company.naturalSecurity}</Reveal>
            <div className="grid grid-2" style={{ marginTop: 34 }}>
              <Reveal><h3 style={{ color: "var(--gold)" }}>Vision</h3><p className="muted">{company.vision}</p></Reveal>
              <Reveal delay={0.1}><h3 style={{ color: "var(--gold)" }}>Mission</h3><p className="muted">{company.mission}</p></Reveal>
            </div>
          </div>
          <Reveal variant="scale" className="feature-photo mask-arch">
            <Img src="/images/gallery/volunteers-building-gabion-structure" alt="Volunteers building a stone gabion structure on a restoration site" />
          </Reveal>
        </div>
      </section>

      <section className="section section--night">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">The problem</Reveal>
            <SplitWords as="h2" text="India's natural infrastructure is running a deficit" />
          </div>
          <div className="grid grid-4">
            {problemStats.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}><Counter value={s.value} decimals={s.decimals} suffix={s.suffix} display={s.display} label={s.text} source={s.source} /></Reveal>
            ))}
          </div>
          <Reveal as="p" className="lead" style={{ marginTop: 50 }}>{problemClosing}</Reveal>
          <div className="grid grid-2" style={{ marginTop: 60 }}>
            {rootCauses.map((r) => (
              <Reveal className="card" key={r.reported}>
                <p className="eyebrow" style={{ marginBottom: 8 }}>What gets reported</p>
                <h3>{r.reported}</h3>
                <p className="muted" style={{ margin: 0 }}><strong style={{ color: "var(--gold)" }}>Root cause: </strong>{r.cause}</p>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" style={{ marginTop: 26, fontStyle: "italic", color: "var(--gold)" }}>{rootCauseThread}</Reveal>
        </div>
      </section>

      <Philosophy />

      <section className="section" id="method">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">How we work</Reveal>
            <SplitWords as="h2" text="A closed loop, not a straight line" />
            <Reveal as="p" className="muted">Eight steps of an engagement — assess, design, implement, interpret, monitor, then learn and adapt.</Reveal>
          </div>
          <MethodCircle />
        </div>
      </section>

      <WhyUs />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">Why we are unique</Reveal>
            <SplitWords as="h2" text="Four disciplines rarely contracted together" />
          </div>
          <div className="grid grid-4">
            {fourDisciplines.map((d, i) => (
              <Reveal className="card" key={d.name} delay={i * 0.08}>
                <h3 style={{ fontSize: "2rem", color: "var(--gold)" }}>{d.name}</h3>
                <p className="muted">{d.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" className="lead" style={{ marginTop: 40 }}>{uniqueClosing}</Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">Engagement models</Reveal>
            <SplitWords as="h2" text="Engage us for one stage, or for the whole journey" />
          </div>
          <div className="engage-grid">
            {engagementModels.map((m, i) => (
              <Reveal className="engage-col" key={m.name} delay={i * 0.06}>
                <h3>{m.name}</h3>
                <ul>{m.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </Reveal>
            ))}
          </div>
          <p className="note" style={{ marginTop: 18 }}>{engagementNote}</p>
          <div style={{ marginTop: 60 }}>
            <Reveal as="h3" style={{ fontSize: "var(--fs-h3)", marginBottom: 20 }}>Who we serve</Reveal>
            <ul className="pill-list">{clients.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
