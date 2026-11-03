/**
 * PageHero.jsx — the cinematic opening of every inner page:
 * full-bleed photo with slow parallax, breadcrumbs, eyebrow, word-by-word title and intro.
 */
import { useEffect, useRef } from "react";
import Img from "./Img";
import Breadcrumbs from "./Breadcrumbs";
import { SplitWords, Reveal } from "./Reveal";
import { prefersReducedMotion } from "@/animations/useReveal";

export default function PageHero({ eyebrow, title, intro, image, imageAlt, crumbs, letter, short = false, children }) {
  const media = useRef(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = media.current?.querySelector("img");
    if (!el) return;
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { el.style.transform = `translate3d(0, ${window.scrollY * 0.18}px, 0) scale(1.04)`; });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className={`page-hero ${short ? "page-hero--short" : ""}`}>
      {image && (
        <div className="page-hero__media" ref={media}>
          <Img src={image} alt={imageAlt || ""} priority sizes="100vw" />
        </div>
      )}
      {letter && <span className="page-hero__letter" aria-hidden="true">{letter}</span>}
      <div className="container">
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>}
        <SplitWords as="h1" text={title} />
        {intro && <Reveal as="p" className="lead" delay={0.25}>{intro}</Reveal>}
        {children && <Reveal delay={0.4} style={{ marginTop: 30 }}>{children}</Reveal>}
      </div>
    </section>
  );
}
