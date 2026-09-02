import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const LEGAL_FOOTNOTE =
  "Precios en Soles (PEN). Oferta Socios Fundadores −25% en implementación, 5 cupos, vigente por tiempo limitado. Descuento sujeto a testimonio autorizado. Mensualidades no incluidas en la promoción.";

export function Footer() {
  const whatsappHref = buildWhatsAppUrl("generic");

  return (
    <footer className="bg-brand-primary px-4 py-12 text-white sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <a
          href="#"
          className="inline-flex min-h-11 items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary"
          aria-label="ARIQ Labs — inicio"
        >
          <Image
            src="/brand/ariq-isotipo.svg"
            alt=""
            width={40}
            height={40}
            aria-hidden
          />
          <span className="font-heading text-xl font-semibold">ARIQ Labs</span>
        </a>

        <p className="font-body text-base text-white/80">Arequipa, Perú</p>

        <Button
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          aria-label="Escríbenos por WhatsApp"
        >
          Escríbenos
        </Button>

        <p className="font-body text-sm text-white/70">
          © 2026 ARIQ Labs. Todos los derechos reservados.
        </p>

        <p className="max-w-2xl font-body text-xs leading-relaxed text-white/60">
          {LEGAL_FOOTNOTE}
        </p>
      </div>
    </footer>
  );
}
