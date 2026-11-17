import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useReducer, useRef, type FormEvent } from "react";
import type { Route } from "./+types/find-your-tribe";
import { Section } from "../components/Bits";
import { Burst, ComicIntro, Pop } from "../components/Comic";
import { Checkbox, Choices, Field, Form } from "../components/Form";
import { Reveal } from "../components/Motion";
import { quiz, tribes, type TribeId } from "../content/church";
import { pageMeta } from "../lib/meta";

export const meta = ({ location }: Route.MetaArgs) =>
  pageMeta(
    "Find Your Tribe | Prime Church",
    "Five quick questions. No long forms, no pressure. Find the Prime Church community that fits you.",
    location.pathname,
  );

type State = { step: number; answers: Record<string, string>; error: string; done: boolean; dir: 1 | -1 };
type Action =
  | { type: "answer"; id: string; value: string }
  | { type: "next" }
  | { type: "back" }
  | { type: "missing" }
  | { type: "restart" };

const initial: State = { step: 0, answers: {}, error: "", done: false, dir: 1 };
const last = quiz.length - 1;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "answer":
      return { ...state, answers: { ...state.answers, [action.id]: action.value }, error: "" };
    case "missing":
      return { ...state, error: "Pick one answer to continue." };
    case "next":
      return state.step === last ? { ...state, done: true } : { ...state, step: state.step + 1, error: "", dir: 1 };
    case "back":
      return { ...state, step: Math.max(0, state.step - 1), error: "", dir: -1 };
    case "restart":
      return initial;
  }
}

/**
 * Scoring: question 1 counts 3 points toward its tribe, questions 2 and 3 count 1 point.
 * Ties go to the question 1 tribe. Questions 4 and 5 are passed to the team.
 */
function score(answers: Record<string, string>): TribeId {
  const points: Partial<Record<TribeId, number>> = {};
  let first: TribeId | undefined;
  quiz.slice(0, 3).forEach((q, i) => {
    const tribe = q.options?.find((o) => o.label === answers[q.id])?.tribe;
    if (!tribe) return;
    points[tribe] = (points[tribe] ?? 0) + (i === 0 ? 3 : 1);
    if (i === 0) first = tribe;
  });
  const best = Math.max(...Object.values(points));
  const winners = (Object.keys(points) as TribeId[]).filter((t) => points[t] === best);
  return first && winners.includes(first) ? first : winners[0];
}

