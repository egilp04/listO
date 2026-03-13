import { useState, type FormHTMLAttributes } from "react";
import Inputs from "../Inputs/Inputs";
import Button from "../Button";
import Checkbox from "../Inputs/Checkbox";
import TextArea from "../Inputs/TextArea";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import type { infoInterface } from "../../interfaces/infoInterface";
import { useNotificationStore } from "../../store/useNotificationStore";
import { useTranslation } from "react-i18next";

interface RegistroProps extends FormHTMLAttributes<HTMLFormElement> {
  crear?: boolean;
  item: infoInterface;
}

export const Genero = ({ crear, item, ...props }: RegistroProps) => {
  const { t } = useTranslation();
  const setNotificacion = useNotificationStore(
    (state) => state.setNotificacion,
  );
  const navigate = useNavigate();
  const titulo = crear
    ? t("formGenero.tituloCrear")
    : t("formGenero.tituloModificar");

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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tieneErrores = Object.values(errores).some((error) => error == true);
    if (tieneErrores) {
      setNotificacion(t("formGenero.notifErrorCampos"), "error");
    } else {
      if (crear) await crearGenero();
      else await modificarGenero();
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
        setNotificacion(t("formGenero.notifGeneroExiste"), "error");
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
      setNotificacion(t("formGenero.notifCreado"), "exito");
      navigate("/gestion");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al crear el género:", error.message);
      } else {
        console.error("Ocurrió un error inesperado:", error);
      }
      setNotificacion(t("formGenero.notifErrorCrear"), "error");
    }
  };

  const modificarGenero = async () => {
    if (item == null) {
      setNotificacion(t("formGenero.notifSinElemento"), "error");
      return;
    }
    try {
      const { error: updateError } = await supabase
        .from("genero")
        .update({
          nombre: datos.nombreItem,
          descripcion: datos.descripcionItem,
        })
        .eq("id_genero", item.id_genero);
      if (updateError) throw updateError;
      setNotificacion(t("formGenero.notifModificado"), "exito");
      navigate("/gestion");
    } catch (error) {
      console.error("Error al modificar el género:");
      if (error && typeof error === "object" && "message" in error) {
        console.error("Detalle BD:", error.message);
      }
      setNotificacion(t("formGenero.notifErrorModificar"), "error");
    }
  };

  return (
    <section
      className="flex justify-center w-full p-4"
      aria-labelledby="form-genero-title"
    >
      <form className="form-genero" {...props} onSubmit={handleSubmit}>
        <header className="mb-6">
          <h2 id="form-genero-title" className="text-center">
            {titulo}
          </h2>
        </header>
        <div className="form-body flex flex-col gap-6">
          <Inputs
            label={t("formGenero.labelNombre")}
            type="text"
            name="nombreItem"
            placeholder={t("formGenero.placeholderNombre")}
            manejarCambio={manejarCambio}
            manejarError={manejarErrores}
            error={t("formGenero.errorNombre")}
            regex={/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/}
            defaultValue={item != null ? item?.nombre : ""}
          />

          <fieldset className="seccion-tipo border-none p-0 m-0">
            <legend className="font-Otros dark:text-primary-50 mb-2 font-bold">
              {t("formGenero.legendTipo")}
            </legend>

            <div
              className="flex flex-col gap-1 ml-1 items-start"
              role="group"
              aria-describedby="error-tipo"
            >
              <Checkbox
                manejarCambio={manejarCambio}
                label={t("formGenero.checkboxJuego")}
                name="tipoItem"
                value={"videojuego"}
                checked={item?.tipo?.nombre.includes("videojuego")}
              />
              <Checkbox
                manejarCambio={manejarCambio}
                label={t("formGenero.checkboxLibro")}
                name="tipoItem"
                value={"libro"}
                checked={item?.tipo?.nombre.includes("libro")}
              />
            </div>

            {errores.tipoItem === true && (
              <span
                id="error-tipo"
                className="text-red-700 dark:text-red-100 text-sm mt-1"
                role="alert"
              >
                {t("formGenero.errorTipo")}
              </span>
            )}
          </fieldset>
          <TextArea
            manejarError={manejarErrores}
            manejarCambio={manejarCambio}
            mensajeError={t("formGenero.errorDescripcion")}
            label={t("formGenero.labelDescripcion")}
            placeholder={t("formGenero.placeholderDescripcion")}
            name="descripcionItem"
            defaultValue={item != null ? item.descripcion : ""}
          />
        </div>
        <footer className="footer-boton mt-8">
          <Button type="submit" className="w-full">
            {t("formGenero.botonGuardar")}
          </Button>
        </footer>
      </form>
    </section>
  );
};
