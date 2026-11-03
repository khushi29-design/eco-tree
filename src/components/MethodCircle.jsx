/**
 * MethodCircle.jsx — "A closed loop, not a straight line" (slide 16).
 * Eight engagement steps around a circle. It advances by itself while on screen
 * (unless the visitor prefers reduced motion); click a step or a number to jump to it.
 */
import { useEffect, useRef, useState } from "react";
import { methodSteps, methodLoop } from "@/data/company";
import { prefersReducedMotion } from "@/animations/useReveal";

const R = 200, C = 260;

export default function MethodCircle() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    if (!auto || prefersReducedMotion()) return;
    let timer, visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(ref.current);
    timer = setInterval(() => { if (visible) setActive((a) => (a + 1) % methodSteps.length); }, 2600);
    return () => { clearInterval(timer); io.disconnect(); };
  }, [auto]);

  const pick = (i) => { setAuto(false); setActive(i); };
  const circumference = 2 * Math.PI * R;
  const progress = (active + 1) / methodSteps.length;

  return (
    <div className="method" ref={ref}>
      <svg className="method-svg" viewBox="0 0 520 520" role="img" aria-label={`Engagement step ${active + 1} of 8: ${methodSteps[active]}`}>
        <circle className="ring" cx={C} cy={C} r={R} />
        <circle className="ring-progress" cx={C} cy={C} r={R} strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress)} transform={`rotate(-90 ${C} ${C})`} />
        {methodSteps.map((step, i) => {
          const a = (i / methodSteps.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <g key={i} className={`node ${i === active ? "is-active" : ""}`} transform={`translate(${C + Math.cos(a) * R} ${C + Math.sin(a) * R})`} onClick={() => pick(i)}>
              <circle r="30" />
              <text>{String(i + 1).padStart(2, "0")}</text>
            </g>
          );
        })}
        <text className="center-sub" x={C} y={C - 62}>Step {active + 1} of 8</text>
        <foreignObject x={C - 130} y={C - 44} width="260" height="120">
          <div style={{ color: "var(--warm-white)", fontFamily: "var(--font-display)", fontSize: 26, lineHeight: 1.15, textAlign: "center" }}>
            {methodSteps[active]}
          </div>
        </foreignObject>
      </svg>
      <div>
        <ol className="method-steps">
          {methodSteps.map((s, i) => (
            <li key={s} className={i === active ? "is-active" : ""}>
              <button onClick={() => pick(i)} aria-pressed={i === active}>{s}</button>
            </li>
          ))}
        </ol>
        <div className="method-loop" aria-label="The loop">
          {methodLoop.map((m, i) => (
            <span key={m}>{m}{i < methodLoop.length - 1 ? "" : " ↺"}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
