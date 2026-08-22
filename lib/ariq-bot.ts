import {
  formatLaunchPrice,
  formatMonthly,
  formatPricesSummary,
  getPackageById,
} from "./packages";
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

export const BOT_PREVIEW_TEXT = "¿En qué te ayudo hoy?";

export const HANDOFF_CONFIRMATION =
  "Te abrí WhatsApp con el mensaje listo. Si no se abrió, usa Continuar en WhatsApp.";

export function typingDelayMs(text: string, reducedMotion: boolean): number {
  if (reducedMotion) return 0;
  return Math.min(1400, Math.max(450, 400 + text.length * 12));
}

export const BOT_NODES: Record<string, BotNode> = {
  welcome: {
    id: "welcome",
    text: "Hola, soy ARIQ Bot, el asistente comercial de ARIQ Labs en Arequipa. ¿En qué te ayudo hoy?",
    replies: [
      {
        id: "opt-demo",
        label: "Ver Demos",
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
        next: "price-pain",
      },
    ],
  },
  demo: {
    id: "demo",
    text: "Perfecto. Te armamos la demo según tu negocio. ¿Cuál se parece más al tuyo?",
    replies: [
      { id: "demo-rest", label: "Restaurante", next: "demo-rest-qualify" },
      { id: "demo-ferr", label: "Ferretería", next: "demo-ferr-qualify" },
      { id: "demo-other", label: "Otro rubro", next: "demo-otro-qualify" },
    ],
  },
  "demo-rest-qualify": {
    id: "demo-rest-qualify",
    text: "En restaurante, ¿hoy quién responde los pedidos por WhatsApp?",
    replies: [
      {
        id: "demo-rest-self",
        label: "Yo, entre cocina y mesa",
        next: "demo-restaurante",
      },
      {
        id: "demo-rest-backlog",
        label: "Se nos acumulan",
        next: "demo-restaurante-gap",
      },
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
  "demo-restaurante-gap": {
    id: "demo-restaurante-gap",
    text: "Si los mensajes se acumulan, se van pedidos de la noche y del delivery. El bot toma la orden y te deja solo lo que hay que preparar. ¿Vemos el flujo en una demo corta?",
    replies: [
      {
        id: "demo-rest-gap-wa",
        label: "Sí, ver la demo",
        next: "wa-demo-restaurante",
      },
      { id: "demo-rest-gap-back", label: "Ver otras opciones", next: "welcome" },
    ],
    whatsappIntent: "demo-restaurante",
  },
  "demo-ferr-qualify": {
    id: "demo-ferr-qualify",
    text: "En ferretería, ¿hoy cotizan y consultan stock por WhatsApp?",
    replies: [
      {
        id: "demo-ferr-self",
        label: "Sí, yo desde el mostrador",
        next: "demo-ferreteria",
      },
      {
        id: "demo-ferr-backlog",
        label: "Se nos pasan mensajes",
        next: "demo-ferreteria-gap",
      },
    ],
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
  "demo-ferreteria-gap": {
    id: "demo-ferreteria-gap",
    text: "Si un mensaje se queda sin respuesta, el cliente cotiza en otro lado. El bot responde stock y precio aunque estés en mostrador. ¿Te muestro el flujo?",
    replies: [
      {
        id: "demo-ferr-gap-wa",
        label: "Sí, ver la demo",
        next: "wa-demo-ferreteria",
      },
      { id: "demo-ferr-gap-back", label: "Ver otras opciones", next: "welcome" },
    ],
    whatsappIntent: "demo-ferreteria",
  },
  "demo-otro-qualify": {
    id: "demo-otro-qualify",
    text: "¿Hoy atiendes las consultas de WhatsApp vos mismo?",
    replies: [
      { id: "demo-otro-self", label: "Sí, cuando puedo", next: "demo-otro" },
      {
        id: "demo-otro-backlog",
        label: "Casi no damos abasto",
        next: "demo-otro-gap",
      },
    ],
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
  "demo-otro-gap": {
    id: "demo-otro-gap",
    text: "Si WhatsApp se te junta, se enfrían cotizaciones. Armamos el flujo para tu rubro en Arequipa y te lo mostramos. ¿Lo vemos por WhatsApp?",
    replies: [
      {
        id: "demo-otro-gap-wa",
        label: "Sí, hablar por WhatsApp",
        next: "wa-demo-otro",
      },
      { id: "demo-otro-gap-back", label: "Ver otras opciones", next: "welcome" },
    ],
    whatsappIntent: "demo-otro",
  },
  audit: {
    id: "audit",
    text: "La Auditoría Express es una revisión de 20–30 min de tu WhatsApp, Google Maps y operación. Sin compromiso, en Arequipa. ¿Te la agendo con el equipo?",
    replies: [
      { id: "audit-yes", label: "Sí, agendar", next: "audit-maps" },
      { id: "audit-more", label: "Primero cuéntame más", next: "audit-detail" },
    ],
  },
  "audit-detail": {
    id: "audit-detail",
    text: "Revisamos si apareces cuando te buscan cerca, si respondes a tiempo y si el inventario te frena ventas. Sales con 2–3 acciones concretas. ¿Agendamos?",
    replies: [
      { id: "audit-detail-yes", label: "Sí, agendar", next: "audit-maps" },
      { id: "audit-detail-back", label: "Ver otras opciones", next: "welcome" },
    ],
  },
  "audit-maps": {
    id: "audit-maps",
    text: "¿Tu negocio ya aparece en Google Maps?",
    replies: [
      { id: "audit-maps-yes-opt", label: "Sí, ya tengo ficha", next: "audit-maps-yes" },
      {
        id: "audit-maps-no-opt",
        label: "No, o no estoy seguro",
        next: "audit-maps-no",
      },
    ],
  },
  "audit-maps-yes": {
    id: "audit-maps-yes",
    text: "Bien. En 20–30 min revisamos si te encuentran cerca y si WhatsApp responde a tiempo. ¿La agendo en Arequipa?",
    replies: [
      { id: "audit-maps-yes-book", label: "Sí, agendar", next: "audit-book" },
      { id: "audit-maps-yes-back", label: "Ver otras opciones", next: "welcome" },
    ],
  },
  "audit-maps-no": {
    id: "audit-maps-no",
    text: "Justo por eso sirve: Maps + WhatsApp + operación, sin compromiso. Sales con 2–3 acciones concretas. ¿Agendamos 20–30 min en Arequipa?",
    replies: [
      { id: "audit-maps-no-book", label: "Sí, agendar", next: "audit-book" },
      { id: "audit-maps-no-back", label: "Ver otras opciones", next: "welcome" },
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
  "price-pain": {
    id: "price-pain",
    text: "¿Qué te frena más las ventas hoy?",
    replies: [
      {
        id: "pain-whatsapp",
        label: "WhatsApp: no doy abasto",
        next: "price-pro",
      },
      {
        id: "pain-maps",
        label: "No aparezco en Google Maps",
        next: "price-basico",
      },
      {
        id: "pain-stock",
        label: "Inventario o más de un local",
        next: "price-enterprise",
      },
      { id: "pain-all", label: "Ver todos los precios", next: "prices" },
    ],
  },
  prices: {
    id: "prices",
    text: `Precios en soles (PEN). Implementación con Socios Fundadores −25%: ${formatPricesSummary()} El descuento aplica al pago único, no a la mensualidad. 5 cupos.`,
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
    text: `Básico: web express, SEO local, bot WhatsApp y POS básico. Implementación ${formatLaunchPrice(getPackageById("basico")!.launchPrice)} + ${formatMonthly(getPackageById("basico")!.monthly)}. Te pasamos al equipo por WhatsApp para armar la propuesta.`,
    replies: [
      { id: "basico-wa", label: "Continuar en WhatsApp", next: "wa-basico" },
      { id: "basico-back", label: "Ver otros paquetes", next: "prices" },
    ],
    whatsappIntent: "basico",
  },
  "price-pro": {
    id: "price-pro",
    text: `Pro (recomendado): web catálogo, bot IA para pedidos y ERP (POS + inventario). Implementación ${formatLaunchPrice(getPackageById("pro")!.launchPrice)} + ${formatMonthly(getPackageById("pro")!.monthly)}. ¿Hablamos por WhatsApp?`,
    replies: [
      { id: "pro-wa", label: "Continuar en WhatsApp", next: "wa-pro" },
      { id: "pro-back", label: "Ver otros paquetes", next: "prices" },
    ],
    whatsappIntent: "pro",
  },
  "price-enterprise": {
    id: "price-enterprise",
    text: `Enterprise: e-commerce, bot IA texto/voz, ERP multisucursal y soporte prioritario. Implementación ${formatLaunchPrice(getPackageById("enterprise")!.launchPrice)} + ${formatMonthly(getPackageById("enterprise")!.monthly)}. El equipo te arma la propuesta por WhatsApp.`,
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
