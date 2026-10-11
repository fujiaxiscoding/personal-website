"use client";

import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { Magnetic } from "@/components/animations/Magnetic";
import { PracticeRail } from "@/components/about/PracticeRail";
import { useSectionProgress } from "@/components/about/useSectionProgress";
import {
  DRAWING_IMAGES,
  FOUNDATIONS_ASSET,
  HERO_JUMPS,
  PHOTO_IMAGES,
  PRODUCTION_IMAGES,
  PROGRESS_LINKS,
  SUMMARY_STATS,
  type SectionId,
} from "@/lib/foundations";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function Metric({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold tracking-[-0.01em] text-accent">
      {children}
    </strong>
  );
}

function AwardNote({
  label,
  titles,
}: {
  label: string;
  titles: string[];
}) {
  return (
    <div className="mt-5 rounded-lg border border-line bg-canvas px-5 py-[18px]">
      <div className="font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-accent">
        {label}
      </div>
      {titles.map((title) => (
        <div
          key={title}
          className="relative mt-2.5 pl-[18px] text-[15px] font-medium leading-snug text-ink before:absolute before:left-0 before:top-[0.48em] before:size-[7px] before:rounded-full before:bg-accent first:mt-2.5"
        >
          {title}
        </div>
      ))}
    </div>
  );
}

