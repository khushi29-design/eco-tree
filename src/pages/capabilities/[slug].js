/**
 * Capability detail page — ONE template for all eight capabilities.
 * Content comes from src/data/capabilities.js; each page gets its own URL, title, description and Service schema.
 * Every page answers: what it is · why it matters · what we provide · how it benefits you · how to enquire.
 */
import Link from "next/link";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import EnquiryForm from "@/components/EnquiryForm";
import Img from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import CapabilityFeature from "@/sections/CapabilityFeature";
import { capabilities, getCapability } from "@/data/capabilities";
import { breadcrumbSchema, serviceSchema } from "@/utils/schema";
import { whatsappLink } from "@/utils/links";

export default function CapabilityPage({ slug }) {
  const c = getCapability(slug);
  const idx = capabilities.findIndex((x) => x.slug === slug);
  const next = capabilities[(idx + 1) % capabilities.length];
  const path = `/capabilities/${c.slug}/`;
  const crumbs = [{ label: "Home", href: "/" }, { label: "Capabilities", href: "/capabilities/" }, { label: c.title, href: path }];

  return (
    <>
      <Seo title={`${c.seoTitle} | EcoTree Logics`} description={c.seoDescription} path={path} image={`${c.image}.webp`} imageAlt={c.imageAlt}
        schema={[breadcrumbSchema(crumbs), serviceSchema(c)]} />
      <PageHero crumbs={crumbs} eyebrow={`Capability ${c.letter}`} title={c.title} intro={c.short + "."} image={c.image} imageAlt={c.imageAlt} letter={c.letter}>
        <div className="btn-row">
          <a className="btn btn--gold" href="#enquire">Enquire about this service <span className="arrow">→</span></a>
          <a className="btn btn--ghost" href={whatsappLink(`Hello EcoTree Logics, I would like to know more about ${c.title}.`)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </PageHero>

      <section className="section section--light">
        <div className="container">
          <Reveal className="qa-block">
            <div><div className="q-num">01</div><div className="q-title">What it is</div></div>
            <p className="answer">{c.whatItIs}</p>
          </Reveal>
          <Reveal className="qa-block">
            <div><div className="q-num">02</div><div className="q-title">Why it matters</div></div>
            <p className="answer">{c.whyItMatters}</p>
          </Reveal>
          <Reveal className="qa-block">
            <div><div className="q-num">03</div><div className="q-title">What EcoTree Logics provides</div></div>
            <ul className="check-list" style={{ fontSize: "1.08rem" }}>{c.provides.map((p) => <li key={p}>{p}</li>)}</ul>
          </Reveal>
          <Reveal className="qa-block">
            <div><div className="q-num">04</div><div className="q-title">How it benefits your site, organisation or community</div></div>
            <div>
              <ul className="check-list" style={{ fontSize: "1.08rem" }}>{c.benefits.map((p) => <li key={p}>{p}</li>)}</ul>
              {c.disclaimer && <p className="disclaimer">{c.disclaimer}</p>}
            </div>
          </Reveal>
          <Reveal className="qa-block">
            <div><div className="q-num">05</div><div className="q-title">How to enquire</div></div>
            <p className="answer">Start with one site. Tell us what you have and what you need — we will walk it with you and propose what it needs: nothing more, nothing less. <a href="#enquire">Use the form below</a> or <a href={whatsappLink(`Hello, I am interested in ${c.title}.`)} target="_blank" rel="noopener noreferrer">WhatsApp us</a>.</p>
          </Reveal>
        </div>
      </section>

      <CapabilityFeature feature={c.feature} />

      <section className="section" id="enquire">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <p className="eyebrow">Service enquiry</p>
            <h2>Talk to us about {c.title.toLowerCase()}</h2>
            <p className="muted">Scope, deliverables, budget and timeline are defined for each project.</p>
            <Reveal className="feature-photo mask-soft" style={{ marginTop: 30, aspectRatio: "16/11" }}><Img src={c.image} alt={c.imageAlt} /></Reveal>
          </div>
          <EnquiryForm type="service" preset={c.title} />
        </div>
      </section>

      <section className="section section--tight section--night">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <Link href="/capabilities/" className="text-link">← All capabilities</Link>
          <Link href={`/capabilities/${next.slug}/`} className="text-link">Next: {next.letter}. {next.title} →</Link>
        </div>
      </section>
    </>
  );
}

export function getStaticPaths() {
  return { paths: capabilities.map((c) => ({ params: { slug: c.slug } })), fallback: false };
}
export function getStaticProps({ params }) {
  return { props: { slug: params.slug } };
}
