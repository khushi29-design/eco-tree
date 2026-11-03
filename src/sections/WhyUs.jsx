/** WhyUs.jsx — "Where we choose to stand" (slide 15): positioning 2×2 and what it means for clients. */
import { positioning, positioningNote, whyUs } from "@/data/company";
import { Reveal, SplitWords } from "@/components/Reveal";

export default function WhyUs() {
  const order = [positioning[0], positioning[1], positioning[2], positioning[3]]; // top-left, top-right, bottom-left, bottom-right
  return (
    <section className="section section--forest why-us" aria-labelledby="why-title">
      <div className="container split">
        <div>
          <Reveal as="p" className="eyebrow">04 · Why EcoTree Logics</Reveal>
          <SplitWords as="h2" id="why-title" text="Where we choose to stand" />
          <div className="grid grid-2" style={{ marginTop: 34 }}>
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <h3 style={{ fontSize: "1.25rem" }}>{w.title}</h3>
                <p className="muted small">{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal variant="scale">
          <div className="quad" role="img" aria-label="Positioning chart: ecological depth against delivery on the ground. EcoTree Logics positions itself as Integrated: high on both.">
            {order.map((q) => (
              <div key={q.name} className={`cell ${q.highlight ? "is-us" : ""}`}>
                <strong>{q.name}</strong>
                {q.text}
              </div>
            ))}
            <span className="axis axis-x">Delivery on the ground →</span>
            <span className="axis axis-y">Ecological depth →</span>
          </div>
          <p className="note" style={{ marginTop: 12 }}>{positioningNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
