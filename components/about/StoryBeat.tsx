"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function StoryBeat({
  number,
  title,
  description,
  isFirst = false,
}: {
  number: string;
  title: string;
  description: string;
  isFirst?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [32, 0]);

  return (
    <div
      ref={ref}
      className={cn(
        "flex min-h-[60vh] flex-col justify-center border-t border-line py-16",
        isFirst && "border-t-0",
      )}
    >
      <motion.div
        style={
          prefersReducedMotion ? undefined : { opacity, y }
        }
      >
        <span className="font-mono text-sm text-accent">{number}</span>
        <h3 className="mt-5 max-w-3xl font-serif text-4xl italic tracking-tight text-ink sm:text-6xl">
          {title}
        </h3>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
          {description}
        </p>
      </motion.div>
    </div>
  );
}
