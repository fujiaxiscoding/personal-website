import Image from "next/image";
import { FadeIn } from "@/components/animations/FadeIn";
import { Reveal } from "@/components/animations/Reveal";
import { beforeTheyAreNamed } from "@/lib/before-they-are-named";
import type { Artwork, ArtworkGroup } from "@/lib/before-they-are-named";

// ─── Solo artwork figure ────────────────────────────────────────────────────

type SoloFigureProps = {
  artwork: Artwork;
  priority?: boolean;
  sizeClass?: string;
  showCaption?: boolean;
};

function SoloFigure({
  artwork,
  priority = false,
  sizeClass = "md:max-w-2xl",
  showCaption = true,
}: SoloFigureProps) {
  return (
    <Reveal amount={0.12} y={12} className={`mx-auto w-full ${sizeClass}`}>
      <figure>
        <Image
          src={artwork.src}
          alt={artwork.title}
          width={artwork.width}
          height={artwork.height}
          sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1199px) calc(100vw - 4rem), 768px"
          quality={95}
          priority={priority}
          className="h-auto w-full object-contain"
        />
        {showCaption && (
          <figcaption className="mt-3 text-center font-[family-name:var(--font-montserrat)] text-[0.7rem] font-medium tracking-wide text-ink-muted">
            {artwork.title}
          </figcaption>
        )}
      </figure>
    </Reveal>
  );
}

// ─── Paired artworks ────────────────────────────────────────────────────────

function PairFigure({
  artworks,
  priority = false,
}: {
  artworks: [Artwork, Artwork];
  priority?: boolean;
}) {
  return (
    <Reveal amount={0.1} y={10} className="mx-auto w-full">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-6">
        {artworks.map((artwork, i) => (
          <figure key={artwork.id} className="min-w-0 flex-1">
            <Image
              src={artwork.src}
              alt={artwork.title}
              width={artwork.width}
              height={artwork.height}
              sizes="(max-width: 639px) calc(100vw - 2.5rem), calc((100vw - 5rem) / 2)"
              quality={90}
              priority={priority && i === 0}
              className="h-auto w-full object-contain"
            />
          </figure>
        ))}
      </div>
    </Reveal>
  );
}

function ArtworkGroupItem({
  group,
  priority,
}: {
  group: ArtworkGroup;
  priority?: boolean;
}) {
  if (group.kind === "solo") {
    return (
      <SoloFigure
        artwork={group.artwork}
        priority={priority}
        sizeClass="md:max-w-3xl"
        showCaption={false}
      />
    );
  }
  return <PairFigure artworks={group.artworks} priority={priority} />;
}

const SINGLE_SIZE_CLASSES = [
  "md:max-w-3xl",
  "md:max-w-2xl",
  "md:max-w-xl",
  "md:max-w-2xl",
  "md:max-w-3xl",
] as const;

export function BeforeTheyAreNamed() {
  const {
    year,
    category,
    introBackground,
    statement,
    sections,
  } = beforeTheyAreNamed;

  return (
    <div className="font-[family-name:var(--font-montserrat)]">
      {/* Full-bleed opening — break out of PageContainer, no blur, no inset edges */}
      <header className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image
            src={introBackground}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-[center_28%]"
          />
          {/* Soft wash only — keeps image present, text readable, no boxed edge */}
          <div className="absolute inset-0 bg-canvas/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-canvas/40 via-transparent to-canvas/70" />
        </div>

        <FadeIn className="relative mx-auto max-w-content px-6 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-12 lg:px-12">
          {/* Category sits top-left like a wall label — not stacked on the title */}
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent">
            {category}
            <span className="font-medium text-ink-muted/60">
              &ensp;·&ensp;{year}
            </span>
          </p>

          <div className="mx-auto mt-16 max-w-sm text-center sm:mt-20">
            <h1 className="sr-only">No Idea</h1>
            <Image
              src="/images/work/before-they-are-named/no-idea-title.png"
              alt=""
              width={1200}
              height={383}
              priority
              sizes="(max-width: 639px) 14rem, (max-width: 767px) 16rem, 18rem"
              className="mx-auto h-auto w-full max-w-[14rem] sm:max-w-xs md:max-w-[18rem]"
              aria-hidden={true}
            />
          </div>

          <div
            lang="en"
            className="mx-auto mt-12 max-w-xl space-y-4 text-left text-sm leading-7 text-ink sm:mt-14 sm:text-[0.9375rem] sm:leading-7"
          >
            {statement.en.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>
      </header>

      {sections.map((section, sectionIndex) => {
        if (section.kind === "singles") {
          return (
            <section
              key="singles"
              aria-label="Individual works"
              className="mt-28 sm:mt-36"
            >
              <div className="space-y-24 sm:space-y-32">
                {section.items.map((artwork, i) => (
                  <SoloFigure
                    key={artwork.id}
                    artwork={artwork}
                    priority={i === 0}
                    sizeClass={SINGLE_SIZE_CLASSES[i] ?? "md:max-w-2xl"}
                    showCaption
                  />
                ))}
              </div>
            </section>
          );
        }

        return (
          <section
            key={section.seriesTitle}
            aria-labelledby={`series-${sectionIndex}`}
            className="mt-36 sm:mt-48"
          >
            <Reveal className="mx-auto max-w-xl text-center">
              <h2
                id={`series-${sectionIndex}`}
                className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink"
              >
                {section.seriesTitle}
              </h2>
              <p className="mt-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink-muted/60">
                {section.medium}
              </p>
            </Reveal>

            <div className="mt-14 space-y-20 sm:mt-16 sm:space-y-28">
              {section.groups.map((group, groupIndex) => (
                <ArtworkGroupItem
                  key={
                    group.kind === "solo"
                      ? group.artwork.id
                      : group.artworks[0].id
                  }
                  group={group}
                  priority={groupIndex === 0 && sectionIndex === 1}
                />
              ))}
            </div>

            {sectionIndex === sections.length - 1 && (
              <div aria-hidden className="h-20 sm:h-28" />
            )}
          </section>
        );
      })}
    </div>
  );
}
