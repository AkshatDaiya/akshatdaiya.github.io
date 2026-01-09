import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import profileImage from "../assets/images/Akshat_Daiya.png";

const HeroAndAbout = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Keep hero content aligned by moving both columns together.
  const sharedY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Background parallax shapes */}
      <motion.div
        style={{ scale: glowScale, y: sharedY }}
        className="pointer-events-none absolute -left-32 -top-24 h-64 w-64 rounded-full bg-sky-400/25 blur-3xl dark:bg-sky-500/15"
        aria-hidden
      />
      <motion.div
        style={{ scale: glowScale, y: sharedY }}
        className="pointer-events-none absolute -right-20 top-24 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl dark:bg-indigo-400/15"
        aria-hidden
      />

      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row gap-10 sm:gap-12 lg:gap-14 items-center lg:items-center justify-center">
        {/* Text Content */}
        <motion.div
          style={{ y: sharedY }}
          className="flex-1 space-y-5 text-center lg:text-left"
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Hi, I'm Akshat.
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-3 sm:mt-4 text-base sm:text-xl md:text-2xl lg:text-3xl font-medium leading-snug text-muted-foreground"
          >
            a frontend developer focused on building fast, scalable, and
            meaningful web experiences.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
            className="mt-4 sm:mt-6 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground/80"
          >
            From community-driven platforms to performance-optimised interfaces,
            I craft products that are intuitive, accessible, and built to scale.
            When I'm not coding, I'm refining UI details or exploring better
            ways to improve user experience. Let's build something impactful
            together.
          </motion.p>
        </motion.div>

        {/* Image with parallax hover */}
        <motion.div
          style={{ y: sharedY }}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative w-48 h-60 sm:w-64 sm:h-80 md:w-72 md:h-90 lg:w-87.5 lg:h-112.5 shrink-0 overflow-hidden rounded-2xl border border-slate-200/70 shadow-[0_22px_60px_-38px_rgba(15,23,42,0.55)] dark:border-slate-800/70 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.8)]"
        >
          <motion.div
            className="absolute inset-0 bg-linear-to-br from-white/10 via-sky-100/8 to-transparent dark:from-white/5 dark:via-slate-900/20 dark:to-transparent"
            animate={{ opacity: [0.75, 0.95, 0.75] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.img
            src={profileImage}
            alt="Akshat Daiya"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 180, damping: 12 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroAndAbout;
