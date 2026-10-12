"use client";

import Link from "next/link";
import { useCursorTarget } from "@/components/providers/CursorContext";
import { useTransitionLabel } from "@/components/providers/TransitionLabelContext";
import { HalftoneImage } from "@/components/ui/HalftoneImage";
import type { Project } from "@/types/project";

export function WorkTicket({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cursorProps = useCursorTarget("View");
  const { setLabel } = useTransitionLabel();
  const n = String(index + 1).padStart(2, "0");
  const ticketImage =
    project.ticketImage ?? project.coverImage ?? "/images/portrait.png";
  const ticketBackground = project.ticketBackground;

  return (
    <Link
      href={`/work/${project.slug}`}
      onClick={() => setLabel(project.title)}
      className="group relative block overflow-hidden rounded-xl text-[#f6f1e8] shadow-[0_24px_48px_-28px_rgba(70,55,40,0.55)] transition-transform duration-500 ease-out-expo hover:-translate-y-1.5"
      style={{ background: "#5e5145" }}
      {...cursorProps}
    >
      <div className="relative h-[460px] overflow-hidden rounded-t-xl">
        <div className="absolute inset-0 transition-opacity duration-[600ms] group-hover:opacity-0">
          <HalftoneImage
            src={ticketImage}
            gap={5}
            radius={70}
            ink="#f6f1e8"
            warm="#f0a283"
            imgBox={[0.18, 0.1, 0.64, 0.95]}
            lo={0.12}
            hi={0.95}
            invert
          />
        </div>

        <div
          className="absolute inset-0 scale-[1.08] bg-[#efe7da] bg-cover bg-center opacity-0 transition-[opacity,transform] duration-[700ms] ease-out-expo group-hover:scale-100 group-hover:opacity-100 group-hover:duration-[1200ms]"
          style={
            ticketBackground
              ? { backgroundImage: `url(${ticketBackground})` }
              : undefined
          }
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ticketImage}
          alt=""
          className="pointer-events-none absolute left-1/2 top-[56%] h-[84%] w-auto max-w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[22px] object-cover opacity-0 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] transition-opacity delay-100 duration-[700ms] group-hover:opacity-100"
        />

        <div className="pointer-events-none absolute left-6 right-6 top-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-[#f6f1e8]">
          <span>✦ {project.category ?? project.tags[0] ?? "Work"}</span>
          <span>{project.year}</span>
        </div>
      </div>

      <div
        className="pointer-events-none absolute left-[-12px] top-[448px] size-6 rounded-full bg-canvas"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[-12px] top-[448px] size-6 rounded-full bg-canvas"
        aria-hidden
      />
      <div
        className="mx-[18px] border-t-[1.5px] border-dashed border-[#8c7e70]"
        aria-hidden
      />

      <div className="flex flex-col gap-[18px] px-7 pb-[26px] pt-[22px]">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-[44px] italic leading-none tracking-tight">
            {project.title}
          </h3>
          <span className="shrink-0 font-serif text-[44px] italic leading-none text-[#f0a283]">
            {n}
          </span>
        </div>

        <p className="text-[14px] leading-[1.55] text-[#e3d9ca]">
          {project.summary}
        </p>

        <div className="grid grid-cols-3 gap-3 border-t border-[#7a6c5f] pt-4">
          {[
            { label: "Role", value: project.role ?? "—" },
            { label: "Timeline", value: project.timeline ?? "—" },
            {
              label: "Tools",
              value: project.tools?.join(", ") ?? "—",
            },
          ].map((field, i) => (
            <div
              key={field.label}
              className={
                i > 0 ? "border-l border-[#7a6c5f] pl-3" : undefined
              }
            >
              <div className="text-[10px] uppercase tracking-[0.14em] text-[#e3d9ca]">
                {field.label}
              </div>
              <div className="mt-1 font-mono text-xs leading-snug">
                {field.value}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 pt-1 font-mono text-[10px] uppercase tracking-[0.12em]">
          <span className="text-[#e3d9ca]">
            SEQ {n} · {project.title.toUpperCase()} · {project.year}
          </span>
          <span className="text-[#f6f1e8]">View case ↗</span>
        </div>
      </div>
    </Link>
  );
}

export function WorkTicketGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
      {projects.map((project, index) => (
        <WorkTicket key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
