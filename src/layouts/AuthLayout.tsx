import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import fondoLogin from "../assets/img/Fondo-forms.webp";
import { useNotificationStore } from "../store/useNotificationStore";
import { useTranslation } from "react-i18next";

const AuthLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const state = location.state || {};
  const navigate = useNavigate();
  const mensaje = useNotificationStore((state) => state.mensaje);
  const tipo = useNotificationStore((state) => state.tipo);
  const mostrar = useNotificationStore((state) => state.mostrar);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div
        role="presentation"
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat transition-all duration-100 dark:brightness-[0.5] dark:saturate-[0.45] dark:contrast-[1.6]"
        style={{
          backgroundImage: `url(${fondoLogin})`,
        }}
      />
      {state.atras !== true &&
        !window.location.href.includes("/actualizar-password") && <Navbar />}
      <main className="grow flex-col flex items-center justify-center w-full p-4">
        {mostrar && (
          <div
            role="alert"
            aria-live="assertive"
            className={`mensaje-alerta ${
              tipo === "exito" ? "mensaje-alerta-exito" : "mensaje-alerta-error"
            }`}
          >
            <span>{mensaje}</span>
          </div>
        )}
        {state.atras === true && (
          <nav className="w-full mb-6" aria-label={t("layout.navRetornoLabel")}>
            <button
              type="button"
              className="material-symbols-outlined text-4xl cursor-pointer bg-primary-50 dark:bg-primary-900 dark:text-primary-50 rounded-sm px-4 py-4 md:px-8 border-none"
              onClick={() => navigate(-1)}
              aria-label={t("layout.volverAtras")}
            >
              arrow_back
            </button>
          </nav>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
