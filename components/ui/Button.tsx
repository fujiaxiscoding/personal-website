import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ease-out-expo";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-ink text-canvas hover:bg-ink/90",
  secondary: "border border-line text-ink hover:border-ink/40",
  ghost: "text-ink-muted hover:text-ink",
};

export function buttonClassName(variant: ButtonVariant = "primary", className?: string) {
  return cn(baseStyles, variantStyles[variant], className);
}

export function Button({
  variant = "primary",
  className,
  href,
  children,
  ...props
}: {
  variant?: ButtonVariant;
  className?: string;
  href?: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const styles = buttonClassName(variant, className);

  if (href) {
    return (
      <Link href={href} className={styles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={styles}>
      {children}
    </button>
  );
}
