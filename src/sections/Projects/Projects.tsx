import { useState, useEffect, useRef } from "react";
import Community from "../../assets/images/community.webp";
import CommunityGroups from "../../assets/images/community_groups_reactjs.webp";
import Mentorship from "../../assets/images/mentorship_program.webp";
import MentorshipDetails from "../../assets/images/mentorship_details.webp";
import Craktrack from "../../assets/images/craktrack.webp";
import CraktrackCreating from "../../assets/images/task_creating.webp";
import CraktrackCreating1 from "../../assets/images/task_creating1.webp";
import DetailsModal from "./DetailsModal";

/* ---------------- Types ---------------- */
export interface Project {
  title: string;
  role: string;
  description: string;
  tech: string[];
  image: string;
  images?: string[];
}

/* ---------------- Data (UNCHANGED) ---------------- */
export const projects: Project[] = [
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
      "CrakTrack is an internal task management web application built at CrakCode, inspired by Trello-style workflows. It enables teams to manage tasks across multiple states such as To Do, In Progress, Blocked, and Resolved...",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "State Management",
      "Firebase",
      "Framer Motion",
    ],
    image: Craktrack,
    images: [Craktrack, CraktrackCreating, CraktrackCreating1],
  },
];

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [fullImageOpen, setFullImageOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  /* ESC handling (UNCHANGED) */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        fullImageOpen ? setFullImageOpen(false) : setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullImageOpen]);

  const openModal = (index: number) => {
    setActive(index);
    setOpen(true);
    setSlideIndex(0);
    setFullImageOpen(false);
  };

  /* ---------------- UI BELOW IS UNCHANGED ---------------- */
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
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

        <DetailsModal
          open={open}
          setOpen={setOpen}
          active={active}
          setActive={setActive}
          projects={projects}
          modalRef={modalRef}
          fullImageOpen={fullImageOpen}
          setFullImageOpen={setFullImageOpen}
          slideIndex={slideIndex}
        />
      </div>
    </section>
  );
}
