/**
 * VideoPlayer.jsx — lightweight video: shows only the poster image until the visitor presses play
 * (nothing heavy is downloaded before that). Supports local files in /public/videos or YouTube IDs.
 */
import { useRef, useState } from "react";
import { asset } from "@/utils/asset";

export default function VideoPlayer({ file, youtube, title, caption, duration }) {
  const [playing, setPlaying] = useState(false);
  const vid = useRef(null);

  const start = () => {
    setPlaying(true);
    requestAnimationFrame(() => vid.current?.play().catch(() => {}));
  };

  return (
    <figure style={{ margin: 0 }}>
      <div className="video-card">
        {youtube ? (
          playing ? (
            <iframe
              style={{ width: "100%", aspectRatio: "16/9", border: 0, display: "block" }}
              src={`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0`}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img src={`https://i.ytimg.com/vi/${youtube}/hqdefault.jpg`} alt="" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }} loading="lazy" />
          )
        ) : (
          <video
            ref={vid}
            src={playing ? asset(`/videos/${file}.mp4`) : undefined}
            poster={asset(`/videos/${file}-poster.jpg`)}
            controls={playing}
            playsInline
            muted
            preload="none"
            aria-label={title}
          />
        )}
        {!playing && (
          <button className="play" onClick={start} aria-label={`Play video: ${title}`}>
            <span aria-hidden="true">▶</span>
          </button>
        )}
      </div>
      {(title || caption) && (
        <figcaption className="video-meta">
          {title && <h3>{title}{duration && <span className="muted small" style={{ fontFamily: "var(--font-body)", marginLeft: 10 }}>{duration}</span>}</h3>}
          {caption && <p className="muted small" style={{ margin: 0 }}>{caption}</p>}
        </figcaption>
      )}
    </figure>
  );
}
