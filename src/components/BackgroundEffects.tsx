import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const LG_BREAKPOINT = 1024; // Tailwind lg

export default function BackgroundEffects() {
  const prefersReducedMotion = useReducedMotion();
  const [enableAnimation, setEnableAnimation] = useState(false);

  // Enable animations only on large screens
  useEffect(() => {
    const checkScreen = () => {
      setEnableAnimation(window.innerWidth >= LG_BREAKPOINT);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // 🚫 No animations on mobile OR if user prefers reduced motion
  if (!enableAnimation || prefersReducedMotion) {
    return (
      <>
        {/* Lightweight static background for mobile */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            background:
              "radial-gradient(600px at 20% 15%, rgba(56,189,248,0.10), transparent 45%), radial-gradient(600px at 80% 30%, rgba(99,102,241,0.10), transparent 45%), radial-gradient(600px at 50% 80%, rgba(45,212,191,0.08), transparent 45%)",
          }}
          aria-hidden
        />
      </>
    );
  }

  // ✅ Full animated version (desktop only)
  return (
    <>
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
    </>
  );
}
