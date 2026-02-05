import { BrowserRouter } from 'react-router-dom'
import Footer from './componentes/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-Titulos font-medium mb-4 text-black"> Footer</h1>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
