/**
 * useFrameSequence.js — the Scroll Site Generator's frame scrubber (ported to plain JavaScript).
 *
 * Loads a WebP frame sequence from /public/frames/<name>/ and gives you draw(canvas, progress),
 * where progress 0 → 1 picks the frame. This is how scroll "plays" the drone film.
 *
 * - Frames are only downloaded when the section comes near the screen (lazy).
 * - Compressed frames stay in memory (small); decoded frames live in a sliding window
 *   around the playhead so memory stays low and scrubbing stays smooth.
 * - Decoding falls back from createImageBitmap to <img> (needed in some browsers/webviews).
 * - fit: "cover" fills the screen (best for real footage); "contain" shows the whole frame.
 */
import { useCallback, useEffect, useRef, useState } from "react";

async function decodeBlob(blob) {
  try {
    return { kind: "bitmap", img: await createImageBitmap(blob) };
  } catch {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.decoding = "async";
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
    return { kind: "element", img, url };
  }
}
function release(f) { f.kind === "bitmap" ? f.img.close() : URL.revokeObjectURL(f.url); }

export function useFrameSequence(name, { fit = "cover", enabled = true } = {}) {
  const blobs = useRef([]);
  const frames = useRef(new Map());
  const decoding = useRef(new Set());
  const count = useRef(0);
  const last = useRef({ canvas: null, progress: 0 });
  const [loaded, setLoaded] = useState(0); // 0 → 1 loading progress
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    (async () => {
      try {
        const m = await fetch(`/frames/${name}/manifest.json`).then((r) => { if (!r.ok) throw new Error("manifest"); return r.json(); });
        if (!alive) return;
        count.current = m.count;
        blobs.current = new Array(m.count).fill(null);
        const url = (i) => m.pattern.replace("%03d", String(i + 1).padStart(3, "0"));
        let done = 0;
        // load in order of importance: every 8th frame first (so scrubbing works early), then the rest
        const order = [...Array(m.count).keys()].sort((a, b) => (a % 8 === 0 ? 0 : 1) - (b % 8 === 0 ? 0 : 1) || a - b);
        const queue = order.slice();
        const worker = async () => {
          while (alive && queue.length) {
            const i = queue.shift();
            try { blobs.current[i] = await fetch(url(i)).then((r) => r.blob()); } catch { /* skipped frame: nearest one is shown */ }
            done++;
            if (done % 6 === 0 || done === m.count) setLoaded(done / m.count);
            if (i === 0 && blobs.current[0]) {
              const f = await decodeBlob(blobs.current[0]).catch(() => null);
              if (f && alive) { frames.current.set(0, f); setReady(true); redraw(); }
            }
          }
        };
        await Promise.all([worker(), worker(), worker(), worker()]);
      } catch {
        if (alive) setError(true);
      }
    })();
    return () => {
      alive = false;
      frames.current.forEach(release);
      frames.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, enabled]);

  const decode = (i) => {
    if (frames.current.has(i) || decoding.current.has(i) || !blobs.current[i]) return;
    decoding.current.add(i);
    decodeBlob(blobs.current[i])
      .then((f) => { frames.current.set(i, f); if (Math.abs(i - currentIndex()) < 2) redraw(); })
      .catch(() => {})
      .finally(() => decoding.current.delete(i));
  };
  const currentIndex = () => Math.round(last.current.progress * Math.max(0, count.current - 1));

  const manageWindow = (c) => {
    for (let d = 0; d <= 12; d++) { if (c + d < count.current) decode(c + d); if (c - d >= 0) decode(c - d); }
    if (frames.current.size > 60) {
      for (const [idx, f] of frames.current) if (Math.abs(idx - c) > 30) { release(f); frames.current.delete(idx); }
    }
  };
  const nearest = (i) => {
    if (frames.current.has(i)) return frames.current.get(i);
    for (let d = 1; d < count.current; d++) {
      if (frames.current.has(i - d)) return frames.current.get(i - d);
      if (frames.current.has(i + d)) return frames.current.get(i + d);
    }
    return null;
  };

  const draw = useCallback((canvas, progress) => {
    if (!canvas) return;
    last.current = { canvas, progress: Math.min(1, Math.max(0, progress)) };
    if (!count.current) return;
    const i = currentIndex();
    manageWindow(i);
    const f = nearest(i);
    if (!f) return;
    const src = f.img;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = Math.round(canvas.clientWidth * dpr), ch = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; }
    const ctx = canvas.getContext("2d");
    const sc = fit === "cover" ? Math.max(cw / src.width, ch / src.height) : Math.min(cw / src.width, ch / src.height);
    const w = src.width * sc, h = src.height * sc;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(src, (cw - w) / 2, (ch - h) / 2, w, h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fit]);

  const redraw = () => last.current.canvas && draw(last.current.canvas, last.current.progress);

  return { ready, loaded, error, draw };
}
