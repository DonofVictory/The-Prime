import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Scroll animations. Content fades and rises into place the first time it enters the viewport.
 * Lists stagger their children. People who ask for reduced motion get no movement
 * (MotionConfig reducedMotion="user" in root.tsx).
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const group = (stagger: number, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const viewport = { once: true, amount: 0.15 } as const;

type Props = { children: ReactNode; className?: string; delay?: number; id?: string };

/** One block that rises into view. */
export function Reveal({ children, className, delay = 0, id }: Props) {
  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: rise.hidden,
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** A group whose direct <Item> children rise in one after another. */
export function Stagger({ children, className, delay = 0, step = 0.08, id }: Props & { step?: number }) {
  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={group(step, delay)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerList({ children, className, delay = 0, step = 0.07 }: Props & { step?: number }) {
  return (
    <motion.ul className={className} initial="hidden" whileInView="show" viewport={viewport} variants={group(step, delay)}>
      {children}
    </motion.ul>
  );
}

export function Item({ children, className, id }: Props) {
  return (
    <motion.div id={id} className={className} variants={rise}>
      {children}
    </motion.div>
  );
}

export function ListItem({ children, className, id }: Props) {
  return (
    <motion.li id={id} className={className} variants={rise}>
      {children}
    </motion.li>
  );
}

/**
 * Slow photo reveal: the frame opens from top to bottom while the picture inside settles from a slight zoom.
 * It closes again once it is fully off screen, so it replays every time it scrolls back in.
 * Used for every photo and photo placeholder, so real images get the same entrance when they arrive.
 */
export function Unveil({ children, className }: { children: ReactNode; className?: string }) {
  const still = useStill();
  const t = (duration: number) => (still ? { duration: 0 } : { duration, ease: EASE });
  // The in-view trigger sits on an unclipped wrapper: Chrome treats a fully clipped element as never visible.
  return (
    <motion.div className="h-full" initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }}>
      <motion.div
        className={className}
        variants={{
          hidden: { clipPath: "inset(0% 0% 100% 0%)" },
          show: { clipPath: "inset(0% 0% 0% 0%)", transition: t(1.3) },
        }}
      >
        <motion.div
          className="h-full w-full"
          variants={{ hidden: { scale: 1.18 }, show: { scale: 1, transition: t(1.9) } }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * True when the visitor asked for reduced motion. Always false for the pre-rendered HTML and the first
 * client render, so hydration matches; it updates straight after.
 */
export function useStill() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!reduced;
}
