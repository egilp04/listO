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
    <div className="card-estadistica">
      <div className="flex justify-between items-start mb-2">
        <h3 className="animate-aparicion">{numero}</h3>
        <div className="bg-primary-50 p-2 rounded-lg">
          <img
            src={imagen}
            alt="icon"
            className="w-8 h-8 object-contain animate-aparicion-giro"
          />
        </div>
      </div>
      <h3 className="animate-aparicion">{texto}</h3>
    </div>
  );
};

export default CardEstadistica;
