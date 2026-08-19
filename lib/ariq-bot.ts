import type { WhatsAppIntent } from "./whatsapp";

export type ChatRole = "bot" | "user";

export type QuickReply = {
  id: string;
  label: string;
  next: string;
};

export type BotNode = {
  id: string;
  text: string;
  replies?: QuickReply[];
  whatsappIntent?: WhatsAppIntent;
};

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

export const WELCOME_NODE_ID = "welcome";

export const BOT_NODES: Record<string, BotNode> = {
  welcome: {
    id: "welcome",
    text: "Hola, soy ARIQ Bot, el asistente comercial de ARIQ Labs en Arequipa. ¿En qué te ayudo hoy?",
    replies: [
      {
        id: "opt-demo",
        label: "Ver Demo para Restaurantes/Ferreterías",
        next: "demo",
      },
      {
        id: "opt-audit",
        label: "Agendar Auditoría Express en Arequipa",
        next: "audit",
      },
      {
        id: "opt-prices",
        label: "Consultar Precios",
        next: "prices",
      },
    ],
  },
  demo: {
    id: "demo",
    text: "Perfecto. Tenemos demos pensadas para restaurantes (pedidos y carta por WhatsApp) y ferreterías (stock y cotizaciones). ¿Cuál se parece más a tu negocio?",
    replies: [
      { id: "demo-rest", label: "Restaurante", next: "demo-restaurante" },
      { id: "demo-ferr", label: "Ferretería", next: "demo-ferreteria" },
      { id: "demo-other", label: "Otro rubro", next: "demo-otro" },
    ],
  },
  "demo-restaurante": {
    id: "demo-restaurante",
    text: "En un restaurante el bot toma pedidos 24/7, confirma horarios y no deja un mensaje sin respuesta aunque estés en cocina. Te mostramos el flujo en una llamada corta. ¿La agendamos?",
    replies: [
      { id: "demo-rest-wa", label: "Sí, ver la demo", next: "wa-demo-restaurante" },
      { id: "demo-rest-back", label: "Ver otras opciones", next: "welcome" },
    ],
    whatsappIntent: "demo-restaurante",
  },
  "demo-ferreteria": {
    id: "demo-ferreteria",
    text: "En ferretería el bot cotiza, consulta stock y no pierde la venta si estás atendiendo en mostrador. Te enseñamos el flujo en una demo corta. ¿La vemos juntos?",
    replies: [
      { id: "demo-ferr-wa", label: "Sí, ver la demo", next: "wa-demo-ferreteria" },
      { id: "demo-ferr-back", label: "Ver otras opciones", next: "welcome" },
    ],
    whatsappIntent: "demo-ferreteria",
  },
  "demo-otro": {
    id: "demo-otro",
    text: "También armamos el bot para boutiques, servicios y otros rubros en Arequipa. Cuéntanos tu giro por WhatsApp y te proponemos el flujo. ¿Seguimos ahí?",
    replies: [
      { id: "demo-otro-wa", label: "Sí, hablar por WhatsApp", next: "wa-demo-otro" },
      { id: "demo-otro-back", label: "Ver otras opciones", next: "welcome" },
    ],
    whatsappIntent: "demo-otro",
  },
  audit: {
    id: "audit",
    text: "La Auditoría Express es una revisión de 20–30 min de tu WhatsApp, Google Maps y operación. Sin compromiso, en Arequipa. ¿Te la agendo con el equipo?",
    replies: [
      { id: "audit-yes", label: "Sí, agendar", next: "audit-book" },
      { id: "audit-more", label: "Primero cuéntame más", next: "audit-detail" },
    ],
  },
  "audit-detail": {
    id: "audit-detail",
    text: "Revisamos si apareces cuando te buscan cerca, si respondes a tiempo y si el inventario te frena ventas. Sales con 2–3 acciones concretas. ¿Agendamos?",
    replies: [
      { id: "audit-detail-yes", label: "Sí, agendar", next: "audit-book" },
      { id: "audit-detail-back", label: "Ver otras opciones", next: "welcome" },
    ],
  },
  "audit-book": {
    id: "audit-book",
    text: "Listo. El equipo te escribe por WhatsApp para coordinar día y hora en Arequipa. ¿Abrimos el chat?",
    replies: [
      { id: "audit-wa", label: "Continuar en WhatsApp", next: "wa-auditoria" },
      { id: "audit-back", label: "Ver otras opciones", next: "welcome" },
    ],
    whatsappIntent: "auditoria",
  },
  prices: {
    id: "prices",
    text: "Precios en soles (PEN). Implementación con Socios Fundadores −25%: Básico S/ 600, Pro S/ 900, Enterprise S/ 1,350. Mensualidad: S/ 79 / S/ 149 / S/ 249. El descuento aplica al pago único, no a la mensualidad. 5 cupos.",
    replies: [
      { id: "price-basico", label: "Elegir Básico", next: "price-basico" },
      { id: "price-pro", label: "Elegir Pro", next: "price-pro" },
      { id: "price-ent", label: "Elegir Enterprise", next: "price-enterprise" },
      { id: "price-table", label: "Ver tabla en la página", next: "price-scroll" },
    ],
    whatsappIntent: "precios",
  },
  "price-basico": {
    id: "price-basico",
    text: "Básico: web express, SEO local, bot WhatsApp y POS básico. Implementación S/ 600 + S/ 79/mes. Te pasamos al equipo por WhatsApp para armar la propuesta.",
    replies: [
      { id: "basico-wa", label: "Continuar en WhatsApp", next: "wa-basico" },
      { id: "basico-back", label: "Ver otros paquetes", next: "prices" },
    ],
    whatsappIntent: "basico",
  },
  "price-pro": {
    id: "price-pro",
    text: "Pro (recomendado): web catálogo, bot IA para pedidos y ERP (POS + inventario). Implementación S/ 900 + S/ 149/mes. ¿Hablamos por WhatsApp?",
    replies: [
      { id: "pro-wa", label: "Continuar en WhatsApp", next: "wa-pro" },
      { id: "pro-back", label: "Ver otros paquetes", next: "prices" },
    ],
    whatsappIntent: "pro",
  },
  "price-enterprise": {
    id: "price-enterprise",
    text: "Enterprise: e-commerce, bot IA texto/voz, ERP multisucursal y soporte prioritario. Implementación S/ 1,350 + S/ 249/mes. El equipo te arma la propuesta por WhatsApp.",
    replies: [
      { id: "ent-wa", label: "Continuar en WhatsApp", next: "wa-enterprise" },
      { id: "ent-back", label: "Ver otros paquetes", next: "prices" },
    ],
    whatsappIntent: "enterprise",
  },
  "price-scroll": {
    id: "price-scroll",
    text: "Abajo en la página está la tabla completa (Básico, Pro y Enterprise) con el badge Socios Fundadores. Si quieres, también te lo explico por WhatsApp.",
    replies: [
      { id: "scroll-wa", label: "Consultar por WhatsApp", next: "wa-precios" },
      { id: "scroll-back", label: "Ver otras opciones", next: "welcome" },
    ],
    whatsappIntent: "precios",
  },
};

const WHATSAPP_NODES: Record<string, WhatsAppIntent> = {
  "wa-demo-restaurante": "demo-restaurante",
  "wa-demo-ferreteria": "demo-ferreteria",
  "wa-demo-otro": "demo-otro",
  "wa-auditoria": "auditoria",
  "wa-precios": "precios",
  "wa-basico": "basico",
  "wa-pro": "pro",
  "wa-enterprise": "enterprise",
};

export function getBotNode(id: string): BotNode | undefined {
  return BOT_NODES[id];
}

export function getWhatsAppIntentForNode(id: string): WhatsAppIntent | undefined {
  return WHATSAPP_NODES[id] ?? BOT_NODES[id]?.whatsappIntent;
}

export function isWhatsAppHandoff(id: string): boolean {
  return id in WHATSAPP_NODES;
}

export function createMessage(role: ChatRole, text: string): ChatMessage {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return { id, role, text };
}
