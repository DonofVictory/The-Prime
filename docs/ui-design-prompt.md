# Prompt: Prime Church UI design

Paste everything below this line into the design tool, together with the content PDF (`docs/website-content.pdf`).

---

You are the design lead for the Prime Church website. Design and build a high-fidelity, clickable UI for every page in the attached content PDF ("Prime Church Website Content"). The PDF is the only source of content. Use its copy word for word and do not add marketing copy of your own.

## Who this is for

Prime Church (Instagram @primeyaba) is a young church in Yaba, Lagos, the student and tech district around UNILAG and Yabatech. The audience is students, recent graduates, young professionals and creatives, most of them browsing on a phone with mobile data. The site has two jobs:

1. Get a first-time visitor to come to a service (Plan your visit, Watch live).
2. Give regulars a reason to come back every day (today's devotional and affirmation, the Prayer Wall).

The brand line is "Get Primed." The tone in the PDF is warm, direct and unpolished on purpose: "Come as you are."

## Deliverable

1. **A design system page** with colour tokens, type scale, spacing, buttons, form fields, notices and scripture blocks, each shown in every state listed under "States" below.
2. **Every page and sub-page** in the route list, built as static HTML and CSS, with a small amount of plain JavaScript for the real interactions. Use no frameworks. The markup will later be moved into Astro components, so keep each section self-contained.
3. **Three widths for every page:** 390px (phone), 768px (tablet) and 1280px (desktop).
4. **All content loaded from one `content.json`** built from the PDF. Do not hard-code copy inside the markup.

## Hard rules (these are rejected as AI artifacts)

- No Lucide icons, no icon library of any kind, no emoji, no sparkle icons. Buttons and links are words. The only glyphs allowed are a custom-drawn SVG play triangle for video and a static live dot next to "Watch live".
- No em dashes anywhere, in copy or in UI text.
- No "it's not X, it's Y" sentence patterns in any copy you write.
- No Inter, Geist or Space Grotesk.
- No three feature cards in a row. No bento grids. No card grids as the default way to show a list.
- No terminal windows, code-style blocks or monospace labels.
- No purple-and-black palette, no rainbow colour, no radial orbs or glows, no dot-grid backgrounds, no gradient washes.
- No liquid glass, frosted glass or backdrop blur.
- No hover animations and no animated arrows. Hover changes colour or underline instantly, with no movement, scaling or lifting. No arrows appended to link or button text.
- No fake demos. Every interaction shown must actually work with the real PDF content (see "Real interactions").
- No stock photography. Photo areas are clearly marked placeholder frames with a written shot description, for example "Sunday worship, wide shot from the side of the room". The church will supply its own photos.
- No all-caps eyebrow labels above headings. No labels that the PDF does not contain.
- No middle-dot meta strings. The PDF writes "[Date] · [Time] · [Venue]"; lay these out as separate fields instead.
- Don't put the same border radius and the same grey shadow on everything.

## Visual direction

**Concept: the Sunday flyer.** Lagos church and youth events are announced with bold printed posters and WhatsApp flyers: heavy, narrow, stacked type that you can read across a street. Prime's site borrows that one idea and keeps everything else calm, clear and readable. The poster type is the single bold move. Use it in exactly two places:

1. the Home hero headline, "Faith that feels like home."
2. the About page declaration, "I am PRIMED by purpose, positioned for power, and propelled by faith…".

Everywhere else is quiet, well-spaced reading.

### Colour

| Token | Hex | Use |
|---|---|---|
| Ink | `#141C33` | Body text on light; background of hero, declaration and live bands |
| Gold | `#C8922E` | Primary buttons (with Ink text), focus rings, text on Ink only. Never text on light backgrounds (fails contrast). |
| Chalk | `#F4F5F1` | Page background (a cool off-white, not cream) |
| Haze | `#DCE1E8` | Form panels, placeholder photo frames, rules between list rows |
| Slate | `#586178` | Secondary text, scripture references, helper text |
| Signal | `#B3362B` | Only the crisis and safety notice (112). Nowhere else. |

Navy and gold come from the PDF's own styling. Use no other colours. Every text pair must meet WCAG AA contrast.

### Type

- **Archivo (variable, width 62 to 125, weight 100 to 900)** for the church's voice: interface, headings and body.
  - Poster headlines: width 62 to 70, weight 800 to 900, line-height about 0.9, sentence case, as large as the viewport allows (about 4.5rem on phone up to about 10rem on desktop).
  - Section headings: normal width, weight 700.
  - Body: 18px (17px on phone), weight 400, line-height 1.55, lines no longer than 68 characters.
  - The wordmark "Prime Church": width about 125 (expanded), weight 700.
- **Newsreader italic** for Bible verses only. Every KJV quotation in the PDF uses it, so Scripture is always recognisable as Scripture. Line-height 1.65, with the reference below in Archivo, Slate colour.
- Type scale: steps of 1.25 from 18px (14.4, 18, 22.5, 28, 35, 44, 55). Poster sizes sit outside the scale.
- No all-caps text except the word "PRIMED" inside the declaration, which the PDF capitalises.
- Render the PDF's Title Case buttons in sentence case ("Plan your visit"), keeping the same words.

### Layout

- Left-aligned throughout. Nothing centred except the confirmation messages after a form is sent.
- A 12-column grid with a maximum width of 1280px. Reading text sits within about 68 characters, usually in columns 1 to 7 or 5 to 12.
- Background bands carry meaning:
  - **Ink:** gatherings and the declaration (Home hero, Watch live, About declaration).
  - **Chalk:** reading.
  - **Haze panels:** anything you fill in.
- Radius by role: buttons fully rounded (pill, as in the PDF), fields and panels 10px, photos 4px. Use no shadows; separate things with space and Haze rules.
- Lists of things (values, events, paths, tribes, resources) are rows separated by rules, not cards. Each row has a heading on the left and its description on the right on desktop, stacked on phone.
- Use numbers only where the content is a real sequence: the five tribe quiz questions, the prayer points, the "What to expect when you visit" steps, devotional and affirmation days 1 to 31, and teaching videos within a series. Nowhere else.

```
HOME, desktop
+--------------------------------------------------------------+
| Prime Church   Home About Information Next Steps Engagement  |
|                Resources          [Watch live] [Need prayer?] |
+================== INK ========================================+
| Faith that                         | Next gathering           |
| feels like                         | Tuesday                  |
| home.                              | [time], [address]        |
| (poster type, cols 1-8)            | [Plan your visit]        |
| Prime Church is a community...     | [Watch live]             |
+================== CHALK ======================================+
| Welcome to Prime Church   | Church does not have to feel...   |
|---------------------------+-----------------------------------|
| Honest teaching           | Simple, truthful messages...      |
| Real community            | Friendships, small groups...      |
| Room to grow              | Devotionals, prayer resources...  |
|---------------------------+-----------------------------------|
| Coming up  | [Date] | The PRIME Bonding Fest  [Learn more]    |
|---------------------------+-----------------------------------|
| Today's devotional: A New Morning                             |
| "It is of the LORD's mercies..." (Newsreader italic)          |
| Today's affirmation (large Archivo)            [Share]        |
+================== INK ========================================+
| Need prayer?  Carrying something heavy?...  [Drop a prayer    |
|                                              request]         |
+--------------------------------------------------------------+
```

On phones, **Watch live** and **Need prayer?** sit in a fixed bottom bar, because the PDF requires them to be always visible.

## Pages and how to treat each section

1. **Home** (`/`)
   - Hero on Ink: poster headline, intro line, Plan your visit / Watch live, and a live **Next gathering** panel that works out the next of Sunday, Tuesday or Thursday from today's date in Lagos time.
   - Welcome: heading left, text right.
   - What you will find here: three rows, not cards.
   - Coming up: one agenda row with a date column.
   - Today's devotional (excerpt plus link) and Today's affirmation, both for today's date.
   - Need prayer? band.

2. **About** (`/about`)
   - Opening statement at large Archivo size (not poster).
   - Mission and vision as two large statements.
   - What we stand for: six rows of term and description.
   - Our culture.
   - What to expect when you visit: a numbered sequence of five steps, because it follows a real visit from arrival to hangout.
   - Pastor welcome video frame (16:9, custom play glyph).
   - Meet our pastors: a portrait frame with name, role and biography laid out like a magazine profile.
   - Our declaration on Ink, in poster type, with its three references, then the three KJV verses in Newsreader.
   - Moments from the Prime family: a single horizontally scrolling strip of photo frames at one height and varied widths, then See past events.

3. **Information** (`/information`)
   - Our services as a real table (Service, Time, Location) that becomes stacked rows on phone, with Get directions and Watch live.
   - Upcoming events: six agenda rows sorted by date. Each has a date column, title, description, time and venue lines, and its own Register button.
   - Current teaching series: Adam and Eve, with Watch the series.
   - Announcements: the PDF's empty state with Subscribe.
   - Watch live on Ink.
   - Find us, with a map placeholder frame.

4. **Next Steps** (`/next-steps`)
   - The five paths as full-width link rows, each with title, text and the action label from the PDF.
   - Plan your visit form on a Haze panel:
     - name
     - phone or WhatsApp
     - service, as a three-option segmented control (Sunday / Tuesday / Thursday)
     - are you bringing anyone? (yes or no, and how many)
   - The PDF confirmation shown after sending.

5. **Engagement**, under the menu label "Engagement" with the page heading "Connect with Prime" (`/connect`, plus sub-pages)
   - **Find Your Tribe** (`/connect/find-your-tribe`): one question per screen with "Question 2 of 5" progress and large selectable answer rows. Next steps:
     - The result screen shows "Looks like you would fit right in with [Tribe]" and the tribe description.
     - The contact step asks for name, email, WhatsApp (optional), preferred contact and a consent checkbox, then Connect me, then the confirmation.
     - Below the quiz, show the six tribes as rows.
     - Scoring: question 1 decides the tribe, and questions 2 and 3 break ties.
   - **Prayer Wall** (`/connect/prayer-wall`):
     - A form with name, email, request, and a private or public choice. The privacy note sits next to the choice, not at the bottom.
     - The wall is a single-column list. Each request has a first name, the text, and an "I prayed" button with a count.
     - Show the wall populated and empty, using the PDF's empty-wall line.
   - **Talk to someone** (`/connect/talk-to-someone`): the Signal-coloured safety notice (112) appears above the form, then the form, then the confirmation.

6. **Resources** (`/resources`, plus sub-pages)
   - The hub opens with a search field, "What are you going through?", and four suggestions (relocation, anxiety, job, family). Typing or tapping really filters the resource list. Below it, the seven sections are an index of rows.
   - **Prayer points** pages: five guides, each with numbered points, scripture blocks and the closing line.
   - **Support and encouragement**: verses, the short prayer, Talk to someone, and the notice.
   - **Teaching**: one page per topic, with the series name and four videos as rows (thumbnail frame, title, summary).
   - **Daily devotional** (`/resources/devotional/[day]`): defaults to today's day in Lagos time. Show the day number, title, scripture in Newsreader, reflection and the "Pray:" line, with previous day, next day, Share, and a 1 to 31 day index.
   - **Daily affirmations**: today's affirmation very large, its reference, Share, and the 1 to 31 index.
   - **Archive**: categories, each with the PDF's empty-category line.
   - **Downloads**: each file as a row with its own Download button.

7. **Site-wide**
   - Header and mobile menu.
   - Footer with all PDF footer content, laid out as fields, not dot-joined strings.
   - Newsletter strip.
   - The notification permission prompt as a quiet banner (not a modal) with Allow notifications / Not now.
   - The welcome email as a simple email layout page.

## Real interactions (no fake demos)

- Today's devotional, affirmation and next gathering are worked out from the real date in Africa/Lagos time.
- The tribe quiz scores real answers and shows the real result.
- Resource search filters the real content.
- Forms validate for real and move through every state. Use a simulated network call that can be switched to fail, so the error state can be reviewed.
- Prayer Wall: "I prayed" updates the count straight away and keeps it for the session.
- Share uses the device's share sheet where available and copies the link otherwise, confirming with "Link copied".

## States (design every one)

- **Buttons and links:** default, hover (instant colour or underline change), focus-visible (3px Gold outline, offset 3px, on light and on Ink), pressed, disabled, loading (label changes to "Sending…").
- **Fields:** empty, filled, focus, error, with a specific message below the field, for example "Enter a phone or WhatsApp number so we can reach you".
- **Forms:** success, using each PDF confirmation line exactly.
- **Empty:** the Prayer Wall, Announcements and Archive categories, using the PDF lines.
- **Placeholders:** the PDF's `[time]`, `[address]`, `[Date]` and `[Pastor name]` stay visible as a distinct Haze-highlighted token, so the church can see exactly what still needs filling.

## Motion

- **One page-load moment:** the Home hero headline reveals line by line, once, in under 700ms.
- **Motion in response to actions only:** quiz step change, menu opening, the "I prayed" count updating.
- No scroll-triggered fades, no hover motion, no looping animation.
- Respect `prefers-reduced-motion` by removing all of it.

## Quality floor

- Visible keyboard focus everywhere.
- Touch targets of at least 44px.
- Every field has a real label.
- Errors are announced to screen readers.
- `lang="en-NG"`.
- Pages work without JavaScript, except the interactive pieces.
- Fonts subset and self-hosted.
- The crisis notice is never hidden behind a toggle.

## Process

1. Before building, write a short plan: tokens, type, layout per page, and the one bold move.
2. Compare the plan with what a generic church or startup site would look like, and with the hard rules above. Change anything that matches, and say what you changed.
3. Build.
4. Screenshot every page at all three widths, critique the screenshots against this brief, and fix what you find.
5. Finally, remove one decorative element that isn't earning its place.
