export function ProcessStep({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line py-8 first:border-t-0 first:pt-0">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-accent">{number}</span>
        <h3 className="text-lg font-medium text-ink">{title}</h3>
      </div>
      <div className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
        {children}
      </div>
    </div>
  );
}
