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
      <p className="text-white font-Titulos font-medium text-xl md:text-2xl lg:text-3xl">
        {texto}
      </p>

      <div className="bg-primary-50 dark:bg-primary-900 rounded-[10px] flex items-center justify-center shrink-0 w-6.25 h-personalizado-50 md:w-personalizado-50 md:h-25 lg:w-personalizado-70 lg:h-35">
        <p className="font-bold text-primary-800 dark:text-primary-50 font-Titulos text-2xl md:text-3xl lg:text-4xl">
          {numero}
        </p>
      </div>
    </div>
  );
};

export default CardEstadisticaG;
