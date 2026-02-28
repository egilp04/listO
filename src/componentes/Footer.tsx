import React from "react";
import { NavLink } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col gap-3 bg-primary-950 dark:bg-primary-1000 p-3 text-neutral-50 font-Otros">
      <div className="flex justify-around items-center">
        <div className="flex flex-col items-center justify-center">
          <img
            src="/src/assets/img/logo/logo.webp"
            alt="logo"
            className="h-40 w-40 object-contain"
          />
        </div>

        <div className="flex flex-col gap-1 items-center text-center ">
          <label className="font-Titulos font-medium text-lg text-primary-50">
            Politicas
          </label>
          <NavLink to="/politicas-cookies" className="text-sm hover:underline">
            Políticas cookies
          </NavLink>
          <NavLink to="*" className="text-sm hover:underline">
            Términos de servicio
          </NavLink>
          <NavLink to="*" className="text-sm hover:underline">
            Políticas de privacidad
          </NavLink>
          <NavLink to="*" className="text-sm hover:underline">
            Políticas de seguridad
          </NavLink>
        </div>

        <div className="flex flex-col gap-1 items-center text-center">
          <label className="text-primary-50 font-Titulos font-medium text-lg">
            Contacto
          </label>
          <label className="text-primary-50 text-sm hover:underline">
            {" "}
            614 68 43 55
          </label>
          <label className="text-primary-50 text-sm hover:underline">
            {" "}
            listODaw@gmail.com
          </label>
          <label className="text-primary-50 text-sm hover:underline">
            Av/ Avestruz 12 (Badajoz)
          </label>
        </div>

        <div className="flex flex-col gap-1 items-center text-center">
          <label className="text-primary-50 font-Titulos font-medium text-lg">
            Tecnologías
          </label>
          <label className="text-primary-50 text-sm hover:underline">
            React
          </label>
          <label className="text-primary-50 text-sm hover:underline">
            Tailwind
          </label>
          <label className="text-primary-50 text-sm hover:underline">
            Html
          </label>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <span className="text-primary-50 text-sm">
          © listO / Todos los derechos reservados
        </span>
      </div>
    </footer>
  );
};

export default Footer;
