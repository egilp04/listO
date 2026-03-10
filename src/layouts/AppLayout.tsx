import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../componentes/Footer";
import Navbar from "../componentes/Navbar";
import { useNotificationStore } from "../store/useNotificationStore";
import { useTranslation } from "react-i18next";

const AppLayout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const mensaje = useNotificationStore((state) => state.mensaje);
  const tipo = useNotificationStore((state) => state.tipo);
  const mostrar = useNotificationStore((state) => state.mostrar);

  return (
    <div className="flex flex-col min-h-screen bg-primary-200 dark:bg-primary-1100">
      <Navbar />
      <nav
        className="w-full px-4 py-4 md:px-8"
        aria-label={t('layout.navSecundariaLabel')}
      >
        <button
          className="material-symbols-outlined cursor-pointer dark:text-primary-50 bg-transparent border-none p-0"
          onClick={() => navigate(-1)}
          aria-label={t('layout.volverAtras')}
        >
          arrow_back
        </button>
      </nav>
      <main className="flex-1 px-4">
        {mostrar && (
          <div
            role="alert"
            aria-live="assertive"
            className={`mensaje-alerta ${tipo === "exito" ? "mensaje-alerta-exito" : "mensaje-alerta-error"
              }`}
          >
            <span>{mensaje}</span>
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
