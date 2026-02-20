import { useState, type FormHTMLAttributes } from "react";
import Inputs from "../Inputs/Inputs";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/useAuthStore";

interface RegistroProps extends FormHTMLAttributes<HTMLFormElement> {
  error?: string;
  login: boolean;
}

export const Login_ChangePasswd = ({ error, login, ...props }: RegistroProps) => {

  const navigate = useNavigate();
  const { login: loginAction, error: authError } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    passwd: "",
    nueva_passwd: "",
    confirm_passwd: "",
  });

  const texto = login ? "Login" : "Enviar";

  const [erroresActivos, setErroresActivos] = useState<Record<string, boolean>>({});

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const manejarError = (nombre: string, hayError: boolean) => {
    setErroresActivos({ ...erroresActivos, [nombre]: hayError });
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (login) {
      try {
        await loginAction(formData.email, formData.passwd);
        navigate("/biblioteca");
      } catch (err) {
        console.error("Login failed", err);
      }
    } else {
      console.log("Volviendo al Login...");
      navigate("/login");
    }
  };

  return (
    <form className="card-login_passwd" {...props}>
      {login ? (
        <>
          <h2>Inicio Sesión</h2>

          <div className="flex-login-passwd">
            <Inputs
              label="Usuario"
              type="text"
              placeholder="Ej: enrique@gmail.com"
              name="email" error={"Formato de email incorrecto"} regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/} value={formData.email} manejarCambio={manejarCambio} manejarError={manejarError} />
            <Inputs
              label="Contraseña"
              type="password"
              placeholder="********"
              name="passwd" error={"Debe coincidir con la contraseña"} regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,8}$/} value={formData.passwd} manejarCambio={manejarCambio} manejarError={manejarError} />
          </div>
          <span className="text-sm mt-4 block text-center">
            ¿Has olvidado la contraseña? Pulse{" "}
            <Link
              to="/recuperar"
              className="text-primary-600 font-bold hover:underline cursor-pointer"
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
              label="Usuario"
              type="text"
              placeholder="Ej: enrique@gmail.com"
              name="email" error={"Formato de email incorrecto"}
              regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
              value={formData.email}
              manejarCambio={manejarCambio}
              manejarError={manejarError} />
              
            <Inputs
              label="Nueva Contraseña"
              type="password"
              placeholder="********"
              name="nueva_passwd" error={"La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"} regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,8}$/} value={formData.nueva_passwd} manejarCambio={manejarCambio} manejarError={manejarError} />

            <Inputs
              label="Confirmar Contraseña"
              type="password" placeholder="********"
              name="confirm_passwd" error={"Las contraseñas no coinciden"}
              regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,8}$/}
              value={formData.confirm_passwd}
              manejarCambio={manejarCambio}
              manejarError={manejarError} />
          </div>
        </>
      )}

      <Button onClick={handleClick}>{texto}</Button>

      {(error || authError) && <p className="span-error mt-1 h-4">{error || authError}</p>}
    </form>
  );
};
