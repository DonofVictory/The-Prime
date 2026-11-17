import { Link } from "react-router";
import type { Route } from "./+types/prayer-guide";
import { PageIntro, Rows, Section, Steps, Verse } from "../components/Bits";
import { Item, Reveal, Stagger } from "../components/Motion";
import { NotFound } from "../components/NotFound";
import { ShareButton } from "../components/ShareButton";
import { prayerGuides } from "../content/resources";
import { pageMeta } from "../lib/meta";

const find = (slug: string) => prayerGuides.find((g) => g.slug === slug);

export const meta = ({ params, location }: Route.MetaArgs) => {
  const guide = find(params.slug);
  return guide ? pageMeta(`${guide.title} | Prime Church`, guide.intro, location.pathname) : [];
};

export default function PrayerGuide({ params }: Route.ComponentProps) {
  const guide = find(params.slug);
  if (!guide) return <NotFound />;
  const others = prayerGuides.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <PageIntro title={guide.title} lede={guide.intro} crumb={{ to: "/resources/prayer-points", label: "Prayer points" }} />

      <Section>
        <div className="max-w-3xl">
          <Steps items={guide.points.map((p) => <p className="text-lg">{p}</p>)} />
          <Stagger className="mt-10 grid gap-6">
            {guide.scriptures.map((v) => (
              <Item key={v.ref}>
                <Verse text={v.text} reference={v.ref} />
              </Item>
            ))}
          </Stagger>
          <Reveal className="mt-10">
            <p className="font-display text-xl font-semibold">{guide.closing}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShareButton title={guide.title} text={guide.intro} variant="sky" />
              <Link className="btn btn-line" to="/connect/prayer-wall">
                Drop a prayer request
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="more" title="More prayer points">
        <Rows
          items={others.map((g) => ({ title: g.title, text: g.summary, href: `/resources/prayer-points/${g.slug}` }))}
        />
      </Section>
    </>
  );
}
