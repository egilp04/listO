import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";

const LandingLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-primary-200">
      <Navbar></Navbar>
      <div className="w-full px-4 py-4 md:px-8">
        <span
          className="material-symbols-outlined text-4xl"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
      </div>
      <main className="flex-1 px-4 py-6 mt-4 md:mt-10">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default LandingLayout;
