type CardProps = {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
};

export function Card({ children, className = "", elevated = false }: CardProps) {
  const elevation = elevated
    ? "border-brand-secondary shadow-md ring-2 ring-brand-secondary/20 sm:scale-[1.02]"
    : "border-brand-primary/10 shadow-sm";

  return (
    <article
      className={`flex flex-col rounded-2xl border bg-white p-6 ${elevation} ${className}`.trim()}
    >
      {children}
    </article>
  );
}
