import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../componentes/Footer";
import Navbar from "../componentes/Navbar";
import { useNotificationStore } from "../store/useNotificationStore";

const AppLayout = () => {
  const navigate = useNavigate();
  const mensaje = useNotificationStore((state) => state.mensaje);
  const tipo = useNotificationStore((state) => state.tipo);
  const mostrar = useNotificationStore((state) => state.mostrar);

  return (
    <div className="flex flex-col min-h-screen bg-primary-200 dark:bg-primary-1000">
      <Navbar></Navbar>
      <div className="w-full px-4 py-4 md:px-8">
        <span
          className="material-symbols-outlined cursor-pointer  dark:text-primary-50"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
      </div>
      <main className="flex-1 px-4">
        {mostrar && (
          <div
            className={`mensaje-alerta
          ${tipo === "exito" ? "mensaje-alerta-exito" : "mensaje-alerta-error"}`}
          >
            <span>{mensaje}</span>
          </div>
        )}
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default AppLayout;
