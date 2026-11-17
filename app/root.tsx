import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/root";
import "@fontsource-variable/red-hat-display/wght.css";
import "@fontsource-variable/red-hat-text/wght.css";
import "@fontsource-variable/red-hat-text/wght-italic.css";
import "@fontsource/lilita-one/latin-400.css";
import "./app.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { NotFound } from "./components/NotFound";

export const links: Route.LinksFunction = () => [{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-NG">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b0a09" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default function App() {
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <Shell>
        <NotFound />
      </Shell>
    );
  }
  return (
    <Shell>
      <section className="wrap py-16 md:py-24">
        <h1 className="text-4xl">Something went wrong on this page.</h1>
        <p className="mt-4 max-w-xl text-lg text-mute">
          Refresh the page to try again. If it keeps happening, go back to the home page.
        </p>
      </section>
    </Shell>
  );
}
