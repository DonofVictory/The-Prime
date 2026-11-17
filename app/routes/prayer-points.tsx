import type { Route } from "./+types/prayer-points";
import { PageIntro, Rows, Section } from "../components/Bits";
import { prayerGuides } from "../content/resources";
import { pageMeta } from "../lib/meta";

export const meta = ({ location }: Route.MetaArgs) =>
  pageMeta(
    "Prayer Points for Real-Life Situations | Prime Church",
    "Prayer points and scriptures for relocation, finances, waiting for a job, your family and when you need God's direction.",
    location.pathname,
  );

export default function PrayerPoints() {
  return (
    <>
      <PageIntro title="Prayer points for real-life situations" crumb={{ to: "/resources", label: "Resources" }} />
      <Section>
        <Rows
          items={prayerGuides.map((g) => ({
            title: g.title,
            text: g.intro,
            href: `/resources/prayer-points/${g.slug}`,
          }))}
        />
      </Section>
    </>
  );
}
