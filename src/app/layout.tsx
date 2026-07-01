import type { Metadata, Viewport } from "next";
import {
  ConsentGatedScripts,
  CookieConsentProvider,
} from "@/components/consent/CookieConsent";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { buildMetadata, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = buildMetadata({
  title: SITE_NAME,
  description: SITE_TAGLINE,
  path: "/",
  keywords: [
    "construction calculator",
    "house building cost calculator",
    "home construction cost estimator",
    "fence cost calculator",
    "deck cost calculator",
    "sprinkler system calculator",
    "cost to build a house",
    "US building calculator",
  ],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d9f6e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <JsonLd data={websiteJsonLd()} />
      </head>
      <body className="min-h-dvh flex flex-col bg-background text-foreground">
        <CookieConsentProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ConsentGatedScripts />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
