import { GraduationCap, Star } from "lucide-react";
import Reveal from "./Reveal";
import type { Education } from "@/data/portfolio";

export default function EducationTimeline({ educations }: { educations: Education[] }) {
  return (
    <ol className="relative space-y-5">
      <span
        aria-hidden="true"
        className="absolute top-3 bottom-3 left-[0.6875rem] w-px bg-line sm:left-[0.9375rem]"
      />

      {educations.map((education) => (
        <li key={education.id} className="relative pl-[2.1rem] sm:pl-[2.9rem]">
          <span
            aria-hidden="true"
            className="absolute top-1 left-0 z-10 flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full border-2 border-accent bg-cream sm:h-[1.875rem] sm:w-[1.875rem]"
          >
            <GraduationCap className="h-3 w-3 text-accent-deep sm:h-4 sm:w-4" />
          </span>

          <Reveal>
            <article className="rounded-2xl border border-line bg-white/70 p-4 shadow-soft sm:p-5">
              <h3 className="text-base font-semibold tracking-tight text-ink sm:text-lg">
                {education.institution}
              </h3>
              <p className="mt-1 text-sm text-muted">{education.program}</p>
              <p className="mt-2 font-mono text-xs text-muted-soft">{education.period}</p>

              {education.achievement ? (
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent-soft/60 px-3 py-1 text-xs font-medium text-ink-soft">
                  <Star aria-hidden="true" className="h-3.5 w-3.5 text-accent-deep" />
                  {education.achievement.label}: <strong className="font-semibold">{education.achievement.value}</strong>
                </p>
              ) : null}

              {education.activities.length > 0 ? (
                <div className="mt-4 border-t border-line-soft pt-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-soft">
                    Campus activities
                  </p>
                  <ul className="mt-2 space-y-2">
                    {education.activities.map((activity) => (
                      <li key={activity.role} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                        <span className="text-sm text-ink-soft">{activity.role}</span>
                        <span className="font-mono text-xs text-muted-soft">{activity.period}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
