import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
  as: Tag = "section",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "section" | "div";
}) {
  return <Tag className={cn("py-16 sm:py-24", className)}>{children}</Tag>;
}