export function FoundationsAbout() {
  const { activeId, navigateTo } = useSectionProgress();

  const onJump = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: SectionId,
  ) => {
    event.preventDefault();
    navigateTo(id);
  };

  return (
    <>
      <nav
        className="foundations-progress pointer-events-none fixed right-2.5 top-[25vh] z-40 hidden h-[50vh] min-h-[360px] max-h-[560px] w-[116px] flex-col justify-between md:flex"
        aria-label="Page section progress"
      >
        {PROGRESS_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            data-progress={link.id}
            onClick={(event) => onJump(event, link.id)}
            className={cn(
              "foundations-progress-link pointer-events-auto relative flex min-h-7 items-center justify-end gap-2 pr-0 font-mono text-[9px] uppercase tracking-[0.06em] transition-[opacity,color,transform] duration-500",
              activeId === link.id
                ? "is-active text-accent opacity-100"
                : "text-ink-muted opacity-[0.14] hover:translate-x-[-2px] hover:text-ink hover:opacity-70",
            )}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="pb-28 pt-24 sm:pt-32">
        <PageContainer>
          {/* Hero */}
          <FadeIn>
            <h1 className="max-w-[62rem] font-serif text-[2.35rem] italic leading-[1.08] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3rem]">
              I&apos;m a Product Designer with a background in film, community
              building, and strategy.
            </h1>
          </FadeIn>

          <nav
            className="mt-7 flex flex-wrap gap-2"
            aria-label="Jump to a background section"
          >
            {HERO_JUMPS.map((jump) => (
              <a
                key={jump.id}
                href={`#${jump.id}`}
                data-jump={jump.id}
                onClick={(event) => onJump(event, jump.id)}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border px-3 py-1.5 text-xs transition-[transform,background-color,border-color,color,box-shadow] duration-200 origin-center motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.08]",
                  activeId === jump.id
                    ? "border-ink bg-ink text-canvas"
                    : "border-line bg-canvas text-ink-muted hover:border-[#cfc8bd] hover:bg-white hover:text-ink hover:shadow-[0_8px_20px_rgba(24,24,20,0.08)]",
                )}
              >
                {jump.label}
              </a>
            ))}
          </nav>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-muted text-pretty">
            I&apos;ve spent the past few years making films, bringing creative
            people together, and working in business strategy. They may seem like
            different worlds, but each has changed the way I see people, approach
            problems, and think about what I want to create.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-line py-8 sm:grid-cols-3 lg:grid-cols-5">
            {SUMMARY_STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-xs uppercase tracking-[0.14em] text-ink-muted">
                  {stat.label}
                </div>
                <div className="mt-1 text-sm leading-relaxed text-ink">
                  {stat.label === "Business strategy" ? (
                    <>
                      Internships across a <Metric>Fortune Global 500</Metric>{" "}
                      company, consultancy, and hedge fund
                    </>
                  ) : (
                    <>
                      <Metric>{stat.metric}</Metric>
                      {stat.body.replace(stat.metric, "")}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            className="foundations-hero-film-grid mt-8 overflow-hidden rounded-[10px] bg-canvas-muted"
            aria-label="Selected frames from narrative and documentary films"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${FOUNDATIONS_ASSET}/from-2024-portfolio/image3.png`}
              alt="Figure by the sea"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${FOUNDATIONS_ASSET}/from-2024-portfolio/image4.png`}
              alt="Two people by the waterfront"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${FOUNDATIONS_ASSET}/from-2024-portfolio/image5.png`}
              alt="Close-up from a commissioned film"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${FOUNDATIONS_ASSET}/from-2024-portfolio/image6.png`}
              alt="Figure on a ferry"
            />
          </div>

          {/* Three threads */}
          <section className="mt-16 sm:mt-24">
            <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-[2.125rem]">
              Three threads that shaped how I work
            </h2>
            <div className="mt-8 grid gap-0 sm:grid-cols-3 sm:gap-x-8">
              {[
                {
                  n: "01",
                  title: "Film: understanding people through stories",
                  body: "Writing, directing, and editing taught me to observe closely, frame complexity, and guide attention without flattening people’s lived experience.",
                },
                {
                  n: "02",
                  title: "Community: designing conditions for participation",
                  body: "Building creative communities taught me that participation depends on trust, clear invitations, thoughtful formats, and feedback that changes what happens next.",
                },
                {
                  n: "03",
                  title:
                    "Creative leadership and strategy: moving ideas into reality",
                  body: "Film production, community operations, and research work taught me to organize people, information, and execution when the path was still unclear.",
                },
              ].map((item) => (
                <div key={item.n} className="border-t border-line py-5 sm:py-8">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm text-accent">{item.n}</span>
                    <h3 className="text-lg font-medium text-ink">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-ink-muted">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Film */}
          <section
            id="film"
            data-progress-section="film"
            className="mt-16 scroll-mt-24 sm:mt-24"
          >
            <div className="max-w-prose">
              <div className="text-xs uppercase tracking-[0.14em] text-ink-muted">
                01 · Film
              </div>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-[2.125rem]">
                Understanding people through stories.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-muted">
                Film was my first practice in research, empathy, framing,
                attention, and narrative flow.
              </p>
            </div>

            <div className="mt-8 grid gap-10 sm:grid-cols-2 sm:gap-8">
              <div>
                <div className="aspect-[341/482] overflow-hidden rounded-lg bg-canvas-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${FOUNDATIONS_ASSET}/sister-poster-full.png`}
                    alt="Sister poster"
                    className="size-full object-contain"
                  />
                </div>
                <h3 className="mt-5 text-lg font-medium text-ink">Sister</h3>
                <div className="mt-1 text-sm text-ink-muted">
                  Writer, Director, Producer, Editor
                </div>
                <p className="mt-3 text-base leading-relaxed text-ink-muted text-pretty">
                  A narrative short set across an ordinary afternoon. I directed
                  the work from writing through editing, using small gestures and
                  domestic space to make interior life visible.
                </p>
                <AwardNote
                  label="Award & selection"
                  titles={[
                    "Best Live Action Short · Link Future Film Festival",
                    "First-time Filmmaker Online Session · Indie Online Film Award",
                  ]}
                />
                <a
                  href="https://pan.baidu.com/s/19Ys8I4DJfB6lEp0QvrMm_Q?pwd=kf3d"
                  className="mt-3 inline-block text-sm text-accent hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch film · code kf3d
                </a>
              </div>

              <div>
                <div className="aspect-[329/466] overflow-hidden rounded-lg bg-canvas-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${FOUNDATIONS_ASSET}/jianghu-goodbye-poster-full.png`}
                    alt="Jianghu Goodbye poster"
                    className="size-full object-contain"
                  />
                </div>
                <h3 className="mt-5 text-lg font-medium text-ink">
                  Jianghu Goodbye
                </h3>
                <div className="mt-1 text-sm text-ink-muted">
                  Director, Cinematographer, Editor
                </div>
                <p className="mt-3 text-base leading-relaxed text-ink-muted text-pretty">
                  A documentary following a theatre-making process. The project
                  asked how a camera can observe creative work without simplifying
                  its ethical and emotional complexity.
                </p>
                <AwardNote
                  label="Official selection"
                  titles={["Guangzhou International Documentary Film Festival"]}
                />
                <div className="mt-3 flex flex-wrap gap-4">
                  <a
                    href="https://mp.weixin.qq.com/s/NwfVtc2eYyCtKmMROn823A"
                    className="text-sm text-accent hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read interview
                  </a>
                  <a
                    href="https://pan.baidu.com/s/1BISSTbpKp5VZSZU6xTegVw?pwd=fqfd"
                    className="text-sm text-accent hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Watch film · code fqfd
                  </a>
                </div>
              </div>
            </div>

            <blockquote className="mt-10 max-w-none border-l-2 border-accent py-1 pl-8 font-serif text-xl italic leading-snug text-ink">
              This work developed my approach to qualitative research: stay close
              to lived context, listen for what is not immediately stated, and
              make choices that respect the audience’s participation.
            </blockquote>
          </section>

          {/* Visual practice */}
          <section className="mt-16 sm:mt-24">
            <div className="max-w-prose">
              <div className="text-xs uppercase tracking-[0.14em] text-ink-muted">
                Selected visual practice
              </div>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-[2.125rem]">
                Working across drawing, photography, and production.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-muted text-pretty">
                A scrollable archive of personal image-making and collaborative
                work across drawing, photography, casting, producing, and
                editing.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-9">
              <PracticeRail
                title="Drawings"
                subtitle="Pastel · color · form"
                images={DRAWING_IMAGES}
                railClassName="drawing-rail"
              />
              <PracticeRail
                title="Photography & experiments"
                subtitle="Portrait · performance · atmosphere"
                images={PHOTO_IMAGES}
                railClassName="photo-rail"
              />
              <PracticeRail
                title="Collaborative productions"
                subtitle="Producing · casting · assistant directing"
                images={PRODUCTION_IMAGES}
                railClassName="production-rail"
              />
            </div>
          </section>

          {/* Community — HerFrame */}
          <section
            id="community"
            data-progress-section="community"
            className="mt-16 scroll-mt-24 sm:mt-24"
          >
            <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  {
                    src: `${FOUNDATIONS_ASSET}/from-2024-portfolio/image81.png`,
                    alt: "HerFrame screening",
                    dark: true,
                  },
                  {
                    src: `${FOUNDATIONS_ASSET}/from-2024-portfolio/image82.png`,
                    alt: "HerFrame filmmakers gathering",
                    dark: false,
                  },
                  {
                    src: `${FOUNDATIONS_ASSET}/herframe-community-conversation.png`,
                    alt: "HerFrame community conversation",
                    dark: false,
                  },
                  {
                    src: `${FOUNDATIONS_ASSET}/herframe-community-presentation.png`,
                    alt: "HerFrame community presentation",
                    dark: false,
                  },
                ].map((item) => (
                  <div
                    key={item.src}
                    className={cn(
                      "aspect-[3/2] overflow-hidden rounded-lg",
                      item.dark ? "bg-ink" : "bg-canvas-muted",
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="size-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="lg:sticky lg:top-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${FOUNDATIONS_ASSET}/logos/herframe-black-transparent.png`}
                  alt="HerFrame"
                  className="mb-6 block w-[168px]"
                />
                <div className="text-xs uppercase tracking-[0.14em] text-ink-muted">
                  02 · Community
                </div>
                <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-[2.125rem]">
                  Designing conditions for participation.
                </h2>
                <div className="mt-2 text-sm text-ink-muted">
                  Co-Founder and Program Lead | <Metric>2024–2025</Metric>
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <span className="rounded-full border border-line bg-white px-3 py-2 text-sm text-ink">
                    <Metric>100+</Metric> members
                  </span>
                  <span className="rounded-full border border-line bg-white px-3 py-2 text-sm text-ink">
                    <Metric>15+</Metric> programs and events
                  </span>
                </div>
                <p className="mt-5 text-base leading-relaxed text-ink-muted text-pretty">
                  A community for women filmmakers, built through workshops,
                  screenings, peer connection, and online communication.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {[
                {
                  title: "Activity planning",
                  body: "Screenings, sharing sessions, support groups, and practical workshops gave filmmakers different ways to enter the community.",
                },
                {
                  title: "Resource sharing",
                  body: "The platform collected industry resources, opportunities, works in progress, and potential collaborators.",
                },
                {
                  title: "Community building",
                  body: "Online groups and recurring events helped members share projects, find collaborators, and stay connected beyond a single gathering.",
                },
              ].map((card) => (
                <div key={card.title}>
                  <h3 className="text-lg font-medium text-ink">{card.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-muted">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[10px] bg-canvas-muted px-7 py-6">
              <h3 className="text-lg font-medium text-ink">
                Listening and iteration
              </h3>
              <p className="mt-2.5 text-base leading-relaxed text-ink-muted">
                After hearing that participants wanted more peer exchange, we
                changed the seating from rows to a circle. The format made
                conversation feel less performative and created more room for
                people to stay connected after the event.
              </p>
            </div>

            <div
              className="foundations-poster-collage relative mt-8 grid grid-cols-2 gap-3.5 overflow-hidden rounded-xl px-4 pb-5 pt-14 sm:grid-cols-4 sm:px-7 sm:pt-14"
              aria-label="HerFrame event posters"
            >
              {[
                {
                  src: `${FOUNDATIONS_ASSET}/from-2024-portfolio/image85.jpg`,
                  alt: "Women filmmaker gathering poster",
                },
                {
                  src: `${FOUNDATIONS_ASSET}/from-2024-portfolio/image89.png`,
                  alt: "Animation gathering poster",
                },
                {
                  src: `${FOUNDATIONS_ASSET}/from-2024-portfolio/image90.png`,
                  alt: "Filmmaker gathering poster",
                },
                {
                  src: `${FOUNDATIONS_ASSET}/from-2024-portfolio/image92.png`,
                  alt: "Animation screening poster",
                },
              ].map((poster, index) => (
                <div
                  key={poster.src}
                  className={cn(
                    "foundations-poster-card relative bg-canvas px-[7px] pb-[22px] pt-[7px] shadow-[0_14px_28px_rgba(24,24,20,0.12)]",
                    index === 0 && "motion-safe:-rotate-2",
                    index === 1 && "motion-safe:rotate-[1.5deg]",
                    index === 2 && "motion-safe:-rotate-1",
                    index === 3 && "motion-safe:rotate-2",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={poster.src}
                    alt={poster.alt}
                    className="block w-full rounded-sm"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Moor */}
          <section className="mt-16 sm:mt-24">
            <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              <div className="max-w-[480px] rounded-xl bg-[#f1eee8] p-2.5 dark:bg-canvas-muted">
                <figure className="m-0 overflow-hidden rounded-lg bg-[#ded9cf]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${FOUNDATIONS_ASSET}/from-2024-portfolio/image77.png`}
                    alt="Moor community gathering"
                    className="block h-[260px] w-full object-cover"
                  />
                </figure>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {[
                    {
                      src: `${FOUNDATIONS_ASSET}/from-2024-portfolio/image75.png`,
                      alt: "Moor outdoor workshop circle",
                    },
                    {
                      src: `${FOUNDATIONS_ASSET}/from-2024-portfolio/image76.png`,
                      alt: "Moor workshop participants drawing",
                    },
                  ].map((img) => (
                    <figure
                      key={img.src}
                      className="m-0 overflow-hidden rounded-lg bg-[#ded9cf]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="aspect-square w-full object-cover"
                      />
                    </figure>
                  ))}
                </div>
              </div>

              <div className="lg:sticky lg:top-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${FOUNDATIONS_ASSET}/logos/moor-transparent.png`}
                  alt="Moor"
                  className="mb-6 block w-[104px]"
                />
                <div className="text-xs uppercase tracking-[0.14em] text-ink-muted">
                  Community project · Moor
                </div>
                <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-[2.125rem]">
                  Moor: a small community needs operational care, too.
                </h2>
                <div className="mt-2 text-sm text-ink-muted">
                  Founding member and workshop collaborator
                </div>
                <p className="mt-5 text-base leading-relaxed text-ink-muted text-pretty">
                  Moor was a New York community for women and gender-diverse
                  people. I helped establish its brand, supported a{" "}
                  <Metric>100+</Metric> member group, co-led <Metric>two</Metric>{" "}
                  in-person workshops, and contributed to reusable event
                  operations.
                </p>
              </div>
            </div>

            <blockquote className="mt-10 max-w-none border-l-2 border-accent py-1 pl-8 font-serif text-xl italic leading-snug text-ink">
              What I learned: people notice the invisible structure of a
              gathering. Clear hosting, a considered flow, and reliable follow-up
              affect whether a space feels worth returning to.
            </blockquote>
          </section>

          {/* Leadership */}
          <section
            id="leadership"
            data-progress-section="leadership"
            className="mt-16 scroll-mt-24 sm:mt-24"
          >
            <div className="max-w-prose">
              <div className="text-xs uppercase tracking-[0.14em] text-ink-muted">
                03 · Creative leadership and strategy
              </div>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-[2.125rem]">
                Spianos Film Studio and Voice of X: moving ideas into reality.
              </h2>
            </div>

            <div className="mt-8 flex flex-col gap-6">
              <div className="grid items-start gap-10 border-b border-line pb-6 sm:grid-cols-2 sm:gap-10">
                <div className="overflow-hidden rounded-lg bg-canvas-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${FOUNDATIONS_ASSET}/spianos-team-v2.png`}
                    alt="Spianos Film Studio team"
                    className="block w-full"
                  />
                </div>
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${FOUNDATIONS_ASSET}/logos/spianos-transparent.png`}
                    alt="Spianos Film Studio"
                    className="mb-5 block w-[190px]"
                  />
                  <h3 className="text-lg font-medium text-ink">
                    Spianos Film Studio
                  </h3>
                  <div className="mt-1 text-sm text-ink-muted">
                    President | Student film studio
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-ink-muted text-pretty">
                    Led a student film studio across production, recruitment, and
                    communications. I supervised <Metric>six films</Metric>,
                    directed <Metric>five</Metric>, recruited{" "}
                    <Metric>70+</Metric> applicants, and managed a{" "}
                    <Metric>20+</Metric> person core team. Our public account
                    reached <Metric>20,000+</Metric> reads and received a
                    national student media award.
                  </p>
                </div>
              </div>

              <div className="grid items-start gap-10 sm:grid-cols-2 sm:gap-10">
                <div className="overflow-hidden rounded-lg bg-canvas-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${FOUNDATIONS_ASSET}/spianos-making-v2.png`}
                    alt="Spianos production process"
                    className="block w-full"
                  />
                </div>
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${FOUNDATIONS_ASSET}/logos/voice-of-x-transparent.png`}
                    alt="Voice of X"
                    className="mb-5 block w-24"
                  />
                  <h3 className="text-lg font-medium text-ink">Voice of X</h3>
                  <div className="mt-1 text-sm text-ink-muted">
                    Co-Founder and Organizer | Student film festival
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-ink-muted text-pretty">
                    Built the school’s first student film festival from zero,
                    coordinating students, teachers, and mentors while producing
                    its editorial content, posters, and trailer. Participating
                    films reached <Metric>30,000+</Metric> views.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Strategy */}
          <section
            id="strategy"
            data-progress-section="strategy"
            className="mt-16 scroll-mt-24 sm:mt-24"
          >
            <div className="text-xs uppercase tracking-[0.14em] text-ink-muted">
              Deloitte
            </div>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-[2.125rem]">
              Ambiguity, evidence, and decisions.
            </h2>

            <div className="mt-8 overflow-hidden rounded-xl border border-line bg-canvas-muted">
              <div className="bg-[#020705]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${FOUNDATIONS_ASSET}/deloitte-bmc-executive-panel.jpg`}
                  alt="Deloitte China Best Managed Companies executive panel attended by more than 200 guests"
                  className="aspect-[16/8] w-full object-cover max-sm:aspect-[4/3]"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${FOUNDATIONS_ASSET}/deloitte-bmc-identity.png`}
                  alt="China Best Managed Companies identity"
                  className="box-border h-[180px] w-full border-t border-white/12 object-contain object-center px-6 py-6 sm:h-[180px] sm:px-14 sm:py-6 max-sm:h-[120px]"
                />
              </div>

              <div className="grid gap-7 px-6 py-8 sm:gap-12 sm:px-9 lg:grid-cols-[minmax(220px,0.65fr)_minmax(0,1.35fr)]">
                <div>
                  <a
                    href="https://www.deloitte.com/cn/zh/services/deloitte-private/about/best-managed-companies.html"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit Deloitte China Best Managed Companies"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${FOUNDATIONS_ASSET}/logos/deloitte-transparent.svg`}
                      alt="Deloitte"
                      className="mb-5 block h-[42px] w-[158px] object-contain object-left"
                    />
                  </a>
                  <h3 className="text-lg font-medium text-ink">
                    China Best Managed Companies
                  </h3>
                  <div className="mt-1.5 text-sm text-ink-muted">
                    Deloitte Consulting · Summer Intern, Beijing
                  </div>
                  <a
                    href="https://www.deloitte.com/cn/zh/services/deloitte-private/about/best-managed-companies.html"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                  >
                    Visit the BMC website <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="border-t border-line pt-[18px]">
                    <div className="font-mono text-[11px] uppercase leading-snug tracking-[0.08em] text-accent">
                      Event website coordination
                    </div>
                    <p className="mt-2.5 text-base leading-relaxed text-ink-muted">
                      Coordinated the design of the BMC event website to support
                      the attendee journey: on-site guidance for{" "}
                      <Metric>200+</Metric> guests and post-event access to photos
                      and content.
                    </p>
                  </div>
                  <div className="border-t border-line pt-[18px]">
                    <div className="font-mono text-[11px] uppercase leading-snug tracking-[0.08em] text-accent">
                      BMC executive panel
                    </div>
                    <p className="mt-2.5 text-base leading-relaxed text-ink-muted">
                      Coordinated client communication and on-site execution for
                      a <Metric>200+</Metric> guest event featuring CEOs,
                      chairpersons, and a world champion. Managed stakeholder
                      touchpoints and participant experience across the event.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={`${FOUNDATIONS_ASSET}/deloitte-cn-bmc-2026-white-paper.pdf`}
                target="_blank"
                rel="noreferrer"
                aria-label="Open the 49-page Deloitte China Best Managed Companies white paper"
                className="mx-4 mb-4 grid items-center gap-5 rounded-[10px] bg-ink px-5 py-5 text-canvas sm:mx-9 sm:mb-9 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8 sm:px-7 sm:py-7"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${FOUNDATIONS_ASSET}/deloitte-bmc-white-paper-cover.png`}
                  alt="Cover of the 8th China Best Managed Companies project white paper"
                  className="block w-full rounded-sm shadow-[0_16px_34px_rgba(0,0,0,0.32)] sm:w-full"
                />
                <div>
                  <div className="font-mono text-[11px] uppercase leading-snug tracking-[0.1em] text-[#92d400]">
                    Research to publication ·{" "}
                    <strong className="text-[1.3em]">49 pages</strong>
                  </div>
                  <h3 className="mt-2.5 font-serif text-2xl font-normal text-canvas">
                    The 8th China Best Managed Companies Project White Paper
                  </h3>
                  <p className="mt-3 text-[#c9c7c1]">
                    As part of the project team, I contributed company research
                    and analysis that informed this published white paper. The
                    final publication brought our broader research process
                    together into a shared, durable resource.
                  </p>
                  <div className="mt-4 text-sm text-[#92d400]">
                    Open the full white paper ↗
                  </div>
                </div>
              </a>
            </div>

            <p className="mt-9 max-w-prose text-ink-muted">
              Across investment research and strategy, I learned to turn
              fragmented market, financial, and qualitative evidence into
              decisions that different stakeholders could act on.
            </p>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div className="rounded-[10px] border border-line bg-white p-7 dark:bg-canvas-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${FOUNDATIONS_ASSET}/logos/mint-transparent.png`}
                  alt="Mint Capital"
                  className="mb-4 block h-10 w-[90px] object-contain object-left"
                />
                <h3 className="text-lg font-medium text-ink">Mint Capital</h3>
                <div className="mt-1 text-sm text-ink-muted">
                  Fundamental Analyst Intern, New York
                </div>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">
                  Synthesized financial, market, competitive, and qualitative
                  evidence into investment theses and decision frameworks.
                </p>
              </div>
              <div className="rounded-[10px] border border-line bg-white p-7 dark:bg-canvas-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${FOUNDATIONS_ASSET}/logos/cr-pharma-transparent.png`}
                  alt="China Resources Pharmaceutical"
                  className="mb-4 block h-14 w-[210px] object-contain object-left"
                />
                <h3 className="text-lg font-medium text-ink">
                  China Resources Pharmaceutical
                </h3>
                <div className="mt-1 text-sm text-ink-muted">
                  Strategic Analysis Intern, Beijing
                </div>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">
                  Mapped a regulated market, competitor landscape, and product
                  portfolios to support executive analysis.
                </p>
              </div>
            </div>
          </section>

          {/* Site CTA */}
          <section className="mt-16 border-t border-line pt-16 sm:mt-24 sm:pt-24">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="max-w-md font-serif text-3xl tracking-tight text-ink sm:text-4xl">
                {siteConfig.openTo}
              </h2>
              <Magnetic>
                <Button href="/contact">
                  Get in touch
                  <ArrowRight className="size-4" />
                </Button>
              </Magnetic>
            </div>
          </section>
        </PageContainer>
      </div>
    </>
  );
}
