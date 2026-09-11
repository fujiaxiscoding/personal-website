"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Wraps a single interactive child (button/link) and gently pulls it toward
 * the cursor on hover. A small, high-end touch reserved for primary CTAs —
 * disabled under prefers-reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.3,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 700, damping: 38, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 700, damping: 38, mass: 0.2 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
