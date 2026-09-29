import { ChartColumn, Lightbulb, MessagesSquare, RefreshCcw, Users } from "lucide-react";
import Reveal from "./Reveal";
import type { SoftSkill } from "@/data/portfolio";

const ICONS: Record<SoftSkill["icon"], typeof Users> = {
  communication: MessagesSquare,
  leadership: Users,
  analysis: ChartColumn,
  creative: Lightbulb,
  reflection: RefreshCcw,
};

/** Soft-skill card: a conceptual circular graphic plus the skill name. */
export default function SkillBadge({ skill, index }: { skill: SoftSkill; index: number }) {
  const Icon = ICONS[skill.icon];

  return (
    <Reveal delay={index * 0.05}>
      <div className="group flex items-center gap-3 rounded-full border border-line bg-white py-2 pr-5 pl-2 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft/40 hover:shadow-lift">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent bg-accent-soft/70 text-accent-deep transition-colors duration-300 group-hover:bg-accent/40"
        >
          <Icon className="h-4.5 w-4.5" />
        </span>
        <span className="text-sm font-medium text-ink-soft">{skill.name}</span>
      </div>
    </Reveal>
  );
}
