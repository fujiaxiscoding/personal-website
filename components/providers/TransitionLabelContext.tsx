"use client";

import { createContext, useContext, useMemo, useRef } from "react";

type TransitionLabelContextValue = {
  /** Set the label to display on the curtain during the next route change. */
  setLabel: (label: string | null) => void;
  /** Read (and clear) the pending label. Intended for RouteCurtain only. */
  consumeLabel: () => string | null;
};

const TransitionLabelContext = createContext<TransitionLabelContextValue | null>(
  null,
);

export function TransitionLabelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const labelRef = useRef<string | null>(null);

  const value = useMemo<TransitionLabelContextValue>(
    () => ({
      setLabel: (label) => {
        labelRef.current = label;
      },
      consumeLabel: () => {
        const label = labelRef.current;
        labelRef.current = null;
        return label;
      },
    }),
    [],
  );

  return (
    <TransitionLabelContext.Provider value={value}>
      {children}
    </TransitionLabelContext.Provider>
  );
}

export function useTransitionLabel() {
  const ctx = useContext(TransitionLabelContext);
  if (!ctx) {
    throw new Error(
      "useTransitionLabel must be used within a TransitionLabelProvider",
    );
  }
  return ctx;
}
