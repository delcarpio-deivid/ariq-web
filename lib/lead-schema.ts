import { z } from "zod";

import { PACKAGES, type PackageId } from "./packages";

const PACKAGE_IDS = PACKAGES.map((pkg) => pkg.id) as [
  PackageId,
  PackageId,
  PackageId,
];

const PERU_PHONE_REGEX = /^\+51[9]\d{8}$/;

const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;

export function sanitizeText(value: string, maxLength: number): string {
  return value.replace(CONTROL_CHARS, "").trim().slice(0, maxLength);
}

export function normalizePeruPhone(input: string): string {
  const digits = input.replace(/\D/g, "");

  if (digits.length === 11 && digits.startsWith("519")) {
    return `+51${digits.slice(2)}`;
  }

  if (digits.length === 9 && digits.startsWith("9")) {
    return `+51${digits}`;
  }

  if (digits.length === 12 && digits.startsWith("519")) {
    return `+51${digits.slice(3)}`;
  }

  return input.trim();
}

export const leadInputSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(120, "El nombre no puede superar 120 caracteres")
    .transform((value) => sanitizeText(value, 120))
    .refine((value) => value.length > 0, "El nombre es obligatorio"),
  negocio: z
    .string()
    .max(120, "El negocio no puede superar 120 caracteres")
    .optional()
    .transform((value) => {
      if (value === undefined) {
        return undefined;
      }

      const sanitized = sanitizeText(value, 120);
      return sanitized.length > 0 ? sanitized : undefined;
    }),
  telefono: z
    .string()
    .min(1, "El teléfono es obligatorio")
    .transform(normalizePeruPhone)
    .refine(
      (value) => PERU_PHONE_REGEX.test(value),
      "Teléfono inválido. Usa formato Perú: +51 seguido de 9 dígitos",
    ),
  paquete: z.enum(PACKAGE_IDS, {
    message: "Paquete inválido. Valores: basico, pro, enterprise",
  }),
  utm_source: z
    .string()
    .max(80, "utm_source no puede superar 80 caracteres")
    .optional()
    .transform((value) => {
      if (value === undefined) {
        return undefined;
      }

      const sanitized = sanitizeText(value, 80);
      return sanitized.length > 0 ? sanitized : undefined;
    }),
});

export type LeadInput = z.infer<typeof leadInputSchema>;

export type LeadValidationError = {
  field: string;
  message: string;
};

export function formatLeadValidationErrors(
  error: z.ZodError,
): LeadValidationError[] {
  return error.issues.map((issue) => ({
    field: issue.path.join(".") || "body",
    message: issue.message,
  }));
}
