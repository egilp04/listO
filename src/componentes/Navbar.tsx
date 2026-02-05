import React from 'react'
import Button from './Button';
import { NavLink } from 'react-router-dom';

interface NavbarProps {
  usuario?: string;
  estaLogueado?: boolean;
  esAdmin?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ usuario, estaLogueado, esAdmin }) => {
  return (
    <nav className="flex justify-between items-center p-3 bg-white  rounded-xl">
      <div className="flex items-center gap-1">
        <NavLink to="/" className="navbar-logo">
          <img src="/src/assets/img/logo/logo.png" alt="logo" className="h-20 w-20 object-contain md:h-24" />
        </NavLink>
        <div className="text-base text-black ml-2">
          {estaLogueado && <span>Hola, {usuario}</span>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {estaLogueado && (
            <>
              <Button variant="secundario" size="sm">Mi Biblioteca</Button>
              <Button variant="secundario" size="sm">Estadisticas</Button>
              <Button variant="secundario" size="sm">Mi Perfil</Button>
              {esAdmin && (
                <>
                  <Button variant="secundario" size="sm">Estadisticas Globales</Button>
                  <Button variant="secundario" size="sm">Gestión</Button>
                </>
              )}
            </>
          )}
        </div>

        <div className="flex gap-3">
          {!estaLogueado && (
            <>
              <Button variant="secundario">Log in</Button>
              <Button variant="secundario">Registro</Button>
              <Button variant="secundario">Comienza</Button>
            </>
          )}

          {estaLogueado && (
            <>
              <Button variant="fantasma">Salir</Button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;