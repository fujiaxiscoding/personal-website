"use client";

import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { useCursorTarget } from "@/components/providers/CursorContext";
import { useTransitionLabel } from "@/components/providers/TransitionLabelContext";
import type { Project } from "@/types/project";

export function ProjectCard({
  project,
  headingLevel: Heading = "h3",
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
}) {
  const cursorProps = useCursorTarget("View");
  const { setLabel } = useTransitionLabel();

  return (
    <Link
      href={`/work/${project.slug}`}
      onClick={() => setLabel(project.title)}
      className="group block transition-transform duration-500 ease-out-expo hover:-translate-y-1"
      {...cursorProps}
    >
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-canvas-muted transition-transform duration-500 ease-out-expo group-hover:scale-[1.02]" />

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <Heading className="font-serif text-lg italic text-ink">
            {project.title}
          </Heading>
          <p className="mt-1 text-sm text-ink-muted">{project.summary}</p>
        </div>
        <span className="shrink-0 text-sm text-ink-muted">{project.year}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Link>
  );
}
