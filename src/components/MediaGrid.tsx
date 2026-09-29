import ProjectCertificate from "./ProjectCertificate";
import MediaFrame from "./MediaFrame";
import MediaUnavailable from "./MediaUnavailable";
import PhotoGallery from "./PhotoGallery";
import YouTubeEmbed from "./YouTubeEmbed";
import type { CertificateAspect, VideoOrientation } from "@/data/portfolio";

export interface MediaPayload {
  certificate: { file: string; aspect: CertificateAspect } | null;
  images: string[];
  youtubeUrl: string | null;
  videoOrientation: VideoOrientation | null;
}

interface MediaGridProps extends MediaPayload {
  /** Project or experience title, used for alt text and iframe titles. */
  context: string;
  stamp?: string;
}

/**
 * The three visual blocks every project/experience card shows:
 * certificate, photo gallery and video. Blocks are always rendered,
 * even when the underlying media is missing.
 */
export default function MediaGrid({
  context,
  certificate,
  images,
  youtubeUrl,
  videoOrientation,
  stamp,
}: MediaGridProps) {
  return (
    <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
      <MediaFrame label="Certificate">
        <ProjectCertificate certificate={certificate} context={context} stamp={stamp} />
      </MediaFrame>

      <MediaFrame label="Documentation">
        <PhotoGallery images={images} context={context} />
      </MediaFrame>

      <MediaFrame label="Video" className="lg:col-span-2">
        {youtubeUrl && videoOrientation ? (
          <div className="p-2">
            <YouTubeEmbed
              url={youtubeUrl}
              orientation={videoOrientation}
              title={`${context} — video documentation`}
            />
          </div>
        ) : (
          <MediaUnavailable kind="video" />
        )}
      </MediaFrame>
    </div>
  );
}
