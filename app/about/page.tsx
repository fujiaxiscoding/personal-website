import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Magnetic } from "@/components/animations/Magnetic";
import { StoryBeat } from "@/components/about/StoryBeat";
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
      <Section className="pb-16 pt-24 sm:pt-32">
        <PageContainer>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-[1.2fr_1fr] sm:gap-16">
            <div>
              <FadeIn>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  About
                </p>
              </FadeIn>
              <h1 className="mt-5 font-serif text-4xl tracking-tight text-ink sm:text-5xl">
                <TextReveal
                  lines={[`Hi, I'm ${siteConfig.name.split(" ")[0]}.`]}
                  delay={0.1}
                />
              </h1>
              <FadeIn delay={0.5}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
                  {siteConfig.bio}
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.15}>
              <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-canvas-muted" />
            </FadeIn>
          </div>
        </PageContainer>
      </Section>

      <Section className="border-t border-line">
        <PageContainer>
          <Reveal>
            <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
              How I work
            </h2>
          </Reveal>

          <div className="mt-4">
            {principles.map((principle, index) => (
              <StoryBeat
                key={principle.number}
                number={principle.number}
                title={principle.title}
                description={principle.description}
                isFirst={index === 0}
              />
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section className="border-t border-line">
        <PageContainer>
          <Reveal>
            <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
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
            <h2 className="max-w-md font-serif text-3xl tracking-tight text-ink sm:text-4xl">
              {siteConfig.openTo}
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
