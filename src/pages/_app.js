/**
 * _app.js — runs on every page. Loads fonts and styles, smooth scrolling and the shared layout.
 */
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/manrope/index.css";
import "@/styles/globals.css";
import "@/styles/components.css";
import "@/styles/home.css";

import Head from "next/head";
import Layout from "@/components/Layout";
import SmoothScroll from "@/animations/SmoothScroll";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <SmoothScroll>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SmoothScroll>
    </>
  );
}
