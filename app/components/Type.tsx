import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useStill } from "./Motion";

/**
 * Typewriter effects.
 * Every version reserves the space of the full text (an invisible copy underneath), so nothing below jumps
 * while letters appear. Screen readers get the whole text at once; the typing layer is hidden from them.
 * People who ask for reduced motion see the finished text straight away.
 */

const jitter = (ms: number) => ms * (0.6 + Math.random() * 0.8); // uneven keystrokes read as a person typing

function Caret() {
  return <span className="caret" aria-hidden="true" />;
}

/** Types `text` once, when `active` becomes true. */
function useTypeOnce(text: string, active: boolean, speed: number, delay: number) {
  const [n, setN] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => setN(0), [text]);
  useEffect(() => {
    if (active && !started) {
      const t = setTimeout(() => setStarted(true), delay * 1000);
      return () => clearTimeout(t);
    }
  }, [active, started, delay]);
  useEffect(() => {
    if (!started || n >= text.length) return;
    const t = setTimeout(() => setN((v) => v + 1), jitter(speed));
    return () => clearTimeout(t);
  }, [started, n, text, speed]);

  return { shown: text.slice(0, n), done: n >= text.length };
}

/** Types, holds, erases and moves to the next phrase, pausing while `active` is false. */
export function useTypeCycle(phrases: string[], active: boolean, { type = 70, erase = 35, hold = 1800 } = {}) {
  const still = useStill();
  const [s, setS] = useState({ i: 0, n: 0, del: false });
  useEffect(() => {
    if (!active || still) return;
    const word = phrases[s.i];
    let ms: number;
    let next: typeof s;
    if (!s.del && s.n < word.length) [ms, next] = [jitter(type), { ...s, n: s.n + 1 }];
    else if (!s.del) [ms, next] = [hold, { ...s, del: true }];
    else if (s.n > 0) [ms, next] = [erase, { ...s, n: s.n - 1 }];
    else [ms, next] = [400, { i: (s.i + 1) % phrases.length, n: 0, del: false }];
    const t = setTimeout(() => setS(next), ms);
    return () => clearTimeout(t);
  }, [s, active, still, phrases, type, erase, hold]);
  return still ? phrases[0] : phrases[s.i].slice(0, s.n);
}

/**
 * Text that types itself out once.
 * start="load" begins after `delay` seconds; start="view" waits until it scrolls into view.
 */
export function Typewriter({
  text,
  start = "load",
  delay = 0,
  speed = 45,
  onDone,
  className,
}: {
  text: string;
  start?: "load" | "view";
  delay?: number;
  speed?: number;
  onDone?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const still = useStill();
  const { shown, done } = useTypeOnce(text, start === "load" || seen, speed, delay);
  const [caretGone, setCaretGone] = useState(false);

  useEffect(() => {
    if (!done && !still) return;
    onDone?.();
    const t = setTimeout(() => setCaretGone(true), 1400); // the caret blinks a moment, then leaves
    return () => clearTimeout(t);
  }, [done, still]);

  return (
    <span ref={ref} className={`relative block ${className ?? ""}`}>
      {/* the full text: holds the space and is what screen readers and search engines read */}
      <span className="opacity-0">{text}</span>
      <span className="absolute inset-0" aria-hidden="true">
        {still ? text : shown}
        {!caretGone && !still && <Caret />}
      </span>
    </span>
  );
}

/** One line that cycles through phrases: types one, holds, erases it, types the next. */
export function TypeCycle({
  prefix = "",
  phrases,
  active = true,
  className,
}: {
  prefix?: string;
  phrases: string[];
  active?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { amount: 0.5 });
  const still = useStill();
  const shown = useTypeCycle(phrases, active && visible && !still);
  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span ref={ref} className={`relative block ${className ?? ""}`}>
      <span className="sr-only">
        {prefix}
        {phrases.join(", ")}
      </span>
      <span className="invisible" aria-hidden="true">
        {prefix}
        {longest}
      </span>
      <span className="absolute inset-0" aria-hidden="true">
        {prefix}
        {still ? phrases[0] : shown}
        {!still && active && <Caret />}
      </span>
    </span>
  );
}
