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
        <span>{numero}</span>
      </div>
      <p>{texto}</p>
    </div>
  );
};

export default CardEstadisticaT;
