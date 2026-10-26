import { useRef, useState } from "react";
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
  link?: string;
}

/* ---------------- Data ---------------- */
export const projects: Project[] = [
  {
    title: "Developer Community Platform",
    role: "Frontend + Firebase Developer",
    description:
      "Scalable community-driven platform built to support laid-off professionals, freshers, and job seekers in discovering new opportunities. The platform enables users to create and manage communities in under 60 seconds, share referrals, job links, and career resources, and collaborate within focused groups. Designed to foster peer support and opportunity sharing, it helps users stay connected, informed, and job-ready during career transitions.",
    tech: ["React", "TypeScript", "Firebase", "Tailwind CSS", "Redux Toolkit"],
    image: Community,
    images: [Community, CommunityGroups],
    link: "https://www.crakcode.in/community",
  },
  {
    title: "Long-Term Mentorship System",
    role: "Frontend + Firebase Developer",
    description:
      "Revenue-generating mentorship system built for CrackCode to help learners move closer to their dream jobs through structured one-on-one mentorship. The platform supports free-trial onboarding, mentor discovery, and guided mentoring flows that enable personalized career guidance, skill development, and focused job preparation. Designed to balance strong user experience with business goals, the system improves mentor engagement while delivering real career impact for learners.",
    tech: ["React", "Firebase", "Framer Motion", "Tailwind CSS"],
    image: Mentorship,
    images: [Mentorship, MentorshipDetails],
    link: "https://www.crakcode.in/mentor-search",
  },
  {
    title: "TaskFlow – Task Management System",
    role: "Full Stack Developer",
    description:
      "Internal Trello-inspired task management system built for CrakCode fellows to track work across clear workflow stages like To Do, In Progress, Blocked, and Resolved. Includes task deadlines with automatic overdue notifications, advanced filtering and sorting for prioritization, and an automated monthly rollover to seamlessly carry forward unfinished tasks. Designed with a focus on clean UI/UX, performance, and team visibility, improving accountability and on-time delivery.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Firebase", "Framer Motion"],
    image: Craktrack,
    images: [Craktrack, CraktrackCreating, CraktrackCreating1],
    link: "https://taskflow.cyou/",
  },
];

const MAX_TAGS = 3;

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [fullImageOpen, setFullImageOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = (index: number) => {
    setActive(index);
    setOpen(true);
  };

  return (
    <section
      id="projects"
      className="px-4 py-16"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          className="text-3xl font-semibold"
          style={{ fontFamily: "Space Grotesk" }}
        >
          Selected work
        </h2>
        <p
          className="mt-2 max-w-xl text-slate-500 dark:text-slate-400"
          style={{ fontFamily: "Space Grotesk" }}
        >
          Products I've built and shipped as a frontend developer.
        </p>

        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, idx) => (
            <li key={p.title}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition-shadow duration-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/30 dark:focus-within:ring-offset-slate-950">
                {/* Image: inset inside the card with its own radius */}
                <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-inset ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10">
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                </div>

                <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
                  <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    {p.role}
                  </p>

                  <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                    {/* Stretched button makes the whole card clickable and keyboard accessible */}
                    <button
                      type="button"
                      onClick={() => openModal(idx)}
                      aria-haspopup="dialog"
                      className="text-left after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
                    >
                      {p.title}
                    </button>
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {p.description}
                  </p>

                  {/* Footer: stack on the left, action on the right */}
                  <div className="mt-auto flex items-end justify-between gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <ul className="flex flex-wrap gap-1.5">
                      {p.tech.slice(0, MAX_TAGS).map((t) => (
                        <li
                          key={t}
                          className="rounded-md border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300"
                        >
                          {t}
                        </li>
                      ))}
                      {p.tech.length > MAX_TAGS && (
                        <li className="px-1 py-0.5 text-xs text-slate-500 dark:text-slate-400">
                          +{p.tech.length - MAX_TAGS} more
                        </li>
                      )}
                    </ul>

                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:bg-white dark:text-slate-900"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="size-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

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
          setSlideIndex={setSlideIndex}
        />
      </div>
    </section>
  );
}
