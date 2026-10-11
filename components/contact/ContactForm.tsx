"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { buttonClassName } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-canvas-muted/50 px-6 py-8">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-canvas">
            <Check className="size-4" />
          </span>
          <div>
            <p className="font-serif text-xl italic text-ink">Message sent.</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Thanks for writing — I&apos;ll get back to you at the email you
              shared.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-5 text-sm font-medium text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Send another message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
            Name
          </span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-ink/40"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-ink/40"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Hi ${siteConfig.name.split(" ")[0]}, I'd love to talk about…`}
          className="w-full resize-y rounded-xl border border-line bg-canvas px-4 py-3 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-ink/40"
        />
      </label>

      {status === "error" && (
        <p className="text-sm text-accent" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonClassName(
            "primary",
            status === "sending" ? "opacity-70" : undefined,
          )}
        >
          {status === "sending" ? (
            <>
              Sending
              <LoaderCircle className="size-4 animate-spin" />
            </>
          ) : (
            <>
              Send message
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
        <p className="text-xs text-ink-muted">
          Goes to {siteConfig.email}
        </p>
      </div>
    </form>
  );
}
