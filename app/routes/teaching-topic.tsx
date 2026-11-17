import type { Route } from "./+types/teaching-topic";
import { Frame, PageIntro, Ph, Rows, Section } from "../components/Bits";
import { ListItem, StaggerList } from "../components/Motion";
import { NotFound } from "../components/NotFound";
import { teaching } from "../content/resources";
import { pageMeta } from "../lib/meta";

const find = (slug: string) => teaching.find((t) => t.slug === slug);

export const meta = ({ params, location }: Route.MetaArgs) => {
  const topic = find(params.topic);
  return topic
    ? pageMeta(
        `${topic.title} | Teaching Videos | Prime Church`,
        `${topic.summary} Series: ${topic.series}.`,
        location.pathname,
      )
    : [];
};

export default function TeachingTopic({ params }: Route.ComponentProps) {
  const topic = find(params.topic);
  if (!topic) return <NotFound />;
  const others = teaching.filter((t) => t.slug !== topic.slug);

  return (
    <>
      <PageIntro title={topic.title} lede={topic.summary} crumb={{ to: "/resources/teaching", label: "Teaching videos" }} />

      <Section id="series" title={`Series: ${topic.series}`}>
        <StaggerList className="grid gap-8">
          {topic.videos.map((v, i) => {
            const watch = v.youtubeId ? `https://www.youtube.com/watch?v=${v.youtubeId}` : null;
            return (
              <ListItem key={v.title} className="grid gap-4 sm:grid-cols-[minmax(12rem,18rem)_1fr] sm:items-center sm:gap-8">
                {watch ? (
                  <a href={watch} target="_blank" rel="noopener" className="block overflow-hidden rounded-2xl">
                    <img
                      src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
                      alt=""
                      loading="lazy"
                      width={480}
                      height={360}
                      className="aspect-video w-full object-cover"
                    />
                  </a>
                ) : (
                  <Frame video shot={`Episode ${i + 1} thumbnail`} ratio="aspect-video" />
                )}
                <div>
                  <p className="text-sm font-medium text-sky">Episode {i + 1}</p>
                  <h3 className="mt-1 text-xl">{v.title}</h3>
                  <p className="mt-1 text-mute">{v.summary}</p>
                  <p className="mt-3 text-sm">
                    {watch ? (
                      <a href={watch} target="_blank" rel="noopener">
                        Watch on YouTube
                      </a>
                    ) : (
                      <Ph label="YouTube link" />
                    )}
                  </p>
                </div>
              </ListItem>
            );
          })}
        </StaggerList>
      </Section>

      <Section id="more" title="More topics">
        <Rows items={others.map((t) => ({ title: t.title, text: t.summary, href: `/resources/teaching/${t.slug}` }))} />
      </Section>
    </>
  );
}
