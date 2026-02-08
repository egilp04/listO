import { Outlet } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import fondoLogin from "../assets/img/Fondo-forms.webp";

const AuthLayout = () => {
  
  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${fondoLogin})` }}>
      {" "}
      <Navbar></Navbar>
      <main className="grow flex items-center justify-center w-full p-4">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default AuthLayout;
