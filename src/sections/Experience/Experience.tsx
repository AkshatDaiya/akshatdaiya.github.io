const experiences = [
  {
    role: "Frontend Developer",
    company: "CrakCode",
    type: "Full-time",
    period: "Jun 2024 – Present",
    location: "Remote",
    highlights: [
      "Architected and optimized a scalable community-driven platform enabling users to create new communities in under 60 seconds with WhatsApp-level performance standards",
      "Designed and implemented mobile-first, accessible UI/UX with a strong focus on performance, responsiveness, and cross-device compatibility",
      "Led development of the Long-Term Mentorship feature, including free trials and one-on-one mentoring flows, driving direct revenue impact",
      "Continuously improved frontend performance and Firebase integrations to enhance application reliability and user experience",
    ],
    tech: [
      "React",
      "TypeScript",
      "Firebase",
      "Tailwind CSS",
      "Redux Toolkit",
      "Framer Motion",
    ],
  },
  {
    role: "Full Stack (MERN) Developer Intern",
    company: "Global IT Providers",
    type: "Internship",
    period: "Mar 2023 – Jul 2023",
    location: "Jaipur, India",
    highlights: [
      "Developed full-stack MERN applications including shopping carts, user management systems, and parking systems",
      "Implemented end-to-end solutions covering frontend interfaces, backend APIs, and database design",
      "Collaborated with cross-functional teams to design, develop, and test scalable web applications",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JavaScript"],
  },
  {
    role: "Frontend Developer",
    company: "Personal & Community Projects",
    type: "Self-initiated",
    period: "Ongoing",
    location: "India",
    highlights: [
      "Building performance-focused, mobile-first web applications using modern React and Next.js patterns",
      "Experimenting with animations, component architectures, and scalable design systems",
      "Refining portfolio projects with a strong emphasis on accessibility, responsiveness, and clean code practices",
    ],
    tech: ["Next.js", "React", "Firebase", "Tailwind CSS", "Git"],
  },
];

export default function Experience() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white to-slate-50/60 dark:from-slate-950 dark:to-slate-900/70">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-slate-400">
            Experience
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            What I&apos;ve been working on
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground/80 max-w-2xl">
            From internships to personal projects, here’s a quick overview of
            the roles and work that have shaped how I design and build
            interfaces.
          </p>
        </div>

        {/* Clean stacked resume cards */}
        <div className="space-y-4 sm:space-y-5">
          {experiences.map((item) => (
            <article
              key={item.role + item.company}
              className="relative overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_12px_40px_-24px_rgba(15,23,42,0.35)] transition-transform hover:-translate-y-0.5 dark:border-slate-800/80 dark:bg-slate-900/80 dark:shadow-[0_16px_46px_-26px_rgba(15,23,42,0.7)]"
            >
              <div className="relative p-5 sm:p-6 flex flex-col gap-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      {item.company}
                    </p>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 leading-snug dark:text-slate-50">
                      {item.role}
                    </h3>
                  </div>
                  <span className="rounded-full bg-slate-900 text-white px-3 py-1 text-[11px] sm:text-xs font-semibold shadow-sm dark:bg-slate-100 dark:text-slate-900">
                    {item.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-300">
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {item.period}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span>{item.location}</span>
                </div>

                <ul className="mt-2 space-y-2.5">
                  {item.highlights.map((point) => (
                    <li
                      key={point}
                      className="border-l-2 border-slate-200 dark:border-slate-700 pl-3 text-sm sm:text-base text-slate-600 dark:text-slate-200 leading-relaxed transition-colors hover:border-slate-400 dark:hover:border-slate-500"
                    >
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {item.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] sm:text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
