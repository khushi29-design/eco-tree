/**
 * SmoothScroll.jsx — Lenis smooth scrolling wired into GSAP's ticker
 * (from the Scroll Site Generator). Lenis and ScrollTrigger share one clock,
 * which keeps scroll-scrubbed animations perfectly in sync.
 * Turned off automatically for visitors who prefer reduced motion and on touch devices
 * (native touch scrolling already feels right there).
 */
import { useEffect } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import { prefersReducedMotion } from "./useReveal";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); window.__lenis = null; };
  }, []);

  // jump to top on page change, then let ScrollTrigger re-measure the new page
  useEffect(() => {
    const onDone = () => {
      window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    router.events.on("routeChangeComplete", onDone);
    return () => router.events.off("routeChangeComplete", onDone);
  }, [router.events]);

  return children;
}
