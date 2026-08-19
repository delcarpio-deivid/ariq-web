"use client";

import { motion } from "motion/react";

export function HeroBackground() {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute -top-24 right-0 size-64 rounded-full bg-brand-secondary/10 blur-3xl"
        aria-hidden
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-16 left-0 size-48 rounded-full bg-brand-accent/10 blur-3xl"
        aria-hidden
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </>
  );
}
