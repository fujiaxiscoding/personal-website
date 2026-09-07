"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";

type CursorState = {
  active: boolean;
  label?: string;
};

type CursorContextValue = {
  enabled: boolean;
  state: CursorState;
  setCursor: (state: CursorState) => void;
  resetCursor: () => void;
};

const defaultState: CursorState = { active: false };

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>(defaultState);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // A hovered link can unmount mid-navigation without ever firing
  // onMouseLeave (its target no longer exists on the new page), which would
  // otherwise leave a stale "active" cursor pill stuck on screen. Resetting
  // during render (rather than in an effect) avoids an extra cascading
  // render pass on every navigation.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setState(defaultState);
  }

  useEffect(() => {
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    function update() {
      const shouldEnable = fine.matches && !reduced.matches;
      setEnabled(shouldEnable);
      document.documentElement.classList.toggle(
        "has-custom-cursor",
        shouldEnable,
      );
    }

    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  const setCursor = useCallback((next: CursorState) => setState(next), []);
  const resetCursor = useCallback(() => setState(defaultState), []);

  const value = useMemo<CursorContextValue>(
    () => ({ enabled, state, setCursor, resetCursor }),
    [enabled, state, setCursor, resetCursor],
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return ctx;
}

/** Spread onto any interactive element to give the custom cursor context. */
export function useCursorTarget(label?: string) {
  const { setCursor, resetCursor } = useCursor();
  return {
    onMouseEnter: () => setCursor({ active: true, label }),
    onMouseLeave: () => resetCursor(),
  };
}
