import { FAQ_ITEMS, type FaqItem } from "@/lib/faq";

type FAQProps = {
  items?: FaqItem[];
};

export function FAQ({ items = FAQ_ITEMS }: FAQProps) {
  return (
    <section
      id="faq"
      className="scroll-mt-24 bg-[#EDF2FB] px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center font-heading text-3xl font-bold text-brand-primary sm:text-4xl">
          Preguntas frecuentes
        </h2>

        <div className="space-y-3">
          {items.map(({ question, answer }, index) => (
            <details
              key={question}
              open={index === 0}
              className="group rounded-xl border border-brand-primary/10 bg-white shadow-sm"
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 font-body text-base font-medium text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                {question}
                <span
                  className="shrink-0 text-brand-secondary transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <div className="border-t border-brand-primary/5 px-5 py-4">
                <p className="font-body text-base leading-relaxed text-brand-text">
                  {answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
