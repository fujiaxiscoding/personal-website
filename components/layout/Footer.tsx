import { siteConfig } from "@/lib/site-config";
import { PageContainer } from "./PageContainer";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <PageContainer>
        <div className="flex flex-col gap-4 py-10 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Built with Next.js.
          </p>

          <div className="flex items-center gap-6">
            <a
              href={`mailto:${siteConfig.email}`}
              className="transition-colors hover:text-ink"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
