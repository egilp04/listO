import type { FormHTMLAttributes } from "react";
import Inputs from "../Inputs/Inputs";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";

interface RegistroProps extends FormHTMLAttributes<HTMLFormElement> {
  error?: string;
  login?: boolean;
}

export const Login_ChangePasswd = ({
  error,
  login,
  ...props
}: RegistroProps) => {
  const navigate = useNavigate();

  const texto = login ? "Login" : "Enviar";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (login) {
      console.log("Navegando a Biblioteca...");
      navigate("/biblioteca", {
        state: {
          isLogged: false,
          esAdmin: true,
        },
      });
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
              name="nombre"
            />
            <Inputs
              label="Apellidos"
              type="password"
              placeholder="********"
              name="`passwd"
            />
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
              label="Nueva Contraseña"
              type="password"
              placeholder="********"
              name="nueva_passwd"
            />
            <Inputs
              label="Confirmar la contraseña"
              type="password"
              placeholder="********"
            />
          </div>
        </>
      )}

      <Button onClick={handleClick}>{texto}</Button>

      {error && <p className="span-error mt-1 h-4">{error}</p>}
    </form>
  );
};
