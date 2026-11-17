import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Link } from "react-router";
import { site } from "../content/site";
import { Item, ListItem, Reveal, Stagger, StaggerList, Unveil, useStill } from "./Motion";

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/** Shows the real value, or a visible [Label] token until the church fills it in (app/content). */
export function Ph({ value, label }: { value?: string | null; label: string }) {
  return value ? <>{value}</> : <span className="ph" title="To be added">[{label}]</span>;
}

export function Verse({ text, reference, version = "KJV" }: { text: string; reference: string; version?: string }) {
  return (
    <blockquote className="verse">
      <p>{text}</p>
      <cite>
        {reference} ({version})
      </cite>
    </blockquote>
  );
}

/** A placeholder for a real Prime photo or video. The caption describes the shot to supply. */
export function Frame({
  shot,
  ratio = "aspect-[4/3]",
  video = false,
  className,
}: {
  shot: string;
  ratio?: string;
  video?: boolean;
  className?: string;
}) {
  return (
    <Unveil className={cx("overflow-hidden rounded-2xl", ratio, className)}>
      <figure className="frame h-full w-full">
      {video && (
        <span className="absolute inset-0 m-auto grid size-16 place-items-center rounded-full bg-sky" aria-hidden="true">
          <svg width="20" height="22" viewBox="0 0 22 24" className="ml-1">
            <path
              d="M3 2.5c0-1.2 1.3-1.9 2.3-1.3l15 9.5c.9.6.9 2 0 2.6l-15 9.5C4.3 23.4 3 22.7 3 21.5z"
              fill="#0b0b0c"
            />
          </svg>
        </span>
      )}
      <figcaption>
        {video ? "Video" : "Photo"}: {shot}
      </figcaption>
      </figure>
    </Unveil>
  );
}

/** A real photo, with the same slow reveal as the placeholders. */
export function Photo({
  src,
  alt,
  width,
  height,
  ratio = "aspect-[4/5]",
  position = "object-center",
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  ratio?: string;
  position?: string;
  className?: string;
}) {
  return (
    <Unveil className={cx("overflow-hidden rounded-2xl border border-line bg-surface", ratio, className)}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={cx("h-full w-full object-cover", position)}
      />
    </Unveil>
  );
}

/** Where a day sits in the 31-day cycle: "Day 17 of 31" and a segmented line that fills up to it. */
export function DayProgress({ day, total = 31, className }: { day: number; total?: number; className?: string }) {
  return (
    <div className={className}>
      <p className="font-display text-sm font-bold">
        Day {day} <span className="font-medium text-mute">of {total}</span>
      </p>
      <motion.ol
        className="mt-2 flex max-w-sm gap-[3px]"
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.025 } } }}
      >
        {Array.from({ length: total }, (_, i) => (
          <motion.li
            key={i}
            className={cx(
              "h-1 flex-1 origin-left rounded-full",
              i + 1 < day ? "bg-chalk/70" : i + 1 === day ? "bg-sky" : "bg-line",
            )}
            variants={{
              hidden: { opacity: 0, scaleX: 0 },
              show: { opacity: 1, scaleX: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
            }}
          />
        ))}
      </motion.ol>
    </div>
  );
}

/** The monogram, cropped from the logo file. The logo is white on black, so it blends into the night background. */
export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <span className={cx("relative block shrink-0 overflow-hidden", className)} style={{ width: size, height: size }} aria-hidden="true">
      <img
        src="/prime-logo.jpg"
        alt=""
        width={640}
        height={640}
        className="absolute max-w-none mix-blend-screen"
        style={{ width: size * 2.56, height: size * 2.56, left: -size * 0.78, top: -size * 0.45 }}
      />
    </span>
  );
}

export function LogoFull({ className }: { className?: string }) {
  return (
    <img
      src="/prime-logo.jpg"
      alt="The Prime Church"
      width={640}
      height={640}
      className={cx("mix-blend-screen", className)}
    />
  );
}

/** "Watch live" goes to YouTube once the live link is set, otherwise to the Watch live section. */
export function WatchLive({ className, children }: { className: string; children: ReactNode }) {
  if (site.youtube.liveUrl) {
    return (
      <a className={className} href={site.youtube.liveUrl} target="_blank" rel="noopener">
        {children}
      </a>
    );
  }
  return (
    <Link className={className} to="/information#watch-live">
      {children}
    </Link>
  );
}

/** Page opening: optional breadcrumb, title, intro. */
export function PageIntro({ title, lede, crumb }: { title: string; lede?: ReactNode; crumb?: { to: string; label: string } }) {
  return (
    <header className="wrap pt-10 pb-2 md:pt-14">
      <Stagger className="max-w-3xl">
        {crumb && (
          <Item>
            <Link to={crumb.to} className="text-sm font-medium text-mute no-underline hover:text-chalk">
              {crumb.label}
            </Link>
          </Item>
        )}
        <Item>
          <h1 className="mt-2 text-4xl">{title}</h1>
        </Item>
        {lede && (
          <Item>
            <p className="mt-4 max-w-2xl text-lg text-mute">{lede}</p>
          </Item>
        )}
      </Stagger>
    </header>
  );
}

