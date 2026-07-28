"use client";

import { motion } from "framer-motion";
import { duration as durationTokens, easeOutExpo } from "@/lib/motion";

export function FadeIn({
  children,
  delay = 0,
  y = 12,
  duration = durationTokens.base,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: easeOutExpo }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
