import React from "react";

interface CardEstadisticaGProps {
  numero: number | string;
  texto: string;
}

const CardEstadisticaG: React.FC<CardEstadisticaGProps> = ({
  numero,
  texto,
}) => {
  return (
    <article
      className="card-estadistica-g flex flex-row gap-2"
      aria-labelledby={`global-stat-title-${texto.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <header>
        <label
          className="text-primary-50"
          id={`global-stat-title-${texto.replace(/\s+/g, "-").toLowerCase()}`}
        >
          {texto}
        </label>
      </header>
      <section className="bg-primary-50 dark:bg-primary-950 flex justify-center h-full p-4 rounded-sm">
        <span className="text-lg md:text-2xl font-bold animate-aparicion text-primary-950 dark:text-primary-50">
          {numero}
        </span>
      </section>
    </article>
  );
};

export default CardEstadisticaG;
