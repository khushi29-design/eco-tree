/**
 * Reveal.jsx — animation building blocks.
 *   <Reveal>            fades + lifts its children in when scrolled into view
 *   <SplitWords text>   word-by-word heading reveal
 *   <SplitChars text>   character-by-character reveal (use for short, special headings)
 */
import { createElement } from "react";
import { useReveal } from "@/animations/useReveal";

export function Reveal({ as = "div", className = "", delay = 0, variant = "", children, ...rest }) {
  const ref = useReveal();
  return createElement(
    as,
    { ref, className: `reveal ${variant ? `reveal--${variant}` : ""} ${className}`.trim(), style: { "--delay": `${delay}s` }, ...rest },
    children
  );
}

export function SplitWords({ as = "h2", text, className = "", ...rest }) {
  const ref = useReveal();
  const lines = Array.isArray(text) ? text : [text];
  let i = 0;
  return createElement(
    as,
    { ref, className: `split-words ${className}`, "aria-label": lines.join(" "), ...rest },
    lines.map((line, li) => (
      <span key={li} style={{ display: "block" }} aria-hidden="true">
        {line.split(" ").map((word, wi) => (
          <span className="w" key={wi}>
            <span style={{ "--i": i++ }}>{word}</span>
            {" "}
          </span>
        ))}
      </span>
    ))
  );
}

export function SplitChars({ as = "span", text, className = "", ...rest }) {
  const ref = useReveal();
  let i = 0;
  // each word is kept together (nowrap) so lines only break between words
  return createElement(
    as,
    { ref, className: `split-chars ${className}`, "aria-label": text, ...rest },
    text.split(" ").map((word, wi, arr) => (
      <span key={wi} aria-hidden="true">
        <span style={{ whiteSpace: "nowrap", display: "inline-block" }}>
          {[...word].map((ch) => (
            <span className="c" key={i} style={{ "--i": i++ }}>{ch}</span>
          ))}
        </span>
        {wi < arr.length - 1 ? " " : ""}
      </span>
    ))
  );
}
