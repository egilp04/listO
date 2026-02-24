import React from "react";
import goatFace from "../assets/img/others/meli_cargando.png";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50 dark:bg-primary-1100">
      <div className="relative w-24 h-24 flex items-center justify-center animate-[spin_2s_linear_infinite]">
        <div className="absolute top-0 left-0 w-6 h-6 bg-primary-800 dark:bg-primary-50  rounded-full shadow-lg" />
        <div className="absolute top-0 right-0 w-6 h-6 bg-primary-700 dark:bg-blue-300 rounded-full shadow-lg" />
        <div className="absolute bottom-0 right-0 w-12 h-12 flex items-center justify-center">
          <img
            src={goatFace}
            alt="Goat"
            className="w-full h-full object-contain animate-pulse-scale"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-6 h-6 bg-primary-600 dark:bg-blue-500 rounded-full shadow-lg" />
      </div>

      <p className="mt-8 text-xl font-bold text-primary-1000 animate-pulse dark:text-primary-50">
        Cargando...
      </p>
    </div>
  );
};

export default Loading;
