import React from "react";

interface CardEstadisticaTProps {
  numero: number | string;
  texto: string;
}

const CardEstadisticaT: React.FC<CardEstadisticaTProps> = ({
  numero,
  texto,
}) => {
  return (
    <article className="card-estadistica-t flex items-center gap-3">
      <header
        className="flex items-center justify-center bg-primary-400 dark:bg-primary-50 rounded-full font-bold text-xs w-8 h-8 aspect-square leading-none shadow-sm"
        aria-label={`Posición número ${numero}`}
      >
        <span className="hover:scale-110 transition-transform duration-300 select-none">
          {numero}
        </span>
      </header>
      <p
        className="text-primary-900 dark:text-primary-50 transition-all duration-300
                 hover:drop-shadow-[0_2px_0px_rgba(137,147,255,0.4)] cursor-default"
      >
        {texto}
      </p>
    </article>
  );
};

export default CardEstadisticaT;
