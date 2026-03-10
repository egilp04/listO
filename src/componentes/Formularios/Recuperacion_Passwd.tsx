import { useState, useEffect, type FormHTMLAttributes } from "react";
import Inputs from "../Inputs/Inputs";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useNotificationStore } from "../../store/useNotificationStore";
import { supabase } from "../../utils/supabaseClient";
import { useTranslation } from "react-i18next";

interface RegistroProps extends FormHTMLAttributes<HTMLFormElement> {
  error?: string;
  login: boolean;
}

export const Recuperacion_Passwd = ({ error, ...props }: RegistroProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { error: authError } = useAuthStore();
  const { setNotificacion } = useNotificationStore();

  const [formData, setFormData] = useState({
    nueva_passwd: "",
    confirm_passwd: "",
  });

  const [erroresActivos, setErroresActivos] = useState<Record<string, boolean>>(
    {},
  );

  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const finalizeUpdate = async () => {
      if (updateSuccess) {
        navigate("/biblioteca");
        setNotificacion(t("formRecuperacionPasswd.notifExito"), "exito");
      }
    };
    finalizeUpdate();
  }, [updateSuccess, navigate, setNotificacion, t]);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const manejarError = (nombre: string, hayError: boolean) => {
    setErroresActivos({ ...erroresActivos, [nombre]: hayError });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(erroresActivos).some((e) => e)) {
      setNotificacion(
        t("formRecuperacionPasswd.notifErroresFormulario"),
        "error",
      );
      return;
    }

    if (formData.nueva_passwd !== formData.confirm_passwd) {
      setNotificacion(t("formRecuperacionPasswd.notifNoCoinciden"), "error");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.nueva_passwd,
      });

      if (error) {
        setNotificacion(
          t("formRecuperacionPasswd.notifErrorActualizar", {
            mensaje: error.message,
          }),
          "error",
        );
      } else {
        setUpdateSuccess(true);
      }
    } catch (err) {
      console.error("Error al actualizar contraseña", err);
      setNotificacion(t("formRecuperacionPasswd.notifErrorEnlace"), "error");
    }
  };

  return (
    <section
      className="flex flex-col items-center w-full"
      aria-labelledby="form-pwd-title"
    >
      <form className="form-login_passwd" onSubmit={handleSubmit} {...props}>
        <header className="mb-6">
          <h2 id="form-pwd-title" className="text-center">
            {t("formRecuperacionPasswd.titulo")}
          </h2>
        </header>

        <fieldset className="flex-login-passwd border-none p-0 m-0">
          <legend className="sr-only">
            {t("formRecuperacionPasswd.legendNuevasCredenciales")}
          </legend>

          <Inputs
            label={t("formRecuperacionPasswd.labelNuevaContrasena")}
            type="password"
            placeholder={t("formRecuperacionPasswd.placeholderContrasena")}
            name="nueva_passwd"
            error={t("formRecuperacionPasswd.errorNuevaContrasena")}
            regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/}
            value={formData.nueva_passwd}
            manejarCambio={manejarCambio}
            manejarError={manejarError}
            autoComplete="new-password"
          />
          <Inputs
            label={t("formRecuperacionPasswd.labelConfirmarContrasena")}
            type="password"
            placeholder={t("formRecuperacionPasswd.placeholderContrasena")}
            name="confirm_passwd"
            error={t("formRecuperacionPasswd.errorConfirmarContrasena")}
            regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/}
            value={formData.confirm_passwd}
            manejarCambio={manejarCambio}
            manejarError={manejarError}
            autoComplete="new-password"
          />
        </fieldset>

        <footer className="mt-8 flex flex-col items-center gap-4">
          <Button type="submit" className="w-full">
            {t("formRecuperacionPasswd.botonActualizar")}
          </Button>

          {(error || authError) && (
            <p
              role="alert"
              className="span-error mt-1 h-4 text-red-500 font-medium"
            >
              {error || authError}
            </p>
          )}
        </footer>
      </form>
    </section>
  );
};
