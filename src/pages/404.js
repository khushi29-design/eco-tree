/** 404 — page not found (Hostinger serves this via .htaccess for any unknown address). */
import Link from "next/link";
import Seo from "@/components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | EcoTree Logics" description="This page could not be found." path="/404/" noindex />
      <section className="section" style={{ minHeight: "80vh", display: "grid", placeItems: "center", paddingTop: "calc(var(--header-h) + 60px)" }}>
        <div className="container center" style={{ textAlign: "center" }}>
          <p className="eyebrow">Error 404</p>
          <h1>This trail doesn&apos;t lead anywhere.</h1>
          <p className="lead muted center">The page may have moved. Let&apos;s get you back on the path.</p>
          <div className="btn-row" style={{ justifyContent: "center", marginTop: 30 }}>
            <Link className="btn btn--gold" href="/">Back to home</Link>
            <Link className="btn btn--ghost" href="/capabilities/">Our capabilities</Link>
            <Link className="btn btn--ghost" href="/contact/">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
