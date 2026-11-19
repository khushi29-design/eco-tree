/**
 * OneSystem.jsx — "Land, water, life and people work as one system." (slides 4 and 22)
 * Desktop: the statement on the left; on the right the four disciplines start scattered and
 * lock together into one team as you scroll, sealed by a "one system" mark in the centre.
 * The two columns never overlap, whatever the screen height. Phones: simple stacked layout.
 */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { company, fourDisciplines, uniqueClosing } from "@/data/company";

const START = [
  { x: -70, y: -60, r: -8 }, { x: 70, y: -55, r: 7 }, { x: -65, y: 60, r: 6 }, { x: 70, y: 58, r: -7 },
];

export default function OneSystem() {
  const root = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 901px)", () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.7 } });
      tl.fromTo(".os-copy > *", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.25, ease: "power2.out" }, 0);
      gsap.utils.toArray(".os-word").forEach((el, i) => {
        tl.fromTo(el, { xPercent: START[i].x, yPercent: START[i].y, rotate: START[i].r, opacity: 0.25 },
          { xPercent: 0, yPercent: 0, rotate: 0, opacity: 1, ease: "power2.out", duration: 0.6 }, 0.05);
      });
      tl.fromTo(".os-ring", { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45 }, 0.3)
        .fromTo(".os-seal", { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.7)" }, 0.7);
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="one-system" ref={root} aria-labelledby="os-title">
      <div className="os-stage">
        <div className="container os-layout">
          <div className="os-copy">
            <p className="eyebrow">02 · Why we exist</p>
            <h2 id="os-title">{company.belief}</h2>
            <p className="muted">{uniqueClosing}</p>
          </div>

          <div className="os-visual">
            <div className="os-ring" aria-hidden="true" />
            <div className="os-grid">
              {fourDisciplines.map((d, i) => (
                <div className="os-word" key={d.name}>
                  <span className="os-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <strong>{d.name}</strong>
                  <span className="os-text">{d.text}</span>
                </div>
              ))}
            </div>
            <div className="os-seal" aria-hidden="true"><span>One<br />system</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
