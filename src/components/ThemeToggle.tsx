import { useEffect } from "react";

const ThemeToggle = () => {
  useEffect(() => {
    // Force dark mode for the app and persist the choice
    document.documentElement.classList.add("dark");
    try {
      localStorage.setItem("theme", "dark");
    } catch {
      // ignore localStorage errors (e.g., private mode)
    }
  }, []);

  // Render nothing (icon removed)
  return null;
};

export default ThemeToggle;
