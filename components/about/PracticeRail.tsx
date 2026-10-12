"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Auto-drifting gallery rail. The image set is rendered twice and the track
 * loops seamlessly. Images keep their natural aspect ratio (no cropping):
 * height comes from CSS, width follows the image.
 * Pauses on hover / focus / when off-screen; static for reduced-motion users.
 */
export function PracticeRail({
  title,
  subtitle,
  images,
  railClassName,
  imageClassName,
  speed = 28, // px per second
  reverse = false,
}: {
  title: string;
  subtitle: string;
  images: readonly { src: string; alt: string }[];
  railClassName?: string;
  imageClassName?: string;
  speed?: number;
  reverse?: boolean;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const nudge = useRef(0);
  const paused = useRef(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let visible = true;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const half = track.scrollWidth / 2;
      if (half > 0) {
        // arrow nudges ease in on top of the drift
        const step = nudge.current * 0.12;
        nudge.current -= step;
        const drift = paused.current || reduced ? 0 : speed * dt * (reverse ? -1 : 1);
        offset.current = (((offset.current + drift + step) % half) + half) % half;
        track.style.transform = `translate3d(${-offset.current}px,0,0)`;
      }
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(viewport);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [speed, reverse]);

  const pause = (v: boolean) => () => {
    paused.current = v;
  };

  const loop = [...images, ...images];

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
            onClick={() => (nudge.current -= 420)}
            className="flex size-[34px] items-center justify-center rounded-full border border-line bg-canvas text-lg text-ink transition-colors hover:bg-canvas-muted"
          >
            ←
          </button>
          <button
            type="button"
            aria-label={`Scroll ${title} gallery right`}
            onClick={() => (nudge.current += 420)}
            className="flex size-[34px] items-center justify-center rounded-full border border-line bg-canvas text-lg text-ink transition-colors hover:bg-canvas-muted"
          >
            →
          </button>
        </div>
      </div>
      <div
        ref={viewportRef}
        onMouseEnter={pause(true)}
        onMouseLeave={pause(false)}
        onFocus={pause(true)}
        onBlur={pause(false)}
        className={cn("foundations-practice-rail overflow-hidden pb-3.5", railClassName)}
      >
        <div ref={trackRef} className="flex w-max gap-3 will-change-transform">
          {loop.map((image, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={image.src + i}
              src={image.src}
              alt={i < images.length ? image.alt : ""}
              aria-hidden={i >= images.length || undefined}
              loading="lazy"
              draggable={false}
              className={cn("foundations-practice-img shrink-0 rounded-lg", imageClassName)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
