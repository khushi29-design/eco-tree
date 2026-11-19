/** Icons.jsx — small inline SVG icons (no icon library needed). */
const base = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

export const IconMail = (p) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>);
export const IconPhone = (p) => (<svg {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>);
export const IconPin = (p) => (<svg {...base} {...p}><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>);
export const IconSearch = (p) => (<svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>);
export const IconSend = (p) => (<svg {...base} {...p}><path d="M4 12 20 4l-6 16-3-7-7-1z" /></svg>);
export const IconWhatsApp = (p) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.2-.2-.4-.3z" />
  </svg>
);
/** Leaf-and-sprout outline used for clearly-marked product placeholders */
export const IconSprout = (p) => (<svg {...base} viewBox="0 0 48 48" strokeWidth="1.4" {...p}><path d="M24 44V22" /><path d="M24 26c-9 0-14-6-14-14 8 0 14 5 14 14z" /><path d="M24 22c0-9 6-14 15-14 0 9-6 14-15 14z" /><path d="M14 44h20" /></svg>);

/* Social icons (footer). Simple outline marks, drawn to match the icon set above. */
export const IconInstagram = (p) => (<svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></svg>);
export const IconLinkedIn = (p) => (<svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10.5V16M8 7.6v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1.9 2.1 2.6V16" /></svg>);
export const IconYouTube = (p) => (<svg {...base} {...p}><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10.5 9.5 4 2.5-4 2.5z" fill="currentColor" /></svg>);
export const IconFacebook = (p) => (<svg {...base} {...p}><path d="M14 8.5h2V5h-2.4C11.3 5 10 6.5 10 8.7V11H8v3.3h2V21h3.4v-6.7h2.4L16.3 11h-2.9V9.2c0-.5.2-.7.6-.7z" /></svg>);
export const IconArrowUp = (p) => (<svg {...base} {...p}><path d="M12 19V5M6 11l6-6 6 6" /></svg>);
