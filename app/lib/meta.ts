import { SITE_URL } from "../content/site";

/** Title, description, canonical link and share-preview tags for a page. */
export function pageMeta(title: string, description: string, pathname: string) {
  // Hosts may serve /about as /about/. Normalise so the pre-rendered HTML and the browser agree.
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const url = new URL(path, SITE_URL).href;
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Prime Church" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
  ];
}
