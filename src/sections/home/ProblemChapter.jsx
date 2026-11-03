/**
 * ProblemChapter.jsx — "India's natural infrastructure is running a deficit" (slides 2–3).
 * Sourced national figures as animated counters, then "what gets reported vs. the root cause".
 */
import { problemStats, problemClosing, rootCauses, rootCauseThread } from "@/data/company";
import Counter from "@/components/Counter";
import { Reveal, SplitWords } from "@/components/Reveal";

export default function ProblemChapter() {
  return (
    <section className="section problem" aria-labelledby="problem-title">
      <div className="container">
        <div className="section-head">
          <Reveal as="p" className="eyebrow">01 · The problem</Reveal>
          <SplitWords as="h2" id="problem-title" text="India's natural infrastructure is running a deficit" />
        </div>
        <div className="grid grid-4">
          {problemStats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} display={s.display} label={s.text} source={s.source} />
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="problem-closing">{problemClosing}</Reveal>

        <div className="root-causes">
          <Reveal className="root-head">
            <p className="eyebrow">The problem behind the problem</p>
            <h3>Why well-funded projects still fall short</h3>
          </Reveal>
          <div className="rc-table" role="table" aria-label="What gets reported versus the root cause">
            <div className="rc-row rc-row--head" role="row">
              <span role="columnheader">What gets reported</span><span aria-hidden="true" /><span role="columnheader">The root cause</span>
            </div>
            {rootCauses.map((r, i) => (
              <Reveal className="rc-row" role="row" key={i} delay={i * 0.08}>
                <span role="cell" className="rc-reported">{r.reported}</span>
                <span className="rc-arrow" aria-hidden="true">→</span>
                <span role="cell">{r.cause}</span>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" className="rc-thread">{rootCauseThread}</Reveal>
        </div>
      </div>
    </section>
  );
}
