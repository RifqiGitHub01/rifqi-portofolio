import { AtSign } from "lucide-react";
import MediaGrid from "./MediaGrid";
import Reveal from "./Reveal";
import type { Experience } from "@/data/portfolio";

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Reveal>
      <article className="rounded-2xl border border-line bg-white/70 p-4 shadow-soft sm:p-5">
        <header className="mb-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-soft">
            {experience.period}
          </p>
          <h4 className="mt-1 text-base font-semibold leading-snug text-ink sm:text-lg">
            {experience.title}
          </h4>

          {experience.channel ? (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
              <AtSign aria-hidden="true" className="h-3.5 w-3.5 text-accent-deep" />
              <span className="font-mono">{experience.channel}</span>
            </p>
          ) : null}
        </header>

        <MediaGrid
          context={experience.title}
          certificate={experience.certificate}
          images={experience.images}
          youtubeUrl={experience.youtubeUrl}
          videoOrientation={experience.videoOrientation}
        />
      </article>
    </Reveal>
  );
}
