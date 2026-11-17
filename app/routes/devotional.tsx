import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/devotional";
import { DayProgress, Section, Verse } from "../components/Bits";
import { DayIndex } from "../components/DayIndex";
import { Item, Reveal, Stagger } from "../components/Motion";
import { NotFound } from "../components/NotFound";
import { ShareButton } from "../components/ShareButton";
import { devotionals } from "../content/devotionals";
import { useLagosToday } from "../lib/lagos";
import { pageMeta } from "../lib/meta";

const find = (day: string) => devotionals.find((d) => String(d.day) === day);

export const meta = ({ params, location }: Route.MetaArgs) => {
  const d = find(params.day);
  return d
    ? pageMeta(`Day ${d.day}: ${d.title} | Daily Devotional | Prime Church`, d.reflection, location.pathname)
    : [];
};

export default function Devotional({ params }: Route.ComponentProps) {
  const today = useLagosToday();
  const d = find(params.day);
  if (!d) return <NotFound />;
  const prev = d.day === 1 ? 31 : d.day - 1;
  const next = d.day === 31 ? 1 : d.day + 1;

  return (
    <>
      <article className="wrap pt-10 pb-6 md:pt-14" key={d.day}>
        <Stagger className="max-w-3xl">
          <Item>
            <Link to="/resources/devotional" className="text-sm font-medium text-mute no-underline hover:text-chalk">
              Daily devotional
            </Link>
          </Item>
          <Item className="mt-5">
            <DayProgress day={d.day} />
            {today?.day === d.day && <p className="mt-2 text-sm text-mute">Today's reading</p>}
          </Item>
          <Item>
            <h1 className="mt-4 text-4xl">{d.title}</h1>
          </Item>
          <Item className="mt-8">
            <Verse text={d.scripture.text} reference={d.scripture.ref} />
          </Item>
          <Item>
            <p className="mt-8 text-lg leading-relaxed">{d.reflection}</p>
          </Item>
          <Item className="mt-8 rounded-2xl border border-sky/40 bg-sky/10 p-5">
            <p className="text-lg">
              <span className="font-display font-bold text-sky">Pray: </span>
              {d.prayer}
            </p>
          </Item>
          <Item className="mt-8 flex flex-wrap gap-3">
            <ShareButton title={`Day ${d.day}: ${d.title}`} text={`${d.title}. ${d.scripture.ref}`} variant="sky" />
            <Link className="btn btn-line" to={`/resources/devotional/${prev}`}>
              Day {prev}
            </Link>
            <Link className="btn btn-line" to={`/resources/devotional/${next}`}>
              Day {next}
            </Link>
          </Item>
        </Stagger>
      </article>

      <NotificationPrompt />

      <Section id="days" title="Every day this month">
        <DayIndex base="/resources/devotional" current={d.day} label="Devotional days" />
      </Section>
    </>
  );
}

const LATER_KEY = "prime-notify-later";

/** Notification permission prompt: a quiet banner, never a pop-up. */
function NotificationPrompt() {
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(LATER_KEY) === "1";
    } catch {
      /* storage blocked: show the banner */
    }
    setVisible("Notification" in window && Notification.permission === "default" && !dismissed);
  }, []);

  async function allow() {
    const permission = await Notification.requestPermission();
    setResult(
      permission === "granted"
        ? "Notifications are on."
        : "Notifications are off. You can turn them on later in your browser settings.",
    );
  }

  function later() {
    try {
      localStorage.setItem(LATER_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          className="wrap"
          aria-labelledby="notify-title"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Reveal className="panel max-w-3xl">
            {result ? (
              <p role="status">{result}</p>
            ) : (
              <>
                <p>
                  <strong id="notify-title" className="font-display">
                    Stay close to what matters.
                  </strong>{" "}
                  <span className="text-mute">
                    Allow notifications to get your daily devotional, affirmations, event reminders and important
                    announcements. We will keep them few and meaningful.
                  </span>
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button type="button" className="btn btn-sky" onClick={allow}>
                    Allow notifications
                  </button>
                  <button type="button" className="btn btn-line" onClick={later}>
                    Not now
                  </button>
                </div>
              </>
            )}
          </Reveal>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
