import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { useStill } from "./Motion";

/** True while the media query matches. Always false for the pre-rendered HTML and the first render. */
export function useMedia(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/**
 * A row that moves sideways when the visitor scrolls down. Two modes:
 * - "pin": the section pins full screen under the navbar and the row slides as the page scrolls on.
 *   Good for tall rows that fill the screen (Moments).
 * - "lock": the section scrolls up normally until the whole row is visible in the lower part of the screen.
 *   From there, scrolling moves the row instead of the page, so nothing above it moves and no empty space
 *   opens up. Once the last item is in, the page carries on. Scrolling back up reverses the row first.
 *
 * When `enabled` is false (or for reduced motion, or before the script loads) the items use `idleClassName`
 * instead, for example a grid on larger screens or a swipeable row.
 */
export function PinnedRow({
  id,
  labelledBy,
  head,
  foot,
  children,
  enabled = true,
  rowClassName = "flex gap-3 md:gap-4",
  idleClassName = "flex gap-3 overflow-x-auto pb-2 [scroll-snap-type:x_proximity]",
  mode = "pin",
}: {
  id: string;
  labelledBy: string;
  head: ReactNode;
  foot?: ReactNode;
  children: ReactNode;
  enabled?: boolean;
  rowClassName?: string;
  idleClassName?: string;
  mode?: "pin" | "lock";
}) {
  const still = useStill();
  const outer = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const active = enabled && !still;

  useEffect(() => {
    const el = track.current;
    if (!el || !active) {
      setDistance(0);
      return;
    }
    const measure = () => setDistance(Math.max(0, el.scrollWidth - el.clientWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active]);

  const moving = active && distance > 0;
  const pinned = moving && mode === "pin";
  const locking = moving && mode === "lock";

  // pin: progress follows the page scroll through the section's runway
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start 64px", "end end"] });
  const pinX = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  // lock: the row's offset is driven directly by the visitor's scroll input, smoothed by a light spring
  const lockRaw = useMotionValue(0);
  const lockX = useSpring(lockRaw, { stiffness: 260, damping: 34, mass: 0.5 });
  useScrollLock({ on: locking, frame, distance, offset: lockRaw });

  return (
    <section id={id} aria-labelledby={labelledBy}>
      <div
        ref={outer}
        className="relative"
        style={pinned ? { height: `calc(100svh - 4rem + ${distance}px)` } : undefined}
      >
        <div
          ref={frame}
          className={pinned ? "sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden" : ""}
        >
          <div className="wrap py-8 md:py-11">
            {head}
            <motion.div
              ref={track}
              style={pinned ? { x: pinX } : locking ? { x: lockX } : undefined}
              className={`mt-6 ${active ? rowClassName : idleClassName}`}
            >
              {children}
            </motion.div>
            {foot}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Lock mode. The lock line is the scroll position where the section sits fully on screen, its bottom just
 * above the phone's bottom button bar. Scrolling past the line (down or up) first moves the row (`offset`,
 * 0 to -distance) while the page holds at the line; whatever is left once the row reaches its end goes back
 * to the page, so the scroll never feels stuck.
 */
function useScrollLock({
  on,
  frame,
  distance,
  offset,
}: {
  on: boolean;
  frame: RefObject<HTMLDivElement | null>;
  distance: number;
  offset: MotionValue<number>;
}) {
  useEffect(() => {
    const el = frame.current;
    if (!on || !el) {
      offset.set(0);
      return;
    }

    const bottomBar = () => {
      const bar = document.getElementById("quick-bar");
      return bar && getComputedStyle(bar).display !== "none" ? bar.offsetHeight : 0;
    };
    const lockLine = () =>
      Math.round(window.scrollY + el.getBoundingClientRect().bottom - (window.innerHeight - bottomBar()));
    const pos = () => -offset.get();
    /** moves the row by d px (positive = towards the last item); returns how far it actually moved */
    const move = (d: number) => {
      const next = Math.min(distance, Math.max(0, pos() + d));
      const used = next - pos();
      offset.set(-next);
      return used;
    };

    // jumps to a section (in-page links and their smooth scrolling) pass straight through
    let bypassUntil = 0;
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.("a[href*='#']")) bypassUntil = Date.now() + 1500;
    };

    // Which side of the line the visitor is on. They only cross to the other side once the row has finished
    // moving that way; until then every scroll past the line is turned into row movement and the page is held.
    // (Remembering the side, rather than comparing with the previous position, keeps the lock holding even when
    // the browser's own touch scrolling overrides a correction.)
    let side: "above" | "below" = window.scrollY <= lockLine() ? "above" : "below";
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const line = lockLine();
      const jump = Math.abs(y - lastY) > window.innerHeight;
      lastY = y;
      if (jump || Date.now() < bypassUntil) {
        side = y <= line ? "above" : "below";
        return;
      }
      const passing = (side === "above" && y > line) || (side === "below" && y < line);
      if (!passing) return;
      const over = y - line;
      const leftover = over - move(over);
      if (leftover !== 0 || (over > 0 ? pos() >= distance : pos() <= 0)) {
        // the row has reached its end in this direction: let the page through
        side = over > 0 ? "below" : "above";
        if (leftover !== over) {
          const target = line + leftover;
          window.scrollTo({ top: target, behavior: "instant" });
          lastY = target;
        }
        return;
      }
      window.scrollTo({ top: line, behavior: "instant" });
      lastY = line;
    };

    // a touch or wheel that starts at the line moves the row directly, so the page does not twitch
    const atLine = () => Math.abs(window.scrollY - lockLine()) < 2;
    const wants = (d: number) => (d > 0 && pos() < distance) || (d < 0 && pos() > 0);
    let touchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      const cy = e.touches[0]?.clientY;
      if (touchY == null || cy == null) return;
      const d = touchY - cy;
      touchY = cy;
      if (e.cancelable && atLine() && wants(d)) {
        e.preventDefault();
        move(d * 1.15);
      }
    };
    const onWheel = (e: WheelEvent) => {
      if (atLine() && wants(e.deltaY)) {
        e.preventDefault();
        move(e.deltaY);
      }
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("wheel", onWheel);
    };
  }, [on, frame, distance, offset]);
}
