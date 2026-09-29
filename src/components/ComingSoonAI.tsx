import { Lock } from "lucide-react";
import Reveal from "./Reveal";

interface ComingSoonAIProps {
  title: string;
  status: string;
  description: string;
}

/**
 * Visual placeholder only. Deliberately contains no input, no button,
 * no API call and no interactive behaviour.
 */
export default function ComingSoonAI({ title, status, description }: ComingSoonAIProps) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-2xl border border-neutral-300 bg-neutral-100 p-8 text-center grayscale sm:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 12px)",
          }}
        />

        <div className="relative mx-auto flex max-w-xl flex-col items-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-neutral-400 bg-neutral-200 text-neutral-600">
            <Lock aria-hidden="true" className="h-7 w-7" />
          </span>

          <p className="mt-5 font-mono text-[11px] font-semibold tracking-[0.3em] text-neutral-500 uppercase">
            {title}
          </p>

          <p className="mt-2 text-2xl font-black tracking-[0.14em] text-neutral-800 uppercase sm:text-3xl">
            {status}
          </p>

          <span aria-hidden="true" className="mt-5 block h-px w-20 bg-neutral-400" />

          <p className="mt-5 text-sm leading-relaxed text-neutral-600 sm:text-base">
            {description}
          </p>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-200/70 px-4 py-1.5 text-[11px] font-medium tracking-wide text-neutral-500">
            <Lock aria-hidden="true" className="h-3 w-3" />
            Locked — not available in this version
          </p>
        </div>
      </div>
    </Reveal>
  );
}
