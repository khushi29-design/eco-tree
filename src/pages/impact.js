/** Our Impact — the environmental impact dashboard (slides 2, 20, 21). */
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import Counter from "@/components/Counter";
import BeforeAfter from "@/components/BeforeAfter";
import { Reveal, SplitWords } from "@/components/Reveal";
import ImpactNumbers from "@/sections/ImpactNumbers";
import CtaBand from "@/sections/CtaBand";
import { problemStats, problemClosing } from "@/data/company";
import { infrastructure } from "@/data/projects";
import { pageSeo } from "@/data/seo";
import { breadcrumbSchema } from "@/utils/schema";

const crumbs = [{ label: "Home", href: "/" }, { label: "Our Impact", href: "/impact/" }];

export default function Impact() {
  return (
    <>
      <Seo title={pageSeo.impact.title} description={pageSeo.impact.description} path="/impact/" schema={breadcrumbSchema(crumbs)} />
      <PageHero crumbs={crumbs} eyebrow="Our impact" title="The numbers on the ground"
        intro="Every number we report is labelled: target, estimate, completed output or independently verified. Survival, not saplings planted, is the measure."
        image="/images/forest/aerial-view-native-plantation-trenches" imageAlt="Aerial view of young native trees on a restored plantation" />

      <ImpactNumbers heading={false} showLink={false} />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">Field implementation</Reveal>
            <SplitWords as="h2" text="Six kinds of work, completed on the ground" />
          </div>
          <div className="grid grid-3">
            {infrastructure.map((it, i) => (
              <Reveal className="card" key={it.title} delay={(i % 3) * 0.08}>
                <span className="figure-label">Status: {it.status}</span>
                <h3 style={{ marginTop: 16 }}>{it.title}</h3>
                <p className="muted" style={{ margin: 0 }}>{it.purpose}</p>
              </Reveal>
            ))}
          </div>
          <div className="split" style={{ marginTop: 80 }}>
            <BeforeAfter before="/images/projects/nursery-site-before.webp" after="/images/projects/nursery-site-after-shade-net.webp"
              beforeAlt="Nursery site before work" afterAlt="Completed shade-net nursery on the same site" />
            <div>
              <p className="eyebrow">Transformation</p>
              <h3 style={{ fontSize: "var(--fs-h2)" }}>A nursery site, before and after</h3>
              <p className="muted">Drag to compare. Nursery development raises the native planting stock that restoration depends on.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--night">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">Why it matters</Reveal>
            <SplitWords as="h2" text="The targets are national. The delivery is local." />
          </div>
          <div className="grid grid-4">
            {problemStats.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}><Counter value={s.value} decimals={s.decimals} suffix={s.suffix} display={s.display} label={s.text} source={s.source} /></Reveal>
            ))}
          </div>
          <Reveal as="p" className="lead muted" style={{ marginTop: 40 }}>{problemClosing}</Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
