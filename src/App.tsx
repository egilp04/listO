import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LandingLayout from "./layouts/LandingLayout";
import { Login_ChangePasswd } from "./componentes/Formularios/Login_ChangePasswd";
import { Registro } from "./componentes/Formularios/Registro";
import { Recuperacion_Passwd } from "./componentes/Formularios/Recuperacion_Passwd";
import Loading from "./componentes/Loading";
import { useAuthStore } from "./store/useAuthStore";
import { supabase } from "./utils/supabaseClient";

const Landing = lazy(() => import("./pages/landing"));
const Estadisticas = lazy(() => import("./pages/Estadisticas"));
const EstadisticasGlobales = lazy(() => import("./pages/EstadisticasGlobales"));
const Biblioteca = lazy(() => import("./pages/biblioteca"));
const GestionAdmin = lazy(() => import("./pages/GestionAdmin"));
const FormularioGestionGeneros = lazy(
  () => import("./pages/FormularioGestionGeneros"),
);
const MiPerfil = lazy(() => import("./pages/miPerfil"));
const GestionItem = lazy(() => import("./pages/GestionItem"));
const NoImplementado = lazy(() => import("./pages/NoImplementado"));

const CargaPerezosa = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/admin/items",
        element: (
          <CargaPerezosa>
            <GestionItem />
          </CargaPerezosa>
        ),
      },
      {
        path: "/estadisticas",
        element: (
          <CargaPerezosa>
            <Estadisticas />
          </CargaPerezosa>
        ),
      },
      {
        path: "/miperfil",
        element: (
          <CargaPerezosa>
            <MiPerfil />
          </CargaPerezosa>
        ),
      },
      {
        path: "/biblioteca",
        element: (
          <CargaPerezosa>
            <Biblioteca />
          </CargaPerezosa>
        ),
      },
      {
        path: "/estadisticas/globales",
        element: (
          <CargaPerezosa>
            <EstadisticasGlobales />
          </CargaPerezosa>
        ),
      },
      {
        path: "/gestion",
        element: (
          <CargaPerezosa>
            <GestionAdmin />
          </CargaPerezosa>
        ),
      },
      {
        path: "/genero",
        element: (
          <CargaPerezosa>
            <FormularioGestionGeneros />
          </CargaPerezosa>
        ),
      },
      {
        path: "*",
        element: (
          <CargaPerezosa>
            <NoImplementado />
          </CargaPerezosa>
        ),
      },
    ],
  },
  {
    element: <LandingLayout />,
    children: [
      {
        path: "/",
        element: (
          <CargaPerezosa>
            <Landing />
          </CargaPerezosa>
        ),
      },
    ],
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
      {
        path: "/actualizar-password",
        element: <Recuperacion_Passwd login={false} />,
      },
    ],
  },
]);

function App() {
  const { initialize, loading, session } = useAuthStore();
  const [minLoadingTime, setMinLoadingTime] = useState(true);
  const { logout } = useAuthStore() as {
    logout: () => Promise<void>;
  };

  useEffect(() => {
    initialize();

    const timer = setTimeout(() => {
      setMinLoadingTime(false);
    }, 500);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        window.location.reload();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(timer);
    };
  }, [initialize]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, _session) => {
      if (event === "PASSWORD_RECOVERY") {
        router.navigate("/actualizar-password");
      } else if (event === "USER_UPDATED") {
        logout();
        router.navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [logout]);

  if ((loading || minLoadingTime) && !session) {
    return <Loading />;
  }
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
