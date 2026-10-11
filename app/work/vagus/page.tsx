import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Vagus — ${siteConfig.name}`,
  description:
    "A context-aware travel companion that helps you decide what fits right now. Product design case study by Jiaxi Fu.",
};

export default function VagusCaseStudyPage() {
  redirect("/work/vagus/vagus-case-study.html");
}
