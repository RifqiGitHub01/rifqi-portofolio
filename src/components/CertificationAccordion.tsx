"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarRange, ChevronDown } from "lucide-react";
import AssetImage from "./AssetImage";
import { toLightboxItems } from "@/lib/lightbox";
import { assetPath, type Certification } from "@/data/portfolio";

function ExpiredStamp() {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="rotate-[-12deg] rounded-md border-4 border-red-800/70 bg-white/10 px-3 py-1 text-base font-black tracking-[0.18em] text-red-800/80 uppercase sm:px-4 sm:text-2xl">
        Expired
      </span>
    </span>
  );
}

function CertificationItem({
  certification,
  isOpen,
  onToggle,
}: {
  certification: Certification;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const buttonId = `certification-button-${certification.id}`;
  const panelId = `certification-panel-${certification.id}`;

  const certificationGallery = toLightboxItems(
    [...certification.images],
    "certificate",
    (_file, index) =>
      `${certification.title} — document ${index + 1} of ${certification.images.length}`,
    assetPath,
  );

  const collapse = prefersReducedMotion
    ? { initial: undefined, animate: undefined, exit: undefined, transition: undefined }
    : {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white/70 shadow-soft transition-colors ${
        isOpen ? "border-accent" : "border-line"
      }`}
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-4 text-left hover:bg-accent-soft/30 sm:px-5"
        >
          <span className="min-w-0">
            <span className="block text-sm font-semibold tracking-tight text-ink sm:text-base">
              {certification.title}
            </span>

            <span className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <CalendarRange aria-hidden="true" className="h-3.5 w-3.5 text-accent-deep" />
                Issued {certification.issued}
              </span>
              <span className="inline-flex items-center gap-1.5">
                Expired {certification.expired}
              </span>
            </span>
          </span>

          <span className="flex shrink-0 items-center gap-2">
            {certification.expiredState ? (
              <span className="rounded-full border border-red-800/30 bg-red-800/5 px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-red-800/80 uppercase">
                Expired
              </span>
            ) : (
              <span className="rounded-full border border-accent bg-accent-soft/70 px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-accent-deep uppercase">
                Valid
              </span>
            )}

            <ChevronDown
              aria-hidden="true"
              className={`h-5 w-5 text-muted transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className="overflow-hidden"
            {...collapse}
          >
            <div className="grid gap-3 border-t border-line-soft p-3 sm:grid-cols-2 sm:p-4">
              {certificationGallery.map((item, index) => (
                <figure key={item.src} className="flex flex-col">
                  <div className="relative aspect-[7/5] overflow-hidden rounded-lg border border-line-soft bg-sand/40">
                    <AssetImage
                      file={certification.images[index]}
                      alt={item.alt}
                      sizes="(max-width: 640px) 90vw, 40vw"
                      gallery={certificationGallery}
                      galleryIndex={index}
                    />
                    {certification.expiredState ? <ExpiredStamp /> : null}
                  </div>
                  <figcaption className="mt-1.5 text-center text-[11px] text-muted-soft">
                    Document {index + 1}
                  </figcaption>
                </figure>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function CertificationAccordion({
  certifications,
}: {
  certifications: Certification[];
}) {
  const [openId, setOpenId] = useState<string | null>(certifications[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-3">
      {certifications.map((certification) => (
        <CertificationItem
          key={certification.id}
          certification={certification}
          isOpen={openId === certification.id}
          onToggle={() =>
            setOpenId((current) => (current === certification.id ? null : certification.id))
          }
        />
      ))}
    </div>
  );
}
