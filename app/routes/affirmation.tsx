import { Link } from "react-router";
import type { Route } from "./+types/affirmation";
import { Section } from "../components/Bits";
import { DayIndex } from "../components/DayIndex";
import { Item, Stagger } from "../components/Motion";
import { NotFound } from "../components/NotFound";
import { ShareButton } from "../components/ShareButton";
import { affirmations } from "../content/devotionals";
import { pageMeta } from "../lib/meta";

const find = (day: string) => affirmations.find((a) => String(a.day) === day);

export const meta = ({ params, location }: Route.MetaArgs) => {
  const a = find(params.day);
  return a ? pageMeta(`Day ${a.day} Affirmation | Prime Church`, `${a.text} ${a.ref}`, location.pathname) : [];
};

export default function Affirmation({ params }: Route.ComponentProps) {
  const a = find(params.day);
  if (!a) return <NotFound />;

  return (
    <>
      <section className="wrap pt-10 md:pt-14" key={a.day}>
        <Stagger className="rounded-3xl border border-line bg-surface p-7 md:p-12">
          <Item>
            <Link to="/resources/affirmations" className="text-sm font-medium text-mute no-underline hover:text-chalk">
              Daily affirmations
            </Link>
            <span className="text-sm text-mute">, day {a.day}</span>
          </Item>
          <Item>
            <h1 className="mt-6 max-w-3xl text-4xl leading-tight">{a.text}</h1>
          </Item>
          <Item>
            <p className="mt-4 font-display font-semibold text-sky">{a.ref}</p>
            <p className="mt-6 text-mute">Speak it. Believe it. Share it with someone who needs it.</p>
          </Item>
          <Item className="mt-6 flex flex-wrap gap-3">
            <ShareButton title="An affirmation from Prime Church" text={`${a.text} (${a.ref})`} variant="sky" />
            <Link className="btn btn-line" to={`/resources/devotional/${a.day}`}>
              Read the devotional
            </Link>
          </Item>
        </Stagger>
      </section>

      <Section id="days" title="Every day this month">
        <DayIndex base="/resources/affirmations" current={a.day} label="Affirmation days" />
      </Section>
    </>
  );
}
