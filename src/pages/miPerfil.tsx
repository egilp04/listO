import { Link } from 'react-router-dom';
import Button from '../componentes/Button';
import Inputs from '../componentes/Inputs/Inputs';

const MiPerfil = () => {
    return (
        // 1. APERTURA DEL CONTENEDOR PRINCIPAL
        <div className="min-h-screen bg-gray-50 flex flex-col">

            {/* Cabecera con botón atrás */}
            <div className="w-full px-4 py-4 md:px-8">
                <Link to="/" className="inline-flex items-center text-black hover:text-primary-600 transition-colors">
                    <span className="material-symbols-outlined text-4xl">
                        arrow_back
                    </span>
                </Link>
            </div>

            {/* Contenedor del formulario (centrado) */}
            <div className="flex-grow w-full max-w-4xl mx-auto px-4 pb-8">

                <div className="space-y-6">
                    {/* Tarjeta del Nombre */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
                        <div className="w-full md:w-1/3">
                            <label className="font-medium text-gray-700">Nombre</label>
                        </div>
                        <div className="w-full md:w-2/3">
                            <Inputs label="" placeholder="Maria" name="nombre" />
                        </div>
                    </div>

                    {/* Tarjeta del Email */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
                        <div className="w-full md:w-1/3">
                            <label className="font-medium text-gray-700">Email</label>
                        </div>
                        <div className="w-full md:w-2/3">
                            <Inputs label="" placeholder="listOdaw@gmail.com" name="email" type="email" />
                        </div>
                    </div>

                    {/* Tarjeta Fecha Nacimiento */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
                        <div className="w-full md:w-1/3">
                            <label className="font-medium text-gray-700">Fecha Nacimiento</label>
                        </div>
                        <div className="w-full md:w-2/3">
                            <Inputs label="" placeholder="00/00/0000" name="fechaNacimiento" type="date" />
                        </div>
                    </div>

                    {/* Botón de Modificar */}
                    <div className="flex justify-center mt-12">
                        <div className="w-full md:w-1/3">
                            {/* He añadido onClick como ejemplo, adáptalo a tu componente Button */}
                            <Button className="w-full py-3 text-lg">
                                Modificar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div> // 2. CIERRE DEL CONTENEDOR PRINCIPAL
    );
};

export default MiPerfil;