/** Breadcrumbs.jsx — visible breadcrumb trail (its matching JSON-LD is added by each page via Seo). */
import Link from "next/link";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={it.href}>
            {i === items.length - 1 ? <span aria-current="page">{it.label}</span> : <Link href={it.href}>{it.label}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
