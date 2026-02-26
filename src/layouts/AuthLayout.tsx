import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import fondoLogin from "../assets/img/Fondo-forms.webp";

const AuthLayout = () => {
  const location = useLocation();
  const state = location.state || {};
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat transition-all duration-100 dark:brightness-[0.5] dark:saturate-[0.45] dark:contrast-[1.6]"
        style={{
          backgroundImage: `url(${fondoLogin})`,
        }}
      />
      {state.atras != true && <Navbar></Navbar>}
      <main className="grow flex-col flex items-center justify-center w-full p-4">
        {state.atras == true && (
          <div className="w-full mb-6">
            <span
              className="material-symbols-outlined text-4xl cursor-pointer bg-primary-50 dark:bg-primary-900 dark:text-primary-50 rounded-sm px-4 py-4 md:px-8"
              onClick={() => navigate(-1)}
            >
              arrow_back
            </span>
          </div>
        )}

        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default AuthLayout;
