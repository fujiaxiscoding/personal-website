// Data types and content for the "No Idea" art project
// (route slug remains before-they-are-named)

export type Artwork = {
  readonly id: string;
  readonly title: string;
  readonly src: string;
  readonly width: number;
  readonly height: number;
};

export type ArtworkGroup =
  | { kind: "solo"; artwork: Artwork }
  | { kind: "pair"; artworks: [Artwork, Artwork] };

export type ArtworkSection =
  | { kind: "singles"; items: readonly Artwork[] }
  | {
      kind: "series";
      seriesTitle: string;
      medium: string;
      groups: readonly ArtworkGroup[];
    };

// ─── Individual artworks ─────────────────────────────────────────────────────

const a50: Artwork = {
  id: "artwork-50",
  title: "Learning to Tie My Shoes",
  src: "/images/work/before-they-are-named/artwork_50_scan.jpg",
  width: 2048,
  height: 1536,
};

const a51: Artwork = {
  id: "artwork-51",
  title: "Bonfire Party",
  src: "/images/work/before-they-are-named/artwork_51_scan.jpg",
  width: 2048,
  height: 1536,
};

const a52: Artwork = {
  id: "artwork-52",
  title: "The Forager's Guide to the Galaxy",
  src: "/images/work/before-they-are-named/artwork_52_scan.jpg",
  width: 2048,
  height: 1536,
};

const a53: Artwork = {
  id: "artwork-53",
  title: "山水 Mountain Water",
  src: "/images/work/before-they-are-named/artwork_53_scan.jpg",
  width: 2048,
  height: 1536,
};

// artwork_54 is landscape 4:3
const a54: Artwork = {
  id: "artwork-54",
  title: "Earth's Ultrasound",
  src: "/images/work/before-they-are-named/artwork_54_scan.jpg",
  width: 2048,
  height: 1536,
};

const a55: Artwork = {
  id: "artwork-55",
  title: "Jeux D'eau",
  src: "/images/work/before-they-are-named/artwork_55_scan.jpg",
  width: 2048,
  height: 1536,
};

const a56: Artwork = {
  id: "artwork-56",
  title: "Jeux D'eau",
  src: "/images/work/before-they-are-named/artwork_56_scan.jpg",
  width: 2048,
  height: 1536,
};

const a57: Artwork = {
  id: "artwork-57",
  title: "Jeux D'eau",
  src: "/images/work/before-they-are-named/artwork_57_scan.jpg",
  width: 2048,
  height: 1536,
};

const a58: Artwork = {
  id: "artwork-58",
  title: "Jeux D'eau",
  src: "/images/work/before-they-are-named/artwork_58_scan.jpg",
  width: 2048,
  height: 1536,
};

const a59: Artwork = {
  id: "artwork-59",
  title: "Winter, Winter, and Then There's Spring",
  src: "/images/work/before-they-are-named/artwork_59_scan.jpg",
  width: 2048,
  height: 1536,
};

const a60: Artwork = {
  id: "artwork-60",
  title: "Winter, Winter, and Then There's Spring",
  src: "/images/work/before-they-are-named/artwork_60_scan.jpg",
  width: 2048,
  height: 1536,
};

const a61: Artwork = {
  id: "artwork-61",
  title: "Winter, Winter, and Then There's Spring",
  src: "/images/work/before-they-are-named/artwork_61_scan.jpg",
  width: 2048,
  height: 1536,
};

// ─── Main data export ────────────────────────────────────────────────────────

export const beforeTheyAreNamed: {
  title: string;
  year: string;
  category: string;
  medium: string;
  /** Winter series final work — used as the exhibition intro backdrop */
  introBackground: string;
  statement: { en: readonly string[] };
  sections: readonly ArtworkSection[];
} = {
  title: "No Idea",
  year: "2026",
  category: "Embodied Art Practice",
  medium: "Pastel, watercolor, and colored pencil on paper",
  introBackground: a61.src,
  statement: {
    en: [
      "Colors find their own forms; one mark leads to another. I begin without knowing what the drawing will become. A secret bonfire party, a forager\u2019s POV \u2014 stories only show up in the end.",
      "Acknowledging \u201CI don\u2019t know\u201D is, perhaps, a virtue, a certain sober honesty in realizing that we only ever meet experience as it is happening. Improvisation. The \u201CI\u201D comes in quickly after, naming, explaining, taking credit.",
      "But something knew before that. Something passes through the body and lands here as motion, memory, and time.",
      "Below are some of its traces.",
    ],
  },
  sections: [
    {
      kind: "singles" as const,
      items: [a50, a51, a52, a53, a54],
    },
    {
      kind: "series" as const,
      seriesTitle: "Jeux D'eau",
      medium: "Watercolor and colored pencil on paper",
      groups: [
        { kind: "pair" as const, artworks: [a55, a56] as [Artwork, Artwork] },
        { kind: "pair" as const, artworks: [a57, a58] as [Artwork, Artwork] },
      ],
    },
    {
      kind: "series" as const,
      seriesTitle: "Winter, Winter, and Then There\u2019s Spring",
      medium: "Pastel on paper",
      groups: [
        { kind: "pair" as const, artworks: [a59, a60] as [Artwork, Artwork] },
        { kind: "solo" as const, artwork: a61 },
      ],
    },
  ],
};
