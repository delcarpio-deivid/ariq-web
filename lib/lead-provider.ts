import { buildWhatsAppUrl, type WhatsAppIntent } from "./whatsapp";

export type LeadIntent = WhatsAppIntent;

export function openWhatsAppLead(intent: LeadIntent = "generic"): string {
  return buildWhatsAppUrl(intent);
}
