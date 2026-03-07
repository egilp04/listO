import { useState, type FormHTMLAttributes } from "react";
import Inputs from "../Inputs/Inputs";
import Checkbox from "../Inputs/Checkbox";
import Button from "../Button";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import { useAuthStore } from "../../store/useAuthStore";
import { useNotificationStore } from "../../store/useNotificationStore";
import { useTranslation } from "react-i18next";

export const Registro = ({ ...props }: FormHTMLAttributes<HTMLFormElement>) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setNotificacion = useNotificationStore(
    (state) => state.setNotificacion,
  );
  const location = useLocation();
  const state = location.state || {};
  const vieneDeGestion = state.atras || false;

  const { logout } = useAuthStore();

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
    politicas: true,
  });

  const manejarCambios = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nombre = e.target.name;
    setDatos((prev) => {
      const nuevosDatos = { ...prev, [nombre]: e.target.value };
      if (nombre === "passwd" || nombre === "rep_passwd") {
        const otraPassword =
          nombre === "passwd" ? nuevosDatos.rep_passwd : nuevosDatos.passwd;
        const coinciden = nuevosDatos[nombre] === otraPassword;
        manejarErrores("rep_passwd", !coinciden);
      }
      return nuevosDatos;
    });
    if (e.target.type == "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      if (checked) {
        manejarErrores(nombre, false);
      } else {
        manejarErrores(nombre, true);
      }
    }
  };
  const manejarErrores = (nombre: string, error: boolean) => {
    setErrores((prev) => {
      return { ...prev, [nombre]: error };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordsCoinciden =
      datos.passwd !== "" &&
      datos.rep_passwd != "" &&
      datos.passwd === datos.rep_passwd;

    const tieneErroresVisuales = Object.values(errores).some(
      (err) => err === true,
    );
    if (tieneErroresVisuales || !passwordsCoinciden) {
      setNotificacion(t('formRegistro.notifErrorCampos'), "error");
    } else {
      await enviarDatosBD();
    }
  };

  const enviarDatosBD = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email: datos.email,
        password: datos.passwd,
        options: {
          data: {
            nombre: datos.nombre,
            apellidos: datos.apellidos,
            fechanacimiento: datos.fecha_nac,
          },
        },
      });
      console.log("Error antes de lanzarse", error);

      if (error) throw error;
      else {
        setNotificacion(t('formRegistro.notifExito'), "exito");
        if (vieneDeGestion) {
          navigate(-1);
        } else {
          logout();
          navigate("/");
        }
      }
    } catch (error) {
      console.log("catch error", error);
      setNotificacion(t('formRegistro.notifError'), "error");
    }
  };

  return (
    <form className="form-registro" {...props} onSubmit={handleSubmit}>
      <header className="mb-6">
        <h2 className="text-center">{t('formRegistro.titulo')}</h2>
      </header>
      <fieldset className="grid-registro border-none p-0 m-0">
        <legend className="sr-only">{t('formRegistro.legendInfo')}</legend>
        <Inputs
          label={t('formRegistro.labelNombre')}
          type="text"
          placeholder={t('formRegistro.placeholderNombre')}
          name="nombre"
          manejarError={manejarErrores}
          manejarCambio={manejarCambios}
          regex={/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/}
          error={t('formRegistro.errorNombre')}
        />
        <Inputs
          label={t('formRegistro.labelApellidos')}
          type="text"
          placeholder={t('formRegistro.placeholderApellidos')}
          name="apellidos"
          manejarError={manejarErrores}
          manejarCambio={manejarCambios}
          regex={/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/}
          error={t('formRegistro.errorApellidos')}
        />
        <Inputs
          label={t('formRegistro.labelFechaNac')}
          type="text"
          placeholder={t('formRegistro.placeholderFechaNac')}
          name="fecha_nac"
          regex={/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/}
          manejarError={manejarErrores}
          manejarCambio={manejarCambios}
          error={t('formRegistro.errorFechaNac')}
        />
        <Inputs
          label={t('formRegistro.labelEmail')}
          type="email"
          placeholder={t('formRegistro.placeholderEmail')}
          name="email"
          manejarError={manejarErrores}
          manejarCambio={manejarCambios}
          regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
          error={t('formRegistro.errorEmail')}
        />
        <Inputs
          label={t('formRegistro.labelContrasena')}
          type="password"
          placeholder={t('formRegistro.placeholderContrasena')}
          name="passwd"
          manejarError={manejarErrores}
          manejarCambio={manejarCambios}
          regex={/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/}
          error={t('formRegistro.errorContrasena')}
        />
        <Inputs
          label={t('formRegistro.labelConfirmarContrasena')}
          type="password"
          placeholder={t('formRegistro.placeholderContrasena')}
          name="rep_passwd"
          manejarError={manejarErrores}
          manejarCambio={manejarCambios}
          regex={/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/}
          error={t('formRegistro.errorConfirmarContrasena')}
        />
      </fieldset>
      <section className="mt-4">
        <Checkbox
          label={t('formRegistro.labelPoliticas')}
          name="politicas"
          manejarCambio={manejarCambios}
        />
      </section>
      <footer className="mt-6 flex flex-col items-center">
        <Button type="submit" className="w-full">
          {t('formRegistro.botonRegistrar')}
        </Button>
      </footer>
    </form>
  );
};
