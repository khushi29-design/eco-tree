/** ExperiencesTeaser.jsx — "Into the forest, with a purpose" (slide 11). */
import Link from "next/link";
import { destinations } from "@/data/capabilities";
import { Reveal, SplitWords } from "@/components/Reveal";
import Img from "@/components/Img";

export default function ExperiencesTeaser() {
  return (
    <section className="section" aria-labelledby="exp-title">
      <div className="container split">
        <Reveal variant="scale" className="mask-arch" style={{ aspectRatio: "3 / 4", maxHeight: 640 }}>
          <Img src="/images/gallery/nature-education-session-lined-pond" alt="Students learning around a lined pond during a guided field session" className="img-cover" />
        </Reveal>
        <div>
          <Reveal as="p" className="eyebrow">Nature experiences &amp; learning play</Reveal>
          <SplitWords as="h2" id="exp-title" text="Into the forest, with a purpose" />
          <Reveal as="p" className="lead muted">Nature trails, forest hikes, wildlife safaris, one-day corporate tours and field excursions — each with a clear learning outcome, planned end to end: transport, permits, guides, food and safety.</Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow" style={{ marginTop: 18 }}>Within reach of Nagpur</p>
            <ul className="pill-list">{destinations.map((d) => <li key={d}>{d}</li>)}</ul>
            <p className="note" style={{ marginTop: 14 }}>Every trip follows park rules, uses authorised bookings and leaves no trace.</p>
          </Reveal>
          <Reveal className="btn-row" delay={0.2} style={{ marginTop: 26 }}>
            <Link className="btn btn--gold" href="/capabilities/nature-experiences-learning-play/">Plan an outing <span className="arrow">→</span></Link>
            <Link className="btn btn--ghost" href="/capabilities/nature-education-interpretation/">Nature education</Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
