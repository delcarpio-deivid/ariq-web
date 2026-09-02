import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-primary/10 bg-brand-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
        <a
          href="#"
          className="inline-flex min-h-11 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
          aria-label="ARIQ Labs — inicio"
        >
          <Image
            src="/brand/ariq-isotipo.svg"
            alt=""
            width={36}
            height={36}
            priority
            aria-hidden
          />
          <span className="font-heading text-lg font-semibold text-brand-primary">
            ARIQ Labs
          </span>
        </a>
      </div>
    </header>
  );
}
