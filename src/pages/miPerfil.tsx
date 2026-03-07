import { useLocation } from "react-router-dom";
import Button from "../componentes/Button";
import Inputs from "../componentes/Inputs/Inputs";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNotificationStore } from "../store/useNotificationStore";
import { useTranslation } from "react-i18next";

const MiPerfil = () => {
  const { t } = useTranslation();
  const setNotificacion = useNotificationStore(
    (state) => state.setNotificacion,
  );
  const { state } = useLocation();
  const { user: usuarioLogueado, setUser } = useAuthStore();
  const usuarioReferencia = state?.item || usuarioLogueado;

  const [datos, setDatos] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    fech_nac: "",
  });

  const [errores, setErrores] = useState({
    nombre: false,
    apellidos: false,
    email: false,
    fech_nac: false,
  });

  useEffect(() => {
    if (usuarioReferencia) {
      setDatos({
        nombre: usuarioReferencia.nombre || "",
        apellidos: usuarioReferencia.apellidos || "",
        email: usuarioReferencia.email || "",
        fech_nac: usuarioReferencia.fechanacimiento || "",
      });
    }
  }, [usuarioReferencia]);

  const manejarCambios = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const manejarErrores = (nombre: string, error: boolean) => {
    setErrores((prev) => ({ ...prev, [nombre]: error }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tieneErroresVisuales = Object.values(errores).some(
      (error) => error === true,
    );
    if (tieneErroresVisuales) {
      setNotificacion(t("miPerfil.notifErrorCampos"), "error");
    } else {
      await enviarDatosBD();
    }
  };

  const enviarDatosBD = async () => {
    const idActualizar = usuarioReferencia?.id_usuario;
    if (!idActualizar) return;
    try {
      const { data, error } = await supabase
        .from("usuario")
        .update({
          nombre: datos.nombre,
          apellidos: datos.apellidos,
          email: datos.email,
          fechanacimiento: datos.fech_nac,
        })
        .eq("id_usuario", idActualizar)
        .select()
        .single();

      if (error) throw error;

      if (usuarioLogueado && data.id_usuario === usuarioLogueado.id_usuario) {
        setUser({ ...usuarioLogueado, ...data });
        console.log(
          "Sesión de usuario actualizada de forma local, para flejar los datos",
        );
      }

      setNotificacion(t("miPerfil.notifExito"), "exito");
    } catch (error) {
      console.log(error);
      setNotificacion(t("miPerfil.notifError"), "error");
    }
  };

  return (
    <section
      className="flex flex-col grow w-full max-w-4xl mx-auto px-4 pb-8 gap-10 md:gap-14 lg:gap-14"
      aria-labelledby="perfil-title"
    >
      <h1 id="perfil-title" className="text-center">
        {t("miPerfil.titulo")}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <fieldset className="flex flex-col gap-6 border-none p-0">
          <legend className="sr-only">{t("miPerfil.legendInfo")}</legend>

          <article className="miperfil">
            <label className="font-bold" htmlFor="nombre">
              {t("miPerfil.labelNombre")}
            </label>
            <Inputs
              id="nombre"
              label=""
              placeholder={t("miPerfil.placeholderNombre")}
              name="nombre"
              value={datos?.nombre || ""}
              manejarCambio={manejarCambios}
              manejarError={manejarErrores}
              regex={/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/}
              error={t("miPerfil.errorNombre")}
            />
          </article>

          <article className="miperfil">
            <label className="font-bold" htmlFor="apellidos">
              {t("miPerfil.labelApellidos")}
            </label>
            <Inputs
              id="apellidos"
              label=""
              placeholder={t("miPerfil.placeholderApellidos")}
              name="apellidos"
              value={datos?.apellidos || ""}
              manejarCambio={manejarCambios}
              manejarError={manejarErrores}
              regex={/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/}
              error={t("miPerfil.errorApellidos")}
            />
          </article>

          <article className="miperfil">
            <label className="font-bold" htmlFor="email">
              {t("miPerfil.labelEmail")}
            </label>
            <Inputs
              id="email"
              label=""
              name="email"
              type="email"
              value={datos?.email || ""}
              manejarCambio={manejarCambios}
              manejarError={manejarErrores}
              regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
              error={t("miPerfil.errorEmail")}
            />
          </article>

          <article className="miperfil">
            <label className="font-bold" htmlFor="fech_nac">
              {t("miPerfil.labelFechaNac")}
            </label>
            <Inputs
              id="fech_nac"
              label=""
              name="fech_nac"
              type="text"
              placeholder={t("miPerfil.placeholderFechaNac")}
              value={datos?.fech_nac || ""}
              manejarCambio={manejarCambios}
              manejarError={manejarErrores}
              regex={/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/}
              error={t("miPerfil.errorFechaNac")}
            />
          </article>
        </fieldset>
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
          <Button
            variant="primario"
            className="w-full py-4 text-xl"
            type="submit"
          >
            {t("miPerfil.botonModificar")}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default MiPerfil;
