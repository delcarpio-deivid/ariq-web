"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function HeroIsotipo() {
  return (
    <div className="flex justify-center lg:justify-end">
      <motion.div
        className="relative flex size-56 items-center justify-center rounded-3xl bg-white shadow-md ring-1 ring-brand-primary/10 sm:size-72"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/brand/ariq-isotipo.svg"
          alt="Isotipo ARIQ Labs"
          width={208}
          height={208}
          priority
          className="size-40 sm:size-52"
        />
      </motion.div>
    </div>
  );
}
