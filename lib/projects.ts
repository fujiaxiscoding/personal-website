import { getProjectSlugs, getProjectSource } from "@/lib/mdx";
import type { Project } from "@/types/project";

export function getAllProjects(): Project[] {
  return getProjectSlugs()
    .map((slug) => {
      const { frontmatter } = getProjectSource(slug);
      return { slug, ...frontmatter } as Project;
    })
    .filter((project) => project.published !== false)
    .sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return Number(b.year) - Number(a.year);
    });
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}
