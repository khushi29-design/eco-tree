/**
 * Header.jsx — sticky premium navigation.
 * - transparent over the homepage film, frosted glass once you scroll
 * - hides while scrolling down, returns when scrolling up
 * - full-screen menu on phones and tablets, keyboard accessible dropdowns
 */
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { mainNav } from "@/data/navigation";

export default function Header() {
  const router = useRouter();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 300 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus whenever the page changes
  useEffect(() => { setMenuOpen(false); setOpenDrop(null); }, [router.asPath]);
  useEffect(() => { document.documentElement.classList.toggle("menu-open", menuOpen); }, [menuOpen]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setMenuOpen(false); setOpenDrop(null); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // pages that start on a light background need a solid header from the top
  const lightTop = ["/products/[slug]", "/404"].includes(router.pathname);
  const isCurrent = (href) => (href === "/" ? router.pathname === "/" : router.asPath.startsWith(href));

  return (
    <header className={`site-header ${solid || menuOpen || lightTop ? "is-solid" : ""} ${hidden && !menuOpen ? "is-hidden" : ""}`}>
      <div className="container">
        <Link href="/" className="brand" aria-label="EcoTree Logics — home">
          <img src="/images/logo/ecotree-logics-mark-light.png" alt="" width="78" height="44" />
          <span className="brand-text"><strong>EcoTree Logics</strong><span>Private Limited</span></span>
        </Link>

        <nav className="main-nav" id="main-nav" aria-label="Main">
          <ul>
            {mainNav.map((item) =>
              item.children ? (
                <li key={item.href} className={`has-dropdown ${openDrop === item.href ? "is-open" : ""}`}>
                  <button
                    className="nav-link"
                    aria-expanded={openDrop === item.href}
                    aria-controls={`drop-${item.label}`}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    onClick={() => setOpenDrop(openDrop === item.href ? null : item.href)}
                  >
                    {item.label} <span aria-hidden="true">▾</span>
                  </button>
                  <div className="nav-dropdown" id={`drop-${item.label}`}>
                    {item.label === "Capabilities" && (
                      <Link href="/capabilities/"><span className="letter">✦</span>All capabilities</Link>
                    )}
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href}>
                        {c.letter && <span className="letter">{c.letter}</span>}
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link className="nav-link" href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              )
            )}
            <li className="mobile-only">
              <Link className="nav-link" href="/contact/">Contact Us</Link>
            </li>
          </ul>
        </nav>

        <div className="header-cta">
          <Link href="/contact/" className="btn btn--gold btn--sm">Start with one site <span className="arrow">→</span></Link>
          <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen((v) => !v)}>
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
