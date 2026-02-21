import React from "react";

interface CardEstadisticaProps {
  imagen: string; // URL icon
  numero: number | string;
  texto: string;
}

const CardEstadistica: React.FC<CardEstadisticaProps> = ({
  imagen,
  numero,
  texto,
}) => {
  return (
    <div className="card-estadistica">
      <div className="flex justify-between items-start mb-2">
        <p className="bg-primary-300 dark:bg-primary-100 rounded-lg px-3 py-1 text-primary-850 font-Titulos font-medium text-2xl md:text-3xl lg:text-4xl">
          {numero}
        </p>
        <div className="bg-primary-50 p-2 rounded-lg">
          <img src={imagen} alt="icon" className="w-8 h-8 object-contain" />
        </div>
      </div>
      <p className="text-primary-800 dark:text-primary-50 font-Titulos font-medium text-xl md:text-2xl lg:text-3xl">
        {texto}
      </p>
    </div>
  );
};

export default CardEstadistica;
