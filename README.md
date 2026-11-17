# Prime Church website

React + TypeScript site built with [React Router 7](https://reactrouter.com) (framework mode), Vite, Tailwind CSS 4 and Framer Motion, from the Prime Church Website Content document.

There is no server. At build time every page is pre-rendered to its own HTML file (so search engines and WhatsApp link previews see real content), then React takes over in the browser.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # strict TypeScript check
npm run build      # type check, then pre-render everything into build/client
npm run preview    # serve build/client like a static host (http://localhost:4321, or PORT=xxxx)
```

## Project layout

```
app/
  root.tsx              html shell, header, footer, error screen
  routes.ts             every URL and the file that renders it
  routes/*.tsx          one file per page, styled with Tailwind classes
  components/           Header, Footer, Form (fields and states), Motion (scroll reveals), ShareButton, DayIndex, shared bits
  content/              all copy from the content document, typed
  lib/api.ts            the only file that talks to the backend
  lib/lagos.ts          "today" in Lagos time, next service
  lib/meta.ts           page title, description, canonical and share tags
  app.css               Tailwind theme (colours, fonts, type scale) and shared component classes
react-router.config.ts  the list of pages to pre-render
scripts/preview.mjs     local static server used by npm run preview
```

## Filling in church details

Anything the church still has to supply shows on the site as a dashed `[Placeholder]` token. Fill them here:

| What | File |
|---|---|
| Live domain | `app/content/site.ts` (`SITE_URL`) |
| Address, maps link, phone, email, YouTube channel and live link, service times | `app/content/site.ts` |
| Event dates, times, venues, registration links | `app/content/church.ts` (`events`) |
| Pastor name, role, biography | `app/content/church.ts` (`pastors`) |
| Teaching series link, announcements | `app/content/church.ts` |
| YouTube video IDs for teaching videos | `app/content/resources.ts` (`teaching`) |
| Download files (put files in `public/downloads/`) | `app/content/resources.ts` (`downloads`) |

Photo frames describe the shot each one needs. Replace a `<Frame>` with an `<img>` once real photos exist.

Adding a new page with a dynamic URL (for example a new prayer guide) is automatic: `react-router.config.ts` builds the pre-render list from the content files.

## How "today" works

The devotional and affirmation of the day are the day of the month (1 to 31) in Lagos time. The home page's "Next gathering" is the next Sunday, Tuesday or Thursday service from today. Pages are pre-rendered with Day 1 and switch to today as soon as React loads (`useLagosToday`).

## Hosting

Upload `build/client` to any static host (Vercel, Netlify, Cloudflare Pages). One setting matters: unknown URLs should serve `__spa-fallback.html` with a 404 status, so visitors see the site's "page does not exist" screen. For example, on Netlify add `public/_redirects` containing `/* /__spa-fallback.html 404`.

## Backend

Set `VITE_API_BASE` in `.env` (see `.env.example`). Without it the site runs in demo mode: every form works and shows its states, but nothing is sent, and each form says so. Add `?simulate=error` to a page URL to see the error states.

The site expects these endpoints (JSON in, any 2xx is success):

| Method and path | Body |
|---|---|
| `POST /subscribers` | `email` |
| `POST /visits` | `name`, `phone`, `service` (Sunday/Tuesday/Thursday), `bringing` (yes/no), `guests` |
| `POST /prayer-requests` | `name`, `email`, `request`, `visibility` (private/public) |
| `GET /prayer-wall` | returns `[{ id, firstName, text, prayedCount }]`, approved public requests only |
| `POST /prayer-wall/:id/prayed` | empty |
| `POST /care-requests` | `firstName`, `contactMethod`, `contact`, `bestTime`, `note` |
| `POST /tribe-connections` | `tribe`, `answers` (JSON string), `name`, `email`, `whatsapp`, `contactMethod`, `consent` |

Prayer and care requests are sensitive: only accept them over HTTPS, limit access to the prayer and care team, and do not log their contents. Public prayer requests must be reviewed before they appear on the wall.

## Design

- Theme "Night service", taken from the logo (public/prime-logo.jpg): black ground, white type, one sky-blue accent (#8ec5ff) for actions and highlights. Tokens live in the @theme block of app/app.css.
- Type: Red Hat Display for headings, Red Hat Text for reading (italic for Scripture). 16px body.
- The logo's double-stroke P is redrawn as the home hero animation and its parallel lines become the double-rule divider.
- Motion (Framer Motion): content rises into view as you scroll and lists stagger in. Hover only changes colour. Everything respects the device's reduced-motion setting.
- Lists are rows, not cards. Numbers appear only on real sequences (quiz questions, prayer points, visit steps, devotional days).
- No icon library and no emoji.
