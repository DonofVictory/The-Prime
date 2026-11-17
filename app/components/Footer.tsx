import { Link } from "react-router";
import { explore, site, serviceShort } from "../content/site";
import { LogoFull, Ph } from "./Bits";
import { Field, Form } from "./Form";
import { Item, Reveal, Stagger } from "./Motion";

export function Footer() {
  return (
    <footer className="mt-10 pb-24 sm:pb-0">
      <section aria-labelledby="newsletter-title" className="wrap">
        <Reveal className="panel grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-end md:gap-12">
          <div>
            <h2 id="newsletter-title" className="text-2xl md:text-3xl">
              Get a daily dose of encouragement.
            </h2>
            <p className="mt-2 text-mute">Devotionals, events and updates, straight to your inbox. Just your email, no spam.</p>
          </div>
          <Form
            id="newsletter"
            endpoint="/subscribers"
            submit="Subscribe"
            successTitle="You are in!"
            successText="Check your inbox for a welcome message."
          >
            <Field
              label="Your email"
              name="email"
              type="email"
              required
              autoComplete="email"
              error="Enter your email so we can send you the devotional."
            />
          </Form>
        </Reveal>
      </section>

      <div className="wrap mt-14">
        <div className="double-rule" />
        <Stagger className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <Item>
            <LogoFull className="-ml-6 -mt-6 w-36" />
            <p className="-mt-3 max-w-xs text-sm text-mute">{site.summary}</p>
          </Item>

          <Item>
            <h2 className="font-display text-sm font-semibold text-chalk">Visit us</h2>
            <p className="mt-3 text-sm">
              <Ph value={site.address} label="Church address" />
            </p>
            <dl className="mt-3 grid gap-1.5 text-sm">
              {site.services.map((s) => (
                <div key={s.day} className="flex gap-3">
                  <dt className="w-20 text-mute">{s.day}</dt>
                  <dd>{serviceShort(s)}</dd>
                </div>
              ))}
            </dl>
          </Item>

          <Item>
            <h2 className="font-display text-sm font-semibold text-chalk">Contact</h2>
            <ul className="mt-3 grid gap-1.5 text-sm">
              <li>{site.phone ? <a href={`tel:${site.phone}`}>{site.phone}</a> : <Ph label="Phone number" />}</li>
              <li>{site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <Ph label="Email address" />}</li>
              <li>
                <span className="text-mute">Instagram</span>{" "}
                <a href={site.instagram.url} rel="noopener" target="_blank">
                  {site.instagram.handle}
                </a>
              </li>
              <li>
                <span className="text-mute">YouTube</span> <Ph value={site.youtube.name} label="Channel name" />
              </li>
            </ul>
          </Item>

          <Item>
            <nav aria-labelledby="explore-title">
              <h2 id="explore-title" className="font-display text-sm font-semibold text-chalk">
                Explore
              </h2>
              <ul className="mt-3 grid gap-1.5 text-sm">
                {explore.map((l) => (
                  <li key={l.label}>
                    <Link to={l.href} className="text-mute no-underline hover:text-chalk">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Item>
        </Stagger>
        <p className="border-t border-line py-6 text-xs text-mute">&copy; The Prime Church. Get Primed.</p>
      </div>
    </footer>
  );
}
