import type { Route } from "./+types/archive";
import { PageIntro, Rows, Section } from "../components/Bits";
import { archive } from "../content/resources";
import { pageMeta } from "../lib/meta";

export const meta = ({ location }: Route.MetaArgs) =>
  pageMeta(
    "Archive | Prime Church",
    "Catch up on what you missed: sermons, teaching series, worship nights, The PRIME Words podcast, events and past devotionals.",
    location.pathname,
  );

export default function Archive() {
  return (
    <>
      <PageIntro title="Archive" lede="Catch up on what you missed." crumb={{ to: "/resources", label: "Resources" }} />
      <Section>
        <Rows
          items={archive.map((c) =>
            c.href
              ? { title: c.title, text: c.summary, href: c.href, action: "Open" }
              : {
                  title: c.title,
                  text: (
                    <>
                      {c.summary}
                      <span className="mt-1 block text-sm text-mute/80">Nothing here yet. New content is on the way.</span>
                    </>
                  ),
                  href: "#newsletter-title",
                  action: "Subscribe to be notified",
                },
          )}
        />
      </Section>
    </>
  );
}
