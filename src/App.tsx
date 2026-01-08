import React from "react";
import "./index.css";
import { motion } from "framer-motion";
import ThemeToggle from "./components/ThemeToggle";
import SocialIcons from "./components/SocialIcons";
import NotFound from "./pages/NotFound";
import HeroAndAbout from "./sections/Hero/Hero&About.tsx";
import Projects from "./sections/Projects/Projects";
import ExpertiseAndTools from "./sections/Expertise&Tools/Expertise&Tools.tsx";
import Experience from "./sections/Experience/Experience.tsx";

const App: React.FC = () => {
  return (
    <>
      <ThemeToggle />
      <SocialIcons />
      {/* If the user visits any route other than the root, show the 404 page */}
      {(() => {
        try {
          const rawPath = typeof window !== "undefined" ? window.location.pathname : "/";
          const path = rawPath.replace(/\/+$|^\/+$/g, "") || "/"; // normalize
          if (path !== "/") {
            return <NotFound />;
          }
        } catch (e) {
          // ignore and fall through to normal render
        }
        return null;
      })()}
      <div className="relative min-h-screen overflow-hidden bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        {/* Global soft glows */}
        <motion.div
          className="pointer-events-none absolute left-8 top-8 h-80 w-[320px] rounded-full bg-sky-400/18 blur-[120px] dark:bg-sky-500/14"
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.78, 0.92, 0.78],
            y: [0, 12, 0],
          }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute right-[-8%] top-1/3 h-130 w-130 rounded-full bg-indigo-500/16 blur-[140px] dark:bg-indigo-400/13"
          animate={{
            scale: [1.02, 0.97, 1.02],
            opacity: [0.7, 0.88, 0.7],
            y: [10, -6, 10],
          }}
          transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -bottom-28 left-1/4 h-90 w-90 rounded-full bg-cyan-400/12 blur-[120px] dark:bg-cyan-300/11"
          animate={{
            scale: [0.98, 1.04, 0.98],
            opacity: [0.62, 0.82, 0.62],
            y: [-8, 6, -8],
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          aria-hidden
        />

        {/* Subtle mesh overlay to unify glow */}
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.18] mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(900px at 15% 20%, rgba(56,189,248,0.10), transparent 45%), radial-gradient(820px at 85% 35%, rgba(99,102,241,0.10), transparent 40%), radial-gradient(720px at 40% 80%, rgba(45,212,191,0.08), transparent 42%)",
          }}
          aria-hidden
        />

        <main
          className="relative max-w-240 mx-auto px-4 sm:px-6 lg:px-8"
          style={{ fontFamily: "Inter" }}
        >
          <HeroAndAbout />
          <div className="my-3 sm:my-4 lg:my-5">
            <div className="h-px w-full bg-linear-to-r from-transparent via-slate-300/80 to-transparent dark:via-slate-700/70" />
          </div>
          <Experience />
          <div className="my-3 sm:my-4 lg:my-5">
            <div className="h-px w-full bg-linear-to-r from-transparent via-slate-300/80 to-transparent dark:via-slate-700/70" />
          </div>
          <Projects />
          <div className="my-3 sm:my-4 lg:my-5">
            <div className="h-px w-full bg-linear-to-r from-transparent via-slate-300/80 to-transparent dark:via-slate-700/70" />
          </div>
          <ExpertiseAndTools />
        </main>
      </div>
    </>
  );
};

export default App;
