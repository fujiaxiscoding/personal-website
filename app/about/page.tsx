import type { Metadata } from "next";
import { FoundationsAbout } from "@/components/about/FoundationsAbout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
  description:
    "I've spent the past few years making films, bringing creative people together, and working in business strategy. They may seem like different worlds, but each has changed the way I see people, approach problems, and think about what I want to create.",
};

export default function AboutPage() {
  return <FoundationsAbout />;
}
