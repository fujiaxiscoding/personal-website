import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { Magnetic } from "@/components/animations/Magnetic";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.name}`,
  description: `Get in touch with ${siteConfig.name}.`,
};

const links = [
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "Resume", href: siteConfig.resumeUrl },
];

export default function ContactPage() {
  return (
    <Section className="pb-28 pt-24 sm:pt-32">
      <PageContainer>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="max-w-xl">
            <FadeIn>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Contact
              </p>
            </FadeIn>
            <h1 className="mt-5 font-serif text-4xl italic tracking-tight text-ink sm:text-6xl">
              <TextReveal lines={["Let's talk."]} delay={0.1} />
            </h1>
            <FadeIn delay={0.45}>
              <p className="mt-6 text-lg leading-relaxed text-ink-muted">
                {siteConfig.openTo}{" "}
                Whether you have a role in mind or just want to talk about
                design, I&apos;d love to hear from you.
              </p>
            </FadeIn>

            <FadeIn delay={0.55}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <CopyEmailButton email={siteConfig.email} />
                </Magnetic>
              </div>
            </FadeIn>

            <FadeIn delay={0.65}>
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

          <FadeIn delay={0.5}>
            <div className="rounded-2xl border border-line bg-canvas p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                Write a message
              </p>
              <p className="mt-2 font-serif text-2xl italic tracking-tight text-ink">
                Send me a note
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </FadeIn>
        </div>
      </PageContainer>
    </Section>
  );
}
