import React from "react";
import { ArrowLeft, Upload, Star, ChevronDown } from "lucide-react";
import Inputs from "../componentes/Inputs/Inputs";
import Button from "../componentes/Button";
import Checkbox from "../componentes/Inputs/Checkbox";

interface GestionItemProps {
    item?: any;
}

const GestionItem: React.FC<GestionItemProps> = ({ item }) => {
    const mEdicion = !!item;

    const cabeceraGestion = "bg-primary-600 p-3 flex justify-center items-center relative cursor-pointer text-white hover:bg-primary-700 transition-colors";

    return (
        <div className="min-h-screen bg-primary-200 p-4 flex flex-col gap-6">
            <button onClick={() => window.history.back()} className="w-fit">
                <ArrowLeft className="w-8 h-8 text-black cursor-pointer hover:scale-110 transition-transform" />
            </button>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-white rounded-xl p-3 flex items-center justify-between w-full md:w-1/2 shadow-sm min-h-[64px]">
                    <span>IMAGEN</span>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-2 w-14 h-12 hover:bg-gray-50 transition-colors cursor-pointer">
                        <Upload size={16} />
                        <span>Subir</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-3 flex items-center justify-between w-full md:w-1/2 shadow-sm min-h-[64px]">
                    <span>Valoración:</span>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={20} className="text-yellow-400 fill-yellow-400" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <span className="whitespace-nowrap">INFORMACIÓN GENERAL:</span>
                <Inputs />
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className={cabeceraGestion}>
                    <span>Tipo</span>
                    <ChevronDown className="absolute right-4" />
                </div>
                <div className="p-4 flex flex-col md:flex-row gap-4 justify-around">
                    {["Libro", "Juego"].map((tipo) => (
                        <div key={tipo} className="bg-primary-600 rounded-lg p-2 w-full md:w-5/12 flex justify-center">
                            <Checkbox label={tipo} className="text-white" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className={cabeceraGestion}>
                    <span>Genero</span>
                    <ChevronDown className="absolute right-4" />
                </div>

                <div className="p-4 flex flex-col gap-4">
                    {["Suspense", "Miedo"].map((genero) => (
                        <div key={genero} className="flex items-center gap-4 bg-blue-50/50 p-2 rounded-lg">
                            <div className="bg-primary-600 text-white px-8 py-1 rounded-md text-lg min-w-[150px] text-center">
                                {genero}
                            </div>
                            <Checkbox label="Descripción" />
                        </div>
                    ))}
                </div>
            </div>

            <Button variant="primario">
                {mEdicion ? "MODIFICAR" : "AÑADIR"}
            </Button>
        </div>
    );
};

export default GestionItem;