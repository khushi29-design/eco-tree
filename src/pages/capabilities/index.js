/** Our Capabilities — overview of all eight (slide 6) with engagement models (slide 17). */
import Link from "next/link";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import Img from "@/components/Img";
import { Reveal, SplitWords } from "@/components/Reveal";
import CtaBand from "@/sections/CtaBand";
import { capabilities } from "@/data/capabilities";
import { pageSeo } from "@/data/seo";
import { withWithout } from "@/data/company";
import { breadcrumbSchema, serviceSchema } from "@/utils/schema";

const crumbs = [{ label: "Home", href: "/" }, { label: "Our Capabilities", href: "/capabilities/" }];

export default function Capabilities() {
  return (
    <>
      <Seo title={pageSeo.capabilities.title} description={pageSeo.capabilities.description} path="/capabilities/"
        schema={[breadcrumbSchema(crumbs), ...capabilities.map(serviceSchema)]} />
      <PageHero crumbs={crumbs} eyebrow="One stop" title="Eight capabilities, one accountable team"
        intro="Land, water, life and people are usually handled by separate hands, in separate contracts. We bring ecology, engineering, education and evidence together — and supply the tools and products to go with them."
        image="/images/projects/gabion-structure-forest-drainage-line" imageAlt="Gabion structure built across a forest drainage line" />

      <section className="section">
        <div className="container">
          {capabilities.map((c, i) => (
            <Reveal key={c.slug} className={`split cap-row ${i % 2 ? "split--reverse" : ""}`} style={{ marginBottom: "clamp(70px, 9vw, 120px)" }}>
              <Link href={`/capabilities/${c.slug}/`} className="feature-photo feature-photo--wide mask-soft" aria-label={c.title} tabIndex={-1}>
                <Img src={c.image} alt={c.imageAlt} />
              </Link>
              <div>
                <p className="eyebrow">Capability {c.letter}</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)" }}><Link href={`/capabilities/${c.slug}/`} style={{ textDecoration: "none" }}>{c.title}</Link></h2>
                <p className="muted">{c.short}.</p>
                <p>{c.whyItMatters}</p>
                <Link className="text-link" href={`/capabilities/${c.slug}/`}>Explore {c.title} →</Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">What our presence can do</Reveal>
            <SplitWords as="h2" text="What changes when we are on site" />
          </div>
          <div className="ww-table">
            <div className="ww-row ww-row--head"><span>Without an integrated partner</span><span>With EcoTree Logics</span></div>
            {withWithout.map(([a, b], i) => (
              <div className="ww-row" key={i}><span className="ww-without">{a}</span><span className="ww-with">{b}</span></div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
