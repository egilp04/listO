import { BrowserRouter } from 'react-router-dom'
import Footer from './componentes/Footer'
import Navbar from './componentes/Navbar'
import Biblioteca from "./pages/biblioteca";
import { Genero } from "./componentes/Formularios/Genero";
import { Login_ChangePasswd } from "./componentes/Formularios/Login_ChangePasswd";

function App() {
  return (

    <>
      <Login_ChangePasswd login={true}></Login_ChangePasswd>
    </>
    // <BrowserRouter>
    //   <div className="min-h-screen flex flex-col bg-white">
    //     <header className="p-4 flex flex-col gap-4">
    //       <Navbar />

    //       <Navbar usuario="Mery" estaLogueado={true} />

    //       <Navbar usuario="Admin" estaLogueado={true} esAdmin={true} />
    //     </header>

    //     <Footer />
    //   </div>
    // </BrowserRouter>
  )
}

export default App;
