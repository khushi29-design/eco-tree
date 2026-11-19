/**
 * _document.js — the <html> shell shared by every page.
 * Google Analytics 4 and Search Console verification are switched on ONLY when you add
 * their IDs to .env.local (see .env.example). Nothing is sent to Google otherwise.
 */
import { Html, Head, Main, NextScript } from "next/document";
import { organizationSchema, websiteSchema } from "@/utils/schema";
import { asset } from "@/utils/asset";

const GA4 = process.env.NEXT_PUBLIC_GA4_ID;
const GSC = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export default function Document() {
  return (
    <Html lang="en-IN">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#102A20" />
        <link rel="icon" href={asset("/favicon.ico")} sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href={asset("/favicon/icon-192.png")} />
        <link rel="apple-touch-icon" href={asset("/favicon/apple-touch-icon.png")} />
        <link rel="manifest" href={asset("/site.webmanifest")} />
        {GSC && <meta name="google-site-verification" content={GSC} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema(), websiteSchema()]) }} />
        {GA4 && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4}');`,
              }}
            />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
