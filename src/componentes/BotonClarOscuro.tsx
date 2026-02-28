import { useState, useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";

export const ThemeToggle = () => {
  const setTema = useThemeStore((state) => state.setTema);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTema("dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTema("light");
    }
  }, [theme, setTema]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-950 transition-colors"
      aria-label="Cambiar tema"
    >
      {theme === "dark" ? (
        <span className="text-yellow-400 material-symbols-outlined">sunny</span>
      ) : (
        <span className="text-gray-950 material-symbols-outlined">
          moon_stars
        </span>
      )}
    </button>
  );
};
