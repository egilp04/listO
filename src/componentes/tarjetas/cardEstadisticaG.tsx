import React from 'react';

interface CardEstadisticaGProps {
    numero: number | string;
    texto: string;
}

const CardEstadisticaG: React.FC<CardEstadisticaGProps> = ({ numero, texto }) => {
    return (
        <div className="card-estadistica-g">

            <h3 className="text-white">{texto}</h3>

            <div className="bg-primary-50 rounded-[10px] flex items-center justify-center shrink-0 w-[25px] h-[50px] md:w-[50px] md:h-[100px] lg:w-[70px] lg:h-[140px]">
                <h2 className="font-bold">{numero}</h2>
            </div>
        </div>
    );
};

export default CardEstadisticaG;