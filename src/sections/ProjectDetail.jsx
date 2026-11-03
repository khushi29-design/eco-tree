/** ProjectDetail.jsx — shared layout for individual project pages. Content: src/data/projects.js + media.js */
import Link from "next/link";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import Counter from "@/components/Counter";
import VideoPlayer from "@/components/VideoPlayer";
import EnquiryForm from "@/components/EnquiryForm";
import { Reveal, SplitWords } from "@/components/Reveal";
import GalleryGrid from "@/sections/GalleryGrid";
import CtaBand from "@/sections/CtaBand";
import { getProject } from "@/data/projects";
import { photos, videos } from "@/data/media";
import { breadcrumbSchema, articleSchema } from "@/utils/schema";

export default function ProjectDetail({ slug }) {
  const p = getProject(slug);
  const path = `/projects/${p.slug}/`;
  const crumbs = [{ label: "Home", href: "/" }, { label: "Projects", href: "/projects/" }, { label: p.name, href: path }];
  const projectPhotos = photos.filter((ph) => ph.project === p.slug);
  const video = videos.find((v) => v.file === p.video);

  return (
    <>
      <Seo title={p.seoTitle} description={p.seoDescription} path={path} image={`${p.heroImage}.webp`} imageAlt={p.heroAlt} type="article"
        schema={[breadcrumbSchema(crumbs), articleSchema({ title: p.seoTitle, description: p.seoDescription, path, image: `${p.heroImage}.webp` })]} />
      <PageHero crumbs={crumbs} eyebrow={p.location} title={p.name} intro={p.tagline + "."} image={p.heroImage} imageAlt={p.heroAlt} />

      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <Reveal as="p" className="eyebrow">Our scope</Reveal>
            <SplitWords as="h2" text={p.role} style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }} />
          </div>
          <Reveal as="p" className="lead muted">{p.summary}</Reveal>
        </div>
        <div className="container" style={{ marginTop: 50 }}>
          <div className="workstreams">
            {p.workstreams.map((w, i) => (
              <Reveal className="workstream" key={w.title} delay={i * 0.07}>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <div className="impact-block__head">
            <h2 style={{ fontSize: "var(--fs-h2)", margin: 0 }}>The numbers on the ground</h2>
            <span className="figure-label">{p.figureLabel}</span>
          </div>
          <div className="stat-row" style={{ marginTop: 30 }}>
            {p.figures.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.08}><Counter value={f.value} decimals={f.decimals || 0} suffix={f.suffix} label={f.label} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {video && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <Reveal as="p" className="eyebrow">From the air</Reveal>
              <SplitWords as="h2" text={video.title} />
            </div>
            <VideoPlayer {...video} />
          </div>
        </section>
      )}

      {p.transfers && (
        <section className="section section--night">
          <div className="container split">
            <div>
              <Reveal as="p" className="eyebrow">How this experience transfers</Reveal>
              <SplitWords as="h2" text="What this work can do for your site" />
            </div>
            <ul className="check-list">{p.transfers.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </section>
      )}

      {projectPhotos.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <Reveal as="p" className="eyebrow">Project gallery</Reveal>
              <SplitWords as="h2" text="On the ground" />
            </div>
            <GalleryGrid items={projectPhotos} />
            <p style={{ marginTop: 20 }}><Link className="text-link" href="/gallery/">Full gallery →</Link></p>
          </div>
        </section>
      )}
      {projectPhotos.length === 0 && (
        <section className="section section--tight">
          <div className="container">
            <p className="note">Project photographs for {p.name} will be added to this page and the <Link href="/gallery/">gallery</Link>.</p>
          </div>
        </section>
      )}

      <section className="section section--paper" id="enquire">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <p className="eyebrow">Project enquiry</p>
            <h2>Have a site like this?</h2>
            <p className="muted">Start with one site. We will walk it with you, read its land, water and life, and propose what it needs.</p>
          </div>
          <EnquiryForm type="project" preset={p.name} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
