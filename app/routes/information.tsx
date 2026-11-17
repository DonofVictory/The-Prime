import { Link } from "react-router";
import type { Route } from "./+types/information";
import { Frame, Ph, Rows, Section, WatchLive } from "../components/Bits";
import { Reveal } from "../components/Motion";
import { site } from "../content/site";
import { ComicIntro, EventPoster, Pop } from "../components/Comic";
import { PinnedRow, useMedia } from "../components/PinnedRow";
import { announcements, sortedEvents, teachingSeries } from "../content/church";
import { pageMeta } from "../lib/meta";

export const meta = ({ location }: Route.MetaArgs) =>
  pageMeta(
    "Services, Events and Teaching | Prime Church",
    "Find Prime Church service times, upcoming events, the current teaching series and how to watch live.",
    location.pathname,
  );

export default function Information() {
  const events = sortedEvents();
  const phone = useMedia("(max-width: 639px)");
  return (
    <div className="comic-page">
      <ComicIntro title="What is happening at Prime" />

      <Section id="services" title="Our services">
        <ul className="grid gap-7 md:grid-cols-12 md:gap-8">
          {site.services.map((sv, i) => (
            <Pop
              as="li"
              key={sv.day}
              tilt={[-0.8, 1, -0.4][i % 3]}
              delay={i * 0.09}
              className={`ink p-5 md:p-6 ${["md:col-span-7", "md:col-span-5", "md:col-span-12"][i % 3]} ${i % 2 ? "ink-punch" : "ink-sky"}`}
            >
              <p className="caption">{sv.day}</p>
              <h3 className="mt-3 font-comic text-2xl font-normal">{sv.name}</h3>
              <p className="mt-1 max-w-lg text-mute">{sv.description}</p>
              <p className="mt-4 font-display text-lg font-bold">
                {sv.time}, {sv.place === "online" ? "online" : "in person"}
              </p>
              <p className="mt-1 text-sm text-mute">
                {sv.place === "online" ? (
                  <>
                    Join from anywhere. <WatchLive className="font-semibold text-sky">Watch live</WatchLive>
                  </>
                ) : (
                  site.address
                )}
              </p>
            </Pop>
          ))}
        </ul>
        <Reveal className="mt-8 flex flex-wrap gap-4">
          {site.mapsUrl ? (
            <a className="btn btn-sky" href={site.mapsUrl} target="_blank" rel="noopener">
              Get directions
            </a>
          ) : (
            <a className="btn btn-sky" href="#find-us">
              Get directions
            </a>
          )}
          <WatchLive className="btn btn-line">Watch live</WatchLive>
        </Reveal>
      </Section>

      {/* On phones, once the posters are fully on screen, scrolling slides them sideways until the last is in; larger screens show a grid */}
      <PinnedRow
        id="events"
        labelledBy="events-title"
        enabled={phone}
        mode="lock"
        rowClassName="flex items-start gap-6"
        idleClassName="grid gap-8 sm:grid-cols-2 md:gap-10"
        head={
          <Reveal>
            <h2 id="events-title" className="text-3xl">
              Upcoming events
            </h2>
          </Reveal>
        }
      >
        {events.map((e, i) => (
          <div key={e.slug} className={phone ? "w-[78vw] max-w-sm flex-none" : undefined}>
            <EventPoster event={e} index={i} />
          </div>
        ))}
      </PinnedRow>

      <Section id="series">
        <Pop tilt={0.5} className="ink ink-punch grid gap-8 p-6 md:p-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="series-title" className="text-3xl">
              Current teaching series: {teachingSeries.title}
            </h2>
            <p className="mt-3 max-w-xl text-mute">{teachingSeries.text}</p>
            <div className="mt-6">
              {teachingSeries.url ? (
                <a className="btn btn-sky" href={teachingSeries.url} target="_blank" rel="noopener">
                  Watch the series
                </a>
              ) : (
                <Link className="btn btn-sky" to="/resources/teaching">
                  Watch the series
                </Link>
              )}
            </div>
          </div>
          <Frame shot="Series artwork for Adam and Eve" ratio="aspect-video" />
        </Pop>
      </Section>

      <Section id="announcements" title="Announcements" side>
        {announcements.length ? (
          <Rows items={announcements.map((a) => ({ title: a.title, text: a.text }))} />
        ) : (
          <Pop tilt={-0.6} className="ink ink-sky p-5 md:p-6">
            <p className="text-mute">
              No announcements right now. Check back soon, or subscribe to the newsletter so you never miss an update.
            </p>
            <a className="btn btn-line mt-5" href="#newsletter-title">
              Subscribe
            </a>
          </Pop>
        )}
      </Section>

      <Section id="watch-live">
        <Pop tilt={-0.8} className="ink ink-punch grid gap-6 p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:items-center md:p-10">
          <h2 id="watch-live-title" className="flex items-center gap-3 text-3xl">
            <span className="live-dot size-3" aria-hidden="true" />
            Watch live
          </h2>
          <div>
            <p className="text-lg text-mute">
              Can't make it in person? Join us from anywhere. Our services stream on YouTube, and recordings are
              uploaded after.
            </p>
            <div className="mt-5">
              {site.youtube.liveUrl ? (
                <a className="btn btn-sky" href={site.youtube.liveUrl} target="_blank" rel="noopener">
                  Watch live on YouTube
                </a>
              ) : (
                <p className="text-sm">
                  Watch live on YouTube: <Ph label="YouTube live link" />
                </p>
              )}
            </div>
          </div>
        </Pop>
      </Section>

      <Section id="find-us">
        <Pop tilt={0.6} className="ink ink-sky grid gap-8 p-6 md:p-8 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 id="find-us-title" className="text-3xl">
              Find us
            </h2>
            <div className="mt-4 grid gap-2 text-sm">
              <p>
                <Ph value={site.address} label="Church address" />
              </p>
              <p>{site.phone ? <a href={`tel:${site.phone}`}>{site.phone}</a> : <Ph label="Phone number" />}</p>
              <p>{site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <Ph label="Email address" />}</p>
              <p>
                <span className="text-mute">Instagram</span>{" "}
                <a href={site.instagram.url} target="_blank" rel="noopener">
                  {site.instagram.handle}
                </a>
              </p>
            </div>
          </div>
          {site.mapEmbedUrl ? (
            <iframe
              title={`Map showing ${site.address ?? "the church"}`}
              src={site.mapEmbedUrl}
              className="aspect-[16/10] w-full rounded-2xl border-2 border-chalk/40 bg-surface"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <Frame shot="Map of the church location, or a photo of the entrance from the street" ratio="aspect-[16/10]" />
          )}
        </Pop>
      </Section>
    </div>
  );
}
