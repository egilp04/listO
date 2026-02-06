import React from 'react';

interface CardEstadisticaProps {
    imagen: string; // URL icon
    numero: number | string;
    texto: string;
}

const CardEstadistica: React.FC<CardEstadisticaProps> = ({ imagen, numero, texto }) => {
    return (
        <div className="card-estadistica">
            <div className="flex justify-between items-start mb-2">
                <h2 className="bg-primary-100 rounded-lg px-3 py-1">{numero}</h2>
                <div className="bg-primary-50 p-2 rounded-lg">
                    <img src={imagen} alt="icon" className="w-8 h-8 object-contain" />
                </div>
            </div>
            <h3>{texto}</h3>
        </div>
    );
};

export default CardEstadistica;