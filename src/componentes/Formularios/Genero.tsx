import { useState, type FormHTMLAttributes } from "react";
import Inputs from "../Inputs/Inputs";
import Button from "../Button";
import Checkbox from "../Inputs/Checkbox";
import TextArea from "../Inputs/TextArea";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import type { infoInterface } from "../../interfaces/infoInterface";

interface RegistroProps extends FormHTMLAttributes<HTMLFormElement> {
  crear?: boolean;
  item: infoInterface;
}

export const Genero = ({ crear, item, ...props }: RegistroProps) => {
  console.log("item", item);

  const navigate = useNavigate();
  const titulo = crear ? "Crear Género" : "Modificar Género";

  const [datos, setDatos] = useState({
    nombreItem: item?.nombre || "",
    tipoItem: item?.tipo?.nombre
      ? [item.tipo.nombre.toLowerCase()]
      : ([] as string[]),
    descripcionItem: item?.descripcion || "",
  });

  const [errores, setErrores] = useState({
    nombreItem: crear ? true : false,
    tipoItem: crear ? true : false,
    descripcionItem: crear ? true : false,
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
      if (error instanceof Error) {
        console.error("Error al crear el género:", error.message);
      } else {
        console.error("Ocurrió un error inesperado:", error);
      }
      alert("No se pudo guardar el género.");
    }
  };

  const modificarGenero = async () => {
    console.log("estoy en la funcion de modificacion");
    if (item == null) {
      alert("Acción no permitida, no hay elemento");
      return;
    }
    console.log("item en modificar ", item);
    try {
      const { error: deleteError } = await supabase
        .from("genero")
        .delete()
        .eq("id_genero", item.id_genero);

      if (deleteError) throw deleteError;

      const datosModificados = {
        nombre: datos.nombreItem,
        descripcion: datos.descripcionItem,
        id_tipo: item.tipo?.id_tipo,
      };

      console.log("datos a modificar", datosModificados);

      const { error: insertError } = await supabase
        .from("genero")
        .insert(datosModificados);

      if (insertError) throw insertError;

      alert("Género modificado correctamente");
      navigate("/gestion");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al crear el género:", error.message);
      } else {
        console.error("Ocurrió un error inesperado:", error);
      }
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
            defaultValue={item != null ? item?.nombre : ""}
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
                checked={item?.tipo?.nombre.includes("videojuego")}
              />
              <Checkbox
                manejarCambio={manejarCambio}
                label="Libro"
                name="tipoItem"
                value={"libro"}
                checked={item?.tipo?.nombre.includes("libro")}
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
            defaultValue={item != null ? item.descripcion : ""}
          />
        </div>

        <div className="footer-boton">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </div>
  );
};
