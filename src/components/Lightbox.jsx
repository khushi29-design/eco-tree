/**
 * Lightbox.jsx — full-screen image viewer with captions.
 * Keyboard: ← → to move, Esc to close. Swipe left/right on phones.
 */
import { useEffect, useRef } from "react";

export default function Lightbox({ items, index, onClose, onIndex }) {
  const closeBtn = useRef(null);
  const touchX = useRef(null);
  const item = items[index];

  useEffect(() => {
    const prevFocus = document.activeElement;
    closeBtn.current?.focus();
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.__lenis?.start();
      prevFocus?.focus?.();
    };
  }, [index, items.length, onClose, onIndex]);

  if (!item) return null;
  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) onIndex((index + (dx < 0 ? 1 : -1) + items.length) % items.length);
        touchX.current = null;
      }}
    >
      <figure key={item.src}>
        <img src={`${item.src}.webp`} alt={item.alt} />
      </figure>
      <figcaption>
        {item.caption} <span className="muted small">({index + 1} / {items.length})</span>
      </figcaption>
      <button ref={closeBtn} className="lb-btn lb-close" onClick={onClose} aria-label="Close viewer">✕</button>
      <button className="lb-btn lb-prev" onClick={() => onIndex((index - 1 + items.length) % items.length)} aria-label="Previous image">←</button>
      <button className="lb-btn lb-next" onClick={() => onIndex((index + 1) % items.length)} aria-label="Next image">→</button>
    </div>
  );
}
