/**
 * EnquiryForm.jsx — one form component for all four enquiry types:
 *   general · service · product · project
 *
 * Sending:
 *   NEXT_PUBLIC_FORM_PROVIDER=php       → POST to /api/contact.php (public/api/contact.php on Hostinger)
 *   NEXT_PUBLIC_FORM_PROVIDER=web3forms → POST to api.web3forms.com with NEXT_PUBLIC_WEB3FORMS_KEY
 *
 * Honesty rule: the success message appears ONLY when the server confirms the email was sent.
 * Otherwise the visitor sees an error and direct email / WhatsApp alternatives.
 * Spam protection: hidden honeypot field + minimum fill time (checked again on the server).
 */
import { useEffect, useRef, useState } from "react";
import { capabilities } from "@/data/capabilities";
import { products } from "@/data/products";
import { projects } from "@/data/projects";
import { company } from "@/data/company";
import { whatsappLink, mailLink } from "@/utils/links";
import { asset } from "@/utils/asset";

const PROVIDER = process.env.NEXT_PUBLIC_FORM_PROVIDER || "php";
const W3F_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

export const ENQUIRY_TYPES = [
  { id: "general", label: "General enquiry" },
  { id: "service", label: "Service enquiry" },
  { id: "product", label: "Product enquiry" },
  { id: "project", label: "Project enquiry" },
];

const ORG_TYPES = [
  "Forest / biodiversity department", "Government / urban local body", "Corporate (CSR / ESG / HR)", "Industry / infrastructure",
  "School / college / university", "Environmental NGO", "Landowner / campus", "Individual / family", "Other",
];

function validate(v, type) {
  const e = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.phone && !/^[+\d][\d\s-]{6,17}$/.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (type === "service" && !v.subject) e.subject = "Please choose a service.";
  if (type === "product" && !v.subject) e.subject = "Please choose a product.";
  if (!v.message.trim() || v.message.trim().length < 10) e.message = "Please tell us a little more (at least 10 characters).";
  if (!v.consent) e.consent = "Please confirm so we can reply to you.";
  return e;
}

