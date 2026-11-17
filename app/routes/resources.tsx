import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import type { Route } from "./+types/resources";
import { PageIntro, Rows, Section } from "../components/Bits";
import { Reveal } from "../components/Motion";
import { useTypeCycle } from "../components/Type";
import { prayerGuides, resourceSections, support, teaching } from "../content/resources";
import { devotionals } from "../content/devotionals";
import { pageMeta } from "../lib/meta";

export const meta = ({ location }: Route.MetaArgs) =>
  pageMeta(
    "Resources | Prayer, Devotionals and Teaching | Prime Church",
    "Free prayer points, scriptures, daily devotionals, affirmations and teaching videos for real-life situations.",
    location.pathname,
  );

type Item = { title: string; summary: string; url: string; kind: string; hay: string };

const index: Item[] = [
  ...prayerGuides.map((g) => ({
    title: g.title,
    summary: g.summary,
    url: `/resources/prayer-points/${g.slug}`,
    kind: "Prayer points",
    body: [g.intro, ...g.points, g.closing, ...g.tags],
  })),
  {
    title: support.title,
    summary: "Biblical comfort for hard seasons, plus a way to talk to someone.",
    url: "/resources/support",
    kind: "Support",
    body: [support.intro, support.prayer, ...support.tags],
  },
  ...teaching.map((t) => ({
    title: t.title,
    summary: `${t.summary} Series: ${t.series}.`,
    url: `/resources/teaching/${t.slug}`,
    kind: "Teaching",
    body: [...t.tags, ...t.videos.map((v) => `${v.title} ${v.summary}`)],
  })),
  ...devotionals.map((d) => ({
    title: `Day ${d.day}: ${d.title}`,
    summary: d.scripture.ref,
    url: `/resources/devotional/${d.day}`,
    kind: "Devotional",
    body: [d.reflection, d.prayer, d.scripture.text],
  })),
].map(({ body, ...item }) => ({ ...item, hay: `${item.title} ${item.summary} ${body.join(" ")}`.toLowerCase() }));

function search(q: string) {
  const words = q.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
  if (!words.length) return null;
  return index
    .map((item) => {
      let score = 0;
      for (const w of words) {
        if (item.title.toLowerCase().includes(w)) score += 5;
        if (item.hay.includes(w)) score += 1;
      }
      return { item, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((x) => x.item);
}

const suggestions = ["relocation", "anxiety", "job", "family"];

export default function Resources() {
  const [focused, setFocused] = useState(false);
  const [params] = useSearchParams();
  const [query, setQuery] = useState("");
  // While the box is empty and not in use, it types example searches as its placeholder.
  const example = useTypeCycle(suggestions, !focused && query === "", { type: 90, erase: 45, hold: 1500 });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = params.get("q");
    if (q) setQuery(q);
  }, [params]);

  const results = useMemo(() => search(query), [query]);

  return (
    <>
      <PageIntro
        title="Resources for real life"
        lede="Whatever you are walking through, start here. Find prayer points, scriptures, teaching and encouragement that meet you where you are."
      />

      <Section>
        <Reveal className="panel max-w-3xl">
          <div role="search" className="grid gap-3">
            <label htmlFor="resource-search" className="font-display text-xl font-bold">
              What are you going through?
            </label>
            <input
              id="resource-search"
              ref={inputRef}
              type="search"
              autoComplete="off"
              aria-describedby="search-try"
              className="text-lg"
              value={query}
              placeholder={focused ? "" : example}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={(e) => setQuery(e.target.value)}
            />
            <p className="flex flex-wrap items-center gap-2 text-sm text-mute" id="search-try">
              Try
              {suggestions.map((word) => (
                <button
                  key={word}
                  type="button"
                  className="rounded-full border border-line px-3 py-1 text-chalk hover:border-sky hover:text-sky"
                  onClick={() => {
                    setQuery(word);
                    inputRef.current?.focus();
                  }}
                >
                  {word}
                </button>
              ))}
            </p>
          </div>
        </Reveal>

        <AnimatePresence>
          {results && (
            <motion.div
              className="mt-8 max-w-3xl"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p className="font-semibold" role="status" aria-live="polite">
                {results.length
                  ? `${results.length} ${results.length === 1 ? "resource matches" : "resources match"} "${query.trim()}".`
                  : `Nothing matches "${query.trim()}" yet. Try a different word, or browse everything below.`}
              </p>
              <ul className="mt-3 border-b border-line">
                {results.map((item, i) => (
                  <motion.li
                    key={item.url}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link
                      className="-mx-3 grid gap-1 rounded-lg border-t border-line px-3 py-3 text-chalk no-underline hover:bg-surface md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-6"
                      to={item.url}
                    >
                      <span className="font-display font-semibold">{item.title}</span>
                      <span className="text-sm text-mute">
                        {item.kind}. {item.summary}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>

      <Section id="all" title="Browse everything">
        <Rows items={resourceSections.map((r) => ({ title: r.title, text: r.summary, href: r.href }))} />
      </Section>
    </>
  );
}
