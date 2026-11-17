import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { ChurchEvent } from "../content/church";
import { Ph } from "./Bits";
import { useStill } from "./Motion";

/**
 * The comic kit for the playful pages (tribe quiz, events, Next Steps, 404).
 * Shapes, type and layout only, no drawn characters. Styles live in app.css under "Comic kit".
 */

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
const SPRING = { type: "spring", stiffness: 260, damping: 18 } as const; // used by Burst

/** Jagged action-burst outline, uneven on purpose so it reads as hand-drawn. */
const BURST_POINTS = (() => {
  const n = 18;
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? 50 - (i % 6 === 0 ? 0 : 3) : 35 + ((i * 7) % 6);
    const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
})();

export function Burst({
  className,
  color = "var(--color-punch)",
  delay = 0,
  wide = false,
}: {
  className?: string;
  color?: string;
  delay?: number;
  /** stretch sideways to sit behind a long word */
  wide?: boolean;
}) {
  return (
    <motion.svg
      viewBox="-3 -3 106 106"
      preserveAspectRatio={wide ? "none" : undefined}
      className={className}
      aria-hidden="true"
      initial={{ scale: 0, rotate: -30 }}
      whileInView={{ scale: 1, rotate: -6 }}
      viewport={{ once: true }}
      transition={{ ...SPRING, delay }}
    >
      <polygon
        points={BURST_POINTS}
        fill={color}
        stroke="var(--color-chalk)"
        strokeWidth="3"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </motion.svg>
  );
}

/**
 * A panel that rains down into place: it starts above its spot, falls with a little bounce on landing and
 * settles at its tilt. Pass a growing `delay` (for example index * 0.09) so a group lands one after another.
 */
export function Pop({
  children,
  className,
  tilt = 0,
  delay = 0,
  as = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
  delay?: number;
  as?: "div" | "li" | "article";
  id?: string;
}) {
  const still = useStill();
  const M = as === "li" ? motion.li : as === "article" ? motion.article : motion.div;
  // cards drift a little sideways as they fall, opposite to the way they will lean
  const drift = tilt >= 0 ? -1 : 1;
  return (
    <M
      id={id}
      className={className}
      initial={{ opacity: 0, y: -280, x: drift * 14, rotate: tilt - drift * 7 }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotate: tilt }}
      // the trigger area reaches 320px above the screen: cards start 280px above their spot,
      // and one near the top of the page would otherwise start off screen and never be seen arriving
      viewport={{ once: true, amount: 0.15, margin: "320px 0px 0px 0px" }}
      transition={
        still
          ? { duration: 0 }
          : {
              y: { type: "spring", stiffness: 190, damping: 13, mass: 0.9, delay },
              x: { type: "spring", stiffness: 120, damping: 16, delay },
              rotate: { type: "spring", stiffness: 140, damping: 9, delay },
              opacity: { duration: 0.25, delay },
            }
      }
    >
      {children}
    </M>
  );
}

/** Page opening for comic pages: a big comic title, and the lede in a speech bubble. */
export function ComicIntro({ title, lede }: { title: string; lede?: ReactNode }) {
  return (
    <header className="wrap pt-10 pb-4 md:pt-14">
      <Pop tilt={-1.5} className="inline-block">
        <h1 className="comic-title text-5xl leading-[1.02]">{title}</h1>
      </Pop>
      {lede && (
        <Pop tilt={0.8} delay={0.15} className="mt-6 max-w-xl">
          <p className="bubble text-lg leading-snug">{lede}</p>
        </Pop>
      )}
    </header>
  );
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(
    new Date(iso + "T00:00:00Z"),
  );

const tilts = [-1.2, 1, -0.6, 1.4, -1.4, 0.7];

/** An event as a comic poster: yellow date caption, big title, details, register. */
export function EventPoster({
  event,
  index = 0,
  description,
  more,
}: {
  event: ChurchEvent;
  index?: number;
  description?: string;
  more?: ReactNode;
}) {
  return (
    <Pop as="article" id={event.slug} tilt={tilts[index % tilts.length]} delay={index * 0.09} className={cx("ink p-5 md:p-6", index % 2 ? "ink-punch" : "ink-sky")}>
      <p className="caption">
        {event.date ? formatDate(event.date) : "[Date]"}
      </p>
      <h3 className="mt-4 font-comic text-3xl leading-tight font-normal">{event.title}</h3>
      <p className="mt-2 text-mute">{description ?? event.description}</p>
      <p className="mt-4 flex flex-wrap gap-2 text-sm">
        <Ph value={event.time} label="Time" />
        <Ph value={event.venue} label="Venue" />
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {event.registerUrl ? (
          <a className="btn btn-comic" href={event.registerUrl} target="_blank" rel="noopener">
            Register
          </a>
        ) : (
          <span className="text-sm">
            <Ph label="Registration link" />
          </span>
        )}
        {more}
      </div>
    </Pop>
  );
}
