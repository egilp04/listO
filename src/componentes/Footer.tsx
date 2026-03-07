import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="flex flex-col gap-6 bg-primary-950 dark:bg-primary-1000 p-6 text-neutral-50 font-Otros">
      <div className="flex flex-col md:flex-row justify-around items-center gap-8">
        <figure className="flex flex-col items-center justify-center">
          <img
            src="/logo.webp"
            alt="Logotipo oficial de ListO"
            className="h-20 w-20 object-contain md:h-24"
            width={96}
            height={96}
            loading="lazy"
          />
        </figure>
        <nav
          className="flex flex-col gap-2 items-center md:items-start"
          aria-label="Enlaces legales"
        >
          <h3 className="font-Titulos font-medium text-lg text-primary-50 mb-1">
            Políticas
          </h3>
          <ul className="flex flex-col gap-1 items-center md:items-start list-none p-0 m-0">
            <li>
              <NavLink
                to="/politicas-cookies"
                className="text-sm hover:underline transition-all"
              >
                Políticas de cookies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/terminos"
                className="text-sm hover:underline transition-all"
              >
                Términos de servicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/privacidad"
                className="text-sm hover:underline transition-all"
              >
                Privacidad
              </NavLink>
            </li>
          </ul>
        </nav>
        <section className="flex flex-col gap-2 items-center md:items-start">
          <h3 className="text-primary-50 font-Titulos font-medium text-lg mb-1">
            Contacto
          </h3>
          <address className="not-italic flex flex-col gap-1 items-center md:items-start text-sm">
            <a
              href="tel:+34614684355"
              className="hover:underline text-primary-50"
            >
              614 68 43 55
            </a>
            <a
              href="mailto:listODaw@gmail.com"
              className="hover:underline text-primary-50"
            >
              listODaw@gmail.com
            </a>
            <p className="text-primary-50 text-center md:text-left">
              Av. Avestruz 12, Badajoz
            </p>
          </address>
        </section>
        <section className="flex flex-col gap-2 items-center md:items-start">
          <h3 className="text-primary-50 font-Titulos font-medium text-lg mb-1">
            Tecnologías
          </h3>
          <ul className="flex flex-col gap-1 items-center md:items-start list-none p-0 m-0 text-sm">
            <li className="text-primary-50">React</li>
            <li className="text-primary-50">Tailwind CSS</li>
            <li className="text-primary-50">HTML5 Semántico</li>
          </ul>
        </section>
      </div>
      <hr className="border-primary-900/30 w-full" />
      <div className="flex justify-center items-center">
        <small className="text-primary-50 text-xs">
          © {new Date().getFullYear()} ListO. Todos los derechos reservados.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
