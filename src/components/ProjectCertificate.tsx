import AssetImage from "./AssetImage";
import MediaUnavailable from "./MediaUnavailable";
import { toLightboxItems } from "@/lib/lightbox";
import { assetPath, type CertificateAspect } from "@/data/portfolio";

const ASPECT_CLASS: Record<CertificateAspect, string> = {
  "7:5": "aspect-[7/5]",
  "16:9": "aspect-video",
};

interface CertificateProps {
  certificate: { file: string; aspect: CertificateAspect } | null;
  /** Used to build meaningful alt text, e.g. a project title. */
  context: string;
  /** Optional stamp overlaid on the preview, e.g. "EXPIRED". */
  stamp?: string;
  sizes?: string;
}

/**
 * Certificate preview that keeps its natural aspect ratio.
 * Renders a "No document available" state when none was issued.
 */
export default function ProjectCertificate({
  certificate,
  context,
  stamp,
  sizes = "(max-width: 768px) 90vw, 42vw",
}: CertificateProps) {
  if (!certificate) {
    return <MediaUnavailable kind="document" />;
  }

  const gallery = toLightboxItems(
    [certificate.file],
    "certificate",
    () => `Certificate for ${context}`,
    assetPath,
  );

  return (
    <div className="p-2">
      <div
        className={`relative overflow-hidden rounded-lg border border-line-soft bg-sand/40 ${
          ASPECT_CLASS[certificate.aspect]
        }`}
      >
        <AssetImage
          file={certificate.file}
          alt={`Certificate for ${context}`}
          sizes={sizes}
          gallery={gallery}
          galleryIndex={0}
        />

        {stamp ? (
          <span
            aria-label={`${context}: ${stamp}`}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="rotate-[-12deg] rounded-md border-4 border-red-800/70 bg-white/10 px-4 py-1 text-lg font-black uppercase tracking-[0.2em] text-red-800/80 sm:text-2xl">
              {stamp}
            </span>
          </span>
        ) : null}
      </div>
    </div>
  );
}
