export type Project = {
  slug: string;
  title: string;
  summary: string;
  role?: string;
  year: string;
  timeline?: string;
  team?: string;
  tools?: string[];
  tags: string[];
  category?: string;
  medium?: string;
  template?: "case-study" | "art";
  coverImage?: string;
  coverAlt?: string;
  featured?: boolean;
};
