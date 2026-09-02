import { getWhatsAppNumber } from "@/lib/whatsapp";

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return url && url.length > 0 ? url : "https://ariqlabs.pe";
}

export function getLocalBusinessJsonLd(): Record<string, unknown> {
  const url = getSiteUrl();
  const phone = getWhatsAppNumber();

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ARIQ Labs",
    description:
      "Agencia B2B de tecnología, software e IA para pymes en Arequipa. Web, bot de WhatsApp con IA y ERP liviano en 10 días.",
    url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Arequipa",
      addressCountry: "PE",
    },
    areaServed: {
      "@type": "City",
      name: "Arequipa",
    },
    priceRange: "$$",
  };

  if (phone) {
    jsonLd.telephone = `+${phone}`;
  }

  return jsonLd;
}
