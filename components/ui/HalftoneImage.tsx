"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type HalftoneImageProps = {
  src: string;
  gap?: number;
  radius?: number;
  ink: string;
  warm: string;
  imgBox?: [x: number, y: number, w: number, h: number];
  lo?: number;
  hi?: number;
  invert?: boolean;
  cutout?: number;
  taper?: number;
  interactive?: boolean;
  className?: string;
};

function hex(h: string): [number, number, number] {
  const m = /^#?([0-9a-f]{6})$/i.exec((h || "").trim());
  if (!m) return [24, 24, 20];
  return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16)) as [
    number,
    number,
    number,
  ];
}

const imgCache = new Map<string, Promise<HTMLImageElement | null>>();

function loadImg(src: string) {
  const hit = imgCache.get(src);
  if (hit) return hit;
  const p = new Promise<HTMLImageElement | null>((res) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = () => res(null);
    i.src = src;
  });
  imgCache.set(src, p);
  return p;
}

export function HalftoneImage({
  src,
  gap = 7,
  radius = 96,
  ink,
  warm,
  imgBox = [0, 0, 1, 1],
  lo = 0.25,
  hi = 0.92,
  invert = false,
  cutout = 0,
  taper = 0,
  interactive = true,
  className,
}: HalftoneImageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const opts = useRef({
    src,
    gap,
    radius,
    ink,
    warm,
    imgBox,
    lo,
    hi,
    invert,
    cutout,
    taper,
    interactive,
  });
  opts.current = {
    src,
    gap,
    radius,
    ink,
    warm,
    imgBox,
    lo,
    hi,
    invert,
    cutout,
    taper,
    interactive,
  };

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let px = -1e5;
    let py = -1e5;
    let raf = 0;
    let lid = 0;
    let ring = { x: 0, y: 0, t: -1 };
    let dots = new Float32Array(0);
    let count = 0;
    let inkC = hex(ink);
    let warmC = hex(warm);

    const layout = async () => {
      const id = ++lid;
      const o = opts.current;
      const rect = root.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      const img = await loadImg(o.src);
      if (id !== lid) return;

      const gapPx = Math.max(3, o.gap);
      const cols = Math.ceil(w / gapPx);
      const rows = Math.ceil(h / gapPx);

      let imgData: Uint8ClampedArray | null = null;
      if (img) {
        const m = document.createElement("canvas");
        m.width = w;
        m.height = h;
        const c = m.getContext("2d", { willReadFrequently: true });
        if (c) {
          c.fillStyle = o.invert ? "#000" : "#fff";
          c.fillRect(0, 0, w, h);
          const [ix, iy, iw, ih] = o.imgBox;
          const bx = ix * w;
          const by = iy * h;
          const bw = iw * w;
          const bh = ih * h;
          const s = Math.max(bw / img.width, bh / img.height);
          const dw = img.width * s;
          const dh = img.height * s;
          c.save();
          c.beginPath();
          c.rect(bx, by, bw, bh);
          c.clip();
          c.drawImage(img, bx + (bw - dw) / 2, by + (bh - dh) / 2, dw, dh);
          c.restore();
          imgData = c.getImageData(0, 0, w, h).data;
        }
      }

      const tmp: number[] = [];
      const taperAmt = Math.max(0, Math.min(1, o.taper));
      const cut = o.cutout;
      let bg: Uint8Array | null = null;

      if (cut > 0 && imgData) {
        const C = 14;
        const cc = Math.ceil(w / C);
        const cr = Math.ceil(h / C);
        const mx = new Float32Array(cc * cr);
        for (let y = 0; y < h; y += 2) {
          for (let x = 0; x < w; x += 2) {
            const k = (y * w + x) * 4;
            const v =
              1 -
              (0.299 * imgData[k] +
                0.587 * imgData[k + 1] +
                0.114 * imgData[k + 2]) /
                255;
            const i = ((y / C) | 0) * cc + ((x / C) | 0);
            if (v > mx[i]) mx[i] = v;
          }
        }
        const cb = new Uint8Array(cc * cr);
        const q: number[] = [];
        const push = (i: number) => {
          if (!cb[i] && mx[i] < cut) {
            cb[i] = 1;
            q.push(i);
          }
        };
        for (let x = 0; x < cc; x++) {
          push(x);
          push((cr - 1) * cc + x);
        }
        for (let y = 0; y < cr; y++) {
          push(y * cc);
          push(y * cc + cc - 1);
        }
        while (q.length) {
          const i = q.pop()!;
          const x = i % cc;
          const y = (i / cc) | 0;
          if (x > 0) push(i - 1);
          if (x < cc - 1) push(i + 1);
          if (y > 0) push(i - cc);
          if (y < cr - 1) push(i + cc);
        }
        bg = new Uint8Array(cols * rows);
        for (let gy = 0; gy < rows; gy++) {
          for (let gx = 0; gx < cols; gx++) {
            const x = Math.min(w - 1, gx * gapPx + gapPx / 2);
            const y = Math.min(h - 1, gy * gapPx + gapPx / 2);
            bg[gy * cols + gx] = cb[((y / C) | 0) * cc + ((x / C) | 0)];
          }
        }
      }

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          if (bg && bg[gy * cols + gx]) continue;
          let dk = 0;
          for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
              const x = Math.min(
                w - 1,
                Math.floor(gx * gapPx + ((sx + 0.5) * gapPx) / 3),
              );
              const y = Math.min(
                h - 1,
                Math.floor(gy * gapPx + ((sy + 0.5) * gapPx) / 3),
              );
              const k = (y * w + x) * 4;
              if (imgData) {
                const L =
                  (0.299 * imgData[k] +
                    0.587 * imgData[k + 1] +
                    0.114 * imgData[k + 2]) /
                  255;
                dk += o.invert ? L : 1 - L;
              }
            }
          }
          dk /= 9;
          const dn = Math.max(0, Math.min(1, (dk - o.lo) / (o.hi - o.lo)));
          if (dn < 0.06) continue;
          const hx = gx * gapPx + gapPx / 2;
          const hy = gy * gapPx + gapPx / 2;
          let rad = Math.sqrt(Math.min(1, dn)) * gapPx * 0.56;
          if (taperAmt > 0) {
            const f = Math.min(1, (1 - hy / h) / taperAmt);
            rad *= f * f * (3 - 2 * f);
          }
          if (rad < 0.35) continue;
          tmp.push(hx, hy, 0, 0, hx, hy, rad);
        }
      }

      dots = new Float32Array(tmp);
      count = tmp.length / 7;
      inkC = hex(o.ink);
      warmC = hex(o.warm);
      cancelAnimationFrame(raf);
      raf = 0;
      draw(performance.now());
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame((t) => draw(t));
    };

    const draw = (now: number) => {
      raf = 0;
      if (!ctx || !inkC) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const o = opts.current;
      const r = !o.interactive || reduced ? 0 : Math.max(0, o.radius);
      const age = ring.t < 0 ? 1e9 : now - ring.t;
      const rr = age * 0.9;
      let moving = false;

      for (let i = 0; i < count; i++) {
        const j = i * 7;
        let x = dots[j];
        let y = dots[j + 1];
        let vx = dots[j + 2];
        let vy = dots[j + 3];
        const hx = dots[j + 4];
        const hy = dots[j + 5];

        if (!reduced) {
          if (age < 900) {
            const dx = hx - ring.x;
            const dy = hy - ring.y;
            const dd = Math.sqrt(dx * dx + dy * dy) + 0.001;
            const band = 1 - Math.min(1, Math.abs(dd - rr) / 26);
            if (band > 0) {
              const f = band * 3.2 * (1 - age / 900);
              vx += (dx / dd) * f;
              vy += (dy / dd) * f;
            }
          }
          const dx = x - px;
          const dy = y - py;
          const d2 = dx * dx + dy * dy;
          if (r > 0 && d2 < r * r) {
            const dd = Math.sqrt(d2) + 0.001;
            const f = (1 - dd / r) * 2.6;
            vx += (dx / dd) * f;
            vy += (dy / dd) * f;
          }
          vx = (vx + (hx - x) * 0.05) * 0.84;
          vy = (vy + (hy - y) * 0.05) * 0.84;
          x += vx;
          y += vy;
          if (
            Math.abs(vx) + Math.abs(vy) > 0.02 ||
            Math.abs(x - hx) + Math.abs(y - hy) > 0.05
          ) {
            moving = true;
          } else {
            x = hx;
            y = hy;
            vx = 0;
            vy = 0;
          }
          dots[j] = x;
          dots[j + 1] = y;
          dots[j + 2] = vx;
          dots[j + 3] = vy;
        } else {
          x = hx;
          y = hy;
        }

        const k = Math.min(1, Math.hypot(x - hx, y - hy) / 28);
        ctx.fillStyle =
          k > 0.02
            ? `rgb(${Math.round(inkC[0] + (warmC[0] - inkC[0]) * k)},${Math.round(inkC[1] + (warmC[1] - inkC[1]) * k)},${Math.round(inkC[2] + (warmC[2] - inkC[2]) * k)})`
            : `rgb(${inkC[0]},${inkC[1]},${inkC[2]})`;
        ctx.beginPath();
        ctx.arc(x, y, dots[j + 6], 0, 6.2832);
        ctx.fill();
      }

      if (!reduced && (moving || age < 900)) wake();
    };

    const onMove = (e: PointerEvent) => {
      if (!opts.current.interactive) return;
      const b = canvas.getBoundingClientRect();
      const s = b.width / (w || 1);
      px = (e.clientX - b.left) / s;
      py = (e.clientY - b.top) / s;
      wake();
    };
    const onLeave = () => {
      px = -1e5;
      py = -1e5;
      wake();
    };
    const onDown = (e: PointerEvent) => {
      if (!opts.current.interactive || reduced) return;
      if ((e.target as HTMLElement | null)?.closest?.("a,button")) return;
      const b = canvas.getBoundingClientRect();
      const s = b.width / (w || 1);
      const x = (e.clientX - b.left) / s;
      const y = (e.clientY - b.top) / s;
      if (x < 0 || y < 0 || x > w || y > h) return;
      ring = { x, y, t: performance.now() };
      wake();
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    const ro = new ResizeObserver(() => {
      void layout();
    });
    ro.observe(root);
    void (document.fonts?.ready ?? Promise.resolve()).then(() => layout());
    void layout();

    return () => {
      lid++;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [src, gap, radius, ink, warm, lo, hi, invert, cutout, taper, interactive, imgBox.join(",")]);

  return (
    <div
      ref={rootRef}
      className={cn("absolute inset-0 h-full w-full", className)}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full max-w-none"
      />
    </div>
  );
}
