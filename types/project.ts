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
  /** Product screen shown on the home ticket (and on hover). */
  ticketImage?: string;
  /** Background art revealed on ticket hover. */
  ticketBackground?: string;
  featured?: boolean;
  /**
   * When false, the project stays in content/ but is omitted from Work,
   * home, and project routes. Defaults to true when omitted.
   */
  published?: boolean;
  /** Lower comes first in Work listings. */
  order?: number;
};
