const projects = [
  {
    title: "Portfolio Website",
    role: "Design & Development",
    description:
      "A fast, responsive personal portfolio built with React, TypeScript, and modern UI patterns.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Dashboard UI",
    role: "Frontend Developer",
    description:
      "Analytics dashboard with clean data visualisation, dark mode support, and reusable component system.",
    tech: ["React", "Recharts", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Landing Page Concept",
    role: "UI / UX & Build",
    description:
      "Hero-focused marketing page with smooth scroll, section transitions, and conversion-focused layout.",
    tech: ["React", "Framer Motion", "Figma"],
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Projects() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-slate-400">
            Projects
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Selected work
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground/80 max-w-2xl dark:text-slate-300">
            A few projects that highlight how I think about interfaces, user
            experience, and implementation detail.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid gap-6 sm:gap-7 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-slate-950/5 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70"
            >
              <div className="aspect-4/3 relative overflow-hidden">
                {/* Project image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Global darken on hover */}
                <div className="pointer-events-none absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/50 transition-colors duration-300" />

                {/* Bottom overlay: title always, details on hover */}
                <div className="absolute inset-x-0 bottom-0 text-white">
                  <div className="px-4 sm:px-5 pb-3 sm:pb-4 pt-8 bg-linear-to-t from-black/85 via-black/65 to-transparent">
                    <h3 className="text-base sm:text-lg font-semibold leading-snug">
                      {project.title}
                    </h3>

                    <div className="mt-1 space-y-1 text-[11px] sm:text-xs text-slate-200/90 opacity-0 translate-y-1 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:translate-y-0 group-hover:max-h-40 transition-all duration-300">
                      <p className="uppercase tracking-[0.18em] text-slate-300">
                        {project.role}
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-100/90">
                        {project.description}
                      </p>
                      <div className="pt-1 flex flex-wrap gap-1.5">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] sm:text-[11px] font-medium text-slate-50 border border-white/15"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
