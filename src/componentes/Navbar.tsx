import { useState } from "react";
import Button from "./Button"; 
import { NavLink } from "react-router-dom";

interface NavbarProps {
  usuario?: string;
  estaLogueado?: boolean;
  esAdmin?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ usuario, estaLogueado, esAdmin }) => {
  const [close, setClose] = useState(true);

  const handleClick = () => {
    setClose(!close);
  };

  return (
    <nav className="relative flex justify-between items-center p-3 bg-primary-50 flex-wrap border border-b-neutral-200 border-t-0 border-l-0 border-r-0">
      <div className="flex items-center gap-3">
        <NavLink to="/" className="navbar-logo">
          <img
            src="/src/assets/img/logo/logo.png"
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
      <div className="md:hidden block">
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
        }  flex-col items-center gap-4 md:mt-0 md:flex md:w-auto md:flex-row `}
      >
        <div className="botones-navbar">
          {estaLogueado && (
            <>
              <Button variant="secundario" size="sm">
                Mi Biblioteca
              </Button>
              <Button variant="secundario" size="sm">
                Estadísticas
              </Button>
              <Button variant="secundario" size="sm">
                Mi Perfil
              </Button>
              {esAdmin && (
                <>
                  <Button variant="secundario" size="sm">
                    Estadísticas Globales
                  </Button>
                  <Button variant="secundario" size="sm">
                    Gestión
                  </Button>
                </>
              )}
            </>
          )}
        </div>
        <div className="botones-navbar">
          {!estaLogueado ? (
            <>
              <Button variant="secundario">Log in</Button>
              <Button variant="secundario">Registro</Button>
              <Button variant="secundario">Comienza</Button>
            </>
          ) : (
            <Button variant="fantasma">Salir</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;