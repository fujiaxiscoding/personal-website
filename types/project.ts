export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  timeline?: string;
  team?: string;
  tools?: string[];
  tags: string[];
  coverImage?: string;
  featured?: boolean;
};
