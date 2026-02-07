import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import GestionItem from "./pages/GestionItem";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    // children: [{ path: "/", element: <Landing /> }],
    // children: [{ path: "/biblioteca", element: <biblioteca /> }],
    // children: [{ path: "/estadisticas", element: <estadisticas /> }],
    // children: [{ path: "/estadisticasglobales", element: <estadisticasglobales /> }],
    // children: [{ path: "/gestion", element: <gestion /> }],
    // // children: [{ path: "/perfil", element: <perfil /> }],
    children: [
      { path: "/gestion", element: <GestionItem /> }
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      // { path: "/signIn", element: <SignInPage /> },
      // { path: "/signUp", element: <SignUpPage /> },
      // { path: "/recuperar-pass", element: <recuperar-pass /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

//botones de usuarios, gestion -> lleva useNavigate
