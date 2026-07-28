import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full border border-line px-2.5 py-1 text-xs text-ink-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
