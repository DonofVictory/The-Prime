import { useEffect, useState } from "react";

/** Date helpers pinned to Lagos time, so "today" is the same for everyone in the church. */

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type LagosDate = { year: number; month: number; day: number; dow: number; hour: number };

export function lagosToday(now = new Date()): LagosDate {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    dow: WEEKDAYS.indexOf(get("weekday")),
    hour: Number(get("hour")),
  };
}

export type ServiceDay = { name: string; day: string; dow: number; time: string | null; hour: number };

/** Services are treated as finished two hours after they start. */
const SERVICE_LENGTH_HOURS = 2;

/** The next service from now: today's counts until it has finished, then the next one in the week. */
export function nextService<T extends ServiceDay>(services: readonly T[], today: LagosDate) {
  for (let offset = 0; offset <= 7; offset++) {
    const dow = (today.dow + offset) % 7;
    const service = services.find((s) => s.dow === dow);
    if (service && !(offset === 0 && today.hour >= service.hour + SERVICE_LENGTH_HOURS)) {
      const date = new Date(Date.UTC(today.year, today.month - 1, today.day + offset));
      const dateLabel = new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", day: "numeric", month: "long" }).format(
        date,
      );
      const when = offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : service.day;
      return { service, offset, when, dateLabel };
    }
  }
  return null;
}

/**
 * Today's Lagos date, or null during pre-rendering and the first browser render.
 * Pages render a sensible default first, then switch to today after hydration.
 */
export function useLagosToday() {
  const [today, setToday] = useState<LagosDate | null>(null);
  useEffect(() => setToday(lagosToday()), []);
  return today;
}
