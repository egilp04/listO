import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from "./pages/landing";
import { Login_ChangePasswd } from "./componentes/Formularios/Login_ChangePasswd";
import Select from "./componentes/Inputs/Select";
import { useState } from "react";
import { Registro } from "./componentes/Formularios/Registro";

function App() {
  const [categoria, setCategoria] = useState("");
  const opcionesCategorias = [
    { value: 1, label: "Tecnología" },
    { value: 2, label: "Hogar" },
    { value: 3, label: "Moda" },
    { value: 4, label: "Deportes" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoria(e.target.value);
    console.log("Valor seleccionado:", e.target.value);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login_ChangePasswd login={true} />} />
      </Routes>
    </BrowserRouter>
    // <BrowserRouter>
    //   <div className="min-h-screen flex flex-col bg-white">
    //     <header className="p-4 flex flex-col gap-4">
    //       <Navbar />

    //       <Navbar usuario="Mery" estaLogueado={true} />

    //       <Navbar usuario="Admin" estaLogueado={true} esAdmin={true} />
    //     </header>

    //     <main className="flex-1 p-8 flex flex-col gap-8">
    //       <h2 className="text-2xl font-bold mb-4">Demo CardEstadisticaG</h2>
    //       <CardEstadisticaG numero={100} texto="Total Usuarios" />
    //     </main>

    //     <Footer />
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
