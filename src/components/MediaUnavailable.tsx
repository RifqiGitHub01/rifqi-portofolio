import { FileQuestion, VideoOff } from "lucide-react";

interface MediaUnavailableProps {
  kind: "document" | "video";
  /** Keeps the frame height stable across cards. */
  className?: string;
}

const COPY = {
  document: { text: "No document available", Icon: FileQuestion },
  video: { text: "No video available", Icon: VideoOff },
} as const;

/**
 * Placeholder for media that does not exist in the portfolio data.
 * The surrounding frame is always kept so the layout stays consistent.
 */
export default function MediaUnavailable({ kind, className = "" }: MediaUnavailableProps) {
  const { text, Icon } = COPY[kind];

  return (
    <div
      className={`flex flex-1 flex-col items-center justify-center gap-2 bg-sand/40 px-4 py-10 text-center ${className}`}
    >
      <Icon aria-hidden="true" className="h-7 w-7 text-muted-soft" />
      <p className="text-sm text-muted">{text}</p>
    </div>
  );
}
