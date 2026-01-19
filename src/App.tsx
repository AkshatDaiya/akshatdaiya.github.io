import React from "react";
import "./index.css";
import ThemeToggle from "./components/ThemeToggle";
import SocialIcons from "./components/SocialIcons";
import NotFound from "./pages/NotFound.tsx";
import HeroAndAbout from "./sections/Hero/Hero&About.tsx";
import Projects from "./sections/Projects/Projects";
import ExpertiseAndTools from "./sections/Expertise&Tools/Expertise&Tools.tsx";
import Experience from "./sections/Experience/Experience.tsx";
import BackgroundEffects from "./components/BackgroundEffects";

const App: React.FC = () => {
  return (
    <>
      <ThemeToggle />
      <SocialIcons />
      {/* If the user visits any route other than the root, show the 404 page */}
      {(() => {
        try {
          const rawPath =
            typeof window !== "undefined" ? window.location.pathname : "/";
          const path = rawPath.replace(/\/+$|^\/+$/g, "") || "/"; // normalize
          if (path !== "/") {
            return <NotFound />;
          }
        } catch (e) {
          // ignore and fall through to normal rendering
        }
        return null;
      })()}
      <div className="relative min-h-screen overflow-hidden bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <BackgroundEffects />

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
