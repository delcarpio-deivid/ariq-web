import type { WhatsAppIntent } from "./whatsapp";

export type PackageId = "basico" | "pro" | "enterprise";

export type Package = {
  id: PackageId;
  name: string;
  listPrice: number;
  launchPrice: number;
  monthly: number;
  features: string[];
  recommended?: boolean;
  whatsappIntent: WhatsAppIntent;
};

export const PACKAGES: Package[] = [
  {
    id: "basico",
    name: "Básico",
    listPrice: 800,
    launchPrice: 600,
    monthly: 79,
    features: [
      "Web express",
      "SEO local",
      "Bot WhatsApp",
      "POS básico",
    ],
    whatsappIntent: "basico",
  },
  {
    id: "pro",
    name: "Pro",
    listPrice: 1200,
    launchPrice: 900,
    monthly: 149,
    features: [
      "Web catálogo",
      "Bot IA (pedidos)",
      "ERP (POS + Inventario)",
    ],
    recommended: true,
    whatsappIntent: "pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    listPrice: 1800,
    launchPrice: 1350,
    monthly: 249,
    features: [
      "E-commerce full",
      "Bot IA texto/voz",
      "ERP multisucursal",
      "Soporte prioritario",
    ],
    whatsappIntent: "enterprise",
  },
];

export function formatSoles(amount: number): string {
  return amount.toLocaleString("es-PE");
}

export function formatLaunchPrice(amount: number): string {
  return `S/ ${formatSoles(amount)}`;
}

export function formatMonthly(amount: number): string {
  return `S/ ${formatSoles(amount)} / mes`;
}

export function formatPricesSummary(): string {
  const impl = PACKAGES.map(
    (p) => `${p.name} ${formatLaunchPrice(p.launchPrice)}`,
  ).join(", ");
  const monthly = PACKAGES.map((p) => formatSoles(p.monthly)).join(" / ");
  return `${impl}. Mensualidad: S/ ${monthly}.`;
}

export function getPackageById(id: PackageId): Package | undefined {
  return PACKAGES.find((pkg) => pkg.id === id);
}
