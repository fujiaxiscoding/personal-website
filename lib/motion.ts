export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

/** Slower, more deliberate ease used for full-bleed/cinematic transitions. */
export const easeCinematic = [0.65, 0, 0.15, 1] as const;

export const duration = {
  fast: 0.3,
  base: 0.5,
  slow: 0.7,
  cinematic: 1.1,
} as const;

/** Character/line mask-reveal variants for headline typography. */
export const maskReveal = {
  hidden: { y: "110%" },
  visible: (delay = 0) => ({
    y: "0%",
    transition: { duration: 0.9, delay, ease: easeCinematic },
  }),
} as const;
