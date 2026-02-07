import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Landing from "./pages/landing";
import MiPerfil from "./pages/miPerfil";
import { Login_ChangePasswd } from "./componentes/Formularios/Login_ChangePasswd";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/" element={<MiPerfil />} />
        <Route path="/login" element={<Login_ChangePasswd login={true} />} />
        <Route path="/registro" element={<Login_ChangePasswd login={false} />} />
        {/* <Route path="/miperfil" element={<MiPerfil />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
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
export default App;
