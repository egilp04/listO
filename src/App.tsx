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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
