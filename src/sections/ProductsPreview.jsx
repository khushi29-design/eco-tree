/** ProductsPreview.jsx — the four catalogue categories, each linking to its filtered catalogue. */
import Link from "next/link";
import { categories, products } from "@/data/products";
import { Reveal, SplitWords } from "@/components/Reveal";
import { asset } from "@/utils/asset";

const art = {
  everyday: "/images/forest/native-sapling-with-stake-drip-line",
  educational: "/images/gallery/nature-education-session-lined-pond",
  kits: "/images/gallery/volunteers-building-gabion-structure",
  field: "/images/projects/drip-irrigation-mainline-trench",
};

export default function ProductsPreview() {
  return (
    <section className="section section--paper" aria-labelledby="prod-title">
      <div className="container">
        <div className="section-head split" style={{ alignItems: "end", maxWidth: "none" }}>
          <div>
            <Reveal as="p" className="eyebrow">Sustainable products &amp; field equipment</Reveal>
            <SplitWords as="h2" id="prod-title" text="Small swaps that carry a big message" />
          </div>
          <Reveal as="p" className="muted">Everyday eco products, educational material, corporate kits and field equipment for forest and wildlife management — supplied alongside our projects, at one stop.</Reveal>
        </div>
        <div className="cat-tiles">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <Link className="cat-tile" href={`/products/?category=${c.id}`}>
                <img src={asset(`${art[c.id]}-sm.webp`)} alt="" loading="lazy" />
                <span className="cat-tile__count">{products.filter((p) => p.category === c.id).length} items</span>
                <h3>{c.name}</h3>
                <span className="more">View catalogue →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
