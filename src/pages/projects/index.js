/** Projects — portfolio + conservation infrastructure and field implementation (slides 18–20). */
import Link from "next/link";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import VideoPlayer from "@/components/VideoPlayer";
import { Reveal, SplitWords } from "@/components/Reveal";
import ProjectCards from "@/sections/ProjectCards";
import CtaBand from "@/sections/CtaBand";
import { infrastructure } from "@/data/projects";
import { videos } from "@/data/media";
import { pageSeo } from "@/data/seo";
import { breadcrumbSchema } from "@/utils/schema";

const crumbs = [{ label: "Home", href: "/" }, { label: "Projects", href: "/projects/" }];

export default function Projects() {
  return (
    <>
      <Seo title={pageSeo.projects.title} description={pageSeo.projects.description} path="/projects/" schema={breadcrumbSchema(crumbs)} />
      <PageHero crumbs={crumbs} eyebrow="What we have done" title="Work you can walk through"
        intro="Long-term restoration, rare-plant conservation and the field infrastructure that holds them together — around Nagpur, Maharashtra."
        image="/images/forest/aerial-view-native-plantation-trenches" imageAlt="Aerial view of a restored native plantation with soil-moisture trenches" />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">Featured projects</Reveal>
            <SplitWords as="h2" text="Degraded land brought back. Rare plants conserved." />
          </div>
          <ProjectCards />
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">Conservation infrastructure and field implementation</Reveal>
            <SplitWords as="h2" text="What has been built on the ground" />
          </div>
          <div className="infra-grid">
            {infrastructure.map((it, i) => (
              <Reveal className="infra-card" key={it.title} delay={(i % 3) * 0.08}>
                <div className="ph"><img src={`${it.image}.webp`} alt={it.alt} loading="lazy" /></div>
                <div className="body">
                  <span className="status-chip">Status: {it.status}</span>
                  <h3 style={{ marginTop: 8 }}>{it.title}</h3>
                  <p className="muted small" style={{ margin: 0 }}>{it.purpose}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">From the air</Reveal>
            <SplitWords as="h2" text="Drone footage from the field" />
          </div>
          <div className="grid grid-2">
            {videos.map((v) => <Reveal key={v.file}><VideoPlayer {...v} /></Reveal>)}
          </div>
          <p style={{ marginTop: 30 }}><Link className="text-link" href="/gallery/">Open the full gallery →</Link></p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
