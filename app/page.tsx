import Link from "next/link";
import { ArrowRight, Compass, MapPin, Sparkles } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { MetaBar } from "@/components/layout/MetaBar";
import { Button } from "@/components/ui/Button";
import { WorkIndex } from "@/components/work/WorkIndex";
import { FadeIn } from "@/components/animations/FadeIn";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollCue } from "@/components/animations/ScrollCue";
import { Magnetic } from "@/components/animations/Magnetic";
import { siteConfig } from "@/lib/site-config";
import { getFeaturedProjects } from "@/lib/projects";

const heroLines = [
  "I design thoughtful AI products",
  "that deepen how people connect —",
  "with themselves, each other, and the world.",
];

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <Section className="flex min-h-[88vh] flex-col justify-between pb-12 pt-28 sm:pt-32">
        <PageContainer className="flex flex-1 flex-col justify-center">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {siteConfig.role}
            </p>
          </FadeIn>

          <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-[1.08] tracking-tight text-ink sm:text-6xl sm:leading-[1.08] lg:text-7xl">
            <TextReveal lines={heroLines} delay={0.15} />
          </h1>

          <FadeIn delay={0.75}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Button href="/work">
                  View my work
                  <ArrowRight className="size-4" />
                </Button>
              </Magnetic>
              <Button href="/contact" variant="secondary">
                Get in touch
              </Button>
            </div>
          </FadeIn>
        </PageContainer>

        <PageContainer>
          <FadeIn delay={0.9} className="flex items-end justify-between gap-6">
            <MetaBar
              items={[
                { icon: MapPin, label: siteConfig.location },
                { icon: Sparkles, label: "Open to internships & new grad roles" },
                { icon: Compass, label: "Film · Anthropology · AI Design" },
              ]}
              className="max-w-xl"
            />
            <ScrollCue className="hidden shrink-0 sm:flex" />
          </FadeIn>
        </PageContainer>
      </Section>

      <Section className="border-t border-line">
        <PageContainer>
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
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

          <div className="mt-10">
            <WorkIndex projects={featuredProjects} />
          </div>
        </PageContainer>
      </Section>

      <Section className="border-t border-line">
        <PageContainer>
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
              About me
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
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
            <h2 className="max-w-md font-serif text-3xl tracking-tight text-ink sm:text-4xl">
              Interested in working together?
            </h2>
            <Magnetic>
              <Button href="/contact">
                Get in touch
                <ArrowRight className="size-4" />
              </Button>
            </Magnetic>
          </Reveal>
        </PageContainer>
      </Section>
    </>
  );
}
