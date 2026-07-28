import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { Reveal } from "@/components/animations/Reveal";
import { StaggerList, StaggerItem } from "@/components/animations/StaggerList";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
  description: siteConfig.bio,
};

const principles = [
  {
    number: "01",
    title: "Start with people, not screens",
    description:
      "My background in anthropology taught me to understand context before proposing solutions — the same instinct I bring to every product problem.",
  },
  {
    number: "02",
    title: "Design is systems thinking",
    description:
      "Good interfaces are the visible tip of good systems. I care as much about the model underneath a product as I do about the pixels on top.",
  },
  {
    number: "03",
    title: "Story makes it stick",
    description:
      "Film taught me that structure and pacing shape how people feel. I bring that same attention to how a product unfolds over time.",
  },
];

const skills = [
  "Product strategy",
  "User research",
  "Interaction design",
  "Prototyping",
  "Design systems",
  "Cross-functional collaboration",
  "Figma",
  "Framer",
];

export default function AboutPage() {
  return (
    <>
      <Section className="pb-16 pt-16 sm:pt-24">
        <PageContainer>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-[1.2fr_1fr] sm:gap-16">
            <FadeIn>
              <p className="text-sm font-medium text-accent">About</p>
              <h1 className="mt-4 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                Hi, I&apos;m {siteConfig.name.split(" ")[0]}.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
                {siteConfig.bio}
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-canvas-muted" />
            </FadeIn>
          </div>
        </PageContainer>
      </Section>

      <Section className="border-t border-line">
        <PageContainer>
          <Reveal>
            <h2 className="text-2xl font-medium tracking-tight text-ink">
              How I work
            </h2>
          </Reveal>

          <StaggerList className="mt-10">
            {principles.map((principle, index) => (
              <StaggerItem key={principle.number}>
                <div
                  className={cn(
                    "grid grid-cols-1 gap-2 py-8 sm:grid-cols-[auto_1fr] sm:gap-8",
                    index !== 0 && "border-t border-line",
                  )}
                >
                  <span className="font-mono text-sm text-accent">
                    {principle.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-ink">
                      {principle.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-muted">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </PageContainer>
      </Section>

      <Section className="border-t border-line">
        <PageContainer>
          <Reveal>
            <h2 className="text-2xl font-medium tracking-tight text-ink">
              Tools &amp; practices
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </Reveal>
        </PageContainer>
      </Section>

      <Section className="border-t border-line pb-28">
        <PageContainer>
          <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="max-w-md text-2xl font-medium tracking-tight text-ink">
              {siteConfig.openTo}
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
