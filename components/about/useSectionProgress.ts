"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  SECTION_IDS,
  type SectionId,
} from "@/lib/foundations";

const READING_EDGE = 112;
const LOCK_MS = 1800;

function isSectionId(id: string): id is SectionId {
  return (SECTION_IDS as readonly string[]).includes(id);
}

/**
 * Keeps hero jump controls and the side progress line synchronized across
 * click, hash navigation, resize, and manual scroll.
 */
export function useSectionProgress() {
  const [activeId, setActiveId] = useState<SectionId>("film");
  const lockedId = useRef<SectionId | null>(null);
  const lockUntil = useRef(0);
  const ticking = useRef(false);

  const setActive = useCallback((id: SectionId) => {
    setActiveId(id);
  }, []);

  const updateFromScroll = useCallback(() => {
    if (lockedId.current && Date.now() < lockUntil.current) {
      setActive(lockedId.current);
      ticking.current = false;
      return;
    }
    lockedId.current = null;

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) {
      ticking.current = false;
      return;
    }

    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= READING_EDGE) {
        current = section;
      }
    }
    if (current?.id && isSectionId(current.id)) {
      setActive(current.id);
    }
    ticking.current = false;
  }, [setActive]);

  const requestUpdate = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    window.requestAnimationFrame(updateFromScroll);
  }, [updateFromScroll]);

  const navigateTo = useCallback(
    (id: SectionId) => {
      const target = document.getElementById(id);
      lockedId.current = id;
      lockUntil.current = Date.now() + LOCK_MS;
      setActive(id);
      history.replaceState(null, "", `#${id}`);
      if (target) {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
      window.setTimeout(requestUpdate, LOCK_MS + 20);
    },
    [requestUpdate, setActive],
  );

  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.slice(1);
      if (!isSectionId(id)) return;
      lockedId.current = id;
      lockUntil.current = Date.now() + LOCK_MS;
      setActive(id);
      window.setTimeout(requestUpdate, LOCK_MS + 20);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", onHashChange);

    let initialId = window.location.hash.slice(1);
    // V2 reference used #business; production anchors use #strategy.
    if (initialId === "business") {
      initialId = "strategy";
      history.replaceState(null, "", "#strategy");
    }
    if (isSectionId(initialId)) {
      lockedId.current = initialId;
      lockUntil.current = Date.now() + 1200;
      setActive(initialId);
      const target = document.getElementById(initialId);
      if (target) {
        // Instant jump on load/refresh so hash lands correctly before Lenis warms up.
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }
      window.setTimeout(requestUpdate, 1220);
    } else {
      updateFromScroll();
    }

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [requestUpdate, setActive, updateFromScroll]);

  return { activeId, navigateTo };
}
