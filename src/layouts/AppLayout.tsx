import { Outlet } from "react-router-dom";
import Footer from "../componentes/Footer";
import Navbar from "../componentes/Navbar";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar></Navbar>
      <main className="flex-1 mx-auto px-4 py-6 mt-4 md:mt-10">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default AppLayout;
