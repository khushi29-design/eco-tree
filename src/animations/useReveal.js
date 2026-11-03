/**
 * useReveal.js — adds the class "is-in" to an element when it scrolls into view.
 * Paired with the .reveal / .split-words / .split-chars / .clip-reveal classes in globals.css.
 * Uses IntersectionObserver (cheap, no animation library needed).
 */
import { useEffect, useRef } from "react";

export function useReveal({ threshold = 0.18, once = true } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { el.classList.add("is-in"); return; }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          if (once) io.disconnect();
        } else if (!once) {
          el.classList.remove("is-in");
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  return ref;
}

/** true when the visitor has asked their device for less motion */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
