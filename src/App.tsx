import "./App.css";
import CardBiblioteca from "./componentes/tarjetas/cardBiblioteca";
import CardLanding from "./componentes/tarjetas/cardLanding";
import CardEstadistica from "./componentes/tarjetas/cardEstadistica";
import CardEstadisticaT from "./componentes/tarjetas/cardEstadisticaT";

function App() {

  return (
    <>
      <div className="p-10 bg-gray-100 min-h-screen flex flex-col items-center justify-center gap-10">

        <div className="w-full max-w-sm flex flex-col gap-4">
          <CardEstadistica
            numero={4}
            texto="Total libros subidos este año"
            imagen="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
          />
          <CardEstadisticaT numero={1} texto="El código Da Vinci" />
          <CardEstadisticaT numero={2} texto="Cien años de soledad" />
        </div>
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

        <div className="w-full max-w-4xl">
          <CardLanding
            titulo="Crea tu colección"
            descripcion="¿Has terminado ese RPG de 80 horas o esa novela que te cambió la vida? Guárdalo para siempre en tu archivo personal. Con nuestra app, gestionar tu colección es más fácil que nunca. Registra cada título que completes, establece categorías por género o plataforma y mantén un registro histórico de tus logros. Un inventario digital diseñado para funcionar en cualquier lugar, dándote acceso instantáneo a tu catálogo sin depender de la nube."
            imagen="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2428&auto=format&fit=crop"
          />
        </div>

        <div className="w-full max-w-4xl">
          <CardLanding
            titulo="Explora nuevos mundos"
            descripcion="Descubre títulos que desafían tu imaginación y te transportan a realidades inexploradas. Nuestra plataforma te recomienda joyas ocultas basadas en tus gustos."
            imagen="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2371&auto=format&fit=crop"
            invertido={true}
          />
        </div>
      </div>
    </>
  );
}

export default App;
