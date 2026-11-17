import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/about";
import { Frame, PageIntro, Ph, Photo, Rows, Section, Steps, Verse } from "../components/Bits";
import { Item, Reveal, Stagger, Unveil, useStill } from "../components/Motion";
import { PinnedRow } from "../components/PinnedRow";
import { declaration, pastors, values, visitSteps } from "../content/church";
import { moments, type Moment } from "../content/moments";
import { pageMeta } from "../lib/meta";

export const meta = ({ location }: Route.MetaArgs) =>
  pageMeta(
    "About Prime Church | Who We Are",
    "Meet Prime Church: our story, mission, vision, culture and pastors. A movement of young people who love Jesus and love people.",
    location.pathname,
  );


export default function About() {
  return (
    <>
      <PageIntro title="We are not here to look religious. We are here to be real." />

      <Section>
        <Stagger className="grid gap-6 md:grid-cols-2 md:gap-12">
          <Item>
            <p className="text-xl leading-snug">
              Prime Church is a movement of young people who love Jesus, love people, and refuse to hide behind a
              performance.
            </p>
          </Item>
          <Item>
            <p className="text-mute">
              We exist for students, graduates, young professionals and creatives who want a faith that is honest,
              relevant and alive.
            </p>
            <p className="mt-3 font-display font-semibold text-sky">
              Here, joy is loud, questions are welcome, and nobody walks alone.
            </p>
          </Item>
        </Stagger>
      </Section>

      <div className="wrap">
        <div className="double-rule" />
      </div>

      <section className="wrap py-8 md:py-11">
        <Stagger className="grid gap-8 md:grid-cols-2 md:gap-12">
          <Item>
            <h2 className="text-3xl">Our mission</h2>
            <p className="mt-3 text-lg text-mute">
              To help young people meet Jesus, belong to a real community, and live out their purpose boldly in every
              area of life.
            </p>
          </Item>
          <Item>
            <h2 className="text-3xl">Our vision</h2>
            <p className="mt-3 text-lg text-mute">
              A generation rooted in Christ, free to be themselves, and shaping culture for good.
            </p>
          </Item>
        </Stagger>
      </section>

      <Section id="values" title="What we stand for">
        <Rows items={values} />
      </Section>

      <Section title="Our culture" side>
        <Reveal>
          <p className="max-w-2xl text-lg text-mute">
            Prime is urban, relaxed and full of life. You will meet students, graduates, young professionals and
            creatives who are figuring out life and faith together. Expect worship that feels like freedom, teaching you
            can actually use, and people who genuinely want to know you.
          </p>
        </Reveal>
      </Section>

      <Section id="expect" title="What to expect when you visit" side>
        <Steps
          items={visitSteps.map((s) => (
            <p>
              <span className="font-semibold">{s.title}</span> <span className="text-mute">{s.text}</span>
            </p>
          ))}
        />
        <Reveal className="mt-6">
          <Link className="btn btn-sky" to="/next-steps#plan-your-visit">
            Plan your visit
          </Link>
        </Reveal>
      </Section>

      <Section id="word" title="A word from our pastor" intro="Press play to hear a personal welcome to Prime Church." side>
        <Reveal>
          <Frame video shot="Pastor welcome video, 1 to 2 minutes, filmed in the church" ratio="aspect-video" />
        </Reveal>
      </Section>

      <Section
        id="pastors"
        title="Meet our pastors"
        intro="The people who lead Prime are not distant figures. They are real people who are happy to talk, pray and walk with you."
      >
        {pastors.map((p, i) => (
          <Stagger key={p.name ?? i} className="grid gap-6 sm:grid-cols-[minmax(10rem,14rem)_1fr] sm:items-start">
            <Item>
              {p.photo ? (
                <Photo
                  src={p.photo}
                  alt={p.name ? `Portrait of ${p.name}` : "Portrait of the pastor"}
                  width={1028}
                  height={1280}
                  position="object-top"
                />
              ) : (
                <Frame shot="Portrait of the pastor, natural light" ratio="aspect-[4/5]" />
              )}
            </Item>
            <Item>
              <h3 className="text-2xl">
                <Ph value={p.name} label="Pastor name" />
              </h3>
              <p className="mt-1 text-sm text-mute">
                <Ph value={p.role} label="Role" />
              </p>
              <p className="mt-4 max-w-xl">
                <Ph
                  value={p.bio}
                  label="Short biography: where they are from, how they came to faith and ministry, what they care about, and one personal detail"
                />
              </p>
            </Item>
          </Stagger>
        ))}
      </Section>

      <Declaration />

      <Moments />
    </>
  );
}

