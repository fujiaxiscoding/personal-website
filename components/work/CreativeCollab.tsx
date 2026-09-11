"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { creativeCollab } from "@/lib/creative-collab";

const SPARK_PATH =
  "M50 8c3.4 22.4 16.4 35.4 40 39-23.6 3.6-36.6 16.6-40 39-3.4-22.4-16.4-35.4-40-39 23.6-3.6 36.6-16.6 40-39z";

function BrandMark({ size = 28 }: { size?: number }) {
  const id = `cc-mark-${size}`;
  const radius = size >= 72 ? 18 : size >= 44 ? 11 : 6;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="shrink-0 overflow-hidden"
      style={{ borderRadius: radius }}
      aria-hidden
    >
      <defs>
        <mask id={id}>
          <rect width="100" height="100" fill="white" />
          <path
            d={SPARK_PATH}
            fill="black"
            transform="translate(50 50) scale(0.86) translate(-50 -50)"
          />
        </mask>
      </defs>
      <rect width="100" height="100" fill="#15100c" />
      <rect width="100" height="100" fill="#e2683f" mask={`url(#${id})`} />
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#b5533a]">
      {children}
    </p>
  );
}

function SectionShell({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28 lg:px-12 ${className}`}
    >
      {children}
    </section>
  );
}

function HeroPhone({
  src,
  alt,
  size = "md",
}: {
  src: string;
  alt: string;
  size?: "md" | "lg";
}) {
  const shell =
    size === "lg"
      ? "mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px]"
      : "mx-auto w-full max-w-[280px] sm:max-w-[320px]";
  const frame =
    size === "lg"
      ? "rounded-[2.8rem] p-[12px] sm:rounded-[3rem] sm:p-[14px]"
      : "rounded-[2.4rem] p-[10px]";
  const screen =
    size === "lg"
      ? "rounded-[2.2rem] sm:rounded-[2.4rem]"
      : "rounded-[1.9rem]";

  return (
    <div className={shell}>
      <div
        className={`border border-[rgba(140,80,40,0.18)] bg-[#241d17] shadow-[0_28px_60px_-28px_rgba(140,80,40,0.45)] ${frame}`}
      >
        <div
          className={`relative aspect-[390/812] overflow-hidden bg-[#17120e] ${screen}`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={size === "lg"}
            sizes={
              size === "lg"
                ? "(max-width: 640px) 340px, (max-width: 1024px) 400px, 460px"
                : "(max-width: 640px) 280px, 320px"
            }
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

function KindChip({ kind }: { kind: "cut" | "add" | "fix" | "shift" }) {
  const styles = {
    cut: "text-[#a63d3d] bg-[rgba(214,79,79,0.12)] border-[rgba(214,79,79,0.35)]",
    add: "text-[#2f8a5b] bg-[rgba(47,138,91,0.1)] border-[rgba(47,138,91,0.35)]",
    fix: "text-[#b5533a] bg-[rgba(181,83,58,0.1)] border-[rgba(181,83,58,0.35)]",
    shift: "text-[#9a6b1f] bg-[rgba(234,181,74,0.18)] border-[rgba(154,107,31,0.35)]",
  } as const;
  return (
    <span
      className={`inline-flex h-6 items-center justify-center rounded-md border px-2 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-medium uppercase tracking-[0.08em] ${styles[kind]}`}
    >
      {kind}
    </span>
  );
}

export function CreativeCollab() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [activeLoop, setActiveLoop] = useState(0);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const protoScale = useTransform(
    scrollYProgress,
    [0, 0.85],
    prefersReducedMotion ? [1, 1] : [1, 0.86],
  );
  const protoY = useTransform(
    scrollYProgress,
    [0, 0.85],
    prefersReducedMotion ? [0, 0] : [0, 48],
  );

  useEffect(() => {
    document.documentElement.classList.add("creative-collab-page");
    return () => document.documentElement.classList.remove("creative-collab-page");
  }, []);

  const data = creativeCollab;

  return (
    <div className="creative-collab -mx-6 bg-[#efe7da] text-[#241d17] sm:-mx-8 lg:-mx-12">
      {/* 01 HERO */}
      <header
        ref={heroRef}
        className="relative overflow-hidden px-6 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14 lg:px-12"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(226,104,63,0.16),transparent_68%)]"
        />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.55fr)] lg:items-center lg:gap-10 xl:gap-6">
          <div className="w-full max-w-md lg:max-w-none">
            <div className="mb-8 flex items-center gap-3">
              <BrandMark size={36} />
              <span className="font-[family-name:var(--font-bricolage)] text-lg font-extrabold tracking-[-0.02em]">
                Creative
                <span className="text-[#e2683f]">C</span>
                ollab
              </span>
            </div>
            <Eyebrow>Product Design · 0→1</Eyebrow>
            <h1 className="mt-4 font-[family-name:var(--font-bricolage)] text-4xl font-extrabold leading-[0.95] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              Creative
              <br />
              Collab
            </h1>
            <p className="mt-5 font-[family-name:var(--font-space-grotesk)] text-base leading-relaxed text-[#5f5548] sm:text-lg">
              {data.tagline}
            </p>
            <p className="mt-6 font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] uppercase tracking-[0.16em] text-[#8a7f70]">
              {data.role} · {data.year} · {data.location}
            </p>
            <a
              href={data.prototypeSrc}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#e2683f] px-5 py-2.5 text-sm font-semibold text-[#17120e] transition-opacity hover:opacity-90"
            >
              Open live prototype
            </a>
          </div>

          <motion.div
            style={{ scale: protoScale, y: protoY }}
            className="flex w-full origin-center justify-center lg:justify-end"
          >
            <div className="w-full max-w-[460px]">
              <HeroPhone
                size="lg"
                src="/images/work/creative-collab/hero-home.png"
                alt="Creative Collab home — featured Experimental Dance Film"
              />
              <p className="mt-4 text-center font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] uppercase tracking-[0.14em] text-[#8a7f70]">
                Product preview
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* 02 TRANSITION */}
      <SectionShell className="border-t border-[rgba(140,80,40,0.12)]">
        <Reveal>
          <Eyebrow>Why it needs to exist</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-bricolage)] text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
            Every existing path to find a collaborator fails the same way.
          </h2>
        </Reveal>
      </SectionShell>

      {/* 02b IMAGINE */}
      <SectionShell id="imagine" className="py-16 sm:py-24">
        <Reveal>
          <Eyebrow>{data.imagine.eyebrow}</Eyebrow>
          <div className="mt-6 max-w-2xl space-y-5 font-[family-name:var(--font-space-grotesk)] text-base leading-relaxed text-[#5f5548] sm:text-lg">
            {data.imagine.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal className="mt-14 sm:mt-20" delay={0.06}>
          <figure className="mx-auto w-full max-w-[min(100%,42rem)] sm:max-w-3xl lg:max-w-4xl">
            <Image
              src={data.imagine.image}
              alt={data.imagine.imageAlt}
              width={682}
              height={1024}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 48rem, 56rem"
              className="h-auto w-full rounded-[22px]"
            />
          </figure>
        </Reveal>
      </SectionShell>

      {/* 03 PROBLEM */}
      <SectionShell id="problem">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <p className="mt-3 max-w-2xl font-[family-name:var(--font-space-grotesk)] text-[#5f5548]">
            Existing tools are not designed for the moment a collaboration begins.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {data.problems.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.05}>
              <div className="rounded-[1.25rem] border border-[rgba(140,80,40,0.12)] bg-[#f9f4ec] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_22px_-12px_rgba(140,80,40,0.28)]">
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.7rem] uppercase tracking-[0.14em] text-[#9a6b1f]">
                  {item.label}
                </p>
                <p className="mt-3 font-[family-name:var(--font-space-grotesk)] text-[0.95rem] leading-relaxed text-[#5f5548]">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      {/* 04 TRUST GAP */}
      <SectionShell id="trust-gap" className="py-24 sm:py-32">
        <Reveal>
          <Eyebrow>The trust gap</Eyebrow>
        </Reveal>
        <div className="mt-10 grid gap-10 border-t border-[rgba(140,80,40,0.14)] pt-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.7rem] uppercase tracking-[0.16em] text-[#b5533a]">
              {data.trustGap.creator.role}
            </p>
            <p className="mt-4 font-[family-name:var(--font-bricolage)] text-3xl font-extrabold leading-tight tracking-[-0.02em] sm:text-4xl">
              “{data.trustGap.creator.quote}”
            </p>
            <p className="mt-5 text-sm leading-relaxed text-[#8a7f70]">
              {data.trustGap.creator.detail}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.7rem] uppercase tracking-[0.16em] text-[#9a6b1f]">
              {data.trustGap.collaborator.role}
            </p>
            <p className="mt-4 font-[family-name:var(--font-bricolage)] text-3xl font-extrabold leading-tight tracking-[-0.02em] sm:text-4xl">
              “{data.trustGap.collaborator.quote}”
            </p>
            <p className="mt-5 text-sm leading-relaxed text-[#8a7f70]">
              {data.trustGap.collaborator.detail}
            </p>
          </Reveal>
        </div>
      </SectionShell>

      {/* 05 INSIGHT */}
      <section className="relative flex min-h-[70vh] items-center justify-center px-6 py-28 sm:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(226,104,63,0.14),transparent_62%)]"
        />
        <Reveal className="relative max-w-4xl text-center">
          <Eyebrow>Key insight</Eyebrow>
          <h2 className="mt-6 font-[family-name:var(--font-bricolage)] text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            {data.insight}
          </h2>
        </Reveal>
      </section>

      {/* 06 THESIS */}
      <SectionShell id="thesis">
        <Reveal>
          <Eyebrow>Product thesis</Eyebrow>
          <p className="mt-4 max-w-2xl font-[family-name:var(--font-bricolage)] text-2xl font-bold leading-snug tracking-[-0.01em] sm:text-3xl">
            {data.thesis.summary}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <Reveal>
            <ul className="space-y-3">
              {data.thesis.not.map((item) => (
                <li
                  key={item}
                  className="border-b border-[rgba(140,80,40,0.12)] pb-3 font-[family-name:var(--font-space-grotesk)] text-[#8a7f70] line-through decoration-[#a89888]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.06}>
            <ul className="space-y-3">
              {data.thesis.is.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 border-b border-[rgba(47,138,91,0.28)] pb-3 font-[family-name:var(--font-space-grotesk)] text-[#241d17]"
                >
                  <span className="text-[#2f8a5b]">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </SectionShell>

      {/* 07 PRODUCT LOOP */}
      <SectionShell id="loop" className="py-24 sm:py-32">
        <Reveal>
          <Eyebrow>The product loop</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-bricolage)] text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            One continuous journey with a single pause.
          </h2>
        </Reveal>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="space-y-2">
            {data.loop.map((step, i) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveLoop(i)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition-colors ${
                  activeLoop === i
                    ? "border-[rgba(181,83,58,0.45)] bg-[#f9f4ec] shadow-[0_8px_22px_-12px_rgba(140,80,40,0.28)]"
                    : "border-[rgba(140,80,40,0.12)] bg-transparent hover:border-[rgba(226,104,63,0.28)]"
                }`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] text-[#b5533a]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-[family-name:var(--font-bricolage)] text-lg font-bold ${
                      activeLoop === i ? "text-[#b5533a]" : "text-[#241d17]"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                <p className="mt-2 pl-8 text-sm leading-relaxed text-[#8a7f70]">
                  {step.text}
                </p>
              </button>
            ))}
          </div>

          <div className="sticky top-24 mx-auto w-full max-w-[400px] lg:max-w-[440px]">
            <div className="overflow-hidden rounded-[2.4rem] border border-[rgba(140,80,40,0.18)] bg-[#241d17] p-3 shadow-[0_28px_60px_-28px_rgba(140,80,40,0.4)]">
              <div className="relative aspect-[390/812] overflow-hidden rounded-[1.9rem] bg-[#17120e]">
                {data.loop.map((step, i) => (
                  <Image
                    key={step.id}
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="440px"
                    className={`object-cover object-top transition-opacity duration-500 ${
                      activeLoop === i ? "opacity-100" : "opacity-0"
                    }`}
                    priority={i === 0}
                  />
                ))}
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-[#8a7f70]">
              Prefer the real thing?{" "}
              <a
                href={data.prototypeSrc}
                target="_blank"
                rel="noreferrer"
                className="text-[#b5533a] underline-offset-2 hover:underline"
              >
                Open live prototype
              </a>
            </p>
          </div>
        </div>
      </SectionShell>

      {/* 08 ITERATION */}
      <SectionShell id="iteration">
        <Reveal>
          <Eyebrow>Iteration log</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-bricolage)] text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            What changed, why it changed, and what it settled.
          </h2>
        </Reveal>

        <div className="mt-14 space-y-16">
          {data.iterations.map((phase) => (
            <Reveal key={phase.num}>
              <div className="grid gap-8 border-b border-[rgba(140,80,40,0.12)] pb-14 md:grid-cols-[7.5rem_1fr] md:gap-10">
                <div>
                  <span className="inline-block rounded bg-[#eab54a] px-2 py-1 font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] font-medium text-[#17120e]">
                    {phase.num}
                  </span>
                  <p className="mt-3 font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] uppercase tracking-[0.12em] text-[#8a7f70]">
                    {phase.stage}
                  </p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-bricolage)] text-2xl font-extrabold tracking-[-0.01em]">
                    {phase.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5f5548]">
                    {phase.intro}
                  </p>
                  <div className="mt-6 space-y-3">
                    {phase.changes.map((ch) => (
                      <div
                        key={ch.what}
                        className="grid gap-3 rounded-2xl border border-[rgba(140,80,40,0.12)] bg-[#f9f4ec] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_22px_-12px_rgba(140,80,40,0.22)] p-4 sm:grid-cols-[5.5rem_1fr]"
                      >
                        <KindChip kind={ch.kind} />
                        <div>
                          <p className="text-sm font-semibold">{ch.what}</p>
                          <p className="mt-1 text-[0.8rem] leading-relaxed text-[#8a7f70]">
                            {ch.why}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-xl border border-[rgba(47,138,91,0.28)] bg-[rgba(47,138,91,0.08)] px-4 py-3">
                    <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.6rem] uppercase tracking-[0.12em] text-[#2f8a5b]">
                      What it settled
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#5f5548]">
                      {phase.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <h3 className="font-[family-name:var(--font-bricolage)] text-xl font-bold">
            Things reversed along the way
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {data.reversals.map((rv) => (
              <div
                key={rv.title}
                className="rounded-2xl border border-[rgba(140,80,40,0.12)] bg-[#f9f4ec] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_22px_-12px_rgba(140,80,40,0.22)] p-5"
              >
                <p className="text-sm font-semibold">{rv.title}</p>
                <p className="mt-3 font-[family-name:var(--font-ibm-plex-mono)] text-[0.7rem]">
                  <span className="text-[#8a7f70] line-through">{rv.from}</span>
                  <span className="mx-2 text-[#8a7f70]">→</span>
                  <span className="text-[#2f8a5b]">{rv.to}</span>
                </p>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-[#8a7f70]">
                  {rv.why}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      {/* 09 DESIGN DECISIONS */}
      <SectionShell id="decisions">
        <Reveal>
          <Eyebrow>Key design decisions</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-bricolage)] text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            Decisions that lower the pressure.
          </h2>
        </Reveal>
        <div className="mt-14 space-y-16">
          {data.decisions.map((d, i) => (
            <Reveal key={d.title}>
              <article className="grid gap-6 border-t border-[rgba(140,80,40,0.14)] pt-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
                <div>
                  <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] text-[#b5533a]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-bricolage)] text-2xl font-extrabold tracking-[-0.01em]">
                    {d.title}
                  </h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.6rem] uppercase tracking-[0.14em] text-[#8a7f70]">
                      Insight
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#5f5548]">{d.insight}</p>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.6rem] uppercase tracking-[0.14em] text-[#8a7f70]">
                      Design decision
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-[#241d17]">
                      {d.decision}
                    </p>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.6rem] uppercase tracking-[0.14em] text-[#8a7f70]">
                      Product behavior
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#5f5548]">{d.behavior}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      {/* 10 DESIGN SYSTEM */}
      <SectionShell id="system">
        <Reveal>
          <Eyebrow>Design system v2</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-bricolage)] text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            The system behind the product.
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center gap-6 rounded-[1.25rem] border border-[rgba(140,80,40,0.12)] bg-[#f9f4ec] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_22px_-12px_rgba(140,80,40,0.22)] p-6">
          <BrandMark size={56} />
          <div>
            <p className="font-[family-name:var(--font-bricolage)] text-2xl font-extrabold tracking-[-0.02em]">
              Creative<span className="text-[#e2683f]">C</span>ollab
            </p>
            <p className="mt-1 text-sm text-[#8a7f70]">
              Coral tile · knockout spark · never drawn as a positive shape
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.designSystem.colors.map((c) => (
            <div key={c.name}>
              <div
                className="h-14 rounded-2xl"
                style={{ background: c.hex }}
              />
              <p className="mt-3 font-[family-name:var(--font-ibm-plex-mono)] text-xs font-semibold text-[#241d17]">
                {c.name} · {c.hex}
              </p>
              <p className="mt-1 text-[0.75rem] text-[#8a7f70]">{c.use}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {data.designSystem.type.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-[rgba(140,80,40,0.12)] bg-[#f9f4ec] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_22px_-12px_rgba(140,80,40,0.22)] p-5"
            >
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.6rem] uppercase tracking-[0.12em] text-[#b5533a]">
                {t.role}
              </p>
              <p className="mt-3 font-[family-name:var(--font-bricolage)] text-xl font-bold">
                {t.name}
              </p>
            </div>
          ))}
        </div>

        <ul className="mt-10 space-y-3">
          {data.designSystem.principles.map((p) => (
            <li
              key={p}
              className="flex gap-3 border-b border-[rgba(140,80,40,0.12)] pb-3 font-[family-name:var(--font-space-grotesk)] text-[#5f5548]"
            >
              <span className="text-[#b5533a]">✦</span>
              {p}
            </li>
          ))}
        </ul>
      </SectionShell>

      {/* 11 MVP */}
      <SectionShell id="mvp">
        <Reveal>
          <Eyebrow>MVP · where the build stands</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-bricolage)] text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            The smallest loop that proves the idea.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[1.25rem] border border-[rgba(47,138,91,0.28)] bg-[rgba(47,138,91,0.08)] p-6">
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] uppercase tracking-[0.14em] text-[#2f8a5b]">
                In the prototype
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#5f5548]">
                {data.mvp.inPrototype.map((item) => (
                  <li key={item}>→ {item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="h-full rounded-[1.25rem] border border-[rgba(140,80,40,0.14)] bg-[#f9f4ec] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_22px_-12px_rgba(140,80,40,0.22)]">
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] uppercase tracking-[0.14em] text-[#8a7f70]">
                Still to build
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#8a7f70]">
                {data.mvp.stillToBuild.map((item) => (
                  <li key={item}>→ {item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* 12 ENDING */}
      <section className="relative px-6 py-28 sm:px-8 sm:py-36 lg:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(226,104,63,0.18),transparent_55%)]"
        />
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <BrandMark size={48} />
          </div>
          <p className="font-[family-name:var(--font-bricolage)] text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
            {data.ending}
          </p>
          <div className="mx-auto mt-14 flex justify-center">
            <HeroPhone
              src="/images/work/creative-collab/hero-home.png"
              alt="Creative Collab product preview"
            />
          </div>
          <a
            href={data.prototypeSrc}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full border border-[rgba(181,83,58,0.4)] px-5 py-2.5 text-sm font-semibold text-[#b5533a] transition-colors hover:bg-[rgba(181,83,58,0.08)]"
          >
            Open live prototype
          </a>
        </Reveal>
      </section>

      <div className="border-t border-[rgba(140,80,40,0.12)] px-6 py-10 text-center sm:px-8">
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] uppercase tracking-[0.16em] text-[#8a7f70]">
          Creative Collab · Product Design Case Study
        </p>
      </div>
    </div>
  );
}
