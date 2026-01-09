const expertise = [
  "Architecting scalable React applications for real-world, high-traffic use cases",
  "Designing mobile-first, accessible interfaces with strong UX fundamentals",
  "Building community-driven platforms focused on performance and reliability",
  "Developing revenue-impacting features such as long-term mentorship systems",
  "Continuously optimising frontend performance and user experience",
];

const tools = [
  "React.js, JavaScript (ES6+), TypeScript",
  "Redux Toolkit, Context API, React Router",
  "Tailwind CSS, Bootstrap, Framer Motion",
  "MERN (MongoDB, Express, React, Node.js)",
  "Firebase (Auth, Firestore, Cloud Functions, Storage)",
  "Git, GitHub, Vercel, Netlify, Postman, Chrome DevTools",
];

export default function ExpertiseAndTools() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white via-slate-50/60 to-slate-100/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16 max-w-3xl">
          <p className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-slate-400">
            Expertise & Tools
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            How I build & what I use
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            A focused overview of my frontend expertise and the tools I rely on
            to build fast, scalable, and user-first web applications.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Expertise */}
          <div className="group relative rounded-2xl border border-slate-200/70 bg-white/80 p-7 sm:p-8 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800/70 dark:bg-slate-900/80">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">
              Expertise
            </h3>

            <ul className="mt-6 space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-200">
              {expertise.map((item) => (
                <li key={item} className="grid grid-cols-[18px_1fr] items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500 self-center" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="group relative rounded-2xl border border-slate-200/70 bg-white/80 p-7 sm:p-8 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800/70 dark:bg-slate-900/80">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">
              Tools & software
            </h3>

            <ul className="mt-6 space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-200">
              {tools.map((item) => (
                <li key={item} className="grid grid-cols-[18px_1fr] items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500 self-center" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
