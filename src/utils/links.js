/** links.js — small helpers for contact links. */
import { company } from "@/data/company";

/** WhatsApp click-to-chat link with a pre-filled message. */
export function whatsappLink(message = "Hello EcoTree Logics, I would like to know more.") {
  return `https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
export const telLink = `tel:${company.contact.phoneLink}`;
export const mailLink = (subject = "Enquiry from website") =>
  `mailto:${company.contact.email}?subject=${encodeURIComponent(subject)}`;
