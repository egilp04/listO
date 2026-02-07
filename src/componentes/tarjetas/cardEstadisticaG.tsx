import React from 'react';

interface CardEstadisticaGProps {
    numero: number | string;
    texto: string;
}

const CardEstadisticaG: React.FC<CardEstadisticaGProps> = ({ numero, texto }) => {
    return (
        <div className="card-estadistica-g">

            <h3 className="text-white">{texto}</h3>

            <div className="bg-primary-50 rounded-[10px] flex items-center justify-center shrink-0 w-[25px] h-personalizado-50 md:w-personalizado-50 md:h-[100px] lg:w-personalizado-70 lg:h-[140px]">
                <h2 className="font-bold">{numero}</h2>
            </div>
        </div>
    );
};

export default CardEstadisticaG;