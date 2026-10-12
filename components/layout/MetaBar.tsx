import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type MetaItem = {
  icon: LucideIcon;
  label: string;
};

export function MetaBar({
  items,
  className,
}: {
  items: MetaItem[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.14em] text-ink-muted",
        className,
      )}
    >
      {items.map(({ icon: Icon, label }, index) => (
        <span key={label} className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Icon className="size-3.5" strokeWidth={1.75} />
            {label}
          </span>
          {index < items.length - 1 ? (
            <span className="meta-slash hidden text-line sm:inline">/</span>
          ) : null}
        </span>
      ))}
    </div>
  );
}
