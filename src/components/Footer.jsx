/** Footer.jsx — full site footer with all links and contact details. */
import Link from "next/link";
import { company } from "@/data/company";
import { footerNav } from "@/data/navigation";
import { whatsappLink, telLink, mailLink } from "@/utils/links";

export default function Footer() {
  const social = Object.entries(company.social).filter(([, url]) => url);
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/images/logo/ecotree-logics-logo-light.png" alt="EcoTree Logics logo" width="150" height="141" loading="lazy" />
            <p>{company.tagline}</p>
            <p className="small">{company.positioning}</p>
            <div className="footer-contact">
              <a href={mailLink()}>{company.contact.email}</a>
              <a href={telLink}>{company.contact.phoneDisplay}</a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
              <span className="muted">{company.contact.location}</span>
            </div>
          </div>
          {footerNav.map((col) => (
            <div key={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-word" aria-hidden="true">ECO · TREE · LOGICS</div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
          {social.length > 0 && (
            <span>
              {social.map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 14, textTransform: "capitalize" }}>{name}</a>
              ))}
            </span>
          )}
          <span>{company.disciplines.join(" · ")}</span>
        </div>
      </div>
    </footer>
  );
}
