"use client";

import AssetImage from "./AssetImage";
import MobileMenu from "./MobileMenu";
import { navSections, profile } from "@/data/portfolio";

const quickAccess = navSections.filter((section) => section.mobileQuickAccess);
/** The hamburger only lists what the mobile row does not already show. */
const inMenu = navSections.filter((section) => !section.mobileQuickAccess);

/**
 * Floating translucent navigation layer. Content scrolls underneath the
 * blurred surface instead of an opaque full-width bar.
 */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto w-full max-w-6xl rounded-2xl border border-line/70 bg-cream/70 shadow-soft backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between gap-3 px-3 sm:h-16 sm:px-5">
          <a
            href="#about"
            className="flex min-w-0 shrink items-center gap-2.5 rounded-xl text-ink transition-transform duration-150 active:scale-[0.98]"
          >
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-accent bg-accent-soft/60">
              <AssetImage
                file={profile.logo}
                alt={profile.logoAlt}
                sizes="40px"
                silentFallback
              />
            </span>
            <span className="truncate text-sm font-semibold tracking-[-0.01em] sm:text-base">
              {profile.name}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-muted transition-all duration-150 hover:bg-accent-soft/60 hover:text-ink active:scale-[0.97]"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <MobileMenu sections={inMenu} />
        </div>

        <nav aria-label="Quick access" className="px-3 pb-3 lg:hidden">
          <ul className="flex items-center justify-between gap-1.5">
            {quickAccess.map((section) => (
              <li key={section.id} className="min-w-0 flex-1">
                <a
                  href={`#${section.id}`}
                  className="block truncate rounded-lg border border-line/70 bg-white/60 px-2 py-2 text-center text-[11px] font-medium text-ink-soft transition-all duration-150 hover:border-accent hover:bg-accent-soft/50 active:scale-[0.97]"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
