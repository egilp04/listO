import { useState, type FormHTMLAttributes } from "react";
import Inputs from "../Inputs/Inputs";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/useAuthStore";
import { useNotificationStore } from "../../store/useNotificationStore";
import { supabase } from "../../utils/supabaseClient";

interface RegistroProps extends FormHTMLAttributes<HTMLFormElement> {
  error?: string;
  login: boolean;
}

export const Login_ChangePasswd = ({
  error,
  login,
  ...props
}: RegistroProps) => {
  const navigate = useNavigate();
  const { login: loginAction, error: authError } = useAuthStore();
  const { setNotificacion } = useNotificationStore();

  const [formData, setFormData] = useState({
    email: "",
    passwd: "",
    nueva_passwd: "",
    confirm_passwd: "",
  });

  const texto = login ? "Login" : "Enviar";

  const [erroresActivos, setErroresActivos] = useState<Record<string, boolean>>(
    {},
  );

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const manejarError = (nombre: string, hayError: boolean) => {
    setErroresActivos({ ...erroresActivos, [nombre]: hayError });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (login) {
      try {
        await loginAction(formData.email, formData.passwd);
        navigate("/biblioteca");
      } catch (err) {
        console.error("Login failed", err);
      }
    } else {
      try {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(formData.email, {
          redirectTo: `${window.location.origin}/actualizar-password`,
        });

        if (resetError) throw resetError;

        setNotificacion("Si el correo está registrado, recibirás un enlace para recuperar tu contraseña.", "exito");
        setFormData({ ...formData, email: "" });
      } catch (err) {
        console.error("Error al recuperar contraseña", err);
      }
    }
  };

  return (
    <form className="form-login_passwd" onSubmit={handleSubmit} {...props}>
      {login ? (
        <>
          <h2>Inicio Sesión</h2>

          <div className="flex-login-passwd">
            <Inputs
              label="Usuario"
              type="text"
              placeholder="Ej: enrique@gmail.com"
              name="email"
              error={"Formato de email incorrecto"}
              regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
              value={formData.email}
              manejarCambio={manejarCambio}
              manejarError={manejarError}
            />
            <Inputs
              label="Contraseña"
              type="password"
              placeholder="********"
              name="passwd"
              error={"Debe coincidir con la contraseña"}
              regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/}
              value={formData.passwd}
              manejarCambio={manejarCambio}
              manejarError={manejarError}
            />
          </div>
          <span className="text-sm font-medium mt-4 block text-center text-black dark:text-primary-50">
            ¿Has olvidado la contraseña? Pulse{" "}
            <Link
              to="/recuperar"
              className="text-primary-1100 dark:text-primary-50 dark:underline font-bold hover:underline cursor-pointer"
            >
              AQUÍ
            </Link>
          </span>
        </>
      ) : (
        <>
          <h2>Recuperar Contraseña</h2>

          <div className="flex-login-passwd">
            <Inputs
              label="Introduzca su email"
              type="text"
              placeholder="Ej: enrique@gmail.com"
              name="email"
              error={"Formato de email incorrecto"}
              regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
              value={formData.email}
              manejarCambio={manejarCambio}
              manejarError={manejarError}
            />


          </div>
        </>
      )}

      <Button type="submit">{texto}</Button>

      {(error || authError) && (
        <p className="span-error mt-1 h-4">{error || authError}</p>
      )}
    </form>
  );
};