"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { NavSection } from "@/data/portfolio";

/**
 * Hamburger panel listing every portfolio section.
 * Closes on navigation, on ESC, and on pointer-down outside the panel.
 */
export default function MobileMenu({ sections }: { sections: NavSection[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const handleNavigate = (event: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    // Closing the menu unmounts this link, which would cancel the browser's
    // default anchor navigation, so scroll explicitly instead.
    event.preventDefault();
    setOpen(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    history.pushState(null, "", `#${id}`);
    // Defer past React's synchronous flush, which otherwise interrupts the scroll.
    window.setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }, 0);
  };

  const panelMotion = prefersReducedMotion
    ? { initial: undefined, animate: undefined, exit: undefined, transition: undefined }
    : {
        initial: { opacity: 0, scale: 0.96, y: -6 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.97, y: -4 },
        transition: { type: "spring" as const, bounce: 0, duration: 0.3 },
      };

  return (
    <div ref={rootRef} className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-line/70 bg-white/70 text-ink shadow-soft transition-all duration-150 hover:border-accent hover:bg-accent-soft/50 active:scale-95"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="mobile-menu-panel"
            id="mobile-menu-panel"
            style={{ transformOrigin: "top right" }}
            className="absolute right-0 z-50 mt-2 max-h-[70vh] w-56 overflow-y-auto rounded-2xl border border-line/70 bg-cream/85 shadow-lift backdrop-blur-xl"
            {...panelMotion}
          >
            <nav aria-label="All sections">
              <ul className="py-1.5">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={(event) => handleNavigate(event, section.id)}
                      className="block px-4 py-3 text-sm font-medium text-ink-soft transition-colors hover:bg-accent-soft/60 hover:text-ink"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
