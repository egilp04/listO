import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col gap-3 bg-primary-700 p-3 text-neutral-50 font-Otros">
      <div className="flex justify-around items-center">

        <div className="flex flex-col items-center justify-center">
          <img src="/src/assets/img/logo/logo.png" alt="logo" className="h-32 w-32 object-contain" />
        </div>

        <div className="flex flex-col gap-1 items-center text-center">
          <label className="font-Titulos font-medium text-lg">Politicas</label>
          <NavLink to="/politicas-cookies" className="text-sm hover:underline">Políticas cookies</NavLink>
          <NavLink to="/termino-servicio" className="text-sm hover:underline">Términos de servicio</NavLink>
          <NavLink to="/politicas-privacidad" className="text-sm hover:underline">Políticas de privacidad</NavLink>
          <NavLink to="/politicas-seguridad" className="text-sm hover:underline">Políticas de seguridad</NavLink>
        </div>

        <div className="flex flex-col gap-1 items-center text-center">
          <label className="font-Titulos font-medium text-lg">Contacto</label>
          <NavLink to="/contacto-telefono" className="text-sm hover:underline">614 68 43 55</NavLink>
          <NavLink to="/contacto-email" className="text-sm hover:underline">listO@gmail.com</NavLink>
          <NavLink to="/contacto-direccion" className="text-sm hover:underline">Av/ Avestruz 12 (Badajoz)</NavLink>
        </div>

        <div className="flex flex-col gap-1 items-center text-center">
          <label className="font-Titulos font-medium text-lg">Tecnologías</label>
          <NavLink to="/contacto-react" className="text-sm hover:underline">React</NavLink>
          <NavLink to="/tecnologias-tailwind" className="text-sm hover:underline">Tailwind</NavLink>
          <NavLink to="/tecnologias-html" className="text-sm hover:underline">Html</NavLink>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <span className="text-sm">© listO / Todos los derechos reservados</span>
      </div>

    </footer>
  );
};

export default Footer;


