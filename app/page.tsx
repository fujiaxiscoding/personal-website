import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/work/ProjectCard";
import { FadeIn } from "@/components/animations/FadeIn";
import { Reveal } from "@/components/animations/Reveal";
import { StaggerList, StaggerItem } from "@/components/animations/StaggerList";
import { siteConfig } from "@/lib/site-config";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <Section className="pb-12 pt-20 sm:pt-28">
        <PageContainer>
          <FadeIn>
            <p className="text-sm font-medium text-accent">{siteConfig.role}</p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl sm:leading-tight">
              {siteConfig.tagline}
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/work">
                View my work
                <ArrowRight className="size-4" />
              </Button>
              <Button href="/contact" variant="secondary">
                Get in touch
              </Button>
            </div>
          </FadeIn>
        </PageContainer>
      </Section>

      <Section className="border-t border-line">
        <PageContainer>
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Selected work
              </h2>
              <Link
                href="/work"
                className="group flex shrink-0 items-center gap-1 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                View all
                <ArrowRight className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>

          <StaggerList className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerList>
        </PageContainer>
      </Section>

      <Section className="border-t border-line">
        <PageContainer>
          <Reveal className="max-w-2xl">
            <h2 className="text-2xl font-medium tracking-tight text-ink">
              About me
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {siteConfig.bio}
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              More about me
              <ArrowRight className="size-3.5" />
            </Link>
          </Reveal>
        </PageContainer>
      </Section>

      <Section className="border-t border-line pb-28">
        <PageContainer>
          <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="max-w-md text-2xl font-medium tracking-tight text-ink">
              Interested in working together?
            </h2>
            <Button href="/contact">
              Get in touch
              <ArrowRight className="size-4" />
            </Button>
          </Reveal>
        </PageContainer>
      </Section>
    </>
  );
}
