import type { Config } from "@react-router/dev/config";
import { devotionals, affirmations } from "./app/content/devotionals";
import { prayerGuides, teaching } from "./app/content/resources";

/**
 * Static site: no server. Every page below is pre-rendered to its own HTML file at build time,
 * so search engines and WhatsApp link previews see real content. React then takes over in the browser.
 */
export default {
  ssr: false,
  async prerender() {
    return [
      "/",
      "/about",
      "/information",
      "/next-steps",
      "/connect",
      "/connect/find-your-tribe",
      "/connect/prayer-wall",
      "/connect/talk-to-someone",
      "/resources",
      "/resources/prayer-points",
      ...prayerGuides.map((g) => `/resources/prayer-points/${g.slug}`),
      "/resources/support",
      "/resources/teaching",
      ...teaching.map((t) => `/resources/teaching/${t.slug}`),
      "/resources/devotional",
      ...devotionals.map((d) => `/resources/devotional/${d.day}`),
      "/resources/affirmations",
      ...affirmations.map((a) => `/resources/affirmations/${a.day}`),
      "/resources/archive",
      "/resources/downloads",
    ];
  },
} satisfies Config;
