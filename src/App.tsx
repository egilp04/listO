import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import Estadisticas from "./pages/Estadisticas";
import Landing from "./pages/landing";
import { Login_ChangePasswd } from "./componentes/Formularios/Login_ChangePasswd";
import { Registro } from "./componentes/Formularios/Registro";
import Biblioteca from "./pages/biblioteca";
import MiPerfil from "./pages/miPerfil";
import EstadisticasGlobales from "./pages/EstadisticasGlobales";
import GestionAdmin from "./pages/GestionAdmin";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Landing /> },
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
        path: "/estadistcias-globales",
        element: <EstadisticasGlobales />,
      },
      {
        path: "/gestion",
        element: <GestionAdmin />,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
