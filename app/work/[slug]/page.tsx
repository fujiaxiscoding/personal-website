import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { CaseStudyHero } from "@/components/work/CaseStudyHero";
import { PrevNextProject } from "@/components/work/PrevNextProject";
import { FadeIn } from "@/components/animations/FadeIn";
import { Reveal } from "@/components/animations/Reveal";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { getProjectSource } from "@/lib/mdx";
import { siteConfig } from "@/lib/site-config";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${siteConfig.name}`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { content } = getProjectSource(slug);
  const allProjects = getAllProjects();
  const index = allProjects.findIndex((p) => p.slug === slug);
  const prev = allProjects[index + 1];
  const next = allProjects[index - 1];

  return (
    <Section className="pb-28 pt-16 sm:pt-24">
      <PageContainer>
        <FadeIn>
          <CaseStudyHero project={project} />
        </FadeIn>

        <Reveal className="mt-4 max-w-2xl">
          <MDXRemote source={content} components={mdxComponents} />
        </Reveal>

        <PrevNextProject prev={prev} next={next} />
      </PageContainer>
    </Section>
  );
}