/** A page section: heading (and optional intro) then content. `side` puts the heading in a left column. */
export function Section({
  id,
  title,
  intro,
  children,
  side = false,
  className,
}: {
  id?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  side?: boolean;
  className?: string;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={title ? headingId : undefined} className={cx("wrap py-8 md:py-11", className)}>
      <div className={cx(side && "grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12")}>
        {(title || intro) && (
          <Reveal>
            {title && (
              <h2 id={headingId} className="text-3xl">
                {title}
              </h2>
            )}
            {intro && <p className="mt-3 max-w-2xl text-mute">{intro}</p>}
          </Reveal>
        )}
        <div className={cx(!side && title ? "mt-6" : undefined)}>{children}</div>
      </div>
    </section>
  );
}

export type RowItem = { title: string; text: ReactNode; href?: string; action?: string };

/** Lists render as rows separated by lines, not cards. Rows stagger into view. */
export function Rows({ items }: { items: RowItem[] }) {
  return (
    <StaggerList className="border-b border-line">
      {items.map((item) => {
        const inner = (
          <>
            <h3 className="text-lg">{item.title}</h3>
            <p className="text-mute">{item.text}</p>
            {item.action && <span className="text-action">{item.action}</span>}
          </>
        );
        const grid = cx(
          "grid gap-1 border-t border-line py-4 md:items-baseline md:gap-8",
          item.action ? "md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)_auto]" : "md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]",
        );
        if (!item.href) {
          return (
            <ListItem key={item.title} className={grid}>
              {inner}
            </ListItem>
          );
        }
        const linkCls = cx(grid, "-mx-3 rounded-lg px-3 text-chalk no-underline hover:bg-surface");
        return (
          <ListItem key={item.title}>
            {item.href.startsWith("#") ? (
              <a className={linkCls} href={item.href}>
                {inner}
              </a>
            ) : (
              <Link className={linkCls} to={item.href}>
                {inner}
              </Link>
            )}
          </ListItem>
        );
      })}
    </StaggerList>
  );
}

/** Numbered list, only for content that really is a sequence. */
/**
 * List marker drawn from the logo: the double-stroke P in miniature, outer stroke chalk, inner stroke sky.
 * Like the hero logo it draws itself (outer stroke, then inner), holds, un-draws (inner first) and repeats,
 * only while on screen. `delay` offsets each marker so the motion ripples down a list.
 * Reduced motion: the finished mark, still.
 */
export function PrimeMark({ className, delay = 0 }: { className?: string; delay?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const onScreen = useInView(ref, { amount: 0.5 });
  const still = useStill();
  const CYCLE = 4.2;
  // draw in, hold, un-draw, rest: the inner stroke starts later and leaves earlier, as in the hero
  const loop = (inner: boolean) =>
    still || !onScreen
      ? { animate: { pathLength: still ? 1 : 0, opacity: still ? 1 : 0 }, transition: { duration: 0.3 } }
      : {
          // opacity follows the stroke so an erased line leaves no round-cap dot behind
          animate: {
            pathLength: inner ? [0, 0, 1, 1, 0, 0] : [0, 1, 1, 1, 0, 0],
            opacity: inner ? [0, 0, 1, 1, 0, 0] : [0, 1, 1, 1, 0, 0],
          },
          transition: {
            duration: CYCLE,
            times: inner ? [0, 0.08, 0.36, 0.62, 0.78, 1] : [0, 0.3, 0.36, 0.7, 0.86, 1],
            ease: [0.22, 1, 0.36, 1] as const,
            repeat: Infinity,
            delay,
          },
        };
  return (
    <svg
      ref={ref}
      viewBox="0 0 400 420"
      fill="none"
      aria-hidden="true"
      className={cx("h-[1.15em] w-auto shrink-0", className)}
    >
      <motion.path
        d="M70 410 V175 A130 130 0 1 1 200 305"
        stroke="var(--color-chalk)"
        strokeWidth="44"
        strokeLinecap="round"
        initial={{ pathLength: still ? 1 : 0, opacity: still ? 1 : 0 }}
        {...loop(false)}
      />
      <motion.path
        d="M140 410 V175 A60 60 0 1 1 200 235"
        stroke="var(--color-sky)"
        strokeWidth="44"
        strokeLinecap="round"
        initial={{ pathLength: still ? 1 : 0, opacity: still ? 1 : 0 }}
        {...loop(true)}
      />
    </svg>
  );
}

/** A list of points or steps, each marked with the Prime mark instead of a number. */
export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <StaggerList className="grid gap-4">
      {items.map((content, i) => (
        <ListItem key={i} className="grid grid-cols-[1.75rem_1fr] items-start gap-3">
          <PrimeMark className="mt-[0.2em]" delay={i * 0.18} />
          <div>{content}</div>
        </ListItem>
      ))}
    </StaggerList>
  );
}
