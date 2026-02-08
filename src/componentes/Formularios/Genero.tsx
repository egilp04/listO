import type { FormHTMLAttributes } from "react";
import { ArrowLeft } from "lucide-react";
import Inputs from "../Inputs/Inputs";
import Button from "../Button";
import Checkbox from "../Inputs/Checkbox";
import TextArea from "../Inputs/TextArea";

interface RegistroProps extends FormHTMLAttributes<HTMLFormElement> {
    error?: string;
    crear?: boolean
}

export const Genero = ({ error, crear, ...props }: RegistroProps) => {

    const titulo = crear ? "Crear Género" : "Modificar Género";

    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-gray-50 p-4">

            <form className="card-genero" {...props}>
                
                {/* 1. CABECERA */}
                <div className="header-genero">
                    <button 
                        type="button" 
                        className="btn-atras-genero" 
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft size={24} /> {/* Icono un poco más pequeño para h3 */}
                    </button>
                    
                    {/* Usamos h3 y la clase titulo-genero solo lo centra */}
                    <h3 className="titulo-genero">{titulo}</h3>
                </div>

                {/* 2. CUERPO DEL FORMULARIO (Inputs) */}
                <div className="form-body">
                    <Inputs label="Nombre" type="text" name="nombre_item" placeholder="Ej: Suspense" />
                    
                    <div className="seccion-tipo">
                        <label className="font-normal font-Otros text-sm md:text-base text-black">
                            Tipo:
                        </label>
                        <div className="flex flex-col gap-1 ml-1">
                            <Checkbox label="Juego" />
                            <Checkbox label="Libro" />
                        </div>
                    </div>
                    
                    <TextArea label="Descripción" placeholder="Añada su descripción" />
                </div>

                {/* 3. FOOTER DEL BOTÓN */}
                {/* Al poner flex justify-center, el botón no se estira, usa su tamaño por defecto */}
                <div className="footer-boton">
                    <Button>Guardar</Button>
                </div>

                {error && <p className="span-error mt-1 h-4">{error}</p>}

            </form>
        </div>
    );
};