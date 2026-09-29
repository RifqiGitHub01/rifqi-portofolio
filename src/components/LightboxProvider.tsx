"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import type { LightboxItem } from "@/lib/lightbox";

export type { LightboxItem };

interface GalleryState {
  items: LightboxItem[];
  index: number;
}

type OpenGallery = (items: LightboxItem[], index?: number) => void;

const LightboxContext = createContext<OpenGallery>(() => {});

/** Opens the shared gallery viewer at a given item of a collection. */
export function useLightbox(): OpenGallery {
  return useContext(LightboxContext);
}

const SWIPE_THRESHOLD = 56;

function LightboxImage({ item }: { item: LightboxItem }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex max-h-[70vh] w-[min(92vw,42rem)] flex-col items-center justify-center gap-3 rounded-xl border border-line bg-sand px-6 py-16 text-center">
        <ImageOff aria-hidden="true" className="h-8 w-8 text-muted-soft" />
        <p className="text-sm text-muted">This image is currently unavailable.</p>
        <p className="font-mono text-xs text-muted-soft">{item.src}</p>
      </div>
    );
  }

  return (
    /* Plain img keeps the original aspect ratio at full size. */
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={item.src}
      alt={item.alt}
      onError={() => setFailed(true)}
      className="max-h-[82vh] max-w-[92vw] rounded-lg object-contain shadow-lift"
    />
  );
}

/**
 * One shared, reusable gallery viewer for every portfolio image
 * (photos, project/experience certificates, certification documents).
 *
 * Closes on backdrop click or ESC; the image itself never closes it.
 * There is deliberately no "X" button. Multi-image collections get
 * previous/next controls, arrow keys and a 1:1 swipe with rubber-banding.
 */
export default function LightboxProvider({ children }: { children: ReactNode }) {
  const [gallery, setGallery] = useState<GalleryState | null>(null);
  const [direction, setDirection] = useState(1);
  const prefersReducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const open = useCallback<OpenGallery>((items, index = 0) => {
    if (items.length === 0) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    setDirection(1);
    setGallery({ items, index: Math.min(index, items.length - 1) });
  }, []);

  const close = useCallback(() => setGallery(null), []);

  const step = useCallback((delta: number) => {
    setGallery((current) => {
      if (!current) return current;
      const next = current.index + delta;
      if (next < 0 || next >= current.items.length) return current;
      setDirection(delta);
      return { ...current, index: next };
    });
  }, []);

  useEffect(() => {
    if (!gallery) return;

    const previousOverflow = document.body.style.overflow;
    const previousScrollY = window.scrollY;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);

    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.scrollTo({ top: previousScrollY, behavior: "instant" });
      restoreFocusRef.current?.focus();
    };
  }, [gallery, close, step]);

  const item = gallery ? gallery.items[gallery.index] : null;
  const count = gallery ? gallery.items.length : 0;
  const navigable = count > 1;

  const surfaceMotion = prefersReducedMotion
    ? { initial: undefined, exit: undefined }
    : {
        initial: { opacity: 0, scale: 0.92, filter: "blur(10px)" },
        exit: { opacity: 0, scale: 0.95, filter: "blur(6px)" },
      };

  const slideVariants = {
    enter: (dir: number) =>
      prefersReducedMotion
        ? { opacity: 0 }
        : { opacity: 0, x: dir * 48, scale: 0.98 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir: number) =>
      prefersReducedMotion
        ? { opacity: 0 }
        : { opacity: 0, x: dir * -48, scale: 0.98 },
  };

  return (
    <LightboxContext.Provider value={open}>
      {children}

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {gallery && item ? (
                <motion.div
                  className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
                  onClick={close}
                  initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
                  />

                  <motion.div
                    ref={dialogRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${item.alt} — image ${gallery.index + 1} of ${count}`}
                    tabIndex={-1}
                    onClick={(event) => event.stopPropagation()}
                    className="relative flex max-h-full max-w-full flex-col items-center justify-center outline-none"
                    {...surfaceMotion}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.15 }
                        : { type: "spring", bounce: 0, duration: 0.4 }
                    }
                  >
                    <div className="relative flex items-center justify-center overflow-hidden">
                      <AnimatePresence
                        initial={false}
                        custom={direction}
                        mode="popLayout"
                      >
                        <motion.div
                          key={gallery.index}
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={
                            prefersReducedMotion
                              ? { duration: 0.15 }
                              : { type: "spring", bounce: 0, duration: 0.35 }
                          }
                          drag={navigable ? "x" : false}
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={0.12}
                          onDragEnd={(_event, info) => {
                            const flick = info.velocity.x;
                            const dragged = info.offset.x;
                            if (
                              (dragged < -SWIPE_THRESHOLD || flick < -500) &&
                              gallery.index < count - 1
                            ) {
                              step(1);
                            } else if (
                              (dragged > SWIPE_THRESHOLD || flick > 500) &&
                              gallery.index > 0
                            ) {
                              step(-1);
                            }
                          }}
                          className="flex cursor-grab items-center justify-center active:cursor-grabbing"
                        >
                          <LightboxImage item={item} />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {navigable ? (
                      <div
                        className="mt-4 flex items-center gap-3"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => step(-1)}
                          disabled={gallery.index === 0}
                          aria-label="Previous image"
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-transform duration-150 active:scale-95 disabled:opacity-30"
                        >
                          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                        </button>

                        <span className="min-w-14 text-center font-mono text-xs tracking-wide text-white/80">
                          {gallery.index + 1} / {count}
                        </span>

                        <button
                          type="button"
                          onClick={() => step(1)}
                          disabled={gallery.index === count - 1}
                          aria-label="Next image"
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-transform duration-150 active:scale-95 disabled:opacity-30"
                        >
                          <ChevronRight aria-hidden="true" className="h-5 w-5" />
                        </button>
                      </div>
                    ) : null}
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </LightboxContext.Provider>
  );
}
