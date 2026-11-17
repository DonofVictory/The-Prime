import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import { DayProgress, Ph, Rows, Section, Verse, WatchLive } from "../components/Bits";
import { Item, Reveal, Stagger, useStill } from "../components/Motion";
import { ShareButton } from "../components/ShareButton";
import { TypeCycle, Typewriter } from "../components/Type";
import { EventPoster } from "../components/Comic";
import { serviceWhere, site } from "../content/site";
import { events } from "../content/church";
import { affirmations, devotionals } from "../content/devotionals";
import { nextService, useLagosToday } from "../lib/lagos";
import { pageMeta } from "../lib/meta";

export const meta = ({ location }: Route.MetaArgs) =>
  pageMeta(
    "The Prime Church | Faith That Feels Like Home",
    "Prime Church is a community for young people who want real faith, real conversations and real friendships. Plan your visit or watch live.",
    location.pathname,
  );

const finds = [
  {
    title: "Honest teaching",
    text: "Simple, truthful messages about real life: purpose, relationships, money, mental health and faith.",
  },
  { title: "Real community", text: "Friendships, small groups and hangouts where you are known, not just counted." },
  {
    title: "Room to grow",
    text: "Devotionals, prayer resources and teaching you can use every day, not just on Sunday.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

type Connection = { saveData?: boolean; effectiveType?: string };

/**
 * The looping video behind the hero, under a dark wash so the text stays readable.
 * Plays only when there is a clip, the connection is not slow or on data saver, motion is allowed,
 * and the hero is on screen. Otherwise it shows the still (poster), or the plain onyx until footage arrives.
 */
function HeroBackdrop() {
  const { src, poster } = site.heroVideo;
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const onScreen = useInView(ref, { amount: 0.1 });
  const still = useStill();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const c = (navigator as Navigator & { connection?: Connection }).connection;
    const slow = !!c && (c.saveData === true || /(^|-)2g$/.test(c.effectiveType ?? ""));
    setAllowed(!!src && !slow);
  }, [src]);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (onScreen) v.play().catch(() => {});
    else v.pause();
  }, [onScreen, allowed]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10" aria-hidden="true">
      {poster && <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      {src && allowed && !still && (
        <video
          ref={video}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster ?? undefined}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
        />
      )}
      {(src || poster) && <div className="absolute inset-0 bg-night/55" />}
      {!src && (
        <p className="ph absolute right-5 bottom-4 hidden md:inline-block">[Hero video: 8 to 15 second muted loop]</p>
      )}
    </div>
  );
}

/**
 * The logo's double-stroke P on its turning guilloche dial.
 * It draws itself in on load. When you scroll it out of view the strokes un-draw (inner line first) and the dial
 * dims; scroll back and they draw in again.
 */
function HeroMark() {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInView(ref, { amount: 0.45 });
  const stroke = (inner: boolean) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: shown ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    transition: shown
      ? { duration: 1.6, ease: EASE, delay: inner ? 0.45 : 0.2 }
      : { duration: 0.9, ease: EASE, delay: inner ? 0 : 0.18 },
  });

  return (
    <div
      ref={ref}
      className="relative mx-auto grid aspect-square w-full max-w-[19rem] place-items-center sm:max-w-sm lg:max-w-md"
    >
      <motion.img
        src="/patterns/rosette.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        initial={{ opacity: 0, rotate: -8 }}
        animate={{ opacity: shown ? 0.14 : 0.04, rotate: 352 }}
        transition={{
          opacity: { duration: 1.2, ease: EASE },
          rotate: { duration: 240, ease: "linear", repeat: Infinity },
        }}
      />
      <div className="relative aspect-[400/420] w-[52%]">
        <svg viewBox="0 0 400 420" className="h-full w-full" fill="none" aria-hidden="true">
          <motion.path
            d="M70 410 V175 A130 130 0 1 1 200 305"
            stroke="#f3f1ec"
            strokeOpacity="0.9"
            strokeWidth="22"
            strokeLinecap="round"
            {...stroke(false)}
          />
          <motion.path
            d="M126 410 V175 A74 74 0 1 1 200 249"
            stroke="#8ec5ff"
            strokeWidth="22"
            strokeLinecap="round"
            {...stroke(true)}
          />
        </svg>
      </div>
    </div>
  );
}

