/**
 * EcoBot.jsx — the floating chat window ("EcoBot — Your Nature Guide").
 * Interface only: answers come from engine.js, which reads knowledge.js.
 * The conversation is kept for the current browser tab only (sessionStorage), nothing is sent anywhere.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { answer } from "./engine";
import { greeting, suggestions } from "./knowledge";
import { whatsappLink } from "@/utils/links";
import { IconSend, IconWhatsApp } from "@/components/Icons";
import { asset } from "@/utils/asset";

const STORE = "ecobot-log-v1";

export default function EcoBot() {
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState([{ from: "bot", text: greeting }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const logRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    try { const saved = JSON.parse(sessionStorage.getItem(STORE) || "null"); if (Array.isArray(saved) && saved.length) setLog(saved); } catch {}
  }, []);
  useEffect(() => { try { sessionStorage.setItem(STORE, JSON.stringify(log.slice(-40))); } catch {} }, [log]);
  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" }); }, [log, typing]);
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = (text) => {
    const q = text.trim();
    if (!q || typing) return;
    setLog((l) => [...l, { from: "user", text: q }]);
    setInput("");
    setTyping(true);
    const reply = answer(q);
    setTimeout(() => { setLog((l) => [...l, { from: "bot", ...reply }]); setTyping(false); }, 450 + Math.min(900, reply.text.length * 2));
  };

  if (!open) {
    return (
      <button className="ecobot-launcher" onClick={() => setOpen(true)} aria-label="Open EcoBot, your nature guide">
        <span className="avatar"><img src={asset("/images/logo/ecotree-logics-mark-dark.png")} alt="" width="30" height="17" /></span>
        <span className="pulse" />
        EcoBot
      </button>
    );
  }

  return (
    <div className="ecobot-panel" role="dialog" aria-modal="false" aria-label="EcoBot — Your Nature Guide" data-lenis-prevent>
      <div className="ecobot-head">
        <span className="avatar"><img src={asset("/images/logo/ecotree-logics-mark-dark.png")} alt="" width="30" height="17" /></span>
        <div>
          <strong>EcoBot — Your Nature Guide</strong>
          <small>Answers from the EcoTree Logics website</small>
        </div>
        <button className="close" onClick={() => setOpen(false)} aria-label="Close EcoBot">✕</button>
      </div>

      <div className="ecobot-log" ref={logRef} aria-live="polite">
        {log.map((m, i) => (
          <div key={i} className={`msg msg--${m.from}`}>
            {m.text}
            {m.links?.length > 0 && (
              <div className="msg-links">
                {m.links.map((l) => <Link key={l.href + l.label} href={l.href} onClick={() => window.innerWidth < 520 && setOpen(false)}>{l.label} →</Link>)}
                {m.unknown && <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp →</a>}
              </div>
            )}
          </div>
        ))}
        {typing && <div className="msg msg--bot" aria-label="EcoBot is typing"><span className="typing"><i /><i /><i /></span></div>}
      </div>

      {log.length <= 2 && (
        <div className="ecobot-suggest">
          {suggestions.map((s) => <button key={s} onClick={() => ask(s)}>{s}</button>)}
        </div>
      )}

      <form className="ecobot-form" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
        <label htmlFor="ecobot-input" className="sr-only">Ask EcoBot a question</label>
        <input id="ecobot-input" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about services, projects, products…" maxLength={300} autoComplete="off" />
        <button type="submit" aria-label="Send question"><IconSend width="20" /></button>
      </form>
      <div className="ecobot-foot">
        EcoBot answers only about EcoTree Logics. For anything else, <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><IconWhatsApp width="11" style={{ display: "inline", verticalAlign: "-1px" }} /> WhatsApp the team</a>.
      </div>
    </div>
  );
}
