import { Link } from "react-router";
import { useLagosToday } from "../lib/lagos";
import { ListItem, StaggerList } from "./Motion";

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

/** Links to days 1 to 31. Today's day (Lagos time) gets a sky ring once the page loads. */
export function DayIndex({ base, current, label }: { base: string; current?: number; label: string }) {
  const today = useLagosToday()?.day;
  return (
    <nav aria-label={label}>
      <StaggerList className="flex flex-wrap gap-2" step={0.015}>
        {DAYS.map((d) => {
          const isCurrent = d === current;
          const isToday = d === today;
          return (
            <ListItem key={d}>
              <Link
                to={`${base}/${d}`}
                aria-current={isCurrent ? "page" : undefined}
                aria-label={isToday ? `Day ${d}, today` : undefined}
                className={[
                  "grid size-10 place-items-center rounded-full border text-sm font-medium tabular-nums no-underline",
                  isCurrent
                    ? "border-sky bg-sky text-night"
                    : isToday
                      ? "border-sky text-sky"
                      : "border-line text-chalk hover:border-mute",
                ].join(" ")}
              >
                {d}
              </Link>
            </ListItem>
          );
        })}
      </StaggerList>
    </nav>
  );
}
