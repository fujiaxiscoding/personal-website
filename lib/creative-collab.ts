/** Structured content for the Creative Collab cinematic case study.
 * Sources: casestudy.pptx, Iteration Log.dc.html, Design System v2.dc.html
 */

export const creativeCollab = {
  title: "Creative Collab",
  tagline: "A collaboration-starting platform for independent creatives.",
  role: "Product Designer",
  year: "2026",
  location: "Launching first in New York City",
  prototypeSrc: "/prototypes/creative-collab/index.html",
  coverImage: "/images/work/creative-collab/cover.png",

  imagine: {
    eyebrow: "Imagine this",
    paragraphs: [
      "Imagine you’re a filmmaker with an idea you can already see: a scene, a mood, a world beginning to take shape.",
      "You don’t need a job. You need the right people—a cinematographer who understands the light, a producer who wants to make it real, someone whose practice makes the idea become more than yours alone.",
      "But where do you begin looking?",
    ],
    image: "/images/work/creative-collab/imagine.png",
    imageAlt:
      "Illustration of a creative with a camera and sketchbook, stalled looking at her phone",
  },

  problems: [
    {
      label: "Friends",
      text: "The right people are usually outside your circle, and one network can only stretch so far.",
    },
    {
      label: "Social media",
      text: "These platforms are stages for presenting finished work, so openly asking for collaborators feels like exposure rather than an invitation.",
    },
    {
      label: "Job platforms",
      text: "LinkedIn serves careers and freelance marketplaces run on payment, while a passion project begins from shared interest.",
    },
    {
      label: "Collab platforms",
      text: "Remote networks connect strangers who share no city and no chance to meet, which makes genuine trust nearly impossible to build.",
    },
  ],

  trustGap: {
    creator: {
      role: "Creator",
      quote: "Is this the right person?",
      detail:
        "Maya, 28, director — has a film in her head and a moodboard on her phone. No way to vet a stranger, so she quietly gives up.",
    },
    collaborator: {
      role: "Collaborator",
      quote: "Am I welcome to join?",
      detail:
        "Theo, 24, sound designer — scrolls past projects he’d love to join daily. A cold message always feels like too much.",
    },
  },

  insight: "No platform today is designed for the moment a collaboration begins.",

  thesis: {
    not: [
      "Not a job board",
      "Not a freelancer marketplace",
      "Not a social feed",
      "Not a cold DM",
    ],
    is: [
      "Creative intent",
      "Project context",
      "Mutual interest",
      "Trust",
    ],
    summary:
      "Creative Collab is a collaboration-starting platform for independent creatives — one place to post a project, define open roles, and let people express interest without a cold message.",
  },

  loop: [
    {
      id: "browse",
      title: "Browse",
      text: "Projects and people are open with no account — no wall before curiosity.",
      image: "/images/work/creative-collab/loop/01-browse.png",
    },
    {
      id: "project",
      title: "Project",
      text: "Open a project to see roles, timeline, and seriousness up front.",
      image: "/images/work/creative-collab/loop/02-project.png",
    },
    {
      id: "interest",
      title: "Express Interest",
      text: "One trust action. This is the only door where sign up appears.",
      image: "/images/work/creative-collab/loop/03-interest.png",
    },
    {
      id: "identity",
      title: "Creative Identity",
      text: "Taste, references, and past work stand in for a shared network.",
      image: "/images/work/creative-collab/loop/04-identity.png",
    },
    {
      id: "review",
      title: "Creator Review",
      text: "The creator reads why you connected before any credentials.",
      image: "/images/work/creative-collab/loop/05-review.png",
    },
    {
      id: "chat",
      title: "Conversation",
      text: "When it fits, the project opens into a chat with context already shared.",
      image: "/images/work/creative-collab/loop/06-chat.png",
    },
  ],

  iterations: [
    {
      num: "02",
      stage: "flows",
      title: "Collapsing guest and member",
      intro:
        "The first structure had two separate journeys. Testing the click path showed the wall landed in the wrong place.",
      changes: [
        {
          kind: "cut" as const,
          what: "Removed the separate guest experience",
          why: "Two parallel journeys forced people to commit before they had seen anything worth committing to.",
        },
        {
          kind: "add" as const,
          what: "Signup triggered by the first trust action",
          why: "Browsing is free. The account appears when you express interest — and the reason is obvious.",
        },
      ],
      outcome: "One continuous journey: browse → trust action → identity → back to the project.",
    },
    {
      num: "03",
      stage: "onboarding",
      title: "Cutting five steps to three",
      intro:
        "The original creative-identity flow asked five questions, two of them abstract enough that most answers would be performative or blank.",
      changes: [
        {
          kind: "cut" as const,
          what: "Removed two abstract questions",
          why: "They asked people to theorise about their own work.",
        },
        {
          kind: "fix" as const,
          what: "Rewrote prompts as conversational",
          why: "Concrete prompts get concrete answers.",
        },
      ],
      outcome: "Three steps a real person will finish, in an order that builds momentum.",
    },
    {
      num: "06",
      stage: "design system",
      title: "v1 → v2",
      intro:
        "v1 documented what components look like. It could not settle an argument. v2 answered how we decide.",
      changes: [
        {
          kind: "add" as const,
          what: "Usage rules and component states",
          why: "Button hierarchy, Toast vs Modal, and the question each state must answer.",
        },
        {
          kind: "add" as const,
          what: "Product rationale and three principles",
          why: "Participation over administration · Energy creates participation · Playful to enter, serious enough to commit.",
        },
      ],
      outcome: "A system that answers how we decide, not just what exists.",
    },
    {
      num: "07",
      stage: "prototype",
      title: "The hero flow",
      intro:
        "Rather than build more screens, one flow was chosen to finish properly against the system.",
      changes: [
        {
          kind: "shift" as const,
          what: "Chose Express Interest as the hero flow",
          why: "It is the product’s central value moment and touches the most components end to end.",
        },
        {
          kind: "add" as const,
          what: "Connected states across the flow",
          why: "After success the CTA becomes Interest sent and the card carries a badge — a toast alone was not enough.",
        },
      ],
      outcome: "One flow that demonstrates the system working.",
    },
  ],

  reversals: [
    {
      title: "Guest mode as a separate product",
      from: "two journeys",
      to: "one journey",
      why: "The signup wall was in the wrong place.",
    },
    {
      title: "Mobile-first layout",
      from: "mobile-first",
      to: "desktop-first",
      why: "The core activity is comparison, which needs width.",
    },
  ],

  decisions: [
    {
      title: "Projects before profiles",
      insight: "Interest should attach to the work itself, not to a stranger.",
      decision: "Browse things being made first.",
      behavior: "You enter through projects, so the first move is a response to a concrete creation.",
    },
    {
      title: "Commitment is visible",
      insight: "Nobody should have to guess what saying yes would mean.",
      decision: "Role, timeline, and seriousness appear up front.",
      behavior: "Project detail makes the ask readable before anyone reaches out.",
    },
    {
      title: "Interest starts as a response",
      insight: "A blank message is where both journeys break.",
      decision: "Borrow Hinge’s prompt-reply pattern.",
      behavior: "You answer why the project resonates instead of sending a cold hello.",
    },
    {
      title: "Creative Identity creates trust",
      insight: "Strangers have no shared network to vouch for them.",
      decision: "Taste, references, and past work live in one reviewable profile.",
      behavior: "Creators get a trust signal before any conversation starts.",
    },
    {
      title: "Signup happens at the moment of intent",
      insight: "A wall at the door kills curiosity.",
      decision: "Sign up appears only when you express interest.",
      behavior: "Account setup is part of reaching out, then returns you to the same project.",
    },
  ],

  designSystem: {
    colors: [
      { name: "primary", hex: "#e2683f", use: "CTAs, links, focus" },
      { name: "secondary", hex: "#eab54a", use: "Guest, warning, filter" },
      { name: "accent", hex: "#5bbf88", use: "Selected, verified, success" },
      { name: "background", hex: "#17120e", use: "Warm dark canvas" },
    ],
    type: [
      { name: "Bricolage Grotesque", role: "Display" },
      { name: "Space Grotesk", role: "Body" },
      { name: "IBM Plex Mono", role: "Labels" },
    ],
    principles: [
      "Participation over administration",
      "Energy creates participation",
      "Playful to enter, serious enough to commit",
    ],
  },

  mvp: {
    inPrototype: [
      "Browse → Project → Express Interest → Creative Identity → Creator Review → Conversation",
      "Category filters, saved projects, create/publish flow",
      "Full onboarding into Creative Identity",
    ],
    stillToBuild: [
      "Working chat backend",
      "Notifications",
      "Safety and reporting",
      "Suggested matches",
      "Paid features after launch",
    ],
  },

  ending: "A creative idea finds the right person and moves into action.",
} as const;

export type CreativeCollabContent = typeof creativeCollab;
