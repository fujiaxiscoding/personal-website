export const FOUNDATIONS_ASSET = "/images/foundations";

export const SECTION_IDS = ["film", "community", "leadership", "strategy"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export const HERO_JUMPS: { id: SectionId; label: string }[] = [
  { id: "film", label: "Film" },
  { id: "community", label: "Community" },
  { id: "leadership", label: "Creative leadership" },
  { id: "strategy", label: "Business strategy" },
];

export const PROGRESS_LINKS: { id: SectionId; label: string }[] = [
  { id: "film", label: "Film" },
  { id: "community", label: "Community" },
  { id: "leadership", label: "Leadership" },
  { id: "strategy", label: "Strategy" },
];

export const SUMMARY_STATS = [
  { label: "Film", body: "5+ years making films", metric: "5+ years" },
  { label: "Community", body: "500+ creative-community members", metric: "500+" },
  { label: "Programs", body: "15+ programs and events", metric: "15+" },
  {
    label: "Business strategy",
    body: "Internships across a Fortune Global 500 company, consultancy, and hedge fund",
    metric: "Fortune Global 500",
  },
  { label: "Timeline", body: "2019–2025", metric: "2019–2025" },
] as const;

export const DRAWING_IMAGES = [
  { src: `${FOUNDATIONS_ASSET}/drawings/bonfire.jpg`, alt: "Bonfire drawing" },
  { src: `${FOUNDATIONS_ASSET}/drawings/forager.jpg`, alt: "Forager drawing" },
  { src: `${FOUNDATIONS_ASSET}/drawings/learning-to-tie.jpg`, alt: "Learning to Tie drawing" },
  { src: `${FOUNDATIONS_ASSET}/drawings/mountain-water.jpg`, alt: "Mountain Water drawing" },
  { src: `${FOUNDATIONS_ASSET}/drawings/winter-spring.jpg`, alt: "Winter Spring drawing" },
] as const;

export const PHOTO_IMAGES = [
  7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
].map((n) => ({
  src: `${FOUNDATIONS_ASSET}/from-2024-portfolio/image${n}.png`,
  alt: `Photography work ${n - 6}`,
})).concat(
  [20, 21, 22, 23, 24, 25, 26, 27, 28].map((n, i) => ({
    src: `${FOUNDATIONS_ASSET}/from-2024-portfolio/image${n}.jpg`,
    alt: `Photography work ${14 + i}`,
  })),
);

export const PRODUCTION_IMAGES = [
  { n: 37, alt: "Monster Mountain production", ext: "png" },
  { n: 36, alt: "Production still in a rural landscape", ext: "png" },
  { n: 38, alt: "Night production still", ext: "png" },
  { n: 39, alt: "Night exterior production", ext: "png" },
  { n: 40, alt: "Interior production still", ext: "png" },
  { n: 41, alt: "Collaborative film production", ext: "jpg" },
  { n: 43, alt: "Production detail", ext: "png" },
  { n: 44, alt: "Set and production design", ext: "png" },
  { n: 45, alt: "Actors rehearsing a scene", ext: "png" },
  { n: 46, alt: "Collaborative scene work", ext: "png" },
  { n: 47, alt: "Actor portrait from production", ext: "png" },
  { n: 48, alt: "Hands gathering around a table", ext: "png" },
  { n: 49, alt: "Across the Horizon production", ext: "png" },
  { n: 50, alt: "Classroom scene production", ext: "png" },
  { n: 51, alt: "Outdoor scene in production", ext: "png" },
  { n: 52, alt: "Family scene in production", ext: "png" },
  { n: 53, alt: "Mutation production", ext: "png" },
  { n: 54, alt: "Actor entering a room", ext: "png" },
  { n: 55, alt: "Audio recorder production detail", ext: "png" },
  { n: 56, alt: "Interior film scene", ext: "png" },
  { n: 57, alt: "Casting and directing session", ext: "png" },
  { n: 58, alt: "Close-up from collaborative production", ext: "png" },
  { n: 59, alt: "Xinyan School campaign", ext: "png" },
  { n: 60, alt: "Interview production", ext: "png" },
  { n: 61, alt: "Interview set", ext: "png" },
  { n: 62, alt: "Studio production", ext: "png" },
  { n: 63, alt: "Telescope studio production", ext: "png" },
  { n: 65, alt: "Location interview", ext: "png" },
  { n: 66, alt: "Classroom production detail", ext: "png" },
  { n: 67, alt: "Closing landscape from production", ext: "png" },
].map(({ n, alt, ext }) => ({
  src: `${FOUNDATIONS_ASSET}/from-2024-portfolio/image${n}.${ext}`,
  alt,
}));
