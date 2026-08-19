import { Card } from "@/components/ui/Card";
import { MapPin, MessageSquare, Package } from "lucide-react";

const PILLARS = [
  {
    icon: MapPin,
    title: "SEO Local + Web ultrarrápida",
    description:
      "Aparece en Google Maps y en las búsquedas de tu zona. Tu negocio visible cuando te buscan cerca.",
  },
  {
    icon: MessageSquare,
    title: "Bot de WhatsApp con IA",
    description:
      "Atiende pedidos y preguntas 24/7, aunque estés ocupado en el local. No pierdas ni una venta por no responder a tiempo.",
  },
  {
    icon: Package,
    title: "ERP/SaaS liviano",
    description:
      "Controla inventario y ventas (POS) desde el celular o la PC. Sabes qué tienes en stock sin cuadernos ni planillas.",
  },
] as const;

export function Servicios() {
  return (
    <section className="bg-[#EDF2FB] px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-bold text-brand-primary sm:text-4xl">
            Todo lo que tu pyme necesita
          </h2>
          <p className="mt-3 font-body text-lg text-brand-text">
            Tres pilares para vender más sin contratar más personal.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, description }) => (
            <li key={title}>
              <Card className="h-full">
                <span
                  className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-brand-secondary/10 text-brand-secondary"
                  aria-hidden
                >
                  <Icon className="size-6" strokeWidth={2} />
                </span>
                <h3 className="font-heading text-xl font-semibold text-brand-primary">
                  {title}
                </h3>
                <p className="mt-2 font-body text-base leading-relaxed text-brand-text">
                  {description}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
