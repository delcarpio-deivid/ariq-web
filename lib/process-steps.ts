export type ProcessStep = {
  step: number;
  title: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  { step: 1, title: "Contacto por WhatsApp" },
  { step: 2, title: "Propuesta personalizada" },
  { step: 3, title: "Pago 50% inicial" },
  { step: 4, title: "Implementación y entrega (10 días hábiles)" },
];
