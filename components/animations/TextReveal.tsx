"use client";

import { motion } from "framer-motion";
import { easeCinematic } from "@/lib/motion";

/**
 * Masks each line of text behind overflow-hidden and slides it up into view,
 * staggered line by line — the editorial "headline reveal" used across
 * hero and section-opening moments.
 */
export function TextReveal({
  lines,
  className,
  delay = 0,
  stagger = 0.1,
}: {
  lines: string[];
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <span className={className}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden py-[0.05em]">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.9,
              delay: delay + index * stagger,
              ease: easeCinematic,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
