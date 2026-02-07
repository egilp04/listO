import { BrowserRouter } from 'react-router-dom'
import Footer from './componentes/Footer'
import Navbar from './componentes/Navbar'
import Biblioteca from "./pages/biblioteca";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        <header className="p-4 flex flex-col gap-4">
          <Navbar />

          <Navbar usuario="Mery" estaLogueado={true} />

          <Navbar usuario="Admin" estaLogueado={true} esAdmin={true} />
        </header>

        <main className="flex-1 p-8 flex flex-col gap-8">
          <h2 className="text-2xl font-bold mb-4">Mi Biblioteca</h2>
          <Biblioteca />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
