/**
 * Footer.jsx — site footer: closing CTA, brand, quick links, capabilities, contact, social.
 * Links come from src/data/navigation.js (footerNav); contact details and social URLs
 * from src/data/company.js. Social icons appear automatically once a URL is filled in there.
 */
import Link from "next/link";
import { company } from "@/data/company";
import { footerNav } from "@/data/navigation";
import { whatsappLink, telLink, mailLink } from "@/utils/links";
import { asset } from "@/utils/asset";
import { IconMail, IconPhone, IconPin, IconWhatsApp, IconInstagram, IconLinkedIn, IconYouTube, IconFacebook, IconArrowUp } from "./Icons";

const SOCIAL_ICONS = { instagram: IconInstagram, linkedin: IconLinkedIn, youtube: IconYouTube, facebook: IconFacebook };
const SOCIAL_LABELS = { instagram: "Instagram", linkedin: "LinkedIn", youtube: "YouTube", facebook: "Facebook" };

export default function Footer() {
  const { contact } = company;
  const social = Object.entries(company.social).filter(([name, url]) => url && SOCIAL_ICONS[name]);
  const [explore, caps] = footerNav;

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Closing invitation */}
        <section className="footer-cta" aria-labelledby="footer-cta-title">
          <div>
            <p className="footer-cta__eyebrow">Start with one site</p>
            <h2 id="footer-cta-title" className="footer-cta__title">Let&rsquo;s Restore Nature. <em>Together.</em></h2>
          </div>
          <div className="footer-cta__side">
            <p>Tell us about your land, campus or CSR goal. We will walk it with you and propose only what it needs.</p>
            <div className="footer-cta__actions">
              <Link href="/contact/" className="footer-btn footer-btn--solid">Talk to our team <span className="arrow" aria-hidden="true">→</span></Link>
              <a href={whatsappLink("Hello EcoTree Logics, I would like to discuss a site.")} className="footer-btn footer-btn--line" target="_blank" rel="noopener noreferrer">
                <IconWhatsApp width="17" height="17" /> WhatsApp
              </a>
            </div>
          </div>
        </section>

        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="footer-logo" aria-label={`${company.shortName} home`}>
              <img src={asset("/images/logo/ecotree-logics-logo-light.png")} alt="EcoTree Logics" width="96" height="108" loading="lazy" />
            </Link>
            <p className="footer-brand__text">{company.positioning}</p>
            <p className="footer-brand__tagline">{company.tagline}</p>
            <ul className="footer-social" aria-label="Connect with EcoTree Logics">
              {social.map(([name, url]) => {
                const Icon = SOCIAL_ICONS[name];
                return (
                  <li key={name}><a href={url} target="_blank" rel="noopener noreferrer" aria-label={SOCIAL_LABELS[name]}><Icon width="18" height="18" /></a></li>
                );
              })}
              <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><IconWhatsApp width="18" height="18" /></a></li>
              <li><a href={mailLink()} aria-label="Email"><IconMail width="18" height="18" /></a></li>
            </ul>
          </div>

          <nav className="footer-col" aria-labelledby="footer-explore">
            <h3 id="footer-explore">{explore.title}</h3>
            <ul>
              {explore.links.map((l) => (<li key={l.href}><Link href={l.href}>{l.label}</Link></li>))}
            </ul>
          </nav>

          <nav className="footer-col footer-col--caps" aria-labelledby="footer-caps">
            <h3 id="footer-caps">{caps.title}</h3>
            <ul>
              {caps.links.map((l) => (
                <li key={l.href}><Link href={l.href}><span className="footer-letter" aria-hidden="true">{l.letter}</span>{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="footer-col footer-contact">
            <h3>Get in touch</h3>
            <ul>
              <li><a href={mailLink()}><IconMail width="18" height="18" /><span><small>Email</small>{contact.email.split("@")[0]}@<wbr />{contact.email.split("@")[1]}</span></a></li>
              <li><a href={telLink}><IconPhone width="18" height="18" /><span><small>Phone</small>{contact.phoneDisplay}</span></a></li>
              <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><IconWhatsApp width="18" height="18" /><span><small>WhatsApp</small>Message the team</span></a></li>
              <li><span className="footer-contact__static"><IconPin width="18" height="18" /><span><small>Based in</small>{contact.location}</span></span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p className="footer-bottom__disciplines">{company.disciplines.join(" · ")}</p>
          <a href="#main" className="footer-top-link">Back to top <IconArrowUp width="15" height="15" /></a>
        </div>
      </div>
    </footer>
  );
}
