import { Globe } from "lucide-react";
import type { ContactLink } from "@/data/portfolio";

interface BrandIconProps {
  icon: ContactLink["icon"];
  className?: string;
}

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/**
 * Hand-drawn inline marks for the four contact channels.
 * The icon library in use ships no brand logos, and no third-party
 * assets are downloaded, so the glyphs are kept simple and self-contained.
 */
export default function BrandIcon({ icon, className = "h-5 w-5" }: BrandIconProps) {
  if (icon === "globe") {
    return <Globe aria-hidden="true" className={className} />;
  }

  if (icon === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...STROKE}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="1.05" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...STROKE}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
        <path d="M8 10.8v5.7" />
        <path d="M8 7.9v.1" />
        <path d="M12 16.5v-5.7" />
        <path d="M12 13.3c0-1.5 1-2.6 2.4-2.6s2.4 1.1 2.4 2.7v3.1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...STROKE}>
      <path d="M20.4 11.6c0 4.6-3.8 8.4-8.4 8.4-1.5 0-2.9-.4-4.1-1.1l-4.4 1.6 1.7-4.3a8.2 8.2 0 0 1-1.5-4.6c0-4.6 3.8-8.4 8.4-8.4s8.3 3.8 8.3 8.4Z" />
      <path d="M9.1 8.7c-.3.5-.2 1.2.2 1.9.5.9 1.3 1.7 2.3 2.2.7.4 1.4.5 1.9.3l.4-.3.6 1.4-.4.4c-.4.4-1 .5-1.6.4-1-.2-2.1-.8-3.1-1.8s-1.6-2.1-1.8-3.1c-.1-.6 0-1.2.4-1.6l.4-.4Z" />
    </svg>
  );
}
