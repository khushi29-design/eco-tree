/**
 * WaterChapter.jsx — homepage: the ridge-to-valley model, driven by scroll.
 * As you scroll through the pinned section, the stage moves Slow → Sink → Store → Recharge.
 * Clicking a stage button jumps to it (useful on phones and for keyboard users).
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import RidgeToValley from "@/components/RidgeToValley";

export default function WaterChapter() {
  const root = useRef(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: root.current, start: "top top", end: "bottom bottom",
      onUpdate: (self) => setStep(Math.min(3, Math.floor(self.progress * 4))),
    });
    return () => st.kill();
  }, []);

  return (
    <section className="water-chapter" ref={root} aria-labelledby="water-title">
      <div className="water-stage container">
        <div className="water-head">
          <p className="eyebrow">03 · Water and soil — the foundation</p>
          <h2 id="water-title">Slow it, sink it, store it: <em className="accent">from ridge to valley</em></h2>
          <p className="muted">Structures built one at a time silt up or run dry. We plan for the whole catchment that feeds them.</p>
        </div>
        <RidgeToValley active={step} onSelect={setStep} />
        <Link className="text-link" href="/capabilities/conservation-engineering-water/">Conservation engineering &amp; water <span>→</span></Link>
      </div>
    </section>
  );
}
