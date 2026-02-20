import { useState } from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const currentLang = i18n.language;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Cambiar idioma"
      >
        <span className="material-symbols-outlined">g_translate</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
          {/* Opción: Español */}
          <button
            onClick={() => changeLanguage("es")}
            className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-gray-50
              ${currentLang === "es" ? "text-blue-600 font-medium" : "text-gray-700"}
            `}
          >
            <span>Español</span>
            {currentLang === "es" && (
              <span className="material-symbols-outlined">check_small</span>
            )}
          </button>

          {/* Opción: Inglés */}
          <button
            onClick={() => changeLanguage("en")}
            className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-gray-50
              ${currentLang === "en" ? "text-blue-600 font-medium" : "text-gray-700"}
            `}
          >
            <span>English</span>
            {currentLang === "en" && (
              <span className="material-symbols-outlined">check_small</span>
            )}
          </button>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};