export default function Home() {
  const today = useLagosToday();
  // Pre-rendered with Day 1 (as in the content document), then switched to today's day in Lagos.
  const day = today?.day ?? 1;
  const dev = devotionals.find((d) => d.day === day) ?? devotionals[0];
  const aff = affirmations.find((a) => a.day === day) ?? affirmations[0];
  const next = today ? nextService(site.services, today) : null;
  const featured = events[0];
  const [typed, setTyped] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <HeroBackdrop />
        <div className="wrap grid items-center gap-10 pt-10 pb-12 md:min-h-[min(calc(100svh-4rem),48rem)] md:pt-16 md:pb-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div>
          <h1 className="text-5xl leading-[1.05] font-extrabold">
            <Typewriter text="Faith that feels like home." delay={0.3} speed={55} onDone={() => setTyped(true)} />
          </h1>
          <TypeCycle
            className="mt-3 font-display text-xl font-semibold text-mute md:text-2xl"
            prefix="Come for "
            phrases={["real faith.", "real conversations.", "real friendships."]}
            active={typed}
          />
          <Stagger delay={1.6}>
            <Item>
              <p className="mt-5 max-w-xl text-lg text-mute">
                Prime Church is a community for young people who want real faith, real conversations and real
                friendships. Come as you are.
              </p>
            </Item>
            <Item className="mt-7 flex flex-wrap gap-3">
              <Link className="btn btn-sky" to="/next-steps#plan-your-visit">
                Plan your visit
              </Link>
              <WatchLive className="btn btn-line">
                <span className="live-dot" aria-hidden="true" />
                Watch live
              </WatchLive>
            </Item>
          </Stagger>
        </div>

        <HeroMark />
        </div>
      </section>

      <Section title="Welcome to Prime Church" side>
        <Stagger className="max-w-2xl">
          <Item>
            <p className="text-lg">
              Church does not have to feel stiff or distant. At Prime, you will find people your age, honest teaching,
              music that moves you, and space to ask the questions you actually have.
            </p>
          </Item>
          <Item>
            <p className="mt-3 text-mute">
              Whether you grew up in church or you are just curious, there is a seat for you here.
            </p>
          </Item>
          <Item className="mt-6">
            <Link className="btn btn-line" to="/about">
              Get to know us
            </Link>
          </Item>
        </Stagger>
      </Section>

      <Section id="find" title="What you will find here">
        <Rows items={finds} />
      </Section>

      {/* Next gathering, sitting with the other "when" information just above Coming up */}
      <section aria-labelledby="next-title" className="wrap py-2 md:py-3">
        <Reveal className="grid gap-4 border-y border-line py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_auto] md:items-center md:gap-10">
          <div>
            <h2 id="next-title" className="font-display text-sm font-semibold text-mute">
              Next gathering
            </h2>
            <p className="mt-1 font-display text-2xl font-bold">
              {next ? `${next.when}, ${next.dateLabel}` : "Sunday, Tuesday and Thursday"}
            </p>
          </div>
          <div className="text-sm">
            {next ? (
              <>
                <p className="font-semibold">{next.service.name}</p>
                <p className="mt-1">
                  <Ph value={next.service.time} label="Time" />, {serviceWhere(next.service)}
                  {next.service.place === "online" && (
                    <>
                      {" "}
                      <WatchLive className="font-semibold text-sky">Watch live</WatchLive>
                    </>
                  )}
                </p>
                <p className="mt-1 text-mute">{next.service.description}</p>
              </>
            ) : (
              <p>Sunday 10am in Yaba. Tuesday and Thursday 8pm online.</p>
            )}
          </div>
          <Link to="/information#services" className="btn btn-line justify-self-start">
            All service times
          </Link>
        </Reveal>
      </section>

      <Section id="coming" title="Coming up">
        <div className="max-w-2xl">
          <EventPoster
            event={featured}
            description="A celebration built around community and deeper connections: good people, good vibes and real friendship."
            more={
              <Link className="btn btn-ink" to="/information#events">
                See all events
              </Link>
            }
          />
        </div>
      </Section>

      <section aria-label="For today" className="wrap grid gap-6 py-8 md:py-11 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Stagger>
          <Item>
            <h2 className="text-3xl">Today's devotional</h2>
          </Item>
          <Item className="mt-4">
            <DayProgress day={dev.day} />
          </Item>
          <Item>
            <h3 className="mt-4 text-xl">{dev.title}</h3>
          </Item>
          <Item className="mt-4">
            <Verse text={dev.scripture.text} reference={dev.scripture.ref} />
          </Item>
          <Item>
            <p className="mt-4 max-w-2xl text-mute">{dev.reflection}</p>
          </Item>
          <Item className="mt-6">
            <Link className="btn btn-sky" to={`/resources/devotional/${dev.day}`}>
              Read today's devotional
            </Link>
          </Item>
        </Stagger>
        <Reveal delay={0.15} className="panel self-start">
          <h2 className="font-display text-sm font-semibold text-mute">Today's affirmation</h2>
          <p className="mt-3 font-display text-2xl leading-snug font-bold">
            <Typewriter key={aff.text} text={aff.text} start="view" delay={0.4} speed={32} />
          </p>
          <p className="mt-2 text-sm text-sky">{aff.ref}</p>
          <div className="mt-5">
            <ShareButton
              title="Today's affirmation from Prime Church"
              text={aff.text}
              url={`/resources/affirmations/${aff.day}`}
            />
          </div>
        </Reveal>
      </section>

      <Section>
        <Reveal className="grid gap-6 rounded-3xl bg-sky p-7 text-night md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:items-center md:p-10">
          <h2 className="text-3xl">Need prayer?</h2>
          <div>
            <p className="text-lg">
              Carrying something heavy? Drop a prayer request. A real person will read it and pray with you.
            </p>
            <Link className="btn mt-5 bg-night text-chalk hover:bg-raise" to="/connect/prayer-wall">
              Drop a prayer request
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
