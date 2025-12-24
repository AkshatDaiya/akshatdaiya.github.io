import React from "react";
import { motion } from "framer-motion";

const NotFound: React.FC = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl text-center"
      >
        <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          404
        </h1>
        <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
          Oops — the page you are looking for doesn’t exist.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow hover:bg-primary/90"
          >
            Go back home
          </a>

          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow hover:bg-card/95"
          >
            Contact
          </a>
        </div>
      </motion.div>
    </main>
  );
};

export default NotFound;
