"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Light inertia over native scroll. Kept intentionally snappy so wheel input
 * still feels immediate — cinematic polish without the laggy “catch-up” feel.
 * Disabled under prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      // Higher lerp = closer to native. 0.12–0.2 is smooth but responsive.
      lerp: 0.18,
      duration: 0.6,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return null;
}