/**
 * The declaration fills the screen and lights up one line at a time as you scroll,
 * the way the room says it together at the end of a gathering.
 */
function Declaration() {
  const ref = useRef<HTMLDivElement>(null);
  const still = useStill();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const lines = declaration.text.split(/(?<=[,.])\s+/);

  return (
    <section aria-labelledby="decl-title" className="border-y border-line bg-surface">
      <div ref={ref} className={still ? "" : "relative h-[260vh]"}>
        <div
          className={
            still
              ? "wrap py-14 md:py-20"
              : "wrap sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center py-8"
          }
        >
          <h2 id="decl-title" className="font-display text-sm font-semibold text-mute">
            Our declaration. We end every gathering with this:
          </h2>
          <p className="mt-5 font-display text-4xl leading-[1.08] font-extrabold md:text-5xl">
            {lines.map((line, i) => (
              <Line key={i} progress={scrollYProgress} index={i} count={lines.length} still={still}>
                {line}
              </Line>
            ))}
          </p>
          <p className="mt-6 text-sm font-medium text-mute">Romans 12:2, 1 Peter 2:9 and Matthew 5:14</p>
        </div>
      </div>
      <div className="wrap pb-14 md:pb-20">
        <Stagger className="grid gap-6 lg:grid-cols-3">
          {declaration.verses.map((v) => (
            <Item key={v.ref}>
              <Verse text={v.text} reference={v.ref} />
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Line({
  progress,
  index,
  count,
  still,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
  still: boolean;
  children: string;
}) {
  // Each line gets an equal slice of the scroll, with the last 15% left as a pause on the full declaration.
  const span = 0.85 / count;
  const start = index * span;
  const opacity = useTransform(progress, [start, start + span], [0.14, 1]);
  return (
    <motion.span className="block" style={still ? undefined : { opacity }}>
      {children}{" "}
    </motion.span>
  );
}

/**
 * Moments from the Prime family: the section pins in place and the photos slide sideways as you scroll down,
 * then the page carries on. Before the script loads, and for reduced motion, it is a normal swipeable row.
 */
function Moments() {
  return (
    <PinnedRow
      id="moments"
      labelledBy="moments-title"
      head={
        <Reveal>
          <h2 id="moments-title" className="text-3xl">
            Moments from the Prime family
          </h2>
          <p className="mt-3 max-w-2xl text-mute">
            Photos and videos from our services, hangouts and events. This is who we are, caught on camera.
          </p>
        </Reveal>
      }
      foot={
        <Reveal className="mt-6">
          <Link className="btn btn-line" to="/resources/archive">
            See past events
          </Link>
        </Reveal>
      }
    >
      {moments.map((m) => (
        <MomentItem key={m.src} m={m} />
      ))}
    </PinnedRow>
  );
}

/** One photo or video in the Moments row: same height for all, width set by the file's own shape. */
function MomentItem({ m }: { m: Moment }) {
  // on-screen checks sit on the figure, outside the reveal's clip, so they work while it is still closed
  const fig = useRef<HTMLElement>(null);
  const near = useInView(fig, { margin: "0px 400px 0px 400px" });
  const visible = useInView(fig, { amount: 0.4 });
  return (
    <figure ref={fig} className="m-0 h-[min(52svh,28rem)] flex-none snap-start" style={{ aspectRatio: `${m.width} / ${m.height}` }}>
      <Unveil className="h-full overflow-hidden rounded-2xl border border-line bg-surface">
        {m.kind === "photo" ? (
          <img
            src={m.src}
            alt={m.alt}
            width={m.width}
            height={m.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <MomentVideo m={m} near={near} visible={visible} />
        )}
      </Unveil>
    </figure>
  );
}

/** Muted loop that plays only while on screen and loads nothing until it gets close. Tap to turn sound on. */
function MomentVideo({ m, near, visible }: { m: Extract<Moment, { kind: "video" }>; near: boolean; visible: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const still = useStill();
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (visible && !still) v.play().catch(() => {});
    else v.pause();
  }, [visible, still, near]);

  return (
    <div className="relative h-full w-full">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src={near || visible ? m.src : undefined}
        poster={m.poster}
        muted={!sound}
        loop
        playsInline
        preload="none"
        aria-label={m.label}
        controls={still}
      />
      {!still && (
        <button
          type="button"
          className="btn absolute bottom-3 left-3 min-h-9 border-chalk/40 bg-night/70 px-3 py-1.5 text-xs text-chalk"
          onClick={() => setSound((on) => !on)}
        >
          {sound ? "Sound off" : "Sound on"}
        </button>
      )}
    </div>
  );
}
