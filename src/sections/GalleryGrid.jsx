/** GalleryGrid.jsx — masonry photo grid with optional category filter and a full-screen lightbox. */
import { useCallback, useMemo, useState } from "react";
import Lightbox from "@/components/Lightbox";

export default function GalleryGrid({ items, categories }) {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(-1);
  const shown = useMemo(() => (cat === "All" ? items : items.filter((i) => i.category === cat)), [items, cat]);
  const close = useCallback(() => setOpen(-1), []);

  return (
    <>
      {categories && (
        <div className="filter-bar" role="group" aria-label="Filter photos">
          {categories.filter((c) => c === "All" || items.some((i) => i.category === c)).map((c) => (
            <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
      )}
      <div className="masonry">
        {shown.map((it, i) => (
          <figure key={it.src}>
            <button onClick={() => setOpen(i)} aria-label={`Open photo: ${it.caption}`}>
              <img src={`${it.src}-sm.webp`} alt={it.alt} width={it.w} height={it.h} loading="lazy" decoding="async" />
            </button>
            <figcaption>{it.caption}</figcaption>
          </figure>
        ))}
      </div>
      {open >= 0 && <Lightbox items={shown} index={open} onClose={close} onIndex={setOpen} />}
    </>
  );
}
