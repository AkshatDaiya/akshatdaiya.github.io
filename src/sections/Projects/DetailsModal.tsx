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
}: DetailsModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= LG_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const enableFancyMotion = isDesktop && !prefersReducedMotion;

  if (!open || active === null) return null;

  const modalImages = projects[active].images ?? [projects[active].image];

  const closeModal = () => {
    setOpen(false);
    setActive(null);
    setFullImageOpen(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
      >
        <motion.div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          initial={enableFancyMotion ? { scale: 0.95 } : false}
          animate={enableFancyMotion ? { scale: 1 } : false}
          exit={enableFancyMotion ? { scale: 0.95 } : undefined}
          className="bg-slate-950 text-white max-w-3xl w-full max-h-[90vh] rounded-xl overflow-hidden flex flex-col"
        >
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

          <img
            src={modalImages[slideIndex]}
            alt=""
            className="h-64 w-full object-cover cursor-zoom-in"
            onClick={() => setFullImageOpen(true)}
          />

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <p className="text-sm">{projects[active].description}</p>
            <div className="flex flex-wrap gap-2">
              {projects[active].tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs bg-white/10 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Full image overlay */}
      {fullImageOpen && (
        <motion.div
          className="fixed inset-0 z-60 bg-black flex items-center justify-center"
          onClick={() => setFullImageOpen(false)}
        >
          <img
            src={modalImages[slideIndex]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
