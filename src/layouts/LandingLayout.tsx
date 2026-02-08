import { Outlet } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";

const LandingLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-primary-200">
      <Navbar></Navbar>
      <main className="flex-1 px-4 py-6 mt-4 md:mt-10">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default LandingLayout;
