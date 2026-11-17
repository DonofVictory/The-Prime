import type { Route } from "./+types/teaching";
import { PageIntro, Rows, Section } from "../components/Bits";
import { teaching } from "../content/resources";
import { pageMeta } from "../lib/meta";

export const meta = ({ location }: Route.MetaArgs) =>
  pageMeta(
    "Teaching Videos | Prime Church",
    "Honest teaching on faith, career, relationships, mental health and purpose. Pick a topic, choose a series and start watching.",
    location.pathname,
  );

export default function Teaching() {
  return (
    <>
      <PageIntro
        title="Teaching videos"
        lede="Honest teaching on the things that matter to you. Pick a topic, choose a series and start watching."
        crumb={{ to: "/resources", label: "Resources" }}
      />
      <Section>
        <Rows
          items={teaching.map((t) => ({
            title: t.title,
            text: t.summary,
            action: `Series: ${t.series}`,
            href: `/resources/teaching/${t.slug}`,
          }))}
        />
      </Section>
    </>
  );
}
