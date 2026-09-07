import type { ComponentProps } from "react";
import { ProcessStep } from "@/components/work/ProcessStep";

export const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2
      className="mt-16 font-serif text-3xl tracking-tight text-ink first:mt-0"
      {...props}
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="mt-10 text-lg font-medium text-ink" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="mt-5 text-base leading-relaxed text-ink-muted" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-muted"
      {...props}
    />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-5 text-base leading-relaxed text-ink-muted"
      {...props}
    />
  ),
  li: (props: ComponentProps<"li">) => <li {...props} />,
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-6 border-l-2 border-accent pl-5 font-serif text-xl italic text-ink"
      {...props}
    />
  ),
  img: (props: ComponentProps<"img">) => (
    <span className="mt-8 block overflow-hidden rounded-lg bg-canvas-muted">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="w-full" alt={props.alt ?? ""} {...props} />
    </span>
  ),
  hr: () => <hr className="my-12 border-line" />,
  ProcessStep,
};
