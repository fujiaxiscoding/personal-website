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
  template?: "case-study" | "art" | "cinematic";
  coverImage?: string;
  coverAlt?: string;
  featured?: boolean;
  /** Lower comes first in Work listings. */
  order?: number;
};
