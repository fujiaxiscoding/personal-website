"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeCinematic } from "@/lib/motion";

const SESSION_KEY = "jf-visited";
const MIN_DURATION = 1200;

/**
 * A branded, session-gated loading screen. A synchronous inline script in
 * <head> (see app/layout.tsx) hides #loading-screen instantly via CSS on
 * repeat visits within the same session, so this component never causes a
 * flash — it only needs to handle the animated first-visit case here.
 */
export function LoadingScreen() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [removed, setRemoved] = useState(false);
  const [progress, setProgress] = useState(4);

  useEffect(() => {
    // Both of these cases are already hidden instantly via CSS (see
    // globals.css and the inline script in app/layout.tsx head) — we only
    // need to persist the session flag here, never touch React state.
    const alreadySkipped = document.documentElement.classList.contains(
      "preloader-skip",
    );
    if (alreadySkipped || prefersReducedMotion) {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // sessionStorage unavailable (private mode, etc.) — fail silently
      }
      return;
    }

    document.body.style.overflow = "hidden";
    const start = Date.now();
    let frame = 0;

    function tick() {
      const elapsed = Date.now() - start;
      const eased = Math.min(
        96,
        Math.round((1 - Math.pow(1 - elapsed / MIN_DURATION, 2)) * 96),
      );
      setProgress((prev) => Math.max(prev, eased));
      if (elapsed < MIN_DURATION) {
        frame = requestAnimationFrame(tick);
      }
    }
    frame = requestAnimationFrame(tick);

    const fontsReady =
      "fonts" in document ? document.fonts.ready : Promise.resolve();
    const minTimer = new Promise((resolve) =>
      setTimeout(resolve, MIN_DURATION),
    );

    Promise.all([fontsReady, minTimer]).then(() => {
      cancelAnimationFrame(frame);
      setProgress(100);
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
      setTimeout(() => setVisible(false), 300);
    });

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (removed) return null;

  return (
    <div id="loading-screen">
      <AnimatePresence onExitComplete={() => setRemoved(true)}>
        {visible ? (
          <motion.div
            key="loader"
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.7, ease: easeCinematic }}
            style={{ transformOrigin: "top" }}
            className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-6 bg-ink text-canvas"
          >
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeCinematic }}
              className="font-serif text-4xl italic sm:text-5xl"
            >
              JF
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-mono text-xs tabular-nums tracking-widest"
            >
              {String(progress).padStart(2, "0")}%
            </motion.span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
