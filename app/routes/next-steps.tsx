import type { Route } from "./+types/next-steps";
import { Link } from "react-router";
import { Section } from "../components/Bits";
import { ComicIntro, Pop } from "../components/Comic";
import { Choices, Field, Form } from "../components/Form";
import { Reveal } from "../components/Motion";
import { pageMeta } from "../lib/meta";

export const meta = ({ location }: Route.MetaArgs) =>
  pageMeta(
    "Next Steps | Prime Church",
    "Not sure where to start? Plan a visit, find your community, request prayer, get support or stay connected with Prime Church.",
    location.pathname,
  );

const paths = [
  {
    title: "New here",
    text: "First time? We will save you a seat and a friendly face. Find out what to expect, plan your visit and meet someone before you arrive.",
    action: "Plan your visit",
    href: "#plan-your-visit",
  },
  {
    title: "Join a community",
    text: "You were not built to do life alone. Take a short quiz and find the people who share your interests.",
    action: "Find your tribe",
    href: "/connect/find-your-tribe",
  },
  {
    title: "Request prayer",
    text: "Tell us what you are believing God for. Keep it private, or share it on the Prayer Wall.",
    action: "Drop a prayer request",
    href: "/connect/prayer-wall",
  },
  {
    title: "Get support",
    text: "Need to talk to someone? You do not have to carry it alone. Our care team is here to listen.",
    action: "Talk to someone",
    href: "/connect/talk-to-someone",
  },
  {
    title: "Stay connected",
    text: "Daily encouragement, devotionals and event updates, straight to your phone or inbox.",
    action: "Subscribe",
    href: "#newsletter-title",
  },
];

const layout = [
  { span: "md:col-span-7", tilt: -1 },
  { span: "md:col-span-5", tilt: 1.2 },
  { span: "md:col-span-5", tilt: 0.8 },
  { span: "md:col-span-7", tilt: -1.2 },
  { span: "md:col-span-12", tilt: -0.5 },
];

export default function NextSteps() {
  return (
    <div className="comic-page">
      <ComicIntro title="What should I do next?" lede="Wherever you are on your journey, there is a next step for you." />

      <Section>
        {/* A comic page: panels of uneven widths, each slightly tilted, slapped down one after another */}
        <ul className="grid gap-7 md:grid-cols-12 md:gap-8">
          {paths.map((p, i) => (
            <Pop
              as="li"
              key={p.title}
              tilt={layout[i].tilt}
              delay={i * 0.09}
              className={`ink flex flex-col p-5 md:p-6 ${layout[i].span} ${i % 2 ? "ink-punch" : "ink-sky"}`}
            >
              <h2 className="caption self-start">{p.title}</h2>
              <p className="mt-4 text-lg leading-snug">{p.text}</p>
              <div className="mt-auto pt-6">
                {p.href.startsWith("#") ? (
                  <a className="btn btn-comic" href={p.href}>
                    {p.action}
                  </a>
                ) : (
                  <Link className="btn btn-comic" to={p.href}>
                    {p.action}
                  </Link>
                )}
              </div>
            </Pop>
          ))}
        </ul>
      </Section>

      <Section
        id="plan-your-visit"
        title="Plan your visit"
        intro="Tell us when you are coming and we will have someone ready to welcome you."
        side
      >
        <Reveal className="ink ink-sky p-5 md:p-7">
          <Form
            id="visit"
            endpoint="/visits"
            submit="Let us know you're coming"
            successTitle="Thank you!"
            successText="We cannot wait to meet you. Someone from the team will reach out to welcome you."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Your name"
                name="name"
                required
                autoComplete="name"
                error="Tell us your name so we know who to look out for."
              />
              <Field
                label="Phone or WhatsApp"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                error="Enter a phone or WhatsApp number so we can reach you."
              />
              <Choices
                className="sm:col-span-2"
                legend="Which service?"
                name="service"
                required
                error="Pick the service you plan to come to."
                options={[
                  { value: "Sunday", label: "Sunday, 10am in Yaba" },
                  { value: "Tuesday", label: "Tuesday, 8pm online" },
                  { value: "Thursday", label: "Thursday, 8pm online" },
                ]}
              />
              <Choices
                className="group sm:col-span-2"
                legend="Are you bringing anyone?"
                name="bringing"
                defaultValue="no"
                options={[
                  { value: "no", label: "Just me" },
                  { value: "yes", label: "Yes, I am bringing people" },
                ]}
              >
                <div className="mt-3 hidden max-w-64 group-has-[input[value=yes]:checked]:block">
                  <Field
                    label="How many people?"
                    name="guests"
                    type="number"
                    min={1}
                    max={30}
                    inputMode="numeric"
                    optional
                    error="Enter a number from 1 to 30."
                  />
                </div>
              </Choices>
            </div>
          </Form>
        </Reveal>
      </Section>
    </div>
  );
}
