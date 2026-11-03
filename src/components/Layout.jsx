/** Layout.jsx — wraps every page: skip link, header, main content, footer, EcoBot. */
import dynamic from "next/dynamic";
import Header from "./Header";
import Footer from "./Footer";

// EcoBot loads after the page so it never slows down the first paint
const EcoBot = dynamic(() => import("@/chatbot/EcoBot"), { ssr: false });

export default function Layout({ children }) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <EcoBot />
    </>
  );
}
