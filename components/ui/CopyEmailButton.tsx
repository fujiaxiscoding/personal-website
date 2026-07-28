"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyEmailButton({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can fail (e.g. permissions); fail silently.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/40",
        className,
      )}
    >
      {email}
      {copied ? (
        <Check className="size-4 text-accent" />
      ) : (
        <Copy className="size-4 text-ink-muted transition-colors group-hover:text-ink" />
      )}
    </button>
  );
}
