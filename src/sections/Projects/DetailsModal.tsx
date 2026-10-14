import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect } from "react";
import {
  HiArrowUpRight,
  HiChevronLeft,
  HiChevronRight,
  HiXMark,
} from "react-icons/hi2";
import type { Project } from "./Projects";

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

/* Small reusable arrow button */
function ArrowButton({
  direction,
  onClick,
  className = "",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  const Icon = direction === "prev" ? HiChevronLeft : HiChevronRight;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={direction === "prev" ? "Previous image" : "Next image"}
      className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-white ${
        direction === "prev" ? "left-3" : "right-3"
      } ${className}`}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

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
  const reduceMotion = useReducedMotion();

  const project = active !== null ? projects[active] : null;
  const images = project ? (project.images ?? [project.image]) : [];
  const hasMultiple = images.length > 1;

  const closeModal = useCallback(() => {
    setOpen(false);
    setActive(null);
    setFullImageOpen(false);
  }, [setOpen, setActive, setFullImageOpen]);

  const prevImage = useCallback(
    () => setSlideIndex((s) => (s - 1 + images.length) % images.length),
    [setSlideIndex, images.length],
  );

  const nextImage = useCallback(
    () => setSlideIndex((s) => (s + 1) % images.length),
    [setSlideIndex, images.length],
  );

  /* Start at the first image whenever a different project opens */
  useEffect(() => {
    setSlideIndex(0);
  }, [active, setSlideIndex]);

  /* Lock page scroll while the modal is open */
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    Object.assign(document.body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      left: "0",
      right: "0",
      width: "100%",
    });
    return () => {
      Object.assign(document.body.style, {
        position: "",
        top: "",
        left: "",
        right: "",
        width: "",
      });
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  /* Keyboard: Esc closes (fullscreen first), arrows change image */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        fullImageOpen ? setFullImageOpen(false) : closeModal();
      } else if (hasMultiple && e.key === "ArrowLeft") {
        prevImage();
      } else if (hasMultiple && e.key === "ArrowRight") {
        nextImage();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    open,
    fullImageOpen,
    hasMultiple,
    closeModal,
    setFullImageOpen,
    prevImage,
    nextImage,
  ]);

  const scale = reduceMotion ? 1 : 0.96;

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeModal}
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale }}
            animate={{ scale: 1 }}
            exit={{ scale }}
            transition={{ duration: 0.2 }}
            className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-slate-950 text-white"
          >
            {/* Header */}
            <header className="flex items-start justify-between gap-4 border-b border-white/10 p-4">
              <h3
                id="project-modal-title"
                className="text-lg font-semibold leading-snug"
              >
                {project.title}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="shrink-0 rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <HiXMark className="h-5 w-5" />
              </button>
            </header>

            {/* Gallery */}
            <div className="relative h-64 w-full bg-black">
              <img
                src={images[slideIndex]}
                alt={`${project.title} screenshot ${slideIndex + 1}`}
                className="h-full w-full cursor-zoom-in object-cover"
                onClick={() => setFullImageOpen(true)}
              />
              {hasMultiple && (
                <>
                  <ArrowButton
                    direction="prev"
                    onClick={prevImage}
                  />
                  <ArrowButton
                    direction="next"
                    onClick={nextImage}
                  />
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs text-slate-200">
                    {slideIndex + 1} / {images.length}
                  </span>
                </>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4 overflow-y-auto p-6">
              <p className="text-sm leading-relaxed text-slate-300">
                {project.description}
              </p>

              <ul className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/25 hover:bg-white/5"
                >
                  View live project
                  <HiArrowUpRight className="text-base opacity-80" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Fullscreen image */}
          {fullImageOpen && (
            <motion.div
              key="fullscreen-image"
              className="fixed inset-0 z-60 flex items-center justify-center bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                setFullImageOpen(false);
              }}
            >
              <img
                src={images[slideIndex]}
                alt={`${project.title} screenshot ${slideIndex + 1}`}
                className="max-h-[90vh] max-w-[90vw] object-contain"
                onClick={(e) => e.stopPropagation()}
                draggable={false}
              />
              {hasMultiple && (
                <>
                  <ArrowButton
                    direction="prev"
                    onClick={prevImage}
                    className="left-4 bg-white/10 p-3 hover:bg-white/20"
                  />
                  <ArrowButton
                    direction="next"
                    onClick={nextImage}
                    className="right-4 bg-white/10 p-3 hover:bg-white/20"
                  />
                </>
              )}
              <button
                type="button"
                onClick={() => setFullImageOpen(false)}
                aria-label="Close fullscreen image"
                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              >
                <HiXMark className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
