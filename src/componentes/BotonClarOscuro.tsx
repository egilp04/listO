import { useState, useEffect } from "react";

export const ThemeToggle = () => {
  // 1. Estado inicial
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    // ¿El sistema tiene el modo oscuro?
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light"; // Por defecto
  });

  // 2. Cada vez que 'theme' cambia, actualizamos el DOM y localStorage
  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // 3. Función para alternar
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
