import {
  formatLeadValidationErrors,
  leadInputSchema,
  type LeadInput,
  type LeadValidationError,
} from "./lead-schema";
import { getPackageById } from "./packages";
import { buildWhatsAppUrl, buildWhatsAppUrlWithText, type WhatsAppIntent } from "./whatsapp";

export type LeadIntent = WhatsAppIntent;

export type SubmitLeadResult =
  | { ok: true; whatsappUrl: string }
  | { ok: false; errors: LeadValidationError[] };

export function openWhatsAppLead(intent: LeadIntent = "generic"): string {
  return buildWhatsAppUrl(intent);
}

function buildLeadWhatsAppMessage(lead: LeadInput): string {
  const pkg = getPackageById(lead.paquete);
  const packageLabel = pkg?.name ?? lead.paquete;
  const lines = [
    `Hola, soy ${lead.nombre} y quiero información sobre el paquete ${packageLabel} de ARIQ Labs.`,
    `Teléfono: ${lead.telefono}`,
  ];

  if (lead.negocio) {
    lines.push(`Negocio: ${lead.negocio}`);
  }

  if (lead.utm_source) {
    lines.push(`Origen: ${lead.utm_source}`);
  }

  return lines.join("\n");
}

export function submitLead(input: unknown): SubmitLeadResult {
  const parsed = leadInputSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      errors: formatLeadValidationErrors(parsed.error),
    };
  }

  const message = buildLeadWhatsAppMessage(parsed.data);
  const whatsappUrl = buildWhatsAppUrlWithText(message);

  return {
    ok: true,
    whatsappUrl,
  };
}
