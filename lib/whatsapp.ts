const DEFAULT_INTRO = "Hola, quiero más información sobre ARIQ Labs.";

export type WhatsAppIntent =
  | "generic"
  | "demo-restaurante"
  | "demo-ferreteria"
  | "demo-otro"
  | "auditoria"
  | "precios"
  | "basico"
  | "pro"
  | "enterprise";

const MESSAGES: Record<WhatsAppIntent, string> = {
  generic: DEFAULT_INTRO,
  "demo-restaurante":
    "Hola, quiero ver la demo de ARIQ Labs para restaurantes (pedidos por WhatsApp + carta).",
  "demo-ferreteria":
    "Hola, quiero ver la demo de ARIQ Labs para ferreterías (stock + cotizaciones).",
  "demo-otro":
    "Hola, quiero ver una demo de ARIQ Labs para mi rubro en Arequipa.",
  auditoria:
    "Hola, quiero agendar una Auditoría Express en Arequipa (WhatsApp, Maps y operación).",
  precios:
    "Hola, quiero consultar precios de los paquetes Básico, Pro y Enterprise de ARIQ Labs.",
  basico:
    "Hola, quiero más información sobre el paquete Básico de ARIQ Labs.",
  pro: "Hola, quiero más información sobre el paquete Pro de ARIQ Labs.",
  enterprise:
    "Hola, quiero más información sobre el paquete Enterprise de ARIQ Labs.",
};

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function getWhatsAppNumber(): string {
  return digitsOnly(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "");
}

export function buildWhatsAppUrl(intent: WhatsAppIntent = "generic"): string {
  const text = encodeURIComponent(MESSAGES[intent] ?? DEFAULT_INTRO);
  const number = getWhatsAppNumber();
  const base = number ? `https://wa.me/${number}` : "https://wa.me/";
  return `${base}?text=${text}`;
}
