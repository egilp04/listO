import "./App.css";
import CardBiblioteca from "./componentes/tarjetas/cardBiblioteca";

function App() {

  return (
    <>
      <div className="p-10 bg-gray-100 min-h-screen flex items-start justify-center">
        <CardBiblioteca
          item={{
            imagen: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
            tipo: "Libro",
            generos: ["Romance", "Ficción"],
            informacion: "Gabriel García Márquez, 2019",
            descripcion: "Una novela distópica sobre vigilancia totalitaria y manipulación",
            valoracion: 4
          }}
        />
      </div>
    </>
  );
}

export default App;
