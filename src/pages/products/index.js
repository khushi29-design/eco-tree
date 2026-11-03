/**
 * Products & Eco Catalogue — category filters + search. Enquiry catalogue (no prices, no checkout).
 * The selected category is kept in the address (?category=field) so filtered views can be shared.
 */
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { IconSearch } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import CtaBand from "@/sections/CtaBand";
import { products, categories } from "@/data/products";
import { pageSeo, SITE_URL } from "@/data/seo";
import { breadcrumbSchema } from "@/utils/schema";
import { whatsappLink } from "@/utils/links";

const crumbs = [{ label: "Home", href: "/" }, { label: "Products Catalogue", href: "/products/" }];

const itemList = {
  "@context": "https://schema.org", "@type": "ItemList", name: "EcoTree Logics Products & Eco Catalogue",
  itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/products/${p.slug}/`, name: p.name })),
};

export default function Products() {
  const router = useRouter();
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const c = router.query.category;
    if (c && categories.some((x) => x.id === c)) setCat(c);
  }, [router.isReady, router.query.category]);

  const choose = (id) => {
    setCat(id);
    router.replace({ pathname: "/products/", query: id === "all" ? {} : { category: id } }, undefined, { shallow: true, scroll: false });
  };

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter((p) =>
      (cat === "all" || p.category === cat) &&
      (!term || `${p.name} ${p.summary} ${p.uses.join(" ")}`.toLowerCase().includes(term))
    );
  }, [cat, q]);

  const current = categories.find((c) => c.id === cat);

  return (
    <>
      <Seo title={pageSeo.products.title} description={pageSeo.products.description} path="/products/" schema={[breadcrumbSchema(crumbs), itemList]} />
      <PageHero crumbs={crumbs} short eyebrow="Products & Eco Catalogue" title="Small swaps that carry a big message"
        intro="Everyday eco products, educational material, corporate kits and field equipment for forest and wildlife management — at one stop. Choose an item and enquire; we reply with availability and a quote."
        image="/images/forest/native-sapling-with-stake-drip-line" imageAlt="A native sapling with a stake beside a drip line" />

      <section className="section section--light" style={{ paddingTop: 60 }}>
        <div className="container">
          <div className="catalogue-tools">
            <div className="filter-bar" style={{ margin: 0 }} role="group" aria-label="Filter by category">
              <button aria-pressed={cat === "all"} onClick={() => choose("all")}>All ({products.length})</button>
              {categories.map((c) => (
                <button key={c.id} aria-pressed={cat === c.id} onClick={() => choose(c.id)}>
                  {c.name} ({products.filter((p) => p.category === c.id).length})
                </button>
              ))}
            </div>
            <div className="search-box">
              <IconSearch />
              <label htmlFor="product-search" className="sr-only">Search products</label>
              <input id="product-search" type="search" placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
          </div>

          {current && <Reveal as="p" className="muted" key={current.id} style={{ maxWidth: "70ch", marginBottom: 28 }}>{current.text}</Reveal>}

          <p className="sr-only" aria-live="polite">{list.length} products shown</p>
          {list.length ? (
            <div className="product-grid">
              {list.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          ) : (
            <div className="empty-state">
              <p>No products match “{q}”.</p>
              <a className="btn btn--dark" href={whatsappLink(`Hello EcoTree Logics, do you supply ${q}?`)} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp</a>
            </div>
          )}
          <p className="note" style={{ marginTop: 40 }}>This is an enquiry catalogue. Prices, availability and specifications are shared on enquiry. Product photographs are being added.</p>
        </div>
      </section>
      <CtaBand title="Need a custom kit for an event or CSR drive?" text="Tell us the occasion, quantity and date. We will put together eco products, educational material and learning-and-play items to suit." />
    </>
  );
}
