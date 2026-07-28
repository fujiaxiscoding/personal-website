# Jiaxi Fu — Portfolio

A minimal, human-centered portfolio site built with Next.js, Tailwind CSS, and Framer Motion.

## Stack

- **Next.js** (App Router) — routing, static generation
- **Tailwind CSS v4** — styling via design tokens defined in `app/globals.css`
- **Framer Motion** — animation primitives in `components/animations/`
- **MDX** (`next-mdx-remote`) — case studies authored as Markdown in `content/work/`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

Most of what you'll want to change day-to-day lives in a few places:

| What | Where |
|---|---|
| Name, role, bio, email, social links, nav | `lib/site-config.ts` |
| Case studies (add/edit/remove projects) | `content/work/*.mdx` |
| Resume PDF | `public/resume.pdf` |
| About page copy (principles, skills) | `app/about/page.tsx` |

### Adding a new case study

Create a new file in `content/work/`, e.g. `content/work/my-project.mdx`:

```mdx
---
title: "My Project"
summary: "One-line description shown on cards."
role: "Product Designer"
year: "2026"
timeline: "3 months"
team: "1 PM, 2 engineers, 1 designer (me)"
tools: ["Figma", "Framer"]
tags: ["0→1", "Mobile"]
featured: true
---

## Overview

Your case study content here, using `##`/`###` headings, paragraphs, and the
`<ProcessStep number="01" title="...">...</ProcessStep>` component for
structured process narratives.
```

It will automatically appear on `/work` and get its own page at `/work/my-project` —
no other code changes needed. Set `featured: true` to also show it on the home page
(the home page shows the 3 most recently added featured projects).

## Design tokens

Colors, spacing, radius, and easing curves are defined once in `app/globals.css`
under `:root` and `@theme inline`, and used everywhere via Tailwind utility
classes (`bg-canvas`, `text-ink`, `text-ink-muted`, `border-line`, `text-accent`,
`ease-out-expo`, etc.). Change a value there to restyle the whole site.

## Project structure

```
app/                  Routes (Home, Work index, Work case study, About, Contact)
components/
  layout/              Nav, Footer, PageContainer, Section
  animations/          FadeIn, Reveal, StaggerList, PageTransition
  ui/                  Button, Tag, CopyEmailButton
  work/                ProjectCard, CaseStudyHero, ProcessStep, PrevNextProject
  mdx/                 MDX renderer component overrides
content/work/          Case studies (MDX)
lib/                   Site config, project data, MDX parsing, utils
types/                 Shared TypeScript types
```

## Deploying

Push to GitHub and import the repo in [Vercel](https://vercel.com/new) — no
extra configuration needed.
