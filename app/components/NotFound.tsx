import { motion } from "framer-motion";
import { Link } from "react-router";
import { Burst, Pop } from "./Comic";

/** The 404 page as a single comic panel: a burst with the number, and the message in a speech bubble. */
export function NotFound() {
  return (
    <section className="wrap py-12 md:py-20">
      <title>Page not found | The Prime Church</title>
      <Pop tilt={-1} className="ink ink-punch grid max-w-4xl items-center gap-8 overflow-hidden p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:p-10">
        <div className="relative mx-auto grid aspect-square w-full max-w-64 place-items-center" aria-hidden="true">
          <Burst className="absolute inset-0 h-full w-full" delay={0.15} />
          <motion.span
            className="comic-title relative text-7xl text-night"
            style={{ textShadow: "0.05em 0.05em 0 var(--color-chalk)" }}
            initial={{ scale: 2, opacity: 0, rotate: 12 }}
            animate={{ scale: 1, opacity: 1, rotate: -6 }}
            transition={{ type: "spring", stiffness: 380, damping: 15, delay: 0.4 }}
          >
            404
          </motion.span>
        </div>
        <div>
          <h1 className="bubble text-2xl leading-snug md:text-3xl">This page does not exist.</h1>
          <p className="mt-8 text-lg text-mute">
            The link may be old or mistyped. Try the home page, or find what you need in Resources.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link className="btn btn-comic" to="/">
              Go to the home page
            </Link>
            <Link className="btn btn-ink" to="/resources">
              Browse resources
            </Link>
          </div>
        </div>
      </Pop>
    </section>
  );
}
