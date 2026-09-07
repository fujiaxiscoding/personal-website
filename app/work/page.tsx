import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { WorkIndex } from "@/components/work/WorkIndex";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Work — ${siteConfig.name}`,
  description: `Selected product design case studies by ${siteConfig.name}.`,
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <Section className="pb-28 pt-24 sm:pt-32">
      <PageContainer>
        <h1 className="max-w-2xl font-serif text-4xl tracking-tight text-ink sm:text-5xl">
          <TextReveal lines={["Work"]} />
        </h1>
        <FadeIn delay={0.3}>
          <p className="mt-5 max-w-xl text-base text-ink-muted">
            A selection of product design projects spanning 0→1 products,
            research tools, and platform design.
          </p>
        </FadeIn>

        <div className="mt-16">
          <WorkIndex projects={projects} headingLevel="h2" />
        </div>
      </PageContainer>
    </Section>
  );
}
