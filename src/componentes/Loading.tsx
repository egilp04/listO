import React from "react";
import goatFace from "../assets/img/others/meli_cargando.png";
import "../styles/Loading.css";

const Loading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-primary-200">
            <div className="relative w-24 h-24 flex items-center justify-center animate-[spin_3s_linear_infinite]">
                {/* Bola 1 arriba izq */}
                <div className="absolute top-0 left-0 w-6 h-6 bg-blue-500 rounded-full shadow-lg" />

                {/* Bola 2  arriba derch */}
                <div className="absolute top-0 right-0 w-6 h-6 bg-blue-400 rounded-full shadow-lg" />

                {/* Bola 3  abajo derech (Cara de meli) */}
                <div className="absolute bottom-0 right-0 w-12 h-12 flex items-center justify-center">
                    <img
                        src={goatFace}
                        alt="Goat"
                        className="w-full h-full object-contain animate-pulse-scale"
                    />
                </div>

                {/* Bola 4  abajo izq */}
                <div className="absolute bottom-0 left-0 w-6 h-6 bg-blue-600 rounded-full shadow-lg" />
            </div>

            <p className="mt-8 text-xl font-bold text-gray-700 animate-pulse">
                Cargando...
            </p>
        </div>
    );
};

export default Loading;
