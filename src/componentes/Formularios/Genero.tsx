import { useState, type FormHTMLAttributes } from "react";
import Inputs from "../Inputs/Inputs";
import Button from "../Button";
import Checkbox from "../Inputs/Checkbox";
import TextArea from "../Inputs/TextArea";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";

interface RegistroProps extends FormHTMLAttributes<HTMLFormElement> {
  crear?: boolean;
}

export const Genero = ({ crear, ...props }: RegistroProps) => {
  const navigate = useNavigate();
  const titulo = crear ? "Crear Género" : "Modificar Género";

  const [datos, setDatos] = useState({
    nombreItem: "",
    tipoItem: [] as string[],
    descripcionItem: "",
  });

  const [errores, setErrores] = useState({
    nombreItem: true,
    tipoItem: true,
    descripcionItem: true,
  });

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const nombre = e.target.name;
    const valor = e.target.value;
    if (e.target.type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      const idVal = e.target.value;
      setDatos((prev) => {
        const valoresTipoItem = checked
          ? [...prev.tipoItem, idVal]
          : prev.tipoItem.filter((id) => id !== idVal);
        const datosNuevos = { ...prev, [nombre]: valoresTipoItem };
        if (valoresTipoItem.length === 0) manejarErrores(nombre, true);
        else manejarErrores(nombre, false);
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
      if (crear) crearGenero();
      else modificarGenero();
    }
  };

  const crearGenero = async () => {
    try {
      console.log("Tipos seleccionados:", datos.tipoItem);
      const { data: existente, error: queryError } = await supabase
        .from("genero")
        .select("nombre")
        .eq("nombre", datos.nombreItem);

      if (queryError) throw queryError;

      if (existente && existente.length > 0) {
        alert("Ya existe un género con este nombre");
        return;
      }
      const { data: tiposItemBd, error: tipoError } = await supabase
        .from("tipo")
        .select("*");
      if (tipoError) throw tipoError;

      const nuevasFilas = datos.tipoItem.map((nombreTipoSeleccionado) => {
        const tipoItemEncontrar = tiposItemBd.find(
          (t) =>
            t.nombre.toLowerCase() === nombreTipoSeleccionado.toLowerCase(),
        );
        if (!tipoItemEncontrar) {
          throw new Error(`Tipo no encontrado: ${nombreTipoSeleccionado}`);
        }
        return {
          nombre: datos.nombreItem,
          descripcion: datos.descripcionItem,
          id_tipo: tipoItemEncontrar.id_tipo,
        };
      });

      const { error: insertError } = await supabase
        .from("genero")
        .insert(nuevasFilas);

      if (insertError) throw insertError;

      alert("Género creado correctamente");
      navigate("/gestion");
    } catch (error) {
      console.error("Error al crear el género:", error.message);
      alert("No se pudo guardar la configuración.");
    }
  };

  const modificarGenero = async () => {
    try {
      const { error: deleteError } = await supabase
        .from("genero")
        .delete()
        .eq("nombre", datos.nombreItem);

      if (deleteError) throw deleteError;

      const { data: tiposItemBd, error: tipoError } = await supabase
        .from("tipo")
        .select("*");
      console.log("tipos base datos", tiposItemBd);
      if (tipoError) throw tipoError;

      const nuevasFilas = datos.tipoItem.map((nombreTipoSeleccionado) => {
        const tipoItemEncontrar = tiposItemBd.find(
          (t) =>
            t.nombre.toLowerCase() === nombreTipoSeleccionado.toLowerCase(),
        );
        console.log("tipo encontrado", tipoItemEncontrar);

        if (!tipoItemEncontrar) {
          throw new Error(`Tipo no encontrado: ${nombreTipoSeleccionado}`);
        }
        return {
          nombre: datos.nombreItem,
          descripcion: datos.descripcionItem,
          id_tipo: tipoItemEncontrar.id_tipo,
        };
      });

      const { error: insertError } = await supabase
        .from("genero")
        .insert(nuevasFilas);

      if (insertError) throw insertError;

      alert("Género modificado correctamente");
      navigate("/gestion");
    } catch (error) {
      console.error("Error al modificar el género:", error.message);
      alert("El nuevo género no se pudo guardar.");
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
            regex={/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/}
          />

          <div className="seccion-tipo">
            <label className="font-normal font-Otros text-sm md:text-base text-black">
              Tipo:
            </label>
            <div className="flex flex-col gap-1 ml-1">
              <Checkbox
                manejarCambio={manejarCambio}
                label="Juego"
                name="tipoItem"
                value={"videojuego"}
              />
              <Checkbox
                manejarCambio={manejarCambio}
                label="Libro"
                name="tipoItem"
                value={"libro"}
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
