import type { FormHTMLAttributes, MouseEvent } from "react";
import Inputs from "../Inputs/Inputs";
import Button from "../Button";
import Checkbox from "../Inputs/Checkbox";
import TextArea from "../Inputs/TextArea";
import { useNavigate } from "react-router-dom";

interface RegistroProps extends FormHTMLAttributes<HTMLFormElement> {
    error?: string;
    crear?: boolean
}

export const Genero = ({ error, crear, ...props }: RegistroProps) => {

    const navigate = useNavigate();
    const titulo = crear ? "Crear Género" : "Modificar Género";

    const handleNavigation = (e: MouseEvent) => {
        e.preventDefault();
        navigate('/gestion');
    };

    return (

        <div className="flex justify-center w-full p-4">

            <form className="card-genero" {...props}>
                
                <h3 className="titulo-genero">{titulo}</h3>

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

                <div className="footer-boton">
                    <Button type="button" onClick={handleNavigation}>
                        Guardar
                    </Button>
                </div>

                {error && <p className="span-error mt-1 h-4">{error}</p>}

            </form>
        </div>
    );
};