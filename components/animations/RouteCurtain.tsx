"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { easeCinematic } from "@/lib/motion";
import { useTransitionLabel } from "@/components/providers/TransitionLabelContext";

/**
 * A full-viewport "curtain" that rises to cover the screen on every route
 * change, briefly holds (showing a title card when one has been set by the
 * clicked link), then recedes to reveal the new page top-down. Purely
 * decorative — disabled entirely under prefers-reduced-motion.
 */
export function RouteCurtain() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const { consumeLabel } = useTransitionLabel();

  const panelControls = useAnimationControls();
  const [label, setLabel] = useState<string | null>(null);
  const isFirstRender = useRef(true);
  const runIdRef = useRef(0);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (prefersReducedMotion) return;

    const runId = ++runIdRef.current;
    const activeLabel = consumeLabel();

    async function run() {
      await panelControls.start({
        scaleY: 1,
        transition: { duration: 0.55, ease: easeCinematic },
      });
      if (runIdRef.current !== runId) return;
      setLabel(activeLabel);
      await new Promise((resolve) =>
        setTimeout(resolve, activeLabel ? 480 : 160),
      );
      if (runIdRef.current !== runId) return;
      setLabel(null);
      await panelControls.start({
        scaleY: 0,
        transition: { duration: 0.6, ease: easeCinematic, delay: 0.05 },
      });
    }

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (prefersReducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
    >
      <motion.div
        initial={{ scaleY: 0 }}
        animate={panelControls}
        style={{ transformOrigin: "bottom" }}
        className="absolute inset-0 bg-ink"
      />
      <motion.div
        initial={false}
        animate={{ opacity: label ? 1 : 0 }}
        transition={{ duration: 0.35, ease: easeCinematic }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {label ? (
          <span className="px-6 text-center font-serif text-4xl italic text-canvas sm:text-6xl">
            {label}
          </span>
        ) : null}
      </motion.div>
    </div>
  );
}
