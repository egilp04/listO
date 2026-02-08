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
    <div className="card-estadistica-g">
      <p className="text-white font-Titulos font-medium text-xl md:text-2xl lg:text-3xl">{texto}</p>

      <div className="bg-primary-50 rounded-[10px] flex items-center justify-center shrink-0 w-[25px] h-personalizado-50 md:w-personalizado-50 md:h-[100px] lg:w-personalizado-70 lg:h-[140px]">
        <p className="font-bold text-primary-700 font-Titulos text-2xl md:text-3xl lg:text-4xl">{numero}</p>
      </div>
    </div>
  );
};

export default CardEstadisticaG;
