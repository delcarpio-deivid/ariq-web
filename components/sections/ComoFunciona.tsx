import { PROCESS_STEPS } from "@/lib/process-steps";

export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="scroll-mt-24 bg-[#EEF0F3] px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-brand-primary sm:text-4xl">
            De la idea a la entrega en 10 días
          </h2>
        </div>

        <ol className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
          {PROCESS_STEPS.map(({ step, title }, index) => (
            <li
              key={step}
              className="relative flex flex-1 flex-col items-center text-center lg:px-2"
            >
              {index < PROCESS_STEPS.length - 1 ? (
                <>
                  <span
                    className="absolute left-[calc(50%+1.75rem)] top-11 h-[calc(100%+2rem)] w-px bg-brand-secondary/25 lg:hidden"
                    aria-hidden
                  />
                  <span
                    className="absolute left-[calc(50%+2rem)] top-5 hidden h-px w-[calc(100%-4rem)] bg-brand-secondary/25 lg:block"
                    aria-hidden
                  />
                </>
              ) : null}

              <span className="relative z-10 inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-secondary font-heading text-lg font-bold text-white">
                {step}
              </span>
              <p className="mt-4 max-w-[14rem] font-body text-base font-medium leading-snug text-brand-primary">
                {title}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
