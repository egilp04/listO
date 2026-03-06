import Button from "../componentes/Button";
import Input from "../componentes/Inputs/Inputs";
import CardBiblioteca from "../componentes/tarjetas/cardBiblioteca";
import carta from "../assets/img/cards/carta_landing3.webp";

const itemEjemplo = {
  imagen: carta,
  tipo: "Juego",
  generos: ["RPG", "Aventura"],
  informacion: "CD Projekt Red - 2015",
  descripcion: "Un juego de rol de acción en mundo abierto...",
  valoracion: 5,
};

import { useNavigate } from "react-router-dom";

const Biblioteca = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-primary-200 dark:bg-primary-1100 p-5 md:p-10 min-h-screen">
      <header className="mb-10">
        <h1 className="text-center">Mi Biblioteca</h1>
      </header>
      <nav
        className="flex justify-center mb-8"
        aria-label="Acciones de biblioteca"
      >
        <Button onClick={() => navigate("/admin/items")}>
          Añadir nuevo ítem
        </Button>
      </nav>
      <aside
        className="bg-white dark:bg-primary-900 rounded-2xl shadow-sm p-4 md:p-6 mb-8 flex flex-col gap-6 max-w-5xl mx-auto"
        aria-labelledby="filtro-title"
      >
        <h2 id="filtro-title" className="sr-only">
          Buscador y filtros de contenido
        </h2>

        <div className="w-full">
          <label htmlFor="search-biblioteca" className="sr-only">
            Buscar por nombre en mi biblioteca
          </label>
          <Input
            id="search-biblioteca"
            type="text"
            placeholder="Buscar nombre..."
            name="busqueda"
            error=""
            manejarCambio={() => {}}
            manejarError={() => {}}
          />
        </div>

        <div
          className="flex flex-col md:flex-row flex-wrap justify-between gap-4"
          role="group"
          aria-label="Filtrar por tipo de contenido"
        >
          <Button aria-pressed="true">Todos</Button>
          <Button variant="secundario" aria-pressed="false">
            Libros
          </Button>
          <Button variant="secundario" aria-pressed="false">
            Juegos
          </Button>
        </div>
      </aside>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-7xl mx-auto"
        role="region"
        aria-label="Listado de ítems en biblioteca"
      >
        <article className="w-full flex justify-center">
          <CardBiblioteca item={itemEjemplo} />
        </article>
        <article className="w-full flex justify-center">
          <CardBiblioteca item={itemEjemplo} />
        </article>
        <article className="w-full flex justify-center">
          <CardBiblioteca item={itemEjemplo} />
        </article>
        <article className="w-full flex justify-center">
          <CardBiblioteca item={itemEjemplo} />
        </article>
      </div>
    </section>
  );
};

export default Biblioteca;
