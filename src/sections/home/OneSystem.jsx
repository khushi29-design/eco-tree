/**
 * OneSystem.jsx — "Land, water, life and people work as one system." (slides 4 and 22)
 * Four disciplines start scattered and lock together into one team as you scroll.
 */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { company, fourDisciplines, uniqueClosing } from "@/data/company";

const START = [
  { x: -38, y: -30, r: -8 }, { x: 36, y: -26, r: 6 }, { x: -34, y: 30, r: 5 }, { x: 38, y: 28, r: -6 },
];

export default function OneSystem() {
  const root = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 760px)", () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.7 } });
      gsap.utils.toArray(".os-word").forEach((el, i) => {
        tl.fromTo(el, { xPercent: START[i].x * 4, yPercent: START[i].y * 4, rotate: START[i].r, opacity: 0.35 }, { xPercent: 0, yPercent: 0, rotate: 0, opacity: 1, ease: "power2.out", duration: 0.6 }, 0);
      });
      tl.fromTo(".os-ring", { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 }, 0.35)
        .fromTo(".os-copy", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 }, 0.6);
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="one-system" ref={root} aria-labelledby="os-title">
      <div className="os-stage">
        <div className="os-ring" aria-hidden="true" />
        <div className="os-grid">
          {fourDisciplines.map((d) => (
            <div className="os-word" key={d.name}>
              <strong>{d.name}</strong>
              <span>{d.text}</span>
            </div>
          ))}
        </div>
        <div className="os-copy container">
          <p className="eyebrow">02 · Why we exist</p>
          <h2 id="os-title">{company.belief}</h2>
          <p className="muted">{uniqueClosing}</p>
        </div>
      </div>
    </section>
  );
}
