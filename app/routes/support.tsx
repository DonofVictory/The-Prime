import { Link } from "react-router";
import type { Route } from "./+types/support";
import { PageIntro, Section, Verse } from "../components/Bits";
import { Item, Reveal, Stagger } from "../components/Motion";
import { support } from "../content/resources";
import { pageMeta } from "../lib/meta";

export const meta = ({ location }: Route.MetaArgs) =>
  pageMeta(
    "When Life Feels Heavy | Prime Church",
    "Biblical comfort for hard seasons, a short prayer for hard days, and a way to talk to someone from the Prime Church care team.",
    location.pathname,
  );

export default function Support() {
  return (
    <>
      <PageIntro title={support.title} lede={support.intro} crumb={{ to: "/resources", label: "Resources" }} />

      <Section>
        <Stagger className="grid gap-8 md:grid-cols-2 md:gap-x-12">
          {support.scriptures.map((v) => (
            <Item key={v.ref}>
              <Verse text={v.text} reference={v.ref} />
            </Item>
          ))}
        </Stagger>
      </Section>

      <Section id="prayer" title="A short prayer for hard days" side>
        <Reveal>
          <p className="max-w-xl font-sans text-xl leading-relaxed italic">{support.prayer}</p>
          <Link className="btn btn-sky mt-6" to="/connect/talk-to-someone">
            Talk to someone
          </Link>
          <p className="notice mt-6 max-w-xl">
            Spiritual support is not a replacement for professional mental-health care. If you are in immediate danger,
            call{" "}
            <a href="tel:112" className="font-bold text-alert">
              112
            </a>{" "}
            or go to the nearest hospital.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
