import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { AriqChatWidget } from "@/components/ui/AriqChatWidget";
import { getLocalBusinessJsonLd, getSiteUrl } from "@/lib/seo";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = getSiteUrl();
const siteTitle = "ARIQ Labs — Automatiza WhatsApp y SEO Local en Arequipa";
const siteDescription =
  "Web + Bot IA + ERP liviano para pymes en Arequipa. Implementación en 10 días. Precios en soles desde S/ 600.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | ARIQ Labs",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: siteUrl,
    siteName: "ARIQ Labs",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getLocalBusinessJsonLd();

  return (
    <html
      lang="es-PE"
      className={`${outfit.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-brand-secondary focus:px-4 focus:py-3 focus:font-body focus:text-sm focus:font-medium focus:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
        >
          Saltar al contenido
        </a>
        {children}
        <AriqChatWidget />
      </body>
    </html>
  );
}
