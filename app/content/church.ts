export const values = [
  { title: "Faith First, Always", text: "Everything we do starts with Jesus. He is our foundation, not our decoration." },
  { title: "Love Without Walls", text: "Everyone is welcome. No performance, no pretending, no pressure." },
  { title: "Radical Joy", text: "Faith is fun. Righteousness is loud. We celebrate boldly." },
  { title: "Creative Fire", text: "Music, art, film, design and ideas are all gifts. We use them for God." },
  {
    title: "Truth in Every Topic",
    text: "We talk openly about the real stuff: relationships, mental health, money, doubt and purpose.",
  },
  { title: "Community over Crowd", text: "We would rather you be known by a few people than lost in a crowd." },
];

export const visitSteps = [
  { title: "Come as you are.", text: "Wear what you are comfortable in." },
  { title: "A warm welcome.", text: "Someone will greet you and show you around." },
  { title: "Worship that feels real.", text: "Live music, no pressure to perform." },
  { title: "Teaching that makes sense.", text: "Simple, honest and rooted in the Bible." },
  { title: "Time to connect.", text: "Stay after for conversation and community." },
];

export const pastors = [
  {
    name: "Pastor Tim Durotinu" as string | null,
    role: "Pastor" as string | null,
    bio: null as string | null,
    photo: "/images/pastor-tim.jpeg" as string | null,
  },
];

export const declaration = {
  text: "I am PRIMED by purpose, positioned for power, and propelled by faith. I am the light, the salt, the city on a hill, unashamed and unstoppable.",
  verses: [
    {
      text: "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.",
      ref: "Romans 12:2",
    },
    {
      text: "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light:",
      ref: "1 Peter 2:9",
    },
    { text: "Ye are the light of the world. A city that is set on an hill cannot be hid.", ref: "Matthew 5:14" },
  ],
};

export type ChurchEvent = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. 2026-12-12. null shows a [Date] placeholder */
  date: string | null;
  time: string | null;
  venue: string | null;
  registerUrl: string | null;
};

export const events: ChurchEvent[] = [
  {
    slug: "bonding-fest",
    title: "The PRIME Bonding Fest",
    description:
      "A vibrant celebration focused on building community and deeper connections. Bring your friends.",
    date: null,
    time: null,
    venue: null,
    registerUrl: null,
  },
  {
    slug: "prime-experience",
    title: "The PRIME Experience",
    description:
      "A Christian pop-culture-themed concert blending gospel music, spoken word, digital art and youth culture.",
    date: null,
    time: null,
    venue: null,
    registerUrl: null,
  },
  {
    slug: "sip-and-paint",
    title: "Sip & Paint",
    description: "A relaxed creative evening: paint, sip, laugh and have real conversations with new friends.",
    date: null,
    time: null,
    venue: null,
    registerUrl: null,
  },
  {
    slug: "game-night",
    title: "Game Night",
    description: "Board games, video games and good company. No pressure, just fun.",
    date: null,
    time: null,
    venue: null,
    registerUrl: null,
  },
  {
    slug: "panel-sessions",
    title: "Panel Sessions",
    description: "Honest conversations on faith, identity, creativity and real-life topics, in a relaxed venue.",
    date: null,
    time: null,
    venue: null,
    registerUrl: null,
  },
  {
    slug: "campus-visits",
    title: "Campus Visits",
    description:
      "Every quarter, Pastor Bolaji and other ministers visit a Prime Church hosting university for Q&A sessions and mini hangouts.",
    date: null,
    time: null,
    venue: null,
    registerUrl: null,
  },
];

/** Events with dates first, soonest first; undated keep their order. */
export function sortedEvents() {
  return [...events].sort((a, b) => {
    if (a.date && b.date) return a.date.localeCompare(b.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });
}

export const teachingSeries = {
  title: "Adam and Eve",
  text: "We are looking at the first man and woman, and what their story says about identity, relationship, temptation, shame and grace. It is the oldest story in the Bible, and it is still about us.",
  url: null as string | null,
};

export const announcements: { title: string; text: string }[] = [];

export type TribeId = "creatives" | "builders" | "worshippers" | "thinkers" | "players" | "connectors";

export const tribes: { id: TribeId; name: string; text: string }[] = [
  {
    id: "creatives",
    name: "The Creatives",
    text: "Artists, designers, filmmakers, musicians and content creators. Make something beautiful for God, together.",
  },
  {
    id: "builders",
    name: "The Builders",
    text: "Students, entrepreneurs and young professionals building careers and businesses with integrity.",
  },
  {
    id: "worshippers",
    name: "The Worshippers",
    text: "People who love music, worship and prayer, and want to go deeper in God's presence.",
  },
  { id: "thinkers", name: "The Thinkers", text: "Curious minds who love deep teaching, tough questions and Bible study." },
  { id: "players", name: "The Players", text: "Sports, gaming and game-night people. Faith and fun belong together." },
  {
    id: "connectors",
    name: "The Connectors",
    text: "Food, hangouts and good conversation. If you love people, this is your tribe.",
  },
];

type Option = { label: string; tribe?: TribeId };
export type Question = { id: string; text: string; options?: Option[]; freeText?: boolean };

/**
 * Scoring: the answer to question 1 counts 3 points, questions 2 and 3 count 1 point
 * toward their tribe. Ties go to the question 1 tribe. Questions 4 and 5 are passed to the team.
 */
export const quiz: Question[] = [
  {
    id: "interests",
    text: "What do you love to do when you are off the clock?",
    options: [
      { label: "Sports and fitness", tribe: "players" },
      { label: "Music and worship", tribe: "worshippers" },
      { label: "Gaming", tribe: "players" },
      { label: "Art and design", tribe: "creatives" },
      { label: "Content creation", tribe: "creatives" },
      { label: "Food and hangouts", tribe: "connectors" },
      { label: "Reading and deep discussion", tribe: "thinkers" },
      { label: "Business and side hustles", tribe: "builders" },
    ],
  },
  {
    id: "stage",
    text: "Which describes you right now?",
    options: [
      { label: "Student", tribe: "builders" },
      { label: "Recent graduate", tribe: "builders" },
      { label: "Young professional", tribe: "builders" },
      { label: "Creative", tribe: "creatives" },
      { label: "Between seasons" },
    ],
  },
  {
    id: "hoping",
    text: "What are you hoping to find?",
    options: [
      { label: "Close friends", tribe: "connectors" },
      { label: "Mentorship", tribe: "builders" },
      { label: "Deeper teaching", tribe: "thinkers" },
      { label: "A place to serve", tribe: "worshippers" },
      { label: "Just good vibes", tribe: "connectors" },
    ],
  },
  {
    id: "connect",
    text: "How do you like to connect?",
    options: [
      { label: "Small group chats" },
      { label: "Big gatherings" },
      { label: "Online first" },
      { label: "A mix of both" },
    ],
  },
  { id: "area", text: "Where are you based?", freeText: true },
];
