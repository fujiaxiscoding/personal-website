"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ScrollCue({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn("flex flex-col items-center gap-3", className)}
    >
      <span className="text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Scroll
      </span>
      <div className="h-10 w-px overflow-hidden bg-line">
        <motion.div
          className="h-full w-px bg-ink"
          initial={{ y: "-100%" }}
          animate={prefersReducedMotion ? { y: "0%" } : { y: ["-100%", "100%"] }}
          transition={
            prefersReducedMotion
              ? { duration: 0.3 }
              : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>
    </div>
  );
}