export default function EnquiryForm({ type: initialType = "general", preset = "", showTypeTabs = false }) {
  const [type, setType] = useState(initialType);
  const empty = { name: "", email: "", phone: "", organisation: "", orgType: "", subject: preset, location: "", message: "", consent: false, website: "" };
  const [v, setV] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", msg: "" });
  const startedAt = useRef(Date.now());
  const statusRef = useRef(null);

  useEffect(() => { setType(initialType); }, [initialType]);
  useEffect(() => { setV((x) => ({ ...x, subject: preset })); }, [preset]);

  const set = (k) => (e) => setV((x) => ({ ...x, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    const errs = validate(v, type);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus({ state: "sending", msg: "Sending…" });
    const payload = { ...v, enquiryType: ENQUIRY_TYPES.find((t) => t.id === type)?.label, page: window.location.pathname, elapsed: Date.now() - startedAt.current };

    try {
      let ok = false, message = "";
      if (PROVIDER === "web3forms") {
        if (!W3F_KEY) throw new Error("Form is not configured yet (missing Web3Forms key).");
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ access_key: W3F_KEY, subject: `Website: ${payload.enquiryType}`, from_name: "EcoTree Logics website", botcheck: v.website, ...payload }),
        });
        const data = await res.json().catch(() => ({}));
        ok = res.ok && data.success === true;
        message = data.message || "";
      } else {
        const res = await fetch(asset("/api/contact.php"), {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        ok = res.ok && data.ok === true;
        message = data.error || "";
      }
      if (!ok) throw new Error(message || "The server did not confirm the message.");
      setStatus({ state: "success", msg: "Thank you — your enquiry has been sent. The EcoTree Logics team will reply by email or phone." });
      setV(empty);
      startedAt.current = Date.now();
    } catch (err) {
      setStatus({ state: "error", msg: `Sorry, your message could not be sent (${err.message}). Please email or WhatsApp us directly — the links are below.` });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const field = (k, label, props = {}, required = false) => (
    <div className="field">
      <label htmlFor={`f-${k}`}>{label} {required && <span className="req" aria-hidden="true">*</span>}</label>
      <input id={`f-${k}`} name={k} value={v[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined} required={required} {...props} />
      {errors[k] && <span className="error" id={`e-${k}`}>{errors[k]}</span>}
    </div>
  );

  return (
    <div className="form-card">
      {showTypeTabs && (
        <div className="form-tabs" role="tablist" aria-label="Type of enquiry">
          {ENQUIRY_TYPES.map((t) => (
            <button key={t.id} type="button" role="tab" aria-selected={type === t.id} onClick={() => { setType(t.id); setV((x) => ({ ...x, subject: "" })); setErrors({}); }}>
              {t.label}
            </button>
          ))}
        </div>
      )}
      <form className="form" onSubmit={onSubmit} noValidate>
        <div className="form-row">
          {field("name", "Full name", { autoComplete: "name" }, true)}
          {field("email", "Email", { type: "email", autoComplete: "email", inputMode: "email" }, true)}
        </div>
        <div className="form-row">
          {field("phone", "Phone / WhatsApp", { type: "tel", autoComplete: "tel", inputMode: "tel" })}
          {field("organisation", "Organisation", { autoComplete: "organization" })}
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="f-orgType">You are</label>
            <select id="f-orgType" value={v.orgType} onChange={set("orgType")}>
              <option value="">Select…</option>
              {ORG_TYPES.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          {type === "service" && (
            <div className="field">
              <label htmlFor="f-subject">Service <span className="req" aria-hidden="true">*</span></label>
              <select id="f-subject" value={v.subject} onChange={set("subject")} aria-invalid={!!errors.subject} required>
                <option value="">Choose a capability…</option>
                {capabilities.map((c) => <option key={c.slug}>{c.title}</option>)}
                <option>More than one / not sure yet</option>
              </select>
              {errors.subject && <span className="error">{errors.subject}</span>}
            </div>
          )}
          {type === "product" && (
            <div className="field">
              <label htmlFor="f-subject">Product <span className="req" aria-hidden="true">*</span></label>
              <select id="f-subject" value={v.subject} onChange={set("subject")} aria-invalid={!!errors.subject} required>
                <option value="">Choose a product…</option>
                {products.map((p) => <option key={p.slug}>{p.name}</option>)}
                <option>Several products / custom kit</option>
              </select>
              {errors.subject && <span className="error">{errors.subject}</span>}
            </div>
          )}
          {type === "project" && (
            <div className="field">
              <label htmlFor="f-subject">About</label>
              <select id="f-subject" value={v.subject} onChange={set("subject")}>
                <option value="">A new site / project</option>
                {projects.map((p) => <option key={p.slug}>{p.name}</option>)}
              </select>
            </div>
          )}
          {type === "general" && field("subject", "Subject", {})}
        </div>
        {type === "project" && field("location", "Site location and approximate size", { placeholder: "e.g. village, district — acres or hectares" })}
        <div className="field">
          <label htmlFor="f-message">Message <span className="req" aria-hidden="true">*</span></label>
          <textarea id="f-message" value={v.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "e-message" : undefined} required
            placeholder={type === "product" ? "Quantity, delivery location, any customisation…" : "Tell us about your site, goals and timeline…"} />
          {errors.message && <span className="error" id="e-message">{errors.message}</span>}
        </div>

        {/* honeypot: hidden from people, bots fill it in */}
        <div className="hp-field" aria-hidden="true">
          <label htmlFor="f-website">Website</label>
          <input id="f-website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} />
        </div>

        <div className="field">
          <label style={{ display: "flex", gap: 10, fontWeight: 500, alignItems: "flex-start" }}>
            <input id="f-consent" type="checkbox" checked={v.consent} onChange={set("consent")} style={{ width: 18, height: 18, marginTop: 4, flex: "none" }} aria-invalid={!!errors.consent} />
            <span>I agree that EcoTree Logics may contact me about this enquiry. <span className="req">*</span></span>
          </label>
          {errors.consent && <span className="error">{errors.consent}</span>}
        </div>

        <div className="btn-row" style={{ alignItems: "center" }}>
          <button className="btn btn--dark" type="submit" disabled={status.state === "sending"}>
            {status.state === "sending" ? "Sending…" : "Send enquiry"} <span className="arrow">→</span>
          </button>
          <a className="btn btn--whatsapp" href={whatsappLink(`Hello EcoTree Logics, I have a ${type} enquiry${v.subject ? ` about ${v.subject}` : ""}.`)} target="_blank" rel="noopener noreferrer">
            WhatsApp instead
          </a>
        </div>

        <div aria-live="polite" ref={statusRef} tabIndex={-1}>
          {status.state === "success" && <p className="form-status form-status--success">{status.msg}</p>}
          {status.state === "error" && (
            <p className="form-status form-status--error">
              {status.msg}<br />
              <a href={mailLink(`Website enquiry: ${v.subject || type}`)}>{company.contact.email}</a> · <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp {company.contact.phoneDisplay}</a>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
