import { Tag } from "@/components/ui/Tag";
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

      <h1 className="mt-4 max-w-3xl text-3xl font-medium tracking-tight text-ink sm:text-4xl">
        {project.title}
      </h1>

      <p className="mt-4 max-w-2xl text-lg text-ink-muted">{project.summary}</p>

      <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-line py-8 sm:grid-cols-4">
        {meta.map((item) => (
          <div key={item.label}>
            <dt className="text-xs uppercase tracking-wide text-ink-muted">
              {item.label}
            </dt>
            <dd className="mt-1 text-sm text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
