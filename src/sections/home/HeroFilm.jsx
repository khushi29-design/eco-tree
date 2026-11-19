/**
 * HeroFilm.jsx — homepage opening: the EcoTree Logics brand film, full screen, nothing laid over it.
 *
 * Motion
 *  - Opening: the film starts as a rounded inset window and expands to full screen.
 *  - Scroll: the film recedes into a rounded card as the next section approaches (desktop).
 *  - Minimal controls fade in afterwards: film progress line, pause/play, scroll cue.
 *
 * Framing
 *  - Landscape screens: the film covers the screen (object-fit: cover).
 *  - Portrait phones/tablets: the whole film is shown (contain) over a blurred, full-screen glow of
 *    itself, so its own captions are never cut off.
 *
 * The page's H1 stays in the markup for SEO and screen readers (visually hidden).
 * Video: muted, looping, playsInline, started from JS so reduced-motion / data-saver visitors get the
 * still poster. First play starts at the poster frame (POSTER_TIME) so there is no jump.
 * Files: public/videos/homepage-hero-1080.mp4 (desktop), -540.mp4 (phones), -poster(-sm).webp.
 */
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { company } from "@/data/company";
import { prefersReducedMotion } from "@/animations/useReveal";
import { asset, assetSrcSet } from "@/utils/asset";

const POSTER_TIME = 1.2; // seconds into the film where the poster frame was taken

export default function HeroFilm() {
  const root = useRef(null);
  const video = useRef(null);
  const progress = useRef(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [still, setStill] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const v = video.current;
    const reduce = prefersReducedMotion();
    const saveData = typeof navigator !== "undefined" && navigator.connection?.saveData;
    setStill(reduce || !!saveData);
    if (!v || reduce || saveData) return;

    let first = true;
    const play = () => {
      if (userPaused.current) return;
      if (first && v.readyState >= 1) { try { v.currentTime = POSTER_TIME; } catch {} first = false; }
      v.play().catch(() => { /* autoplay refused (e.g. low-power mode): the poster stays */ });
    };
    const onPlaying = () => setPlaying(true);
    const onMeta = () => { if (first) play(); };
    const onTime = () => {
      if (progress.current && v.duration) progress.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
    };
    v.addEventListener("playing", onPlaying);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("timeupdate", onTime);
    v.preload = "auto";
    if (v.readyState >= 1) play(); else v.load();

    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) play(); else v.pause(); }, { threshold: 0.05 });
    io.observe(root.current);
    return () => {
      io.disconnect();
      v.removeEventListener("playing", onPlaying); v.removeEventListener("loadedmetadata", onMeta); v.removeEventListener("timeupdate", onTime);
    };
  }, []);

  // scroll: the film recedes into a rounded card (landscape screens only)
  useEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(orientation: landscape) and (min-width: 761px)", () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 } });
      tl.to(".hero-film__window", { clipPath: "inset(7% 5% 7% 5% round 28px)", ease: "none" }, 0)
        .to(".hero-film__media", { scale: 0.94, ease: "none" }, 0)
        .to(".hero-film__ui, .scroll-cue", { opacity: 0, ease: "none", duration: 0.3 }, 0);
    });
    return () => mm.revert();
  }, []);

  const togglePlay = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) { userPaused.current = false; setIsPaused(false); v.play().catch(() => {}); }
    else { userPaused.current = true; setIsPaused(true); v.pause(); }
  };

  return (
    <section ref={root} className={`hero-film${playing ? " is-playing" : ""}`} aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">{company.shortName}: {company.hero.titleLines.join(" ")}</h1>

      <div className="hero-film__stage">
        {/* blurred glow of the film: fills the edges on portrait screens and behind the receding card */}
        <img className="hero-film__ambient" src={asset("/videos/homepage-hero-poster-sm.webp")} alt="" aria-hidden="true" decoding="async" />

        <div className="hero-film__window">
          <div className="hero-film__media">
            <img className="hero-film__poster" alt="EcoTree Logics brand film: aerial view of a restoration site" fetchPriority="high" decoding="async"
              src={asset("/videos/homepage-hero-poster.webp")}
              srcSet={assetSrcSet("/videos/homepage-hero-poster-sm.webp 960w, /videos/homepage-hero-poster.webp 1920w")}
              sizes="100vw" />
            <video ref={video} className="hero-film__video" muted loop playsInline preload="none"
              disablePictureInPicture disableRemotePlayback tabIndex={-1} aria-hidden="true">
              <source src={asset("/videos/homepage-hero-1080.mp4")} type="video/mp4" media="(min-width: 761px)" />
              <source src={asset("/videos/homepage-hero-540.mp4")} type="video/mp4" />
            </video>
          </div>
          <div className="hero-film__fade" aria-hidden="true" />
        </div>

        {!still && (
          <div className="hero-film__ui container">
            <span className="hero-film__label">{company.shortName} <i>·</i> Brand film</span>
            <span className="hero-film__progress" aria-hidden="true"><span ref={progress} /></span>
            <button type="button" className="hero-film__toggle" onClick={togglePlay} aria-label={isPaused ? "Play brand film" : "Pause brand film"}>
              {isPaused
                ? <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5v9l7.5-4.5z" fill="currentColor" /></svg>
                : <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5h2v9H3zM7 1.5h2v9H7z" fill="currentColor" /></svg>}
            </button>
          </div>
        )}

        <div className="scroll-cue" aria-hidden="true"><span className="scroll-cue__line" />Scroll</div>
      </div>
    </section>
  );
}
