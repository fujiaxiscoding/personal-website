import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";

export function PrevNextProject({
  prev,
  next,
}: {
  prev?: Project;
  next?: Project;
}) {
  if (!prev && !next) return null;

  return (
    <div className="mt-20 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-2">
      {prev ? (
        <Link href={`/work/${prev.slug}`} className="group flex flex-col gap-1">
          <span className="flex items-center gap-1 text-sm text-ink-muted">
            <ArrowLeft className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="text-base font-medium text-ink">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col gap-1 sm:items-end sm:text-right"
        >
          <span className="flex items-center gap-1 text-sm text-ink-muted">
            Next
            <ArrowRight className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
          </span>
          <span className="text-base font-medium text-ink">{next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
