import type { FormHTMLAttributes, MouseEvent } from "react";
import Inputs from "../Inputs/Inputs";
import Checkbox from "../Inputs/Checkbox";
import Button from "../Button";
import { useNavigate } from 'react-router-dom';

interface RegistroProps extends FormHTMLAttributes<HTMLFormElement> {
  error?: string;
}

export const Registro = ({ error, ...props }: RegistroProps) => {

  const navigate = useNavigate();

const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      console.log("Registro completado, yendo a inicio...");
      navigate('/'); 
  };

  return (
    

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
        <Button onClick = {handleClick}>Registrar</Button>

      </form>
    
  );
};
