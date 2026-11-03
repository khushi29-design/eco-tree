/**
 * HeroForest.jsx — homepage opening: the living 3D banyan forest + animated headline.
 * The section is 200vh tall with a sticky stage; scrolling moves the 3D camera up into the canopy
 * and fades the headline away. While the 3D scene loads, the sunset photo is shown underneath,
 * so there is never a blank screen (and it stays as the fallback if WebGL is unavailable).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { company } from "@/data/company";
import { SplitChars } from "@/components/Reveal";

const ForestScene = dynamic(() => import("@/animations/ForestScene"), { ssr: false });

export default function HeroForest() {
  const root = useRef(null);
  const copy = useRef(null);
  const progress = useRef(0);
  const [state, setState] = useState("loading"); // loading | ready | fallback

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current, start: "top top", end: "bottom bottom", scrub: true,
        onUpdate: (self) => { progress.current = self.progress; },
      });
      gsap.to(copy.current, {
        yPercent: -30, opacity: 0, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "45% top", scrub: true },
      });
      gsap.to(".hero-veil", {
        opacity: 1, ease: "none",
        scrollTrigger: { trigger: root.current, start: "55% top", end: "bottom bottom", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const onReady = useCallback(() => setState("ready"), []);
  const onFail = useCallback(() => setState("fallback"), []);

  return (
    <section className="hero-forest" ref={root} aria-labelledby="hero-title">
      <div className="hero-stage">
        <img className={`hero-photo ${state === "ready" ? "is-hidden" : ""}`} src="/images/forest/sunset-over-restored-plantation-nagpur.webp"
          srcSet="/images/forest/sunset-over-restored-plantation-nagpur-sm.webp 800w, /images/forest/sunset-over-restored-plantation-nagpur.webp 1920w"
          sizes="100vw" alt="" fetchPriority="high" />
        {state !== "fallback" && <ForestScene progressRef={progress} onReady={onReady} onFail={onFail} />}
        <div className="hero-grade" aria-hidden="true" />
        {state === "loading" && <div className="hero-loader" role="status"><span />Growing the forest…</div>}

        <div className="hero-copy container" ref={copy}>
          <p className="eyebrow">{company.name}</p>
          <h1 id="hero-title" className="hero-title">
            <SplitChars as="span" className="line" text={company.hero.titleLines[0]} />
            <SplitChars as="span" className="line line--accent" text={company.hero.titleLines[1]} />
          </h1>
          <p className="hero-intro">{company.hero.intro}</p>
          <div className="btn-row">
            <Link href="/impact/" className="btn btn--gold">Explore Our Impact <span className="arrow">→</span></Link>
            <Link href="/capabilities/" className="btn btn--ghost">Discover Our Capabilities</Link>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true"><span className="scroll-cue__line" />Scroll to walk the land</div>
        <p className="hero-tagline" aria-hidden="true">{company.tagline}</p>
        <div className="hero-veil" aria-hidden="true" />
      </div>
    </section>
  );
}
