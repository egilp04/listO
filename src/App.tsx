import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import Estadisticas from "./pages/Estadisticas";
import { Login_ChangePasswd } from "./componentes/Formularios/Login_ChangePasswd";
import { Registro } from "./componentes/Formularios/Registro";
import Biblioteca from "./pages/biblioteca";
import EstadisticasGlobales from "./pages/EstadisticasGlobales";
import GestionAdmin from "./pages/GestionAdmin";
import FormularioGestionGeneros from "./pages/FormularioGestionGeneros";
import Landing from "./pages/landing";
import MiPerfil from "./pages/miPerfil";
import LandingLayout from "./layouts/LandingLayout";
import GestionItem from "./pages/GestionItem";
import Loading from "./componentes/Loading";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/admin/items",
        element: <GestionItem />,
      },
      {
        path: "/estadisticas",
        element: <Estadisticas />,
      },
      {
        path: "/miperfil",
        element: <MiPerfil />,
      },
      {
        path: "/biblioteca",
        element: <Biblioteca />,
      },
      {
        path: "/estadisticas/globales",
        element: <EstadisticasGlobales />,
      },
      {
        path: "/gestion",
        element: <GestionAdmin />,
      },
      {
        path: "/genero",
        element: <FormularioGestionGeneros />,
      },
      {
        path: "*",
        element: <NoImplementado />,
      },
    ],
  },
  {
    element: <LandingLayout />,
    children: [{ path: "/", element: <Landing /> }],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login_ChangePasswd login={true} />,
      },
      {
        path: "/registro",
        element: <Registro />,
      },
      {
        path: "/recuperar",
        element: <Login_ChangePasswd login={false} />,
      },
    ],
  },
]);

import { useEffect, useState } from "react";
import { useAuthStore } from "./store/useAuthStore";
import NoImplementado from "./pages/NoImplementado";

function App() {
  const { initialize, loading, session } = useAuthStore();
  const [minLoadingTime, setMinLoadingTime] = useState(true);

  useEffect(() => {
    initialize();

    // Forzamos un tiempo mínimo de carga de 3 segundos
    const timer = setTimeout(() => {
      setMinLoadingTime(false);
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("Sincronización global: Reiniciando contexto...");
        window.location.reload();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(timer);
    };
  }, [initialize]);

  if ((loading || minLoadingTime) && !session) {
    return <Loading />;
  }

  return <RouterProvider router={router} />;
}

export default App;
