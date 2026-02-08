import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../componentes/Footer";
import Navbar from "../componentes/Navbar";

const AppLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-primary-200">
      <Navbar esAdmin={true} estaLogueado={true} usuario={"Usuario"}></Navbar>
      <div className="w-full px-4 py-4 md:px-8">
        <span
          className="material-symbols-outlined text-4xl cursor-pointer"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
      </div>
      <main className="flex-1 px-4 py-6">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default AppLayout;
