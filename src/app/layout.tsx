import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

/**
 * Display face. Archivo's variable width axis goes to 125, which is what
 * gives us the ultra-wide industrial look the design system calls for
 * (a free stand-in for Druk Wide). Width is applied in globals.css via
 * font-variation-settings.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  /**
   * No "%s | J17 Fitness" template here on purpose. Every page sets its own
   * complete title, and the archive's titles already end in "| J17 Fitness" —
   * a template would double the suffix.
   */
  title: "J17 Fitness — A Training, Recovery & Wellness Club",
  description:
    "J17 Fitness is a 10,000 sq ft training, recovery and wellness club in Richmond Hill — coached classes, sauna, cold plunge and red light recovery, and a healthy café. Feel better, and see the difference.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: siteConfig.name,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        {/* Google Tag Manager. ID lives in siteConfig so it stays swappable. */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${siteConfig.gtmId}');`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${siteConfig.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-[var(--accent-lime)] focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:uppercase focus:tracking-[0.1em] focus:text-[var(--bg-base)]"
        >
          Skip to content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
