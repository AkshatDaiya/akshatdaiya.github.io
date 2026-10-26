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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
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
            className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 text-slate-900 shadow-2xl shadow-slate-900/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:shadow-black/50"
          >
            {/* Gallery: inset with its own radius, same as the card image */}
            <div className="relative h-64 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-inset ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:h-80">
              <img
                src={images[slideIndex]}
                alt={`${project.title} screenshot ${slideIndex + 1}`}
                className="h-full w-full cursor-zoom-in object-cover object-top"
                onClick={() => setFullImageOpen(true)}
              />

              {/* Close button floats on the image */}
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="absolute right-3 top-3 rounded-full bg-slate-900/70 p-2 text-white backdrop-blur transition hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <HiXMark className="h-5 w-5" />
              </button>

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
                  <span className="absolute bottom-3 right-3 rounded-full bg-slate-900/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                    {slideIndex + 1} / {images.length}
                  </span>
                </>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 pt-5 sm:px-5">
              {project.role && (
                <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  {project.role}
                </p>
              )}

              <h3
                id="project-modal-title"
                className="mt-1.5 text-xl font-semibold leading-snug tracking-tight"
              >
                {project.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {project.description}
              </p>

              {/* Footer: stack on the left, action on the right */}
              <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                <ul className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-md border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300"
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
                    className="group/link inline-flex items-center gap-2 rounded-full bg-slate-900 py-1.5 pl-4 pr-2 text-sm font-medium text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900"
                  >
                    View live project
                    <span
                      aria-hidden="true"
                      className="flex size-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 dark:bg-slate-900/10"
                    >
                      <HiArrowUpRight className="text-sm" />
                    </span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Fullscreen image */}
          {fullImageOpen && (
            <motion.div
              key="fullscreen-image"
              className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950"
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
                className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain ring-1 ring-white/10"
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
                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
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
