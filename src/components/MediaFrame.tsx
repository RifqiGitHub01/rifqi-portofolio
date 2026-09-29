import type { ReactNode } from "react";

interface MediaFrameProps {
  label: string;
  children: ReactNode;
  /** Concise explanation shown under the block, only when the brief supplies one. */
  footnote?: string;
  className?: string;
}

/** Clean bordered frame shared by certificates, galleries and videos. */
export default function MediaFrame({
  label,
  children,
  footnote,
  className = "",
}: MediaFrameProps) {
  return (
    <figure
      className={`flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-soft ${className}`}
    >
      <figcaption className="border-b border-line-soft bg-sand/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
        {label}
      </figcaption>

      <div className="flex flex-1 flex-col">{children}</div>

      {footnote ? (
        <p className="border-t border-line-soft bg-cream/60 px-3 py-2 text-xs leading-relaxed text-muted">
          {footnote}
        </p>
      ) : null}
    </figure>
  );
}
