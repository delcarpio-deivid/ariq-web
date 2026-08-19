type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-brand-accent px-3 py-1 font-body text-xs font-medium text-brand-primary ${className}`.trim()}
    >
      {children}
    </span>
  );
}
