import { useState, type FormHTMLAttributes } from "react";
import Inputs from "../Inputs/Inputs";
import Button from "../Button";
import Checkbox from "../Inputs/Checkbox";
import TextArea from "../Inputs/TextArea";
import { useNavigate } from "react-router-dom";

interface RegistroProps extends FormHTMLAttributes<HTMLFormElement> {
  crear?: boolean;
}

export const Genero = ({ crear, ...props }: RegistroProps) => {
  const navigate = useNavigate();
  const titulo = crear ? "Crear Género" : "Modificar Género";

  const [datos, setDatos] = useState({
    nombreItem: undefined,
    tipoItem: [],
    descripcionItem: undefined,
  });

  const [errores, setErrores] = useState({
    nombreItem: true,
    tipoItem: true,
    descripcionItem: true,
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
        `Formulario enviado correctamente. Datos: ${datos.nombreItem}, ${datos.tipoItem}, ${datos.descripcionItem}`,
      );
      navigate("/gestion");
    }
  };
  return (
    <div className="flex justify-center w-full p-4">
      <form className="card-genero" {...props} onSubmit={handleSubmit}>
        <h3 className="titulo-genero">{titulo}</h3>
        <div className="form-body">
          <Inputs
            label="Nombre"
            type="text"
            name="nombreItem"
            placeholder="Ej: Suspense"
          />

          <div className="seccion-tipo">
            <label className="font-normal font-Otros text-sm md:text-base text-black">
              Tipo:
            </label>
            <div className="flex flex-col gap-1 ml-1">
              <Checkbox label="Juego" name="tipoItem" />
              <Checkbox label="Libro" name="tipoItem" />
            </div>
          </div>

          <TextArea
            label="Descripción"
            placeholder="Añada su descripción"
            name="descripcionItem"
          />
        </div>

        <div className="footer-boton">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </div>
  );
};
