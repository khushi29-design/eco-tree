/**
 * Philosophy.jsx — ECO · TREE · LOGICS, what the name stands for.
 * Choose a word to reveal what each of its letters means.
 */
import { useState } from "react";
import { philosophy } from "@/data/company";
import { Reveal } from "@/components/Reveal";

export default function Philosophy({ light = false }) {
  const [active, setActive] = useState(0);
  const group = philosophy[active];
  return (
    <section className={`section philosophy ${light ? "section--light" : "section--night"}`} aria-labelledby="philo-title">
      <div className="container">
        <Reveal as="p" className="eyebrow">What the name stands for</Reveal>
        <h2 id="philo-title" className="sr-only">ECO TREE LOGICS — our philosophy</h2>
        <div className="philo-words" role="tablist" aria-label="ECO, TREE, LOGICS">
          {philosophy.map((g, i) => (
            <button key={g.word} role="tab" id={`philo-tab-${i}`} aria-controls="philo-panel" aria-selected={active === i} className={`philo-word ${active === i ? "is-active" : ""}`} onClick={() => setActive(i)}
              onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setActive(i)}>
              <span className="philo-word__text">{g.word}</span>
              <span className="philo-word__label">{g.label}</span>
            </button>
          ))}
        </div>
        <div className="philo-panel" id="philo-panel" role="tabpanel" aria-labelledby={`philo-tab-${active}`} key={group.word}>
          {group.items.map((it, i) => (
            <div className="philo-item" key={it.title} style={{ "--i": i }}>
              <span className="philo-letter" aria-hidden="true">{it.letter}</span>
              <div>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
