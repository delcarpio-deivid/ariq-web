import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

type SharedProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-accent text-brand-primary hover:opacity-90 focus-visible:ring-brand-secondary",
  secondary:
    "border border-brand-secondary bg-white text-brand-secondary hover:bg-[#2563EB1A] focus-visible:ring-brand-secondary",
};

const baseClasses =
  "inline-flex min-h-11 items-center justify-center rounded-xl px-6 font-body text-base font-medium transition-opacity focus-visible:outline-none focus-visible:ring-2";

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type LinkButtonProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonProps | LinkButtonProps) {
  const { variant = "primary", className = "", children, ...rest } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as LinkButtonProps;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonProps)}>
      {children}
    </button>
  );
}
