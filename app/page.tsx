import Link from "next/link";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { MetaBar } from "@/components/layout/MetaBar";
import { Button } from "@/components/ui/Button";
import { HalftoneImage } from "@/components/ui/HalftoneImage";
import { WorkTicketGrid } from "@/components/work/WorkTicket";
import { FadeIn } from "@/components/animations/FadeIn";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Magnetic } from "@/components/animations/Magnetic";
import { siteConfig } from "@/lib/site-config";
import { getFeaturedProjects } from "@/lib/projects";

const heroLines = [
  "I design to understand,",
  "and understand to design.",
];

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <Section className="relative -mt-16 flex min-h-[max(100dvh,900px)] flex-col justify-between overflow-hidden pb-12 pt-[calc(8rem+1rem)]">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 z-0 right-[max(0px,calc(50%-720px))] h-[min(900px,calc(74vw*0.849))] w-[min(1060px,74vw)]"
        >
          <HalftoneImage
            src="/images/portrait.png"
            gap={7}
            radius={110}
            ink="#a9a093"
            warm="#ac4d2b"
            imgBox={[0.06, 0, 1, 1.1]}
            lo={0.16}
            hi={0.78}
            cutout={0.5}
            taper={0.32}
          />
        </div>

        <PageContainer className="relative z-10 flex flex-1 flex-col justify-center">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {siteConfig.role}
            </p>
          </FadeIn>

          <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-[1.06] tracking-tight text-ink sm:text-6xl lg:text-[80px]">
            <TextReveal lines={heroLines} delay={0.15} />
          </h1>

          <FadeIn delay={0.55}>
            <p className="mt-6 max-w-[560px] text-base leading-relaxed text-[#3d3b36] sm:text-lg">
              Working across product design, technology, and human experience.
              With a background in film, anthropology, and business strategy.
            </p>
          </FadeIn>

          <FadeIn delay={0.75}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Button href="/work">
                  View my work
                  <ArrowRight className="size-4" />
                </Button>
              </Magnetic>
              <Button
                href="/contact"
                variant="secondary"
                className="border-[#d3ccbf] bg-canvas"
              >
                Get in touch
              </Button>
            </div>
          </FadeIn>
        </PageContainer>

        <PageContainer className="relative z-10">
          <FadeIn delay={0.9}>
            <MetaBar
              items={[
                { icon: MapPin, label: siteConfig.location },
                { icon: Sparkles, label: "Open to internships & new grad roles" },
              ]}
              className="max-w-xl text-[#3d3b36] [&_.meta-slash]:text-[#d3ccbf]"
            />
          </FadeIn>
        </PageContainer>
      </Section>

      <Section>
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
            <WorkTicketGrid projects={featuredProjects} />
          </div>
        </PageContainer>
      </Section>

      <Section className="border-t border-line">
        <PageContainer>
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
              About me
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-muted">
              {siteConfig.bio.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
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
