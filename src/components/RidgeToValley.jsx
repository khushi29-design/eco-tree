/**
 * RidgeToValley.jsx — interactive "Slow it, sink it, store it" water conservation model (slide 7).
 * A conceptual cross-section of a catchment. `active` (0–3) highlights one stage; visitors can
 * also click the four stage buttons. The homepage drives `active` from scroll position.
 */
import { useState } from "react";
import { waterLogic, waterNote } from "@/data/capabilities";

const BLUE = "#7cc4d8";

export default function RidgeToValley({ active: controlled, onSelect, showButtons = true, dark = true }) {
  const [own, setOwn] = useState(0);
  const active = controlled ?? own;
  const select = (i) => { setOwn(i); onSelect?.(i); };
  const on = (i) => ({ opacity: active === i ? 1 : 0.28, transition: "opacity .6s" });
  const ink = dark ? "#f5f4ec" : "#13261d";

  return (
    <div className="rtv">
      <svg viewBox="0 0 1000 470" role="img" aria-label={`Ridge-to-valley water conservation model. Current stage: ${waterLogic[active].step} — ${waterLogic[active].text}`}>
        <defs>
          <linearGradient id="soil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6b4a32" /><stop offset="1" stopColor="#3a271b" />
          </linearGradient>
          <linearGradient id="aquifer" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={BLUE} stopOpacity="0.55" /><stop offset="1" stopColor="#2d6f86" stopOpacity="0.8" />
          </linearGradient>
          <pattern id="mesh" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M0 0H8M0 0V8" stroke="#cfd6c9" strokeWidth="1" opacity=".7" />
          </pattern>
        </defs>

        {/* rain */}
        <g stroke={BLUE} strokeWidth="2" strokeLinecap="round" opacity=".7" className="rtv-rain">
          {Array.from({ length: 26 }, (_, i) => (
            <line key={i} x1={20 + i * 38} y1={10 + (i % 4) * 9} x2={14 + i * 38} y2={28 + (i % 4) * 9} />
          ))}
        </g>

        {/* land profile: ridge (left) → valley (right) */}
        <path d="M0 120 C160 108 260 150 400 230 S640 350 760 368 S920 372 1000 372 V470 H0Z" fill="url(#soil)" />
        <path d="M0 120 C160 108 260 150 400 230 S640 350 760 368 S920 372 1000 372" fill="none" stroke="#8fb36a" strokeWidth="6" />

        {/* groundwater — rises when "Recharge" is active */}
        <g style={{ transform: `translateY(${active === 3 ? -18 : 0}px)`, transition: "transform 1.2s cubic-bezier(.22,1,.36,1)" }}>
          <path d="M0 440 C300 430 600 420 1000 410 V470 H0Z" fill="url(#aquifer)" />
        </g>
        <text x="20" y="458" fill={ink} fontSize="13" opacity=".7">Groundwater</text>

        {/* surface runoff path */}
        <path className="rtv-flow" d="M40 116 C170 110 260 152 400 232 S640 348 760 364" fill="none" stroke={BLUE} strokeWidth="3" strokeDasharray="10 12" opacity=".9" />

        {/* 1. SLOW — native cover + contour trenches on the upper slopes */}
        <g style={on(0)}>
          {[[60, 112], [120, 108], [190, 114], [255, 134], [320, 170]].map(([x, y], i) => (
            <g key={i}>
              <rect x={x - 3} y={y - 26} width="6" height="26" fill="#5a4431" />
              <circle cx={x} cy={y - 34} r={16 + (i % 2) * 4} fill="#4f8f45" />
              <circle cx={x - 9} cy={y - 26} r="10" fill="#3f7d3f" />
            </g>
          ))}
          {[[150, 116], [225, 126], [290, 152], [350, 190]].map(([x, y], i) => (
            <path key={i} d={`M${x - 18} ${y + 4} q18 10 36 0`} stroke="#1c120c" strokeWidth="5" fill="none" strokeLinecap="round" />
          ))}
          <text x="150" y="58" fill={ink} fontSize="20" fontFamily="var(--font-display)">Slow</text>
        </g>

        {/* 2. SINK — bunds + gabion in the drainage line */}
        <g style={on(1)}>
          <path d="M408 236 q16 -16 34 0" fill="#7a5a3e" />
          <path d="M470 270 q16 -16 34 0" fill="#7a5a3e" />
          <rect x="525" y="282" width="56" height="34" rx="3" fill="#8a8a7a" />
          <rect x="525" y="282" width="56" height="34" rx="3" fill="url(#mesh)" />
          <text x="455" y="210" fill={ink} fontSize="20" fontFamily="var(--font-display)">Sink</text>
        </g>

        {/* 3. STORE — check dam + pond in the valley */}
        <g style={on(2)}>
          <path d="M790 366 Q850 396 905 366 Z" fill={BLUE} opacity=".85" />
          <rect x="904" y="338" width="14" height="38" fill="#b9b2a0" />
          <text x="815" y="320" fill={ink} fontSize="20" fontFamily="var(--font-display)">Store</text>
        </g>

        {/* 4. RECHARGE — pits and wells feeding groundwater */}
        <g style={on(3)}>
          <rect x="640" y="356" width="22" height="34" fill="#22160f" />
          <rect x="702" y="362" width="22" height="34" fill="#22160f" />
          <rect x="960" y="372" width="14" height="66" fill="#22160f" stroke="#b9b2a0" strokeWidth="2" />
          {[651, 713, 967].map((x, i) => (
            <path key={i} className="rtv-drip" d={`M${x} ${i === 2 ? 380 : 392} V${i === 2 ? 432 : 420}`} stroke={BLUE} strokeWidth="3" strokeDasharray="4 6" />
          ))}
          <text x="640" y="336" fill={ink} fontSize="20" fontFamily="var(--font-display)">Recharge</text>
        </g>
      </svg>

      {showButtons && (
        <div className="rtv-steps" role="tablist" aria-label="Ridge-to-valley stages">
          {waterLogic.map((w, i) => (
            <button key={w.step} role="tab" aria-selected={active === i} className={`rtv-step ${active === i ? "is-active" : ""}`} onClick={() => select(i)}>
              <strong>{w.step}</strong>
              {w.text}
            </button>
          ))}
        </div>
      )}
      <p className="note" style={{ marginTop: 14 }}>{waterNote} Each structure is chosen for the site&apos;s hydrology, terrain, soil, permissions and technical feasibility.</p>
    </div>
  );
}
