import { Link } from "react-router";
import type { Route } from "./+types/connect";
import { Section } from "../components/Bits";
import { ComicIntro, Pop } from "../components/Comic";
import { pageMeta } from "../lib/meta";

export const meta = ({ location }: Route.MetaArgs) =>
  pageMeta(
    "Find Your Tribe, Prayer and Support | Prime Church",
    "Take the Find Your Tribe quiz, share a prayer request or talk to someone from the Prime Church care team.",
    location.pathname,
  );

const items = [
  {
    title: "Find Your Tribe",
    text: "Five quick questions. No long forms, no pressure. We will point you to your people.",
    action: "Take the quiz",
    href: "/connect/find-your-tribe",
  },
  {
    title: "The Prayer Wall",
    text: "You do not have to pray alone. Share what is on your heart, privately or on the wall.",
    action: "Drop a prayer request",
    href: "/connect/prayer-wall",
  },
  {
    title: "Talk to someone",
    text: "Anxious, overwhelmed, grieving, or just not okay? Someone from our care team will get in touch.",
    action: "Request a conversation",
    href: "/connect/talk-to-someone",
  },
];

/** uneven comic-page layout: two panels side by side, then one across */
const layout = [
  { span: "md:col-span-7", tilt: -1 },
  { span: "md:col-span-5", tilt: 1.1 },
  { span: "md:col-span-12", tilt: -0.5 },
];

export default function Connect() {
  return (
    <div className="comic-page">
      <ComicIntro title="Connect with Prime" />
      <Section>
        <ul className="grid gap-7 md:grid-cols-12 md:gap-8">
          {items.map((item, i) => (
            <Pop
              as="li"
              key={item.href}
              tilt={layout[i].tilt}
              delay={i * 0.1}
              className={`ink flex flex-col p-5 md:p-7 ${layout[i].span} ${i % 2 ? "ink-punch" : "ink-sky"}`}
            >
              <h2 className="caption self-start">{item.title}</h2>
              <p className="mt-4 text-lg leading-snug">{item.text}</p>
              <div className="mt-auto pt-6">
                <Link className="btn btn-comic" to={item.href}>
                  {item.action}
                </Link>
              </div>
            </Pop>
          ))}
        </ul>
      </Section>
    </div>
  );
}
