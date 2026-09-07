"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { useCursorTarget } from "@/components/providers/CursorContext";
import { useTransitionLabel } from "@/components/providers/TransitionLabelContext";
import { easeCinematic } from "@/lib/motion";
import type { Project } from "@/types/project";

function IndexRow({
  project,
  index,
  isActive,
  onActivate,
  headingLevel: Heading,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  headingLevel: "h2" | "h3";
}) {
  const cursorProps = useCursorTarget("View");
  const { setLabel } = useTransitionLabel();

  return (
    <Link
      href={`/work/${project.slug}`}
      onClick={() => setLabel(project.title)}
      onFocus={onActivate}
      className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 border-b border-line py-8 transition-colors first:pt-0 sm:grid-cols-[3rem_1fr_auto_auto]"
      {...cursorProps}
      onMouseEnter={() => {
        onActivate();
        cursorProps.onMouseEnter();
      }}
    >
      <span className="font-mono text-xs text-ink-muted">
        {String(index + 1).padStart(2, "0")}
      </span>

      <Heading
        className={`font-serif text-3xl italic transition-colors duration-500 ease-out-expo sm:text-5xl ${
          isActive ? "text-ink" : "text-ink-muted group-hover:text-ink"
        }`}
      >
        {project.title}
      </Heading>

      <span className="hidden gap-2 sm:flex">
        {project.tags
          .filter((tag) => tag !== project.category)
          .slice(0, 2)
          .map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </span>

      <span className="flex items-center gap-2 justify-self-end text-sm text-ink-muted">
        {project.category
          ? `${project.category} · ${project.year}`
          : project.year}
        <ArrowUpRight className="size-4 -translate-y-0.5 translate-x-0 opacity-0 transition-all duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:translate-y-0 group-hover:opacity-100" />
      </span>
    </Link>
  );
}

export function WorkIndex({
  projects,
  headingLevel = "h3",
}: {
  projects: Project[];
  headingLevel?: "h2" | "h3";
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_22rem]">
      <div>
        {projects.map((project, index) => (
          <IndexRow
            key={project.slug}
            project={project}
            index={index}
            isActive={index === activeIndex}
            onActivate={() => setActiveIndex(index)}
            headingLevel={headingLevel}
          />
        ))}
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-28 aspect-[4/5] w-full overflow-hidden rounded-lg bg-canvas-muted">
          <AnimatePresence mode="wait">
            <motion.div
              key={projects[activeIndex]?.slug}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: easeCinematic }}
              className="flex h-full w-full flex-col justify-end p-6"
            >
              {projects[activeIndex]?.coverImage && (
                <div className="relative mb-5 w-full flex-1">
                  <Image
                    src={projects[activeIndex].coverImage}
                    alt={projects[activeIndex].coverAlt ?? ""}
                    fill
                    sizes="22rem"
                    quality={95}
                    className="object-contain"
                  />
                </div>
              )}
              <p className="text-sm leading-relaxed text-ink-muted">
                {projects[activeIndex]?.summary}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
