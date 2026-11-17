/**
 * Everything the church needs to fill in lives here.
 * A value of null renders as a visible placeholder token on the site, e.g. [Time].
 */

export type Service = {
  name: string;
  day: "Sunday" | "Tuesday" | "Thursday";
  /** 0 = Sunday ... 6 = Saturday */
  dow: number;
  time: string | null;
  /** start hour in Lagos, 24-hour clock; after the service ends, "next gathering" moves on to the next one */
  hour: number;
  /** in person at the Yaba venue, or online */
  place: "in-person" | "online";
  description: string;
};

/** The live domain. Set before launch so share links and canonical URLs are correct. */
export const SITE_URL = "https://primechurch.example";

export const site = {
  name: "Prime Church",
  tagline: "Get Primed.",
  summary:
    "A community for young people who want real faith, real conversations and real friendships.",

  /**
   * Looping hero video on the home page. Put the files in public/video/ and list them in `sources`, MP4 (H.264)
   * first so iPhones can play it, then optionally WebM. Muted, 8 to 15 seconds, about 2 to 4 MB.
   * The poster is the still shown first, and the only thing shown on slow connections or with reduced motion.
   */
  // PLACEHOLDER: a generated stage-lights loop so the layout can be judged. Replace with real Prime footage.
  heroVideo: {
    sources: [
      { src: "/video/placeholder-hero.mp4", type: "video/mp4" },
      { src: "/video/placeholder-hero.webm", type: "video/webm" },
    ] as { src: string; type: string }[],
    poster: "/video/placeholder-hero.jpg" as string | null,
  },


  address: "Hall 1, E-Center, 1-11 Commercial Avenue, Ozone Cinemas, Yaba, Lagos" as string | null,
  /** Google Maps link for "Get directions" */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=E-Centre%20Ozone%20Cinemas%2C%201-11%20Commercial%20Avenue%2C%20Yaba%2C%20Lagos" as
      | string
      | null,
  /** The map shown in "Find us" (Google Maps embed, no API key needed) */
  mapEmbedUrl:
    "https://www.google.com/maps?q=E-Centre%20Ozone%20Cinemas%2C%201-11%20Commercial%20Avenue%2C%20Yaba%2C%20Lagos&z=16&output=embed" as
      | string
      | null,
  phone: null as string | null,
  email: null as string | null,

  instagram: { handle: "@primeyaba", url: "https://www.instagram.com/primeyaba" },
  youtube: {
    name: null as string | null,
    /** Channel live URL, e.g. https://www.youtube.com/@channel/live */
    liveUrl: null as string | null,
  },

  services: [
    {
      name: "Sunday Service",
      day: "Sunday",
      dow: 0,
      time: "10am",
      hour: 10,
      place: "in-person",
      description:
        "Our main gathering. Worship, teaching and community. Come early and stay for the hangout after.",
    },
    {
      name: "Tuesday Service",
      day: "Tuesday",
      dow: 2,
      time: "8pm",
      hour: 20,
      place: "online",
      description:
        "A midweek gathering to pause, pray and be refreshed in the middle of a busy week.",
    },
    {
      name: "Thursday Service",
      day: "Thursday",
      dow: 4,
      time: "8pm",
      hour: 20,
      place: "online",
      description: "Another midweek touchpoint for worship, the word and fellowship.",
    },
  ] satisfies Service[],
};

/** Where "Watch live" goes: the YouTube live page once set, otherwise the on-site Watch live section. */
export const watchLiveHref = site.youtube.liveUrl ?? "/information#watch-live";
export const watchLiveExternal = Boolean(site.youtube.liveUrl);

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Information", href: "/information" },
  { label: "Next Steps", href: "/next-steps" },
  { label: "Engagement", href: "/connect" },
  { label: "Resources", href: "/resources" },
];

export const explore = [
  { label: "About", href: "/about" },
  { label: "Services and Events", href: "/information" },
  { label: "Next Steps", href: "/next-steps" },
  { label: "Find Your Tribe", href: "/connect/find-your-tribe" },
  { label: "Prayer Wall", href: "/connect/prayer-wall" },
  { label: "Resources", href: "/resources" },
  { label: "Daily Devotional", href: "/resources/devotional" },
];

/** Where a service happens, in words: the venue for in-person services, "Online" otherwise. */
export const serviceWhere = (s: Service) => (s.place === "online" ? "Online" : site.address);

/** Short form for lists, e.g. "10am, in Yaba" or "8pm, online". */
export const serviceShort = (s: Service) => `${s.time ?? "Time to be confirmed"}, ${s.place === "online" ? "online" : "in Yaba"}`;
