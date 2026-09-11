import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Creative Collab — ${siteConfig.name}`,
  description:
    "A collaboration-starting platform for independent creatives — product design case study by Jiaxi Fu.",
};

export default function CreativeCollabCaseStudyPage() {
  redirect("/work/creative-collab/index.html");
}
