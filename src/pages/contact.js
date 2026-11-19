/**
 * Contact Us — four enquiry types, email, phone and WhatsApp.
 * Links like /contact/?type=product&subject=Seed%20Pens open the right form, pre-filled.
 */
import { useRouter } from "next/router";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import EnquiryForm, { ENQUIRY_TYPES } from "@/components/EnquiryForm";
import { IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { company, closingCta } from "@/data/company";
import { pageSeo, SITE_URL } from "@/data/seo";
import { breadcrumbSchema } from "@/utils/schema";
import { whatsappLink, telLink, mailLink } from "@/utils/links";

const crumbs = [{ label: "Home", href: "/" }, { label: "Contact Us", href: "/contact/" }];
const contactPage = { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact EcoTree Logics", url: `${SITE_URL}/contact/`, about: { "@id": `${SITE_URL}/#organization` } };

export default function Contact() {
  const { query, isReady } = useRouter();
  const type = isReady && ENQUIRY_TYPES.some((t) => t.id === query.type) ? query.type : "general";
  const preset = isReady && typeof query.subject === "string" ? query.subject : "";
  const c = company.contact;

  return (
    <>
      <Seo title={pageSeo.contact.title} description={pageSeo.contact.description} path="/contact/" schema={[breadcrumbSchema(crumbs), contactPage]} />
      <PageHero crumbs={crumbs} short eyebrow="Contact us" title={closingCta.title} intro={closingCta.text}
        image="/images/forest/sunset-over-restored-plantation-nagpur" imageAlt="Sunset over a restored plantation" />

      <section className="section section--paper">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <p className="eyebrow">Reach the team</p>
            <h2 style={{ fontSize: "var(--fs-h3)", marginBottom: 24 }}>Email, call or WhatsApp — or send an enquiry</h2>
            <div className="contact-methods" style={{ color: "var(--ink)" }}>
              <Reveal as="a" className="contact-method" href={mailLink()} style={{ borderColor: "rgba(16,42,32,.15)" }}>
                <span className="icon"><IconMail /></span><span><small style={{ color: "var(--ink-soft)" }}>Email</small><strong>{c.email.split("@")[0]}@<wbr />{c.email.split("@")[1]}</strong></span>
              </Reveal>
              <Reveal as="a" className="contact-method" href={telLink} delay={0.05} style={{ borderColor: "rgba(16,42,32,.15)" }}>
                <span className="icon"><IconPhone /></span><span><small style={{ color: "var(--ink-soft)" }}>Phone</small><strong>{c.phoneDisplay}</strong></span>
              </Reveal>
              <Reveal as="a" className="contact-method" href={whatsappLink()} target="_blank" rel="noopener noreferrer" delay={0.1} style={{ borderColor: "rgba(16,42,32,.15)" }}>
                <span className="icon"><IconWhatsApp /></span><span><small style={{ color: "var(--ink-soft)" }}>WhatsApp</small><strong>Chat with us</strong></span>
              </Reveal>
              <Reveal className="contact-method" delay={0.15} style={{ borderColor: "rgba(16,42,32,.15)" }}>
                <span className="icon"><IconPin /></span><span><small style={{ color: "var(--ink-soft)" }}>Location</small><strong>{c.location}</strong></span>
              </Reveal>
            </div>
            <p className="note" style={{ marginTop: 22 }}>Website: {c.website}</p>
          </div>
          <EnquiryForm type={type} preset={preset} showTypeTabs />
        </div>
      </section>
    </>
  );
}
