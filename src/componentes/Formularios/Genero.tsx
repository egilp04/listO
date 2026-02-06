import type { FormHTMLAttributes } from "react";
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

            <form className="card-registro" {...props}>
                <h2>{titulo}</h2>
                <Inputs label ="nombre" type="text" name="nombre_item" placeholder="Ej:Suspense"></Inputs>
                <div className="">
                  <h3>Tipo:</h3>
                  <Checkbox label="Juego"></Checkbox>
                  <Checkbox label="Libro"></Checkbox>
                </div>
                <TextArea label="Descripción" placeholder="Añada su descripción"></TextArea>

                <Button size="lg">Guardar</Button>

                {error && <p className="span-error mt-1 h-4">{error}</p>}

            </form>
        </div>
    );
};