export default function FindYourTribe() {
  const [state, dispatch] = useReducer(reducer, initial);
  const stepRef = useRef<HTMLFieldSetElement>(null);
  const resultRef = useRef<HTMLElement>(null);
  const moved = useRef(false);
  const pending = useRef(false);

  const q = quiz[state.step];
  const tribe = state.done ? tribes.find((t) => t.id === score(state.answers))! : null;

  // Move focus to the new question or the result after each step, not on first load.
  useEffect(() => {
    if (!moved.current) return;
    if (state.done) resultRef.current?.focus();
    else stepRef.current?.querySelector<HTMLInputElement>("input")?.focus();
  }, [state.step, state.done]);

  function advance(e?: FormEvent) {
    e?.preventDefault();
    moved.current = true;
    if (q.options && !state.answers[q.id]) return dispatch({ type: "missing" });
    dispatch({ type: "next" });
  }

  function pick(value: string, viaPointer: boolean) {
    dispatch({ type: "answer", id: q.id, value });
    // A tap moves on by itself; keyboard users press Next so arrow keys can still change the answer.
    if (viaPointer && state.step < last && !pending.current) {
      moved.current = true;
      pending.current = true;
      setTimeout(() => {
        pending.current = false;
        dispatch({ type: "next" });
      }, 220);
    }
  }

  return (
    <div className="comic-page">
      <ComicIntro
        title="Find Your Tribe"
        lede="Five quick questions. No long forms, no pressure. We will point you to your people."
      />

      <Section>
        {!state.done && (
          <Reveal className="ink ink-sky max-w-3xl overflow-hidden p-5 md:p-7">
            <form noValidate onSubmit={advance} className="grid gap-5">
              <div className="flex items-center gap-4">
                <p className="caption" aria-live="polite">
                  Question {state.step + 1} of {quiz.length}
                </p>
                <div className="h-3 flex-1 overflow-hidden rounded-full border-2 border-chalk" aria-hidden="true">
                  <motion.div
                    className="h-full rounded-full bg-sky"
                    initial={false}
                    animate={{ width: `${((state.step + 1) / quiz.length) * 100}%` }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait" initial={false} custom={state.dir}>
                <motion.fieldset
                  key={q.id}
                  ref={stepRef}
                  className="m-0 min-w-0 border-0 p-0"
                  aria-describedby={`q-${q.id}-error`}
                  custom={state.dir}
                  initial={{ opacity: 0, x: state.dir * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: state.dir * -24 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <legend className="mb-5 p-0 font-comic text-3xl leading-tight">{q.text}</legend>
                  {q.options ? (
                    <motion.div
                      className="grid gap-3 sm:grid-cols-2"
                      initial="hidden"
                      animate="show"
                      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
                    >
                      {q.options.map((o) => {
                        const checked = state.answers[q.id] === o.label;
                        return (
                          <motion.label
                            key={o.label}
                            className="relative"
                            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              value={o.label}
                              checked={checked}
                              className="peer absolute inset-0 m-0 cursor-pointer opacity-0"
                              onChange={() => pick(o.label, false)}
                              onClick={(e) => e.detail > 0 && pick(o.label, true)}
                            />
                            <span className="flex min-h-13 cursor-pointer items-center rounded-xl border-[3px] border-line bg-night px-4 py-3 font-semibold peer-hover:border-chalk peer-checked:-rotate-1 peer-checked:border-chalk peer-checked:bg-punch peer-checked:text-night peer-checked:shadow-[4px_4px_0_0_var(--color-chalk)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sky">
                              {o.label}
                            </span>
                          </motion.label>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <div className="field max-w-sm">
                      <label htmlFor="q-area" className="sr-only">
                        {q.text}
                      </label>
                      <span className="hint" id="q-area-hint">
                        Your area or city, for example Yaba or Surulere.
                      </span>
                      <input
                        id="q-area"
                        type="text"
                        name={q.id}
                        autoComplete="address-level2"
                        aria-describedby="q-area-hint"
                        value={state.answers[q.id] ?? ""}
                        onChange={(e) => dispatch({ type: "answer", id: q.id, value: e.target.value })}
                      />
                    </div>
                  )}
                  <p className="field-error mt-3" id={`q-${q.id}-error`}>
                    {state.error}
                  </p>
                </motion.fieldset>
              </AnimatePresence>

              <div className="flex gap-3">
                {state.step > 0 && (
                  <button
                    type="button"
                    className="btn btn-ink"
                    onClick={() => {
                      moved.current = true;
                      dispatch({ type: "back" });
                    }}
                  >
                    Back
                  </button>
                )}
                <button type="submit" className="btn btn-comic">
                  {state.step === last ? "See my tribe" : "Next question"}
                </button>
              </div>
            </form>
          </Reveal>
        )}

        {tribe && (
          <motion.section
            ref={resultRef}
            tabIndex={-1}
            aria-labelledby="result-title"
            className="max-w-3xl focus:outline-none"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 id="result-title" className="caption">
              Your results
            </h2>
            {/* the reveal: a speech bubble, then the tribe name lands on a burst */}
            <motion.p
              className="bubble mt-5 max-w-md text-lg"
              initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
            >
              Looks like you would fit right in with {tribe.name}.
            </motion.p>
            <div className="relative mt-10 grid h-52 w-full max-w-[34rem] place-items-center sm:h-64" aria-hidden="true">
              <Burst wide className="absolute inset-0 h-full w-full" delay={0.35} />
              <motion.p
                className="comic-title relative px-16 text-center text-3xl text-night sm:px-20 sm:text-5xl"
                style={{ textShadow: "0.06em 0.06em 0 var(--color-chalk)" }}
                initial={{ scale: 2.2, opacity: 0, rotate: 10 }}
                animate={{ scale: 1, opacity: 1, rotate: -4 }}
                transition={{ type: "spring", stiffness: 380, damping: 16, delay: 0.6 }}
              >
                {tribe.name}
              </motion.p>
            </div>
            <p className="mt-8 text-lg text-mute">{tribe.text}</p>
            <p className="mt-6 font-comic text-2xl">Want us to connect you?</p>
            <div className="ink ink-punch mt-4 p-5 md:p-7">
              <Form
                id="tribe-connect"
                endpoint="/tribe-connections"
                submit="Connect me"
                successTitle="You are in!"
                successText="Someone from the team will reach out to you soon."
              >
                <input type="hidden" name="tribe" value={tribe.id} />
                <input type="hidden" name="answers" value={JSON.stringify(state.answers)} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" required autoComplete="name" error="Tell us your name." />
                  <Field label="Email" name="email" type="email" required autoComplete="email" error="Enter your email address." />
                  <Field label="WhatsApp number" name="whatsapp" type="tel" optional autoComplete="tel" inputMode="tel" />
                  <Choices
                    legend="How would you like us to reach you?"
                    name="contactMethod"
                    required
                    error="Pick how you would like us to reach you."
                    options={[{ value: "Email" }, { value: "WhatsApp" }, { value: "Phone call" }]}
                  />
                  <Checkbox
                    className="sm:col-span-2"
                    name="consent"
                    label="I agree to be contacted by Prime Church."
                    required
                    error="Tick this box so we are allowed to contact you."
                  />
                </div>
              </Form>
            </div>
            <button
              type="button"
              className="btn btn-ink mt-6"
              onClick={() => {
                moved.current = true;
                dispatch({ type: "restart" });
              }}
            >
              Retake the quiz
            </button>
          </motion.section>
        )}
      </Section>

      <Section id="tribes" title="Meet the tribes">
        <ul className="grid gap-7 sm:grid-cols-2 md:gap-8">
          {tribes.map((t, i) => (
            <Pop
              as="li"
              key={t.id}
              tilt={[-1, 0.8, 0.6, -0.8, -0.5, 1][i % 6]}
              delay={i * 0.09}
              className={`ink p-5 md:p-6 ${i % 2 ? "ink-punch" : "ink-sky"}`}
            >
              <h3 className="comic-title text-2xl">{t.name}</h3>
              <p className="mt-2 text-mute">{t.text}</p>
            </Pop>
          ))}
        </ul>
      </Section>
    </div>
  );
}
