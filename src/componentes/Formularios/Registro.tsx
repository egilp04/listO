import type { FormHTMLAttributes } from "react";
import Inputs from "../Inputs/Inputs";
import Checkbox from "../Inputs/Checkbox";
import Button from "../Button";

interface RegistroProps extends FormHTMLAttributes<HTMLFormElement> {
  error?: string;
}

export const Registro = ({ error, ...props }: RegistroProps) => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-50 p-4">

      <form className="card-registro" {...props}>
        <h2>Registro</h2>

        <div className="grid-registro">
          <Inputs label="Nombre" type="text" placeholder="Ej: Eve" name="nombre" />
          <Inputs label="Apellidos" type="text" placeholder="Ej: Ceballos Mateos" name="apellidos" />
          <Inputs label="Fecha Nacimiento" type="text" placeholder="Ej: 12/12/2000" name="fecha_nac" />
          <Inputs label="Email" type="email" placeholder="Ej: eve@gmail.com" name="email" />
          <Inputs label="Contraseña" type="password" placeholder="********" name="passwd" />
          <Inputs label="Confirmar Contraseña" type="password" placeholder="********" name="repit_passwd" />
        </div>

        <Checkbox label="Aceptar políticas" name="politicas" />
        <Button>Registrar</Button>

      </form>
    </div>
  );
};
