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
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(
          formData.email,
          {
            redirectTo: `${window.location.origin}/actualizar-password`,
          },
        );

        if (resetError) throw resetError;

        setNotificacion(
          "Si el correo está registrado, recibirás un enlace para recuperar tu contraseña.",
          "exito",
        );
        setFormData({ ...formData, email: "" });
      } catch (err) {
        console.error("Error al recuperar contraseña", err);
      }
    }
  };

  return (
    <form className="form-login_passwd" onSubmit={handleSubmit} {...props}>
      {login ? (
        <section>
          <header className="mb-4">
            <h2 className="text-center">Inicio Sesión</h2>
          </header>

          <fieldset className="flex-login-passwd border-none p-0 m-0">
            <legend className="sr-only">Datos de acceso del usuario</legend>

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
          </fieldset>

          <nav className="mt-4 text-center" aria-label="Recuperación de cuenta">
            <span className="text-sm font-medium block text-black dark:text-primary-50">
              ¿Has olvidado la contraseña? Pulse{" "}
              <Link
                to="/recuperar"
                className="text-primary-1100 dark:text-primary-50 dark:underline font-bold hover:underline cursor-pointer"
              >
                AQUÍ
              </Link>
            </span>
          </nav>
        </section>
      ) : (
        <section>
          <header className="mb-4">
            <h2 className="text-center">Recuperar Contraseña</h2>
          </header>

          <fieldset className="flex-login-passwd border-none p-0 m-0">
            <legend className="sr-only">
              Introducción de credenciales para recuperación
            </legend>
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
          </fieldset>
        </section>
      )}
      <footer className="mt-6 flex flex-col items-center">
        <Button type="submit" className="w-full">
          {texto}
        </Button>
        {(error || authError) && (
          <p role="alert" className="span-error mt-1 h-4 text-red-500">
            {error || authError}
          </p>
        )}
      </footer>
    </form>
  );
};
