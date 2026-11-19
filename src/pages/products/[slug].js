/** Product detail page — one template for every product in src/data/products.js. */
import { useState } from "react";
import Link from "next/link";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryForm from "@/components/EnquiryForm";
import ProductCard, { ProductImage } from "@/components/ProductCard";
import { products, getProduct, getCategory } from "@/data/products";
import { breadcrumbSchema, productSchema } from "@/utils/schema";
import { whatsappLink } from "@/utils/links";
import { asset } from "@/utils/asset";

export default function ProductPage({ slug }) {
  const p = getProduct(slug);
  const cat = getCategory(p.category);
  const [shot, setShot] = useState(0);
  const path = `/products/${p.slug}/`;
  const crumbs = [{ label: "Home", href: "/" }, { label: "Products", href: "/products/" }, { label: cat.name, href: `/products/?category=${cat.id}` }, { label: p.name, href: path }];
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  const images = [p.image, ...(p.gallery || [])].filter(Boolean);

  return (
    <>
      <Seo title={`${p.name} | ${cat.name} — EcoTree Logics`} description={`${p.summary} Enquire with EcoTree Logics, Maharashtra.`.slice(0, 158)} path={path}
        image={p.image || undefined} schema={[breadcrumbSchema(crumbs), productSchema(p, cat.name)]} />

      <section className="section section--light" style={{ paddingTop: "calc(var(--header-h) + 50px)" }}>
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <div className="split" style={{ alignItems: "start" }}>
            <div>
              <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
                {images.length ? (
                  <div className="product-img"><img src={asset(images[shot])} alt={`${p.name} — image ${shot + 1}`} /></div>
                ) : <ProductImage product={p} eager />}
              </div>
              {images.length > 1 && (
                <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                  {images.map((src, i) => (
                    <button key={src} onClick={() => setShot(i)} aria-label={`Show image ${i + 1}`} aria-pressed={shot === i}
                      style={{ width: 72, height: 72, padding: 0, borderRadius: 10, overflow: "hidden", border: shot === i ? "2px solid var(--emerald)" : "1px solid #ccc" }}>
                      <img src={asset(src)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <p className="eyebrow">{cat.name}</p>
              <h1 style={{ fontSize: "clamp(2.2rem, 4.4vw, 3.6rem)" }}>{p.name}</h1>
              <p className="lead">{p.summary}</p>
              {p.uses.length > 0 && (
                <>
                  <h2 style={{ fontSize: "1.2rem", marginTop: 30 }}>Useful for</h2>
                  <ul className="pill-list">{p.uses.map((u) => <li key={u}>{u}</li>)}</ul>
                </>
              )}
              {p.specs.length > 0 && (
                <>
                  <h2 style={{ fontSize: "1.2rem", marginTop: 30 }}>Specifications</h2>
                  <table className="spec-table"><tbody>{p.specs.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody></table>
                  {p.specsNote && <p className="note" style={{ marginTop: 10 }}>{p.specsNote}</p>}
                </>
              )}
              <div className="btn-row" style={{ marginTop: 34 }}>
                <a className="btn btn--dark" href="#enquire">Enquire about this product <span className="arrow">→</span></a>
                <a className="btn btn--whatsapp" href={whatsappLink(`Hello EcoTree Logics, I would like a quote for: ${p.name}.`)} target="_blank" rel="noopener noreferrer">WhatsApp enquiry</a>
              </div>
              <p className="note" style={{ marginTop: 16 }}>Price, availability and customisation are shared on enquiry.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--paper" id="enquire">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <p className="eyebrow">Product enquiry</p>
            <h2>Ask about {p.name.toLowerCase()}</h2>
            <p className="muted">Tell us the quantity, delivery location and any customisation you need.</p>
          </div>
          <EnquiryForm type="product" preset={p.name} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--light">
          <div className="container">
            <h2 style={{ fontSize: "var(--fs-h3)", marginBottom: 24 }}>More in {cat.name}</h2>
            <div className="product-grid">{related.map((r) => <ProductCard key={r.slug} product={r} />)}</div>
            <p style={{ marginTop: 26 }}><Link className="text-link" href="/products/">← Back to the full catalogue</Link></p>
          </div>
        </section>
      )}
    </>
  );
}

export function getStaticPaths() {
  return { paths: products.map((p) => ({ params: { slug: p.slug } })), fallback: false };
}
export function getStaticProps({ params }) {
  return { props: { slug: params.slug } };
}
