import React from "react";

interface CardEstadisticaProps {
  imagen?: string; // URL icon
  numero: number | string;
  texto: string;
}

const CardEstadistica: React.FC<CardEstadisticaProps> = ({
  imagen = "src/assets/img/icons/star.webp",
  numero,
  texto,
}) => {
  return (
    <article
      className="card-estadistica flex flex-col p-4 bg-white dark:bg-primary-900 rounded-sm"
      aria-labelledby={`stat-label-${texto.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <header className="flex justify-between items-start mb-2">
        <span className="text-2xl font-bold animate-aparicion text-primary-950 dark:text-primary-50">
          {numero}
        </span>
        <figure className="bg-primary-50 dark:bg-primary-800 p-2 rounded-lg">
          <img
            src={imagen}
            alt="icono representativo"
            aria-hidden="true"
            className="w-8 h-8 object-contain animate-aparicion-giro"
          />
        </figure>
      </header>
      <footer>
        <label
          className="animate-aparicion"
          id={`stat-label-${texto.replace(/\s+/g, "-").toLowerCase()}`}
        >
          {texto}
        </label>
      </footer>
    </article>
  );
};

export default CardEstadistica;
