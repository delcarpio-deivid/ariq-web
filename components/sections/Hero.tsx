import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Hero() {
  const whatsappHref = buildWhatsAppUrl("generic");

  return (
    <section className="relative overflow-hidden bg-brand-bg px-4 py-16 sm:px-6 sm:py-24">
      <div
        className="pointer-events-none absolute -top-24 right-0 size-64 rounded-full bg-brand-secondary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 left-0 size-48 rounded-full bg-brand-accent/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6 text-center lg:text-left">
          <p className="font-body text-sm uppercase tracking-widest text-brand-secondary">
            Arequipa · Pymes locales
          </p>
          <h1 className="font-heading text-4xl font-bold leading-tight text-brand-primary sm:text-5xl">
            Automatiza tu WhatsApp y posiciónate primero en Google Maps
          </h1>
          <p className="font-body text-lg leading-relaxed text-brand-text">
            Web + Bot IA + ERP liviano en solo 10 días. Precios en soles, hecho
            en Arequipa para pymes locales.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              aria-label="Habla con nosotros por WhatsApp"
            >
              Habla con nosotros por WhatsApp
            </Button>
            <Button
              href="#precios"
              variant="secondary"
              aria-label="Ver paquetes y precios"
            >
              Ver paquetes y precios
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative flex size-56 items-center justify-center rounded-3xl bg-white shadow-md ring-1 ring-brand-primary/10 sm:size-72">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/ariq-isotipo.svg"
              alt="Isotipo ARIQ Labs"
              className="size-40 sm:size-52"
              width={208}
              height={208}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
