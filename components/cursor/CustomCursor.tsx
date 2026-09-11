"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useCursor } from "@/components/providers/CursorContext";

export function CustomCursor() {
  const { enabled, state } = useCursor();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    if (!enabled) return;

    function handleMove(event: MouseEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200] will-change-transform mix-blend-difference"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{
          width: state.active ? (state.label ? 72 : 44) : 10,
          height: state.active ? (state.label ? 72 : 44) : 10,
        }}
        transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center rounded-full bg-canvas"
      >
        <AnimatePresence>
          {state.active && state.label ? (
            <motion.span
              key={state.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="text-[11px] font-medium uppercase tracking-wide text-ink"
            >
              {state.label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
