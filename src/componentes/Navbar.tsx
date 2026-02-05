import React from 'react'

interface NavbarProps {
  usuario?: string;
  estaLogueado?: boolean;
  esAdmin?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ usuario, estaLogueado, esAdmin }) => {
  return <>
   <nav className="flex justify-between items-center p-3 bg-white border-2 border-dashed border-primary-500 rounded-xl ">
    <div className="flex items-center gap-1">
      <div className="navbar-logo">
        <img src="" alt="logo" className="h-10 w-10"/>
      </div>
      <div className="text-base text-black">
        {estaLogueado && <span>Hola, {usuario}</span>}
      </div>
    </div>
    
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {estaLogueado && (
          <>
          {/* {boton mi biblioteca} */}
          {/* {boton estadisticas} */}
          {/* {boton mi perfil} */}
          {esAdmin &&(
            <>
            {/* {boton estadisticas globales} */}
            {/* {boton gestion} */}
            </>
          )}
          </>
        )}
      </div>

      <div className="flex gap-3">
        {!estaLogueado &&(
          <>
          {/* {boton log in (tipo primario)} */}
          {/* {boton  registro y es tipo secundario} */}
          {/* {boton comienza (dudas) } */}
          {/* {boton comienza tipo primario} */}
          </>
        )}

        {estaLogueado &&(
          <>
          {/* boton Salir tipo salir*/}
          </>
        )}
          
      </div>
    </div>
  </nav>

  </>;
};

export default Navbar;