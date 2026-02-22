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
      <h3 className="text-white">{texto}</h3>
      <div className="bg-primary-50 dark:bg-primary-950 rounded-[10px] flex items-center justify-center  h-full p-4">
        <h3 className="font-bold ">{numero}</h3>
      </div>
    </div>
  );
};

export default CardEstadisticaG;
