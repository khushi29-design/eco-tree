/**
 * RestorationTransition.jsx — scroll-controlled "degraded land → living landscape" transition.
 * Pinned stage: a circular wipe grows with scroll, revealing the restored plantation over the
 * freshly planted ground. Both photos are real images from the restoration work.
 */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { withWithout } from "@/data/company";

export default function RestorationTransition() {
  const root = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 } });
      tl.fromTo(".rt-after", { clipPath: "circle(0% at 50% 55%)" }, { clipPath: "circle(80% at 50% 55%)", ease: "none" }, 0)
        .fromTo(".rt-before img", { scale: 1.12 }, { scale: 1, ease: "none" }, 0)
        .fromTo(".rt-after img", { scale: 1.25 }, { scale: 1, ease: "none" }, 0)
        .to(".rt-cap--before", { opacity: 0, y: -30, ease: "none", duration: 0.3 }, 0.15)
        .fromTo(".rt-cap--after", { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none", duration: 0.3 }, 0.55);
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="restoration-transition" ref={root} aria-label="From degraded land to a living landscape">
      <div className="rt-stage">
        <div className="rt-before">
          <img src="/images/forest/native-saplings-drip-irrigation-rows.webp" alt="Freshly planted native saplings on dry, degraded ground with drip lines" loading="lazy" />
        </div>
        <div className="rt-after">
          <img src="/images/forest/aerial-view-native-plantation-trenches.webp" alt="Restored plantation with established native trees, seen from above" loading="lazy" />
        </div>
        <div className="rt-shade" aria-hidden="true" />
        <div className="container rt-caps">
          <div className="rt-cap rt-cap--before">
            <p className="eyebrow">Without an integrated partner</p>
            <h2>{withWithout[0][0]}.</h2>
          </div>
          <div className="rt-cap rt-cap--after">
            <p className="eyebrow">With EcoTree Logics</p>
            <h2>{withWithout[0][1]}.</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
