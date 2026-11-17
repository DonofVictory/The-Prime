import type { Route } from "./+types/downloads";
import { PageIntro, Ph, Section } from "../components/Bits";
import { ListItem, StaggerList } from "../components/Motion";
import { downloads } from "../content/resources";
import { pageMeta } from "../lib/meta";

export const meta = ({ location }: Route.MetaArgs) =>
  pageMeta(
    "Downloads | Prime Church",
    "Free tools to help you grow: Bible reading plans, a quiet-time template, prayer guides, worksheets and study guides.",
    location.pathname,
  );

export default function Downloads() {
  return (
    <>
      <PageIntro
        title="Downloads"
        lede="Free tools to help you grow. Download, print and use them."
        crumb={{ to: "/resources", label: "Resources" }}
      />
      <Section>
        <StaggerList className="border-b border-line">
          {downloads.map((f) => (
            <ListItem
              key={f.title}
              className="grid gap-2 border-t border-line py-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)_auto] md:items-baseline md:gap-8"
            >
              <h3 className="text-lg">{f.title}</h3>
              <p className="text-mute">{f.summary}</p>
              <div className="text-sm">
                {f.file ? (
                  <a className="btn btn-line" href={f.file} download>
                    Download
                  </a>
                ) : (
                  <Ph label="File to upload" />
                )}
              </div>
            </ListItem>
          ))}
        </StaggerList>
      </Section>
    </>
  );
}
