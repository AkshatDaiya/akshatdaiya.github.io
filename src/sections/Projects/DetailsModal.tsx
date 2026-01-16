import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Project } from "./Projects";

/* ---------------- Props ---------------- */
interface DetailsModalProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  active: number | null;
  setActive: (v: number | null) => void;
  projects: Project[];
  modalRef: React.RefObject<HTMLDivElement | null>;
  fullImageOpen: boolean;
  setFullImageOpen: (v: boolean) => void;
  slideIndex: number;
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface DetailsModalProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  active: number | null;
  setActive: (v: number | null) => void;
  projects: Project[];
  modalRef: React.RefObject<HTMLDivElement | null>;
  fullImageOpen: boolean;
  setFullImageOpen: (v: boolean) => void;
  slideIndex: number;
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
}

const LG_BREAKPOINT = 1024;

export default function DetailsModal({
  open,
  setOpen,
  active,
  setActive,
  projects,
  modalRef,
  fullImageOpen,
  setFullImageOpen,
  slideIndex,
  setSlideIndex,
}: DetailsModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= LG_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ---------------- Scroll Lock (modal + fullscreen) ---------------- */
  useEffect(() => {
    if (!open && !fullImageOpen) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollY);
    };
  }, [open, fullImageOpen]);

  const enableFancyMotion = isDesktop && !prefersReducedMotion;

  if (!open || active === null) return null;

  const modalImages = projects[active].images ?? [projects[active].image];
  const hasMultipleImages = modalImages.length > 1;

  const closeModal = () => {
    setOpen(false);
    setActive(null);
    setFullImageOpen(false);
  };

  const prevImage = () =>
    setSlideIndex((s) => (s - 1 + modalImages.length) % modalImages.length);

  const nextImage = () => setSlideIndex((s) => (s + 1) % modalImages.length);

  return (
    <AnimatePresence>
      {/* ---------------- MAIN MODAL ---------------- */}
      <motion.div
        key="project-modal"
        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
      >
        <motion.div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          initial={enableFancyMotion ? { scale: 0.95 } : undefined}
          animate={enableFancyMotion ? { scale: 1 } : undefined}
          exit={enableFancyMotion ? { scale: 0.95 } : undefined}
          className="relative bg-slate-950 text-white max-w-3xl w-full max-h-[90vh] rounded-xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold leading-snug">
              {projects[active].title}
            </h3>
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="shrink-0 rounded-full p-2 text-slate-300 hover:text-white hover:bg-white/10"
            >
              ✕
            </button>
          </div>

          {/* Image with arrows */}
          <div className="relative h-64 w-full bg-black">
            {hasMultipleImages && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60"
              >
                ‹
              </button>
            )}

            <img
              src={modalImages[slideIndex]}
              alt=""
              className="h-full w-full object-cover cursor-zoom-in"
              onClick={() => setFullImageOpen(true)}
            />

            {hasMultipleImages && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60"
              >
                ›
              </button>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <p className="text-sm">{projects[active].description}</p>
            <div className="flex flex-wrap gap-2">
              {projects[active].tech.map((t, idx) => (
                <span
                  key={`${t}-${idx}`}
                  className="px-3 py-1 text-xs bg-white/10 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ---------------- FULL SCREEN VIEWER ---------------- */}
      {fullImageOpen && (
        <motion.div
          key="full-image-viewer"
          className="fixed inset-0 z-60 bg-black flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setFullImageOpen(false)}
        >
          {hasMultipleImages && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20"
            >
              ‹
            </button>
          )}

          <img
            src={modalImages[slideIndex]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {hasMultipleImages && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20"
            >
              ›
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
