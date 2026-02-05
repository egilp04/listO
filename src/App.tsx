import { BrowserRouter } from 'react-router-dom'
import Footer from './componentes/Footer'
import './styles/theme.css'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4"> Footer</h1>
          
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
