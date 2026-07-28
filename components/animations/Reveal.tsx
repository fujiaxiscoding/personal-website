"use client";

import { motion } from "framer-motion";
import { duration as durationTokens, easeOutExpo } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  y = 16,
  duration = durationTokens.slow,
  amount = 0.3,
  once = true,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: easeOutExpo }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
