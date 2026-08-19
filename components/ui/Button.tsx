"use client";

import { motion } from "motion/react";
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
  "inline-flex min-h-11 items-center justify-center rounded-xl px-6 font-body text-base font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2";

const motionInteraction = {
  whileHover: { scale: 1.02, boxShadow: "0 4px 14px rgba(37, 99, 235, 0.15)" },
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 400, damping: 25 },
};

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type LinkButtonProps = SharedProps &
  Pick<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "target" | "rel" | "aria-label" | "onClick" | "id"
  > & {
    href: string;
  };

export function Button(props: ButtonProps | LinkButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    const { href, target, rel, "aria-label": ariaLabel, onClick, id } = props;
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onClick={onClick}
        id={id}
        className={classes}
        {...motionInteraction}
      >
        {children}
      </motion.a>
    );
  }

  const {
    type = "button",
    disabled,
    "aria-label": ariaLabel,
    onClick,
    id,
  } = props as ButtonProps;

  return (
    <motion.button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      id={id}
      className={classes}
      {...motionInteraction}
    >
      {children}
    </motion.button>
  );
}
