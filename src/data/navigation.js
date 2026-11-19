/** navigation.js — header and footer menus. Add or reorder links here. */
import { capabilities } from "./capabilities";

export const mainNav = [
  { label: "About", href: "/about/" },
  {
    label: "Capabilities",
    href: "/capabilities/",
    children: capabilities.map((c) => ({ label: c.title, href: `/capabilities/${c.slug}/`, letter: c.letter })),
  },
  {
    label: "Projects",
    href: "/projects/",
    children: [
      { label: "All projects", href: "/projects/" },
      { label: "Project Nisargavedh", href: "/projects/nisargavedh/" },
      { label: "RET Conservation Park", href: "/projects/ret-conservation-park/" },
    ],
  },
  { label: "Products", href: "/products/" },
  { label: "Impact", href: "/impact/" },
  { label: "Gallery", href: "/gallery/" },
];

export const footerNav = [
  {
    title: "Explore",
    links: [
      { label: "About Us", href: "/about/" },
      { label: "Projects", href: "/projects/" },
      { label: "Project Nisargavedh", href: "/projects/nisargavedh/" },
      { label: "RET Conservation Park", href: "/projects/ret-conservation-park/" },
      { label: "Products Catalogue", href: "/products/" },
      { label: "Our Impact", href: "/impact/" },
      { label: "Gallery", href: "/gallery/" },
      { label: "Contact Us", href: "/contact/" },
    ],
  },
  {
    title: "Capabilities",
    links: capabilities.map((c) => ({ label: c.title, href: `/capabilities/${c.slug}/`, letter: c.letter })),
  },
];
