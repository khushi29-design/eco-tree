/**
 * Home page — one continuous scroll story (Scroll Site Generator structure):
 *   film:  3D forest hero → the problem → degraded-to-living transition → one system
 *          → restoration drone film → ridge-to-valley water → evidence drone film
 *   brand: philosophy → capabilities → why us → projects → impact → products → experiences → closing
 */
import Link from "next/link";
import Seo from "@/components/Seo";
import { pageSeo } from "@/data/seo";
import { company, withWithout } from "@/data/company";
import { projects } from "@/data/projects";
import HeroForest from "@/sections/home/HeroForest";
import ProblemChapter from "@/sections/home/ProblemChapter";
import RestorationTransition from "@/sections/home/RestorationTransition";
import OneSystem from "@/sections/home/OneSystem";
import FilmChapter from "@/sections/home/FilmChapter";
import WaterChapter from "@/sections/home/WaterChapter";
import Philosophy from "@/sections/Philosophy";
import CapabilityGrid from "@/sections/CapabilityGrid";
import WhyUs from "@/sections/WhyUs";
import ProjectCards from "@/sections/ProjectCards";
import ImpactNumbers from "@/sections/ImpactNumbers";
import ProductsPreview from "@/sections/ProductsPreview";
import ExperiencesTeaser from "@/sections/ExperiencesTeaser";
import CtaBand from "@/sections/CtaBand";
import { Reveal, SplitWords } from "@/components/Reveal";

const nis = projects[0];

export default function Home() {
  return (
    <>
      <Seo title={pageSeo.home.title} description={pageSeo.home.description} path="/" />

      <HeroForest />

      {/* Company introduction */}
      <section className="section intro-section" aria-labelledby="intro-title">
        <div className="container intro-grid">
          <Reveal as="p" className="eyebrow">Natural security</Reveal>
          <div>
            <SplitWords as="h2" id="intro-title" className="intro-statement" text={company.positioning} />
            <Reveal as="p" className="lead muted" delay={0.15}>{company.naturalSecurity}</Reveal>
            <Reveal className="vm" delay={0.25}>
              <div><h3>Vision</h3><p className="muted">{company.vision}</p></div>
              <div><h3>Mission</h3><p className="muted">{company.mission}</p></div>
            </Reveal>
          </div>
        </div>
      </section>

      <ProblemChapter />
      <RestorationTransition />
      <OneSystem />

      <FilmChapter
        id="restore-film"
        frames="restore"
        label="Drone film: Project Nisargavedh, from a gabion structure up over the native plantation"
        poster="/videos/nisargavedh-drone-gabion-to-plantation-poster.jpg"
        posterAlt="Drone view over Project Nisargavedh"
        height={420}
        captions={[
          { from: 0, to: 0.3, eyebrow: "Project Nisargavedh · Wakeshwar, Nagpur", title: "Gabion structures & bunds", text: "Slow runoff, trap silt." },
          { from: 0.34, to: 0.66, eyebrow: "Soil & moisture conservation", title: "Hold water at the root zone", text: "Pits and trenches around every sapling, before the plantation needs them.", align: "right" },
          { from: 0.7, to: 1.01, eyebrow: "Native afforestation", title: "Restoration measured by survival, year after year.", text: "Indigenous species, planted and maintained." },
        ]}
      />

      <WaterChapter />

      <FilmChapter
        id="evidence-film"
        frames="evidence"
        label="Drone film: overhead view of a planned landscape layout"
        poster="/videos/drone-overhead-planned-park-layout-poster.jpg"
        posterAlt="Overhead drone view of a planned landscape"
        height={340}
        captions={[
          { from: 0, to: 0.45, eyebrow: "Plan, then plant", title: "Every site starts with a plan.", text: "Site visit, baseline assessment, technical concept and feasibility — before a single sapling goes in." },
          { from: 0.5, to: 1.01, eyebrow: "Evidence", title: "Clarity before claims.", text: "Baselines, stated methods and clearly labelled evidence — for CSR, ESG and departmental review.", align: "right" },
        ]}
      />

      <Philosophy />
      <CapabilityGrid />

      {/* What changes when we are on site (slide 5) */}
      <section className="section section--light" aria-labelledby="ww-title">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">What our presence can do</Reveal>
            <SplitWords as="h2" id="ww-title" text="What changes when we are on site" />
          </div>
          <div className="ww-table">
            <div className="ww-row ww-row--head"><span>Without an integrated partner</span><span>With EcoTree Logics</span></div>
            {withWithout.map(([a, b], i) => (
              <Reveal className="ww-row" key={i} delay={i * 0.05}>
                <span className="ww-without">{a}</span>
                <span className="ww-with">{b}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WhyUs />

      <section className="section" aria-labelledby="proj-title">
        <div className="container">
          <div className="section-head split" style={{ alignItems: "end", maxWidth: "none" }}>
            <div>
              <Reveal as="p" className="eyebrow">06 · What we have done</Reveal>
              <SplitWords as="h2" id="proj-title" text="Degraded land, brought back" />
            </div>
            <Reveal as="p" className="muted">{nis.summary} Our role: {nis.role.toLowerCase()}.</Reveal>
          </div>
          <ProjectCards />
          <Reveal style={{ marginTop: 30 }}><Link className="text-link" href="/projects/">All projects and field infrastructure →</Link></Reveal>
        </div>
      </section>

      <ImpactNumbers />
      <ProductsPreview />
      <ExperiencesTeaser />
      <CtaBand />
    </>
  );
}
