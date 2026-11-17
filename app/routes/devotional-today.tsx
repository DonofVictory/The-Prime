import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/devotional-today";
import { PageIntro, Section } from "../components/Bits";
import { DayIndex } from "../components/DayIndex";
import { lagosToday } from "../lib/lagos";
import { pageMeta } from "../lib/meta";

export const meta = ({ location }: Route.MetaArgs) =>
  pageMeta(
    "Daily Devotional | Prime Church",
    "A short reading, a verse and a prayer for every day of the month. Take five minutes. Let God meet you here.",
    location.pathname,
  );

/** /resources/devotional opens today's reading (Lagos time). */
export default function DevotionalToday() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/resources/devotional/${lagosToday().day}`, { replace: true });
  }, [navigate]);

  return (
    <>
      <PageIntro
        title="Daily devotional"
        lede="A short reading, a verse and a prayer for every day of the month. After Day 31, we begin again. Take five minutes. Let God meet you here."
      />
      <Section>
        <p className="mb-4 text-sm text-mute" role="status">
          Opening today's devotional…
        </p>
        <DayIndex base="/resources/devotional" label="Devotional days" />
      </Section>
    </>
  );
}
