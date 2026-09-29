import { NotebookPen } from "lucide-react";
import MediaGrid from "./MediaGrid";
import Reveal from "./Reveal";
import type { Project } from "@/data/portfolio";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="rounded-2xl border border-line bg-white/70 p-4 shadow-soft sm:p-5">
        <header className="mb-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-soft">
            {project.month}
          </p>
          <h4 className="mt-1 text-base font-semibold leading-snug text-ink sm:text-lg">
            {project.title}
          </h4>
        </header>

        <MediaGrid
          context={project.title}
          certificate={project.certificate}
          images={project.images}
          youtubeUrl={project.youtubeUrl}
          videoOrientation={project.videoOrientation}
        />

        {project.note ? (
          <p className="mt-4 flex gap-2 rounded-lg border border-line-soft bg-cream/70 px-3 py-2 text-xs leading-relaxed text-muted">
            <NotebookPen aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-deep" />
            <span>{project.note}</span>
          </p>
        ) : null}
      </article>
    </Reveal>
  );
}
