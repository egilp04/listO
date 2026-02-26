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
    <nav className="navbar">
      <div className="flex items-center gap-3">
        <NavLink
          to={estaLogueado ? "/biblioteca" : "/"}
          end
          className="navbar-logo"
        >
          <img
            src="/src/assets/img/logo/logo.webp"
            alt="logo"
            className="h-20 w-20 object-contain md:h-24"
          />
        </NavLink>
        {estaLogueado && (
          <span className="text-base text-black font-medium dark:text-primary-50">
            Hola, {nombreUsuario}
          </span>
        )}
      </div>
      <div className="xl:hidden block">
        <span
          className="material-symbols-outlined cursor-pointer text-7xl dark:text-primary-50"
          onClick={handleClick}
        >
          menu
        </span>
      </div>
      <div
        className={`${
          close
            ? "hidden"
            : "flex absolute right-0 top-full bg-primary-50 dark:bg-primary-900 p-4 z-50"
        }  flex-col items-center gap-4 xl:mt-0 xl:flex xl:w-auto xl:flex-row`}
      >
        <div className="botones-navbar">
          {estaLogueado && (
            <>
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
              {esAdmin && (
                <>
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
                  <Button
                    variant={isActive ? "primario" : "secundario"}
                    className="w-full"
                  >
                    Log in
                  </Button>
                )}
              </NavLink>
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
            </>
          ) : (
            <Button
              variant="fantasma"
              onClick={handleLogout}
              className="w-full"
            >
              Salir
            </Button>
          )}
        </div>
        <ThemeToggle></ThemeToggle>
        <ThemeToggle></ThemeToggle>
      </div>
    </nav>
  );
};
export default Navbar;
