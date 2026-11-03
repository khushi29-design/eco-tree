/**
 * Counter.jsx — a number that counts up when it scrolls into view.
 * The final number is in the HTML from the start (good for SEO and screen readers);
 * the animation only runs for sighted visitors who have not asked for reduced motion.
 */
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/animations/useReveal";

const fmt = (n, decimals) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export default function Counter({ value, decimals = 0, prefix = "", suffix = "", display, label, source, duration = 1800 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(display || `${prefix}${fmt(value ?? 0, decimals)}${suffix}`);

  useEffect(() => {
    if (display || value == null || prefersReducedMotion()) return;
    const el = ref.current;
    let raf, started = false;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started) return;
      started = true;
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 4);
        setShown(`${prefix}${fmt(value * eased, decimals)}${suffix}`);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      setShown(`${prefix}${fmt(0, decimals)}${suffix}`);
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, decimals, prefix, suffix, display, duration]);

  return (
    <div className="stat" ref={ref}>
      <div className="stat__value" aria-label={display || `${prefix}${fmt(value, decimals)}${suffix}`}>
        <span aria-hidden="true">{shown}</span>
      </div>
      {label && <div className="stat__label">{label}</div>}
      {source && <div className="stat__source">Source: {source}</div>}
    </div>
  );
}
