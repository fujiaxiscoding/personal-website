import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { FadeIn } from "@/components/animations/FadeIn";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.name}`,
  description: `Get in touch with ${siteConfig.name}.`,
};

const links = [
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "GitHub", href: siteConfig.social.github },
  { label: "Resume", href: siteConfig.resumeUrl },
];

export default function ContactPage() {
  return (
    <Section className="flex flex-1 items-center pb-28 pt-16 sm:pt-24">
      <PageContainer>
        <div className="max-w-2xl">
          <FadeIn>
            <p className="text-sm font-medium text-accent">Contact</p>
            <h1 className="mt-4 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Let&apos;s talk.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              {siteConfig.openTo}{" "}
              Whether you have a role in mind or just want to talk about
              design, I&apos;d love to hear from you.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <CopyEmailButton email={siteConfig.email} />
            </div>
          </FadeIn>

          <FadeIn delay={0.16}>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </PageContainer>
    </Section>
  );
}
