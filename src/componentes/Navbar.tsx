import { useState } from "react";
import Button from "./Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const [close, setClose] = useState(true);
  const { user, role, logout } = useAuthStore();

  const usuario = user?.email;
  const estaLogueado = !!user;
  const esAdmin = role === 'administrador';

  const handleClick = () => {
    setClose(!close);
  };

  const navigate = useNavigate();

  return (
    <nav className="relative flex justify-between items-center p-3 bg-primary-50 flex-wrap border border-b-neutral-200 border-t-0 border-l-0 border-r-0">
      <div className="flex items-center gap-3">
        <NavLink to="/" end className="navbar-logo">
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
        className={`${close ? "hidden" : "flex absolute right-0 top-full bg-primary-50 p-4"
          }  flex-col items-center gap-4 lg:mt-0 lg:flex lg:w-auto lg:flex-row`}
      >
        <div className="botones-navbar">
          {estaLogueado && (
            <>
              <NavLink to="/biblioteca" className="nav-link">
                {({ isActive }) => (
                  <Button variant={isActive ? "primario" : "secundario"}>
                    Mi Biblioteca
                  </Button>
                )}
              </NavLink>
              <NavLink to="/estadisticas" end className="nav-link">
                {({ isActive }) => (
                  <Button variant={isActive ? "primario" : "secundario"}>
                    Estadísticas
                  </Button>
                )}
              </NavLink>
              <NavLink to="/miperfil" className="nav-link">
                {({ isActive }) => (
                  <Button variant={isActive ? "primario" : "secundario"}>
                    Mi Perfil
                  </Button>
                )}
              </NavLink>
              {esAdmin && (
                <>
                  <NavLink to="/estadisticas/globales" className="nav-link">
                    {({ isActive }) => (
                      <Button variant={isActive ? "primario" : "secundario"}>
                        Estadísticas Globales
                      </Button>
                    )}
                  </NavLink>
                  <NavLink to="/gestion" className="nav-link">
                    {({ isActive }) => (
                      <Button variant={isActive ? "primario" : "secundario"}>
                        Gestión
                      </Button>
                    )}
                  </NavLink>
                </>
              )}
            </>
          )}
        </div>
        <div className="botones-navbar">
          {!estaLogueado ? (
            <>
              <NavLink to="/login" className="nav-link">
                {({ isActive }) => (
                  <Button variant={isActive ? "primario" : "secundario"}>
                    Log in
                  </Button>
                )}
              </NavLink>
              <NavLink to="/registro" className="nav-link">
                {({ isActive }) => (
                  <Button variant={isActive ? "primario" : "secundario"}>
                    Registro
                  </Button>
                )}
              </NavLink>
            </>
          ) : (
            <Button
              variant="fantasma"
              onClick={() => {
                logout();
                navigate("/");
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

