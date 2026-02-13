import { useState, type FormHTMLAttributes } from "react";
import Inputs from "../Inputs/Inputs";
import Checkbox from "../Inputs/Checkbox";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

export const Registro = ({ ...props }: FormHTMLAttributes<HTMLFormElement>) => {
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    fecha_nac: "",
    passwd: "",
    rep_passwd: "",
  });

  const [errores, setErrores] = useState({
    nombre: true,
    apellidos: true,
    email: true,
    fecha_nac: true,
    passwd: true,
    rep_passwd: true,
  });

  const manejarCambios = (e) => {
    setDatos((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const manejarErrores = (nombre: string, error: boolean) => {
    setErrores((prev) => {
      return { ...prev, [nombre]: error };
    });
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tieneErrores = Object.values(errores).some((error) => error == true);
    if (tieneErrores) {
      alert("Algunos de los campos tienen errores, reviselos");
    } else {
      alert(
        `Formulario enviado correctamente. Datos: ${datos.nombre}, ${datos.apellidos}, ${datos.email}, ${datos.fecha_nac}`,
      );
      navigate("/");
    }
  };

  return (
    <form className="card-registro" {...props} onSubmit={handleSubmit}>
      <h2>Registro</h2>

      <div className="grid-registro">
        <Inputs
          label="Nombre"
          type="text"
          placeholder="Ej: Eve"
          name="nombre"
        />
        <Inputs
          label="Apellidos"
          type="text"
          placeholder="Ej: Ceballos Mateos"
          name="apellidos"
        />
        <Inputs
          label="Fecha Nacimiento"
          type="text"
          placeholder="Ej: 12/12/2000"
          name="fecha_nac"
        />
        <Inputs
          label="Email"
          type="email"
          placeholder="Ej: eve@gmail.com"
          name="email"
        />
        <Inputs
          label="Contraseña"
          type="password"
          placeholder="********"
          name="passwd"
        />
        <Inputs
          label="Confirmar Contraseña"
          type="password"
          placeholder="********"
          name="rep_passwd"
        />
      </div>

      <Checkbox label="Aceptar políticas" name="politicas" />
      <Button type="submit">Registrar</Button>
    </form>
  );
};
