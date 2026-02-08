import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import Estadisticas from "./pages/Estadisticas";
import Landing from "./pages/landing";
import MiPerfil from "./pages/miPerfil";
import { Login_ChangePasswd } from "./componentes/Formularios/Login_ChangePasswd";

const router = createBrowserRouter([
  /*{
    element: <AppLayout />,
    children: [
      { path: "/", element: <Landing /> },
    ],
  },*/
  {
    path: "/",
    element: <Estadisticas />,


  },
  /*{
    path: "/miperfil",
    element: <MiPerfil />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login_ChangePasswd login={true} /> },
      { path: "/registro", element: <Login_ChangePasswd login={false} /> },
    ],
  },*/
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;


// { path: "/admin/items", element: <GestionItem /> },
//       { path: "/estadisticas", element: <Estadisticas /> },
//       { path: "/estadisticas/globales", element: <EstadisticasGlobales /> },