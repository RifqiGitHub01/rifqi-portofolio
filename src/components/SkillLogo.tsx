"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";
import { assetPath, type HardSkill } from "@/data/portfolio";

/**
 * Hard-skill card. The logo is a developer-supplied file from the single
 * public/assets folder, normalized into a fixed tile so no logo visually
 * dominates regardless of its source dimensions. While the file is absent a
 * plain text monogram is shown instead — never a substitute graphic.
 */
export default function SkillLogo({ skill, index }: { skill: HardSkill; index: number }) {
  const [missing, setMissing] = useState(false);

  return (
    <Reveal delay={index * 0.05}>
      <div className="group flex items-center gap-3 rounded-xl border border-line bg-white p-3 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-lift active:scale-[0.99]">
        <span
          aria-hidden="true"
          className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-accent bg-accent-soft/70 transition-colors duration-300 group-hover:bg-accent/40"
        >
          {missing ? (
            <span className="font-mono text-xs font-bold text-ink">{skill.monogram}</span>
          ) : (
            <Image
              src={assetPath(skill.logo)}
              alt=""
              fill
              sizes="44px"
              onError={() => setMissing(true)}
              className="object-contain p-1.5"
            />
          )}
        </span>
        <span className="text-sm leading-snug font-medium text-ink-soft">{skill.name}</span>
      </div>
    </Reveal>
  );
}
