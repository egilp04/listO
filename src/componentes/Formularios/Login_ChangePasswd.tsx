import type { FormHTMLAttributes } from "react";
import Inputs from "../Inputs/Inputs";
import Button from "../Button";
// import { Link } from 'react-router-dom';

interface RegistroProps extends FormHTMLAttributes<HTMLFormElement> {
    error?: string;
    login?: boolean
}

export const Login_ChangePasswd = ({ error, login, ...props }: RegistroProps) => {
    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-gray-50 p-4">

            <form className="card-login_passwd" {...props}>
                {login ? (
                    <>
                        <h2>Inicio Sesión</h2>

                        <div className="flex-login-passwd">
                            <Inputs label="Usuario" type="text" placeholder="Ej: enrique@gmail.com" name="nombre" />
                            <Inputs label="Apellidos" type="password" placeholder="********" name="`passwd" />
                        </div>
                        <span>¿Has olvidado la contraseña? Pulse Aquí.
                            {/* <Link to="">AQUÍ</Link> */}
                        </span>
                    </>
                ) : (<>

                    <h2>Recuperar Contraseña</h2>

                    <div className="flex-login-passwd">
                        <Inputs label="Nueva Contraseña" type="password" placeholder="********" name="nueva_passwd" />
                        <Inputs label="Apellidos" type="password" placeholder="********" />
                    </div>
                </>)

                }

                <Button>Login</Button>

                {error && <p className="span-error mt-1 h-4">{error}</p>}

            </form>
        </div>
    );
};
