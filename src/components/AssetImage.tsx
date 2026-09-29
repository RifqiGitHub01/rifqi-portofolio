"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff, ZoomIn } from "lucide-react";
import { assetPath } from "@/data/portfolio";
import { useLightbox, type LightboxItem } from "./LightboxProvider";

interface AssetImageProps {
  /** File name inside public/assets — no path, no subfolders. */
  file: string;
  alt: string;
  fit?: "contain" | "cover";
  sizes?: string;
  preload?: boolean;
  className?: string;
  /** Ordered collection this image belongs to; enables the gallery viewer. */
  gallery?: LightboxItem[];
  /** This image's position inside `gallery`. */
  galleryIndex?: number;
  /** Renders an empty tile instead of the "Image pending" label (small slots). */
  silentFallback?: boolean;
}

/**
 * Renders a portfolio image from the single public/assets folder.
 * Falls back to a labelled tile when the file has not been added yet,
 * so a missing asset never becomes a broken image icon.
 */
export default function AssetImage({
  file,
  alt,
  fit = "contain",
  sizes = "100vw",
  preload = false,
  className = "",
  gallery,
  galleryIndex = 0,
  silentFallback = false,
}: AssetImageProps) {
  const [missing, setMissing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const openLightbox = useLightbox();

  if (missing) {
    if (silentFallback) {
      return <span aria-hidden="true" className={`block h-full w-full ${className}`} />;
    }

    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-sand px-4 py-6 text-center ${className}`}
      >
        <ImageOff aria-hidden="true" className="h-6 w-6 text-muted-soft" />
        <p className="text-xs leading-snug text-muted">
          Image pending: <span className="font-mono">{file}</span>
        </p>
      </div>
    );
  }

  const zoomable = Boolean(gallery && gallery.length > 0);

  const image = (
    <Image
      src={assetPath(file)}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      onLoad={() => setLoaded(true)}
      onError={() => setMissing(true)}
      className={`${fit === "cover" ? "object-cover" : "object-contain"} ${
        zoomable ? "transition-transform duration-300 group-hover:scale-[1.03]" : ""
      } ${className}`}
    />
  );

  if (!zoomable) return image;

  return (
    <button
      type="button"
      onClick={() => openLightbox(gallery as LightboxItem[], galleryIndex)}
      aria-label={`Enlarge image: ${alt}`}
      disabled={!loaded}
      className={`group absolute inset-0 cursor-zoom-in active:scale-[0.98] ${
        loaded ? "" : "pointer-events-none"
      }`}
    >
      {image}

      <span
        aria-hidden="true"
        className="absolute right-2 bottom-2 flex h-7 w-7 items-center justify-center rounded-full border border-line bg-white/90 text-ink opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <ZoomIn className="h-3.5 w-3.5" />
      </span>
    </button>
  );
}
