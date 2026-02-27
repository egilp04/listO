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
    <div className="card-estadistica-t">
      <div className="flex items-center justify-center bg-primary-400 dark:bg-primary-50 rounded-full font-bold text-xs w-auto h-auto aspect-square leading-none p-[6px] md:p-[8px] lg:p-[10px]">
        <span className="hover:scale-120">{numero}</span>
      </div>
      <p
        className="transition-all duration-300
              hover:hover:drop-shadow-[0_2px_0px_rgba(137,147,255,0.4)]"
      >
        {texto}
      </p>
    </div>
  );
};

export default CardEstadisticaT;
