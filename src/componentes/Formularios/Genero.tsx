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
    nombreItem: "",
    tipoItem: [] as number[],
    descripcionItem: "",
  });

  const [errores, setErrores] = useState({
    nombreItem: true,
    tipoItem: false,
    descripcionItem: true,
  });

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const nombre = e.currentTarget.name;
    const valor = e.currentTarget.value;
    if (e.currentTarget.type === "checkbox") {
      const { checked } = e.currentTarget as HTMLInputElement;
      const idVal = parseInt(e.currentTarget.value);
      setDatos((prev) => {
        const valoresTipoItem = checked
          ? [...prev.tipoItem, idVal]
          : prev.tipoItem.filter((id) => id !== idVal);

        const datosNuevos = { ...prev, [nombre]: valoresTipoItem };
        if (valoresTipoItem.length <= 0) manejarErrores(nombre, true);
        return datosNuevos;
      });
    } else {
      setDatos((prev) => ({ ...prev, [nombre]: valor }));
    }
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
            manejarCambio={manejarCambio}
            manejarError={manejarErrores}
            error="Nombre del género incorrecto, debe comenzar con mayúsculas"
            regex={/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)+$/}
          />

          <div className="seccion-tipo">
            <label className="font-normal font-Otros text-sm md:text-base text-black">
              Tipo:
            </label>
            <div className="flex flex-col gap-1 ml-1">
              <Checkbox
                manejarCambio={manejarCambio}
                manejarError={manejarErrores}
                label="Juego"
                name="tipoItem"
                value={1}
              />
              <Checkbox
                manejarCambio={manejarCambio}
                manejarError={manejarErrores}
                label="Libro"
                name="tipoItem"
                value={2}
              />
            </div>
            {errores.tipoItem == true && (
              <span className="text-red-500">
                Debe seleccionar al menos un tipo
              </span>
            )}
          </div>

          <TextArea
            manejarError={manejarErrores}
            manejarCambio={manejarCambio}
            mensajeError="Debes escribir una descripción"
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
