import type { Route } from "./+types/talk-to-someone";
import { PageIntro, Ph, Section } from "../components/Bits";
import { Choices, Field, Form } from "../components/Form";
import { Item, Reveal, Stagger } from "../components/Motion";
import { pageMeta } from "../lib/meta";

export const meta = ({ location }: Route.MetaArgs) =>
  pageMeta(
    "Talk to Someone | Prime Church",
    "Anxious, overwhelmed, grieving, or just not okay? Tell us how to reach you and someone from the Prime Church care team will get in touch.",
    location.pathname,
  );

export default function TalkToSomeone() {
  return (
    <>
      <PageIntro
        title="Talk to someone"
        lede="Need to talk to someone? Anxious, overwhelmed, grieving, or just not okay? You do not have to figure it out alone."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-start">
          <Stagger className="grid gap-5">
            <Item>
              <div className="notice" role="note">
                <p>
                  <strong>Please note.</strong> Our care team offers spiritual support and a listening ear. We are not a
                  replacement for professional mental-health care. If you are in immediate danger or thinking of harming
                  yourself, please call the emergency number{" "}
                  <a href="tel:112" className="font-bold text-alert">
                    112
                  </a>{" "}
                  or go to the nearest hospital right away.
                </p>
                <p className="mt-3">
                  <Ph label="Add trusted professional helpline details" />
                </p>
              </div>
            </Item>
            <Item>
              <p className="text-mute">Tell us how to reach you and someone from our care team will get in touch.</p>
            </Item>
          </Stagger>

          <Reveal delay={0.1} className="panel">
            <Form
              id="care"
              endpoint="/care-requests"
              submit="Request a conversation"
              successTitle="Thank you for reaching out."
              successText="That took courage. Someone from our care team will contact you soon."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="First name"
                  name="firstName"
                  required
                  autoComplete="given-name"
                  error="Tell us your first name."
                />
                <Choices
                  className="sm:col-span-2"
                  legend="Best way to reach you"
                  name="contactMethod"
                  required
                  error="Pick how you would like us to reach you."
                  options={[{ value: "Phone" }, { value: "WhatsApp" }, { value: "Email" }]}
                />
                <Field label="Your number or email" name="contact" required error="Enter the number or email we should use." />
                <Field
                  label="Best time to reach you"
                  name="bestTime"
                  required
                  hint="For example, weekdays after 6pm."
                  error="Tell us when is a good time to call or message."
                />
                <Field label="Anything you want us to know?" name="note" textarea optional className="sm:col-span-2" />
              </div>
            </Form>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
