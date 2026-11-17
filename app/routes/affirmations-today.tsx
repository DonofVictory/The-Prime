import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/affirmations-today";
import { PageIntro, Section } from "../components/Bits";
import { DayIndex } from "../components/DayIndex";
import { lagosToday } from "../lib/lagos";
import { pageMeta } from "../lib/meta";

export const meta = ({ location }: Route.MetaArgs) =>
  pageMeta(
    "Daily Affirmations | Prime Church",
    "One line of truth to carry through your day. Speak it. Believe it. Share it with someone who needs it.",
    location.pathname,
  );

/** /resources/affirmations opens today's affirmation (Lagos time). */
export default function AffirmationsToday() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/resources/affirmations/${lagosToday().day}`, { replace: true });
  }, [navigate]);

  return (
    <>
      <PageIntro title="Daily affirmations" lede="Speak it. Believe it. Share it with someone who needs it." />
      <Section>
        <p className="mb-4 text-sm text-mute" role="status">
          Opening today's affirmation…
        </p>
        <DayIndex base="/resources/affirmations" label="Affirmation days" />
      </Section>
    </>
  );
}
