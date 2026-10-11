"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

export function PracticeRail({
  title,
  subtitle,
  images,
  railClassName,
  imageClassName,
}: {
  title: string;
  subtitle: string;
  images: readonly { src: string; alt: string }[];
  railClassName?: string;
  imageClassName?: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = (delta: number) => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    railRef.current?.scrollBy({
      left: delta,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div>
      <div className="mb-3.5 flex items-end justify-between gap-5">
        <div>
          <h3 className="text-lg font-medium text-ink">{title}</h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
            {subtitle}
          </span>
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            aria-label={`Scroll ${title} gallery left`}
            onClick={() => scrollBy(-500)}
            className="flex size-[34px] items-center justify-center rounded-full border border-line bg-canvas text-lg text-ink transition-colors hover:bg-canvas-muted"
          >
            ←
          </button>
          <button
            type="button"
            aria-label={`Scroll ${title} gallery right`}
            onClick={() => scrollBy(500)}
            className="flex size-[34px] items-center justify-center rounded-full border border-line bg-canvas text-lg text-ink transition-colors hover:bg-canvas-muted"
          >
            →
          </button>
        </div>
      </div>
      <div
        ref={railRef}
        data-lenis-prevent
        className={cn(
          "foundations-practice-rail flex gap-3 overflow-x-auto overscroll-x-contain pb-3.5",
          railClassName,
        )}
      >
        {images.map((image) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className={cn(
              "foundations-practice-img shrink-0 snap-start rounded-lg bg-canvas-muted object-cover",
              imageClassName,
            )}
          />
        ))}
      </div>
    </div>
  );
}
