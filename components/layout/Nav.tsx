"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";
import { PageContainer } from "./PageContainer";

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line/0 bg-canvas/80 backdrop-blur-md">
      <PageContainer>
        <nav
          aria-label="Primary"
          className="flex h-16 items-center justify-between"
        >
          <Link
            href="/"
            className="font-serif text-lg italic tracking-tight text-ink transition-opacity hover:opacity-70"
          >
            {siteConfig.name}
          </Link>

          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "text-ink"
                        : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-md bg-canvas-muted"
                        transition={{ duration: 0.3, ease: easeOutExpo }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </PageContainer>
    </header>
  );
}
