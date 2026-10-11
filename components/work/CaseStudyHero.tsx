import { Tag } from "@/components/ui/Tag";
import { TextReveal } from "@/components/animations/TextReveal";
import type { Project } from "@/types/project";

export function CaseStudyHero({ project }: { project: Project }) {
  const meta = [
    { label: "Role", value: project.role },
    { label: "Timeline", value: project.timeline },
    { label: "Team", value: project.team },
    { label: "Tools", value: project.tools?.join(", ") },
  ].filter((item) => item.value);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <h1 className="mt-5 max-w-3xl font-serif text-4xl italic tracking-tight text-ink sm:text-6xl">
        <TextReveal lines={[project.title]} />
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
        {project.summary}
      </p>

      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-line py-8 sm:grid-cols-4 sm:gap-x-8">
        {meta.map((item) => (
          <div key={item.label} className="min-w-0">
            <dt className="text-xs uppercase tracking-[0.14em] text-ink-muted">
              {item.label}
            </dt>
            <dd className="mt-1 break-words text-sm text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
