/** ProductCard.jsx + ProductImage — product tile; shows a clearly-labelled placeholder until a real photo is added. */
import Link from "next/link";
import { getCategory } from "@/data/products";
import { IconSprout } from "./Icons";

export function ProductImage({ product, eager = false }) {
  return (
    <div className="product-img">
      {product.image ? (
        <img src={product.image} alt={product.imageAlt || product.name} loading={eager ? "eager" : "lazy"} width="800" height="800" />
      ) : (
        <div className="placeholder-art" role="img" aria-label={`${product.name} — photo coming soon`}>
          <IconSprout />
          <small>Photo coming soon</small>
        </div>
      )}
    </div>
  );
}

export default function ProductCard({ product }) {
  return (
    <Link className="product-card" href={`/products/${product.slug}/`}>
      <ProductImage product={product} />
      <div className="body">
        <span className="cat">{getCategory(product.category)?.name}</span>
        <h3>{product.name}</h3>
        <p>{product.summary}</p>
        <span className="more">View &amp; enquire →</span>
      </div>
    </Link>
  );
}
