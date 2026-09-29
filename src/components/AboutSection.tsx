import AssetImage from "./AssetImage";
import Reveal from "./Reveal";
import { aboutParagraphs, profile } from "@/data/portfolio";

/** Profile image on the left, about text on the right. Stacks on mobile. */
export default function AboutSection() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
      <Reveal className="order-1">
        <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
          <div
            aria-hidden="true"
            className="absolute inset-x-8 top-8 bottom-12 -rotate-6 rounded-[2rem] border border-accent bg-gradient-to-br from-accent-soft via-sand to-sand-deep shadow-soft"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-12 top-14 bottom-16 rotate-3 rounded-[2rem] border border-line bg-white/50"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-1 left-1/2 h-7 w-3/5 -translate-x-1/2 rounded-[50%] bg-ink/20 blur-xl"
          />

          <div className="relative aspect-[3/4]">
            <AssetImage
              file={profile.photo}
              alt={profile.photoAlt}
              preload
              sizes="(max-width: 1024px) 80vw, 22rem"
              className="[filter:drop-shadow(0_24px_26px_rgba(35,33,29,0.30))]"
            />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="order-2">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent-deep uppercase">
            {profile.role}
          </p>

          <h2
            id="about-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            {profile.name}
          </h2>

          <span aria-hidden="true" className="mt-5 block h-px w-16 bg-accent" />

          <div className="mt-5 space-y-4">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
