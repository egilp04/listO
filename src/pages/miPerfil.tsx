import { Link } from 'react-router-dom';
import Navbar from '../componentes/Navbar';
import Button from '../componentes/Button';
import Inputs from '../componentes/Inputs/Inputs';

const MiPerfil = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar usuario="${usuario}" estaLogueado={true} />

            <div className="w-full px-4 py-4 md:px-8">
                <Link to="/" className="inline-flex items-center text-black hover:text-primary-600 transition-colors">
                    <span className="material-symbols-outlined text-4xl">
                        arrow_back
                    </span>
                </Link>
            </div>

            <div className="flex-grow w-full max-w-4xl mx-auto px-4 pb-8">

                <div className="space-y-6">
                    {/* Tarjeta Nombre */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
                        <div className="w-full md:w-1/3">
                            <label>Nombre</label>
                        </div>
                        <div className="w-full md:w-2/3">
                            <Inputs label="" placeholder="Maria" name="nombre" />
                        </div>
                    </div>

                    {/* Tarjeta Email */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
                        <div className="w-full md:w-1/3">
                            <label>Email</label>
                        </div>
                        <div className="w-full md:w-2/3">
                            <Inputs label="" placeholder="listOdaw@gmail.com" name="email" type="email" />
                        </div>
                    </div>

                    {/* Tarjeta Fecha Nacimiento */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
                        <div className="w-full md:w-1/3">
                            <label>Fecha Nacimiento</label>
                        </div>
                        <div className="w-full md:w-2/3">
                            <Inputs label="" placeholder="00/00/0000" name="fechaNacimiento" type="date" />
                        </div>
                    </div>

                    {/* Botón Modificar */}
                    <div className="flex justify-center mt-8">
                        <div className="w-full md:w-1/3">
                            <Button variant="primario" className="w-full py-4 text-xl">
                                Modificar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiPerfil;
