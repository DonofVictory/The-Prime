import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Route } from "./+types/prayer-wall";
import { PageIntro, Section } from "../components/Bits";
import { Choices, Field, Form } from "../components/Form";
import { ListItem, Reveal, StaggerList } from "../components/Motion";
import { get, post } from "../lib/api";
import { pageMeta } from "../lib/meta";

export const meta = ({ location }: Route.MetaArgs) =>
  pageMeta(
    "The Prayer Wall | Prime Church",
    "You do not have to pray alone. Share a prayer request privately with the Prime Church prayer team, or on the Prayer Wall.",
    location.pathname,
  );

type Request = { id: string; firstName: string; text: string; prayedCount: number };
type WallState = { status: "loading" } | { status: "error" } | { status: "ready"; items: Request[] };

const KEY = "prime-prayed";
function readPrayed(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}
function savePrayed(ids: string[]) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* storage unavailable: the count still updates on screen */
  }
}

/**
 * Demo mode only: add ?preview=wall to the URL to fill the wall with two labelled samples,
 * so the "I prayed" interaction can be tried before the backend exists.
 */
const SAMPLES: Request[] = [
  { id: "sample-1", firstName: "Sample request", text: "Pray for wisdom as I start a new job next week.", prayedCount: 4 },
  { id: "sample-2", firstName: "Sample request", text: "Exams start on Monday. Pray for peace and focus.", prayedCount: 0 },
];
const demoWall = () =>
  typeof location !== "undefined" && new URLSearchParams(location.search).get("preview") === "wall" ? SAMPLES : [];

export default function PrayerWall() {
  const [wall, setWall] = useState<WallState>({ status: "loading" });

  useEffect(() => {
    let live = true;
    get<Request[]>("/prayer-wall", demoWall())
      .then((items) => live && setWall({ status: "ready", items }))
      .catch(() => live && setWall({ status: "error" }));
    return () => {
      live = false;
    };
  }, []);

  return (
    <>
      <PageIntro
        title="The Prayer Wall"
        lede="You do not have to pray alone. Share what is on your heart. Choose whether it stays private or is shared on the wall for others to pray over."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
          <Reveal className="panel">
            <Form
              id="prayer"
              endpoint="/prayer-requests"
              submit="Submit prayer request"
              successTitle="Received."
              successText="We are praying with you."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your name" name="name" required autoComplete="name" error="Tell us your name." />
                <Field
                  label="Your email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  error="Enter your email address."
                />
                <Field
                  label="Your prayer request"
                  name="request"
                  textarea
                  required
                  className="sm:col-span-2"
                  error="Write your prayer request, even a few words is enough."
                />
                <Choices
                  className="sm:col-span-2"
                  legend="Choose one"
                  name="visibility"
                  defaultValue="private"
                  options={[
                    { value: "private", label: "Keep this private" },
                    { value: "public", label: "Share on the Prayer Wall" },
                  ]}
                >
                  <p className="hint mt-2">
                    Private requests are only seen by our prayer team. Public requests are reviewed before they are
                    shared.
                  </p>
                </Choices>
              </div>
            </Form>
          </Reveal>

          <Reveal delay={0.1}>
            <section aria-labelledby="wall-title">
              <h2 id="wall-title" className="text-3xl">
                Pray for someone today
              </h2>
              <p className="mt-2 text-mute">Tap "I prayed" on a request to let them know they are not alone.</p>
              <div className="mt-6">
                {wall.status === "loading" && (
                  <p className="text-sm text-mute" role="status">
                    Loading requests…
                  </p>
                )}
                {wall.status === "error" && (
                  <p className="text-sm text-mute" role="status">
                    The wall did not load. Check your internet connection and refresh the page.
                  </p>
                )}
                {wall.status === "ready" &&
                  (wall.items.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-line p-5">
                      <p className="text-lg">Be the first to share a request. Someone is ready to pray with you.</p>
                      <a className="btn btn-line mt-4" href="#prayer">
                        Share a request
                      </a>
                    </div>
                  ) : (
                    <StaggerList className="border-b border-line">
                      {wall.items.map((item) => (
                        <WallItem key={item.id} item={item} />
                      ))}
                    </StaggerList>
                  ))}
              </div>
            </section>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function WallItem({ item }: { item: Request }) {
  const [count, setCount] = useState(item.prayedCount);
  const [prayed, setPrayed] = useState(false);
  const [justPrayed, setJustPrayed] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => setPrayed(readPrayed().includes(item.id)), [item.id]);

  async function pray() {
    // Optimistic: show it straight away, undo if the save fails.
    setPrayed(true);
    setJustPrayed(true);
    setCount((n) => n + 1);
    setFailed(false);
    try {
      await post(`/prayer-wall/${encodeURIComponent(item.id)}/prayed`, {});
      savePrayed([...readPrayed(), item.id]);
    } catch {
      setPrayed(false);
      setJustPrayed(false);
      setCount((n) => n - 1);
      setFailed(true);
    }
  }

  const people = count === 1 ? "person prayed" : "people prayed";

  return (
    <ListItem className="border-t border-line py-4">
      <p className="font-semibold">{item.firstName}</p>
      <p className="mt-1 text-mute">{item.text}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className={`btn relative overflow-hidden border-line ${prayed ? "text-night" : "text-chalk hover:border-chalk"} disabled:cursor-default disabled:opacity-100`}
          aria-pressed={prayed}
          disabled={prayed}
          onClick={pray}
        >
          {/* the sky fill sweeps across from the left when you press it */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 origin-left bg-sky"
            initial={false}
            animate={{ scaleX: prayed ? 1 : 0 }}
            transition={{ duration: justPrayed ? 0.45 : 0, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="relative inline-flex items-center gap-2">
            {prayed && (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <motion.path
                  d="M2 7.5 5.5 11 12 3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={justPrayed ? { pathLength: 0 } : false}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                />
              </svg>
            )}
            {prayed ? "You prayed" : "I prayed"}
          </span>
        </button>
        <p className="flex items-baseline gap-1 text-sm text-mute" aria-live="polite">
          {failed ? (
            "That did not save. Try again."
          ) : count > 0 ? (
            <>
              {/* the number rolls up to the new count */}
              <span className="relative inline-flex h-[1.4em] overflow-hidden tabular-nums">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={count}
                    className={`font-semibold ${justPrayed ? "text-sky" : "text-chalk"}`}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {count}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span>{justPrayed ? `${people}, including you` : people}</span>
            </>
          ) : null}
        </p>
      </div>
    </ListItem>
  );
}
