import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Languages, Check } from "lucide-react";

const IDIOMAS = [
  { codigo: "es", etiqueta: "Español", bandera: "🇪🇸" },
  { codigo: "en", etiqueta: "English", bandera: "🇬🇧" },
  { codigo: "de", etiqueta: "Deutsch", bandera: "🇩🇪" },
  { codigo: "pt", etiqueta: "Português", bandera: "🇵🇹" },
  { codigo: "zh", etiqueta: "中文", bandera: "🇨🇳" },
  { codigo: "th", etiqueta: "Therian 🐾", bandera: "🐺" },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [abierto, setAbierto] = useState(false);

  const cambiarIdioma = (codigo: string) => {
    i18n.changeLanguage(codigo);
    setAbierto(false);
  };
  const idiomaActual = i18n.language?.split("-")[0] ?? "es";

  const idiomaActualInfo =
    IDIOMAS.find((l) => l.codigo === idiomaActual) ?? IDIOMAS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setAbierto(!abierto)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-950 transition-colors flex items-center gap-1 cursor-pointer"
        aria-label="Cambiar idioma"
        aria-expanded={abierto}
        aria-haspopup="listbox"
      >
        <Languages size={22} className="text-gray-950 dark:text-primary-50" />
        <span className="text-sm hidden sm:inline dark:text-primary-50 font-medium">
          {idiomaActualInfo.bandera}
        </span>
      </button>
      {abierto && (
        <ul
          role="listbox"
          aria-label="Seleccionar idioma"
          className="absolute right-0 mt-2 w-44 bg-white dark:bg-primary-900 rounded-xl shadow-elevation-2 border border-gray-100 dark:border-primary-800 py-1 z-50 overflow-hidden"
        >
          {IDIOMAS.map((idioma) => {
            const esActual = idiomaActual === idioma.codigo;
            return (
              <li key={idioma.codigo} role="option" aria-selected={esActual}>
                <button
                  onClick={() => cambiarIdioma(idioma.codigo)}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors cursor-pointer hover:bg-primary-300 hover:dark:bg-primary-1000

                    ${
                      esActual
                        ? "text-primary-600 dark:text-primary-300 font-semibold bg-primary-50 dark:bg-primary-900"
                        : "text-gray-700 dark:text-primary-100"
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{idioma.bandera}</span>
                    <span>{idioma.etiqueta}</span>
                  </span>
                  {esActual && (
                    <Check
                      size={14}
                      className="text-primary-600 dark:text-primary-300 shrink-0"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {abierto && (
        <div
          className="fixed inset-0 z-40"
          aria-hidden="true"
          onClick={() => setAbierto(false)}
        />
      )}
    </div>
  );
};
