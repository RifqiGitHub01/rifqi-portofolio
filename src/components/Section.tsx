import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  /** Must match the headingId passed to SectionHeading. */
  headingId: string;
  children: ReactNode;
  tone?: "cream" | "sand";
  className?: string;
}

/** Shared page-section shell so every section keeps identical spacing and semantics. */
export default function Section({
  id,
  headingId,
  children,
  tone = "cream",
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`px-4 py-16 sm:px-6 sm:py-20 ${tone === "sand" ? "bg-sand/50" : ""} ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
