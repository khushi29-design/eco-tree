/**
 * FilmChapter.jsx — the Scroll Site Generator's signature effect:
 * real drone footage, sliced into frames, "played" by the scroll bar on a pinned canvas.
 *
 * Props
 *   frames   — folder name in /public/frames (e.g. "restore")
 *   captions — [{ from: 0, to: 0.3, eyebrow, title, text }]  (from/to = scroll fraction 0–1)
 *   height   — section height in viewport heights (longer = slower playback)
 *   children — optional overlay (e.g. counters) shown at the end
 */
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useFrameSequence } from "@/animations/useFrameSequence";

export default function FilmChapter({ id, frames, poster, posterAlt, captions = [], height = 400, label, children }) {
  const root = useRef(null);
  const canvas = useRef(null);
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(-1);
  const seq = useFrameSequence(frames, { fit: "cover", enabled: near });

  // start downloading frames only when the chapter is ~1.5 screens away
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "150% 0px" });
    io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: root.current, start: "top top", end: "bottom bottom", scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        seq.draw(canvas.current, p);
        setActive(captions.findIndex((c) => p >= c.from && p < c.to));
      },
    });
    seq.draw(canvas.current, st.progress || 0);
    return () => st.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seq.ready, seq.draw]);

  return (
    <section id={id} className="film-chapter" ref={root} style={{ height: `${height}vh` }} aria-label={label}>
      <div className="film-stage">
        {/* the poster is visible until the first frame decodes (and for reduced-data cases) */}
        <img className={`film-poster ${seq.ready ? "is-hidden" : ""}`} src={poster} alt={posterAlt || ""} loading="lazy" />
        <canvas ref={canvas} className="film-canvas" aria-hidden="true" />
        <div className="film-vignette" aria-hidden="true" />
        {near && seq.loaded < 1 && !seq.error && (
          <div className="film-loading" aria-hidden="true"><span style={{ transform: `scaleX(${seq.loaded})` }} /></div>
        )}
        <div className="film-captions container">
          {captions.map((c, i) => (
            <div key={i} className={`film-caption ${i === active ? "is-active" : ""} ${c.align === "right" ? "film-caption--right" : ""}`}>
              {c.eyebrow && <p className="eyebrow">{c.eyebrow}</p>}
              <h2>{c.title}</h2>
              {c.text && <p>{c.text}</p>}
            </div>
          ))}
        </div>
        {children}
      </div>
    </section>
  );
}
