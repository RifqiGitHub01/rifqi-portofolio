import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  /** Referenced by the parent Section through aria-labelledby. */
  headingId: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  icon?: ReactNode;
}

export default function SectionHeading({
  headingId,
  eyebrow,
  title,
  description,
  align = "left",
  icon,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "text-center" : undefined}>
      <header className={centered ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">
            {eyebrow}
          </p>
        ) : null}

        <h2
          id={headingId}
          className={`flex items-center gap-2.5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl ${
            centered ? "justify-center" : ""
          }`}
        >
          {icon ? <span className="text-accent-deep">{icon}</span> : null}
          {title}
        </h2>

        <span
          aria-hidden="true"
          className={`mt-4 block h-px w-16 bg-accent ${centered ? "mx-auto" : ""}`}
        />

        {description ? (
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
        ) : null}
      </header>
    </Reveal>
  );
}
