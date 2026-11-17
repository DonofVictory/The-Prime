import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { nav } from "../content/site";
import { LogoMark, WatchLive } from "./Bits";
import { useStill } from "./Motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Menu icon drawn from the logo's double stroke: two parallel lines of different lengths
 * that turn into an X when the menu opens.
 */
function MenuIcon({ open }: { open: boolean }) {
  const t = { duration: 0.35, ease: EASE };
  return (
    <span className="relative block h-3.5 w-6" aria-hidden="true">
      <motion.span
        className="absolute top-0 right-0 h-[2px] rounded-full bg-chalk"
        initial={false}
        animate={open ? { top: 6, width: 24, rotate: 45 } : { top: 0, width: 24, rotate: 0 }}
        transition={t}
      />
      <motion.span
        className="absolute right-0 bottom-0 h-[2px] rounded-full bg-sky"
        initial={false}
        animate={open ? { bottom: 6, width: 24, rotate: -45 } : { bottom: 0, width: 14, rotate: 0 }}
        transition={t}
      />
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const still = useStill();
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  // While the menu is open: Escape closes it, the page behind can't scroll or be tabbed into.
  useEffect(() => {
    const behind = [document.getElementById("main"), document.querySelector("footer"), document.getElementById("quick-bar")];
    behind.forEach((el) => el && (el.inert = open));
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-night">
        <a href="#main" className="btn btn-sky absolute -top-20 left-4 z-50 focus:top-3">
          Skip to content
        </a>
        <div className="wrap relative flex h-16 items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 text-chalk no-underline" aria-label="The Prime Church, home">
            <LogoMark size={34} />
            <span className="font-display text-[0.95rem] leading-none font-extrabold tracking-wide">
              THE PRIME
              <span className="mt-0.5 block text-[0.6rem] font-medium tracking-[0.3em] text-mute">CHURCH</span>
            </span>
          </Link>

          {/* Only Watch live stays in the bar; everything else lives in the menu, on every screen size */}
          <div className="ml-auto hidden sm:block">
            <WatchLive className="btn btn-sky">
              <span className="live-dot" aria-hidden="true" />
              Watch live
            </WatchLive>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className={`relative z-20 ml-auto grid size-11 place-items-center rounded-full border sm:ml-0 ${open ? "border-transparent" : "border-line hover:border-mute"}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <MenuIcon open={open} />
          </button>

          {/*
            The menu grows from the round button: it starts clipped to a button-sized circle in its top-right
            corner and opens to the full rounded panel. On larger screens it sits over the button, which becomes
            the close X; on phones it opens just below the navbar, under the button.
          */}
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-nav"
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                className="absolute inset-x-4 top-[calc(100%+0.5rem)] z-10 max-h-[calc(100svh-5.5rem)] overflow-y-auto rounded-3xl border border-line bg-surface sm:inset-x-auto sm:top-2.5 sm:right-5 sm:w-[19rem] md:right-8"
                initial={{ clipPath: "inset(0 0 calc(100% - 44px) calc(100% - 44px) round 22px)" }}
                animate={{ clipPath: "inset(0 0 0 0 round 24px)" }}
                exit={{ clipPath: "inset(0 0 calc(100% - 44px) calc(100% - 44px) round 22px)" }}
                transition={still ? { duration: 0 } : { duration: 0.5, ease: EASE }}
              >
                <nav aria-label="Main" className="px-4 pt-3 pb-4 sm:px-5 sm:pb-5">
                  {/* on larger screens the panel starts at the button, so this row leaves room for the X */}
                  <p className="hidden h-8 items-center font-display text-xs font-semibold text-mute sm:flex">Menu</p>
                  <motion.ul
                    className="sm:mt-3"
                    initial="hidden"
                    animate="show"
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.18 } } }}
                  >
                    {nav.map((item, i) => (
                      <motion.li
                        key={item.href}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
                        }}
                      >
                        <NavLink
                          ref={i === 0 ? firstLinkRef : undefined}
                          to={item.href}
                          end={item.href === "/"}
                          className={({ isActive }) =>
                            `flex items-center justify-between rounded-xl px-3 py-2.5 font-display text-lg font-semibold no-underline ${
                              isActive ? "bg-raise text-sky" : "text-chalk hover:bg-raise"
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              {item.label}
                              {isActive && <span className="size-1.5 rounded-full bg-sky" aria-hidden="true" />}
                            </>
                          )}
                        </NavLink>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <motion.div
                    className="mt-4 grid gap-2 border-t border-line pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <WatchLive className="btn btn-sky">
                      <span className="live-dot" aria-hidden="true" />
                      Watch live
                    </WatchLive>
                    <Link className="btn btn-line" to="/connect/prayer-wall">
                      Need prayer?
                    </Link>
                  </motion.div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* the page dims behind the open menu; clicking it closes the menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-night/60"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Phones: the two always-visible buttons sit at the bottom of the screen */}
      <div
        id="quick-bar"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-line bg-night/95 px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] sm:hidden"
      >
        <WatchLive className="btn btn-sky">
          <span className="live-dot" aria-hidden="true" />
          Watch live
        </WatchLive>
        <Link className="btn btn-line" to="/connect/prayer-wall">
          Need prayer?
        </Link>
      </div>
    </>
  );
}
