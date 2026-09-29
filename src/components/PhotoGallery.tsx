import { assetPath } from "@/data/portfolio";
import AssetImage from "./AssetImage";
import MediaUnavailable from "./MediaUnavailable";
import { toLightboxItems } from "@/lib/lightbox";

interface PhotoGalleryProps {
  images: string[];
  /** Used to build meaningful alt text, e.g. a project title. */
  context: string;
  columns?: string;
}

/** Documentation photo grid. Keeps the frame intact when no photos exist. */
export default function PhotoGallery({
  images,
  context,
  columns = "grid-cols-2 sm:grid-cols-3",
}: PhotoGalleryProps) {
  if (images.length === 0) {
    return <MediaUnavailable kind="document" />;
  }

  const altFor = (file: string, index: number) =>
    `${context} — documentation photo ${index + 1} of ${images.length}`;

  const gallery = toLightboxItems(images, "photo", altFor, assetPath);

  return (
    <div className={`grid gap-2 p-2 ${columns}`}>
      {gallery.map((item, index) => (
        <div
          key={item.src}
          className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line-soft bg-sand/40"
        >
          <AssetImage
            file={images[index]}
            alt={item.alt}
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 20vw"
            gallery={gallery}
            galleryIndex={index}
          />
        </div>
      ))}
    </div>
  );
}
