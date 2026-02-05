import { BrowserRouter } from 'react-router-dom'
import Footer from './componentes/Footer'
import Navbar from './componentes/Navbar'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        <header className="p-4 flex flex-col gap-4">
          <Navbar />

          <Navbar usuario="Mery" estaLogueado={true} />

          <Navbar usuario="Admin" estaLogueado={true} esAdmin={true} />
        </header>

        <main className="flex-1 p-8">
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
