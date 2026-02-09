import { useState } from "react";
import Button from "./Button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

interface NavbarProps {
  usuario?: string;
  estaLogueado?: boolean;
  esAdmin?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  usuario,
  estaLogueado = false,
  esAdmin = false,
}) => {
  const location = useLocation();
  const [close, setClose] = useState(true);

  const handleClick = () => {
    setClose(!close);
  };

  const navigate = useNavigate();

  return (
    <nav className="relative flex justify-between items-center p-3 bg-primary-50 flex-wrap border border-b-neutral-200 border-t-0 border-l-0 border-r-0">
      <div className="flex items-center gap-3">
        <NavLink to="/" className="navbar-logo">
          <img
            src="/src/assets/img/logo/logo.webp"
            alt="logo"
            className="h-20 w-20 object-contain md:h-24"
          />
        </NavLink>
        {estaLogueado && (
          <span className="text-base text-black font-medium">
            Hola, {usuario}
          </span>
        )}
      </div>
      <div className="lg:hidden block">
        <span
          className="material-symbols-outlined cursor-pointer text-7xl"
          onClick={handleClick}
        >
          menu
        </span>
      </div>
      <div
        className={`${
          close ? "hidden" : "flex absolute right-0 top-full bg-primary-50 p-4"
        }  flex-col items-center gap-4 lg:mt-0 lg:flex lg:w-auto lg:flex-row`}
      >
        <div className="botones-navbar">
          {estaLogueado && (
            <>
              <Button
                variant="secundario"
                onClick={() => {
                  {
                    navigate("/biblioteca");
                  }
                }}
              >
                Mi Biblioteca
              </Button>
              <Button
                variant="secundario"
                onClick={() => {
                  {
                    navigate("/estadisticas");
                  }
                }}
              >
                Estadísticas
              </Button>
              <Button
                variant="secundario"
                onClick={() => {
                  {
                    navigate("/miperfil");
                  }
                }}
              >
                Mi Perfil
              </Button>
              {esAdmin && (
                <>
                  <Button
                    variant="secundario"
                    onClick={() => {
                      {
                        navigate("/estadisticas-globales");
                      }
                    }}
                  >
                    Estadísticas Globales
                  </Button>
                  <Button
                    variant="secundario"
                    onClick={() => {
                      {
                        navigate("/gestion");
                      }
                    }}
                  >
                    Gestión
                  </Button>
                </>
              )}
            </>
          )}
        </div>
        <div className="botones-navbar">
          {!estaLogueado ? (
            location.pathname === "/" ? (
              <NavLink to="/login">
                <Button variant="primario">Comienza</Button>
              </NavLink>
            ) : (
              <>
                <NavLink to="/login">
                  <Button variant="secundario">Log in</Button>
                </NavLink>
                <NavLink to="/registro">
                  <Button variant="secundario">Registro</Button>
                </NavLink>
              </>
            )
          ) : (
            <Button
              variant="fantasma"
              onClick={() => {
                {
                  navigate("/");
                }
              }}
            >
              Salir
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
