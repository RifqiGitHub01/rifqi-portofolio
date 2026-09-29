import { Play, Wrench } from "lucide-react";
import { YOUTUBE_PLACEHOLDER } from "@/data/portfolio";
import type { VideoOrientation } from "@/data/portfolio";

interface YouTubeEmbedProps {
  url: string;
  orientation: VideoOrientation;
  /** Accessible title for the iframe, e.g. the project title. */
  title: string;
}

/** Accepts watch / youtu.be / shorts / embed links, or a bare video id. */
function resolveVideoId(url: string): string | null {
  const value = url.trim();
  if (!value) return null;

  if (/^[\w-]{11}$/.test(value)) return value;

  try {
    const parsed = new URL(value.startsWith("http") ? value : `https://${value}`);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      return /^[\w-]{11}$/.test(id) ? id : null;
    }

    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const fromQuery = parsed.searchParams.get("v");
      if (fromQuery && /^[\w-]{11}$/.test(fromQuery)) return fromQuery;

      const segments = parsed.pathname.split("/").filter(Boolean);
      const markerIndex = segments.findIndex((s) => s === "embed" || s === "shorts" || s === "live");
      const id = markerIndex >= 0 ? segments[markerIndex + 1] : segments[1];
      return id && /^[\w-]{11}$/.test(id) ? id : null;
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Renders a YouTube player, or a clean development placeholder while the URL
 * is still "paste_youtube_url_here". Vertical videos keep a 9:16 frame.
 */
export default function YouTubeEmbed({ url, orientation, title }: YouTubeEmbedProps) {
  const isPlaceholder = url.trim() === YOUTUBE_PLACEHOLDER;
  const videoId = isPlaceholder ? null : resolveVideoId(url);

  const vertical = orientation === "vertical";
  const frameClass = vertical ? "aspect-[9/16] max-h-[34rem]" : "aspect-video";

  if (isPlaceholder || !videoId) {
    const invalid = !isPlaceholder;

    return (
      <div
        className={`flex flex-1 flex-col items-center justify-center gap-3 bg-ink/[0.03] px-6 py-12 text-center ${
          vertical ? "min-h-[22rem]" : "min-h-[13rem]"
        }`}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-muted">
          {invalid ? (
            <Wrench aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Play aria-hidden="true" className="h-5 w-5" />
          )}
        </span>

        <div>
          <p className="text-sm font-medium text-ink-soft">
            {invalid ? "YouTube link not recognised" : "Video not connected yet"}
          </p>
          <p className="mx-auto mt-1 max-w-xs text-xs leading-relaxed text-muted">
            {invalid
              ? "Check the youtubeUrl value for this entry in src/data/portfolio.ts."
              : `Replace "${YOUTUBE_PLACEHOLDER}" in src/data/portfolio.ts with the YouTube URL to enable the player.`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${frameClass} ${vertical ? "mx-auto max-w-[19rem]" : ""}`}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0 bg-ink"
      />
    </div>
  );
}
