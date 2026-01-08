import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Community from "../../assets/images/community.png";
import CommunityGroups from "../../assets/images/community_groups_reactjs.png";
import Mentorship from "../../assets/images/mentorship_program.png";
import MentorshipDetails from "../../assets/images/mentorship_details.png";
import Craktrack from "../../assets/images/craktrack.png";
import CraktrackCreating from "../../assets/images/task_creating.png";
import CraktrackCreating1 from "../../assets/images/task_creating1.png";

const projects = [
  {
    title: "Developer Community Platform",
    role: "Frontend Developer",
    description:
      "A scalable community-driven platform allowing developers and job seekers to create and manage communities in under 60 seconds. Focused on performance, accessibility, and mobile-first UX with WhatsApp-level responsiveness.",
    tech: ["React", "TypeScript", "Firebase", "Tailwind CSS", "Redux Toolkit"],
    image: Community,
    images: [Community, CommunityGroups],
  },
  {
    title: "Long-Term Mentorship System",
    role: "Frontend Developer",
    description:
      "Revenue-generating mentorship feature with free trial logic, one-on-one mentoring flows, and Firebase-backed authentication and data handling.",
    tech: ["React", "Firebase", "Framer Motion", "Tailwind CSS"],
    image: Mentorship,
    images: [Mentorship, MentorshipDetails],
  },
  {
    title: "CrakTrack – Task Management System",
    role: "Frontend Developer",
    description:
      "CrakTrack is an internal task management web application built at CrakCode, inspired by Trello-style workflows. It enables teams to manage tasks across multiple states such as To Do, In Progress, Blocked, and Resolved. The system includes advanced filtering and sorting capabilities—search by title or description, filter by task type and priority, and dynamic sorting. It also features automated monthly task migration, where unresolved tasks roll over to the next sprint while resolved tasks remain archived, ensuring clean sprint management and continuity.",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "State Management",
      "Firebase",
      "Framer Motion",
      "Component-Based Architecture",
    ],
    image: Craktrack,
    images: [Craktrack, CraktrackCreating, CraktrackCreating1],
  },
];

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [fullImageOpen, setFullImageOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  /* ---------------- ESC key close ---------------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (fullImageOpen) setFullImageOpen(false);
        else setOpen(false);
      }

      // when full image is open allow left/right navigation
      if (fullImageOpen && active !== null) {
        const imgs = projects[active].images ?? [projects[active].image];
        if (e.key === "ArrowRight") {
          setSlideIndex((s) => (s + 1) % imgs.length);
        }
        if (e.key === "ArrowLeft") {
          setSlideIndex((s) => (s - 1 + imgs.length) % imgs.length);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullImageOpen, active]);

  /* ---------------- Scroll lock (NO layout jump) ---------------- */
  useEffect(() => {
    if (!open) return;

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
  }, [open]);

  /* ---------------- Focus trap ---------------- */
  useEffect(() => {
    if (!open || !modalRef.current) return;
    modalRef.current.focus();
  }, [open]);

  const openModal = (index: number) => {
    setActive(index);
    setOpen(true);
    setFullImageOpen(false);
    setSlideIndex(0);
  };

  const closeModal = () => {
    setOpen(false);
    setActive(null);
    setFullImageOpen(false);
  };

  // images to show inside modal / full-image overlay for the active project
  const modalImages =
    active !== null
      ? (projects as any)[active].images ?? [(projects as any)[active].image]
      : [];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Projects
          </p>
          <h2 className="mt-2 text-3xl font-semibold">Selected work</h2>
          <p className="mt-3 max-w-2xl text-slate-500">
            A few projects highlighting how I think about UX, performance, and
            implementation detail.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, idx) => (
            <article
              key={p.title}
              role="button"
              tabIndex={0}
              onClick={() => openModal(idx)}
              onKeyDown={(e) => e.key === "Enter" && openModal(idx)}
              className="group cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950/5 dark:bg-slate-900/70 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-4/3 relative">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-linear-to-t from-black/80 to-transparent">
                  <h3 className="font-semibold">{p.title}</h3>

                  {/* hidden details that slide up from bottom on hover */}
                  <div className="overflow-hidden">
                    <div className="transform-gpu translate-y-3 opacity-0 max-h-0 overflow-hidden group-hover:translate-y-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300">
                      <p className="text-xs text-slate-300 mt-1">{p.role}</p>
                      <p className="mt-1 text-xs text-slate-100">
                        {p.description.length > 120
                          ? p.description.slice(0, 120) + "..."
                          : p.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {open && active !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              {/* darker backdrop to reduce brightness */}
              <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

              <motion.div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="relative z-10 max-w-3xl w-full bg-slate-950 text-slate-50 rounded-xl shadow-2xl overflow-hidden overscroll-contain"
              >
                <div className="flex justify-between items-center p-4">
                  <h3 className="text-lg font-semibold">
                    {projects[active].title}
                  </h3>
                  <button
                    onClick={closeModal}
                    aria-label="Close modal"
                    className="p-2 rounded-md hover:bg-white/5"
                  >
                    ✕
                  </button>
                </div>

                {/* carousel inside modal (shows current slide) */}
                <div className="relative h-64 w-full bg-slate-800 flex items-center justify-center">
                  {modalImages.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSlideIndex(
                          (s) =>
                            (s - 1 + modalImages.length) % modalImages.length
                        );
                      }}
                      aria-label="Previous image"
                      className="absolute left-3 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/60"
                    >
                      ‹
                    </button>
                  )}

                  <img
                    src={modalImages[slideIndex]}
                    alt={projects[active].title}
                    onClick={() => setFullImageOpen(true)}
                    className="h-64 w-full object-cover cursor-zoom-in"
                  />

                  {modalImages.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSlideIndex((s) => (s + 1) % modalImages.length);
                      }}
                      aria-label="Next image"
                      className="absolute right-3 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/60"
                    >
                      ›
                    </button>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <p className="uppercase text-xs text-slate-400">
                    {projects[active].role}
                  </p>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {projects[active].description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {projects[active].tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          {/* Full image overlay (covers modal details) */}
          {fullImageOpen && active !== null && (
            <div
              className="fixed inset-0 z-60 flex items-center justify-center bg-black/95 px-4"
              onClick={() => setFullImageOpen(false)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFullImageOpen(false);
                }}
                aria-label="Close full image"
                className="absolute top-6 right-6 z-50 p-2 rounded-md text-slate-100 bg-white/5"
              >
                ✕
              </button>

              <div className="relative flex items-center justify-center w-full">
                {modalImages.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSlideIndex(
                        (s) => (s - 1 + modalImages.length) % modalImages.length
                      );
                    }}
                    aria-label="Previous full image"
                    className="absolute left-4 z-50 p-2 rounded-full bg-white/5 text-white hover:bg-white/10"
                  >
                    ‹
                  </button>
                )}

                <img
                  src={modalImages[slideIndex]}
                  alt={projects[active].title}
                  onClick={(e) => e.stopPropagation()}
                  className="max-h-[90vh] max-w-[90vw] object-contain rounded"
                />

                {modalImages.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSlideIndex((s) => (s + 1) % modalImages.length);
                    }}
                    aria-label="Next full image"
                    className="absolute right-4 z-50 p-2 rounded-full bg-white/5 text-white hover:bg-white/10"
                  >
                    ›
                  </button>
                )}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
