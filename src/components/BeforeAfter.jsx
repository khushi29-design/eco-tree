/**
 * BeforeAfter.jsx — drag (or use arrow keys) to compare a site before and after.
 * Uses a native range input underneath, so it works with keyboard, mouse and touch.
 */
import { useState } from "react";

export default function BeforeAfter({ before, after, beforeAlt, afterAlt, label = "Compare before and after" }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="before-after" style={{ "--pos": `${pos}%` }}>
      <img src={before} alt={beforeAlt} loading="lazy" />
      <div className="after-wrap"><img src={after} alt={afterAlt} loading="lazy" /></div>
      <span className="ba-label ba-label--before">Before</span>
      <span className="ba-label ba-label--after">After</span>
      <div className="handle" aria-hidden="true" />
      <input type="range" min="0" max="100" value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label={label} />
    </div>
  );
}
