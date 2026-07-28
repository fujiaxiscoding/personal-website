import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/work/ProjectCard";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerList, StaggerItem } from "@/components/animations/StaggerList";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Work — ${siteConfig.name}`,
  description: `Selected product design case studies by ${siteConfig.name}.`,
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <Section className="pb-28 pt-16 sm:pt-24">
      <PageContainer>
        <FadeIn>
          <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Work
          </h1>
          <p className="mt-4 max-w-xl text-base text-ink-muted">
            A selection of product design projects spanning 0→1 products,
            research tools, and platform design.
          </p>
        </FadeIn>

        <StaggerList className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} headingLevel="h2" />
            </StaggerItem>
          ))}
        </StaggerList>
      </PageContainer>
    </Section>
  );
}
