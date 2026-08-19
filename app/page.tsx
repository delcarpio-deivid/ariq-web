export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 bg-brand-bg">
      <div className="w-full max-w-xl space-y-6 text-center">
        <p className="font-body text-sm uppercase tracking-widest text-brand-secondary">
          ARIQ Labs
        </p>
        <h1 className="font-heading text-4xl font-bold leading-tight text-brand-primary sm:text-5xl">
          Landing en construcción
        </h1>
        <p className="font-body text-lg text-brand-text">
          Theme de marca activo. El contenido comercial se implementará en la
          siguiente fase.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <span className="inline-flex h-12 items-center rounded-xl bg-brand-accent px-6 font-body font-medium text-brand-primary">
            CTA primario
          </span>
          <span className="inline-flex h-12 items-center rounded-xl border border-brand-secondary px-6 font-body font-medium text-brand-secondary">
            CTA secundario
          </span>
        </div>
      </div>
    </main>
  );
}
