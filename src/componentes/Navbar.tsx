import { useState } from "react";
import Button from "./Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import type { UsuarioBDInterface } from "../interfaces/UsuarioBDInterface";
import { ThemeToggle } from "./BotonClarOscuro";

const Navbar = () => {
  const [close, setClose] = useState(true);
  const navigate = useNavigate();
  const { user, role, logout } = useAuthStore() as {
    user: UsuarioBDInterface;
    role: string | null;
    logout: () => Promise<void>;
  };

  const estaLogueado = !!user;
  const esAdmin = role === "administrador";
  const nombreUsuario = user?.nombre || "Usuario";

  const handleClick = () => {
    setClose(!close);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <div className="flex items-center gap-3">
        <NavLink
          to={estaLogueado ? "/biblioteca" : "/"}
          end
          className="navbar-logo"
          aria-label="Ir a la página de inicio"
        >
          <img
            src="/logo.webp"
            alt="Logotipo de ListO"
            className="h-20 w-20 object-contain md:h-24"
            width={96}
            height={96}
          />
        </NavLink>

        {estaLogueado && (
          <span className="text-base text-black font-medium dark:text-primary-50">
            Hola, <strong>{nombreUsuario}</strong>
          </span>
        )}
      </div>

      <div className="xl:hidden block">
        <button
          className="material-symbols-outlined cursor-pointer text-7xl dark:text-primary-50 bg-transparent border-none p-0"
          onClick={handleClick}
          aria-expanded={!close}
          aria-controls="navbar-menu"
          aria-label={close ? "Abrir menú" : "Cerrar menú"}
        >
          {close ? "menu" : "menu"}
        </button>
      </div>
      <div
        id="navbar-menu"
        className={`${
          close
            ? "hidden"
            : "flex absolute right-0 top-full bg-primary-50 dark:bg-primary-900 p-4 z-50 shadow-lg"
        } flex-col items-center gap-4 xl:mt-0 xl:flex xl:w-auto xl:flex-row xl:static xl:bg-transparent xl:p-0 xl:shadow-none`}
      >
        <ul className="flex flex-col xl:flex-row items-center gap-4 list-none p-0 m-0">
          {estaLogueado && (
            <>
              <li>
                <NavLink to="/biblioteca" className="nav-link">
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "primario" : "secundario"}
                      className="w-full"
                    >
                      Mi Biblioteca
                    </Button>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/estadisticas" end className="nav-link">
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "primario" : "secundario"}
                      className="w-full"
                    >
                      Estadísticas
                    </Button>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/miperfil" className="nav-link">
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "primario" : "secundario"}
                      className="w-full"
                    >
                      Mi Perfil
                    </Button>
                  )}
                </NavLink>
              </li>
              {esAdmin && (
                <>
                  <li>
                    <NavLink to="/estadisticas/globales" className="nav-link">
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "primario" : "secundario"}
                          className="w-full"
                        >
                          Estadísticas Globales
                        </Button>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/gestion" className="nav-link">
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "primario" : "secundario"}
                          className="w-full"
                        >
                          Gestión
                        </Button>
                      )}
                    </NavLink>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
        <div className="flex flex-col xl:flex-row items-center gap-4 border-t xl:border-t-0 pt-4 xl:pt-0 border-gray-200 dark:border-primary-800">
          {!estaLogueado ? (
            <ul className="flex flex-col xl:flex-row gap-2 list-none p-0 m-0">
              <li>
                <NavLink to="/login" className="nav-link">
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "primario" : "secundario"}
                      className="w-full"
                    >
                      Log in
                    </Button>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/registro" className="nav-link">
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "primario" : "secundario"}
                      className="w-full"
                    >
                      Registro
                    </Button>
                  )}
                </NavLink>
              </li>
            </ul>
          ) : (
            <Button
              variant="fantasma"
              onClick={handleLogout}
              className="w-full"
            >
              Salir
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
