import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  formatLaunchPrice,
  formatMonthly,
  formatSoles,
  type Package,
} from "@/lib/packages";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Check } from "lucide-react";

type PreciosTableProps = {
  packages: Package[];
};

export function PreciosTable({ packages }: PreciosTableProps) {
  return (
    <section
      id="precios"
      className="scroll-mt-24 bg-brand-bg px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <Badge className="mb-4 px-4 py-1.5 text-sm">
            Programa Socios Fundadores Arequipa · −25% · 5 cupos
          </Badge>
          <h2 className="font-heading text-3xl font-bold text-brand-primary sm:text-4xl">
            Paquetes y precios
          </h2>
          <p className="mt-3 font-body text-base text-brand-text">
            Precios en Soles (PEN). El descuento aplica al pago único de
            implementación, no a la mensualidad. Hasta agotar 5 cupos.
          </p>
        </div>

        <ul className="grid gap-6 lg:grid-cols-3 lg:items-center">
          {packages.map((pkg) => (
            <li key={pkg.id} className={pkg.recommended ? "lg:-my-2" : undefined}>
              <Card elevated={pkg.recommended} className="h-full">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <h3 className="font-heading text-xl font-semibold text-brand-primary">
                    {pkg.name}
                  </h3>
                  {pkg.recommended ? (
                    <span className="font-body text-xs font-medium text-brand-secondary">
                      Recomendado
                    </span>
                  ) : null}
                </div>

                <p className="font-body text-sm text-brand-text/80 line-through">
                  S/ {formatSoles(pkg.listPrice)}
                </p>
                <p className="font-heading text-3xl font-bold text-brand-primary">
                  {formatLaunchPrice(pkg.launchPrice)}
                </p>
                <p className="mt-1 font-body text-sm text-brand-text">
                  + {formatMonthly(pkg.monthly)}
                </p>

                <ul className="mt-6 flex flex-1 flex-col gap-2">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 font-body text-sm text-brand-text"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-brand-accent"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  href={buildWhatsAppUrl(pkg.whatsappIntent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={pkg.recommended ? "primary" : "secondary"}
                  className="mt-8 w-full"
                  aria-label={`Elegir paquete ${pkg.name} — contactar por WhatsApp`}
                >
                  Elegir {pkg.name}
                </Button>
              </Card>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center font-body text-xs text-brand-text/80">
          Oferta de lanzamiento por tiempo limitado. Mensualidades no incluidas
          en el descuento del −25%.
        </p>
      </div>
    </section>
  );
}
