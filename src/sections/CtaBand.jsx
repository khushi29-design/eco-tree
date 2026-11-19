/**
 * CtaBand.jsx — the immersive forest ending: sunset over the plantation, drifting fireflies
 * (a light 2D canvas, paused off-screen) and the closing invitation from the presentation.
 */
import { useEffect, useRef } from "react";
import Link from "next/link";
import { closingCta } from "@/data/company";
import { whatsappLink } from "@/utils/links";
import { SplitWords, Reveal } from "@/components/Reveal";
import { prefersReducedMotion } from "@/animations/useReveal";
import { asset, assetSrcSet } from "@/utils/asset";

function Fireflies() {
  const ref = useRef(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const c = ref.current, ctx = c.getContext("2d");
    let raf = 0, on = false;
    const N = window.innerWidth < 700 ? 28 : 60;
    const flies = Array.from({ length: N }, () => ({ x: Math.random(), y: 0.35 + Math.random() * 0.65, r: 1 + Math.random() * 2.2, s: Math.random() * 6.28, v: 0.0004 + Math.random() * 0.0008 }));
    const size = () => { c.width = c.clientWidth * Math.min(devicePixelRatio, 2); c.height = c.clientHeight * Math.min(devicePixelRatio, 2); };
    size();
    window.addEventListener("resize", size);
    const draw = (t) => {
      ctx.clearRect(0, 0, c.width, c.height);
      flies.forEach((f) => {
        f.x += Math.sin(t / 2000 + f.s) * f.v; f.y += Math.cos(t / 2600 + f.s) * f.v * 0.7;
        const a = 0.35 + 0.65 * Math.max(0, Math.sin(t / 700 + f.s * 3));
        const x = f.x * c.width, y = f.y * c.height, r = f.r * devicePixelRatio;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
        g.addColorStop(0, `rgba(255,232,150,${a})`); g.addColorStop(1, "rgba(255,232,150,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 6, 0, 6.283); ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !on) { on = true; raf = requestAnimationFrame(draw); }
      else if (!e.isIntersecting && on) { on = false; cancelAnimationFrame(raf); }
    });
    io.observe(c);
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener("resize", size); };
  }, []);
  return <canvas ref={ref} className="fireflies" aria-hidden="true" />;
}

export default function CtaBand({ title = closingCta.title, text = closingCta.text }) {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="cta-band__bg">
        <img src={asset("/images/forest/sunset-over-restored-plantation-nagpur.webp")} srcSet={assetSrcSet("/images/forest/sunset-over-restored-plantation-nagpur-sm.webp 800w, /images/forest/sunset-over-restored-plantation-nagpur.webp 1920w")} sizes="100vw" alt="" loading="lazy" />
      </div>
      <Fireflies />
      <div className="container">
        <SplitWords as="h2" id="cta-title" text={title} />
        <Reveal as="p" delay={0.2}>{text}</Reveal>
        <Reveal className="btn-row" delay={0.35}>
          <Link className="btn btn--gold" href="/contact/">Start with one site <span className="arrow">→</span></Link>
          <a className="btn btn--ghost" href={whatsappLink("Hello EcoTree Logics, I would like to discuss a site.")} target="_blank" rel="noopener noreferrer">WhatsApp the team</a>
        </Reveal>
      </div>
    </section>
  );
}
