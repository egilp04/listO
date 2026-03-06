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
      className="card-estadistica-g flex flex-col gap-4"
      aria-labelledby={`global-stat-title-${texto.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <header>
        <h3
          id={`global-stat-title-${texto.replace(/\s+/g, "-").toLowerCase()}`}
          className="text-white text-lg font-medium"
        >
          {texto}
        </h3>
      </header>
      <section className="bg-primary-50 dark:bg-primary-950 rounded-[10px] flex items-center justify-center h-full p-4 shadow-inner">
        <h3
          className="font-bold animate-descuelgue text-3xl text-primary-900 dark:text-primary-50"
          aria-live="polite"
        >
          {numero}
        </h3>
      </section>
    </article>
  );
};

export default CardEstadisticaG;
