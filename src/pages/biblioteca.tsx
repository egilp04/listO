import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../componentes/Button";
import Input from "../componentes/Inputs/Inputs";
import CardBiblioteca from "../componentes/tarjetas/cardBiblioteca";
import { useItemStore } from "../store/useItemStore";
import { useAuthStore } from "../store/useAuthStore";

const Biblioteca = () => {
  const navigate = useNavigate();
  const { items, tipos, fetchItems, fetchTipos, loading } = useItemStore();
  const { user } = useAuthStore();

  const [busqueda, setBusqueda] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("Todos");

  useEffect(() => {
    if (user?.id_usuario) {
      fetchItems(user.id_usuario);
    }
  }, [user?.id_usuario, fetchItems]);

  useEffect(() => {
    if (tipos.length === 0) {
      fetchTipos();
    }
  }, [tipos.length, fetchTipos]);

  const itemsFiltrados = items.filter((item) => {
    const matchBusqueda =
      item.descripcion.toLowerCase().includes(busqueda.toLowerCase());

    const matchTipo =
      tipoFiltro === "Todos" || item.tipo === tipoFiltro;

    return matchBusqueda && matchTipo;
  });

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
            placeholder="Buscar por nombre..."
            name="busqueda"
            error=""
            value={busqueda}
            manejarCambio={(e) => setBusqueda(e.target.value)}
            manejarError={() => { }}
          />
        </div>

        <div
          className="flex flex-col md:flex-row flex-wrap justify-center gap-4 mt-4"
          role="group"
          aria-label="Filtrar por tipo de contenido"
        >
          <Button
            variant={tipoFiltro === "Todos" ? "primario" : "secundario"}
            onClick={() => setTipoFiltro("Todos")}
            aria-pressed={tipoFiltro === "Todos"}
          >
            Todos
          </Button>

          {tipos.map((tipo) => (
            <Button
              key={tipo.id_tipo}
              variant={tipoFiltro === tipo.nombre ? "primario" : "secundario"}
              onClick={() => setTipoFiltro(tipo.nombre)}
              aria-pressed={tipoFiltro === tipo.nombre}
            >
              {tipo.nombre}
            </Button>
          ))}
        </div>
      </aside>

      {loading && (
        <p className="text-center text-primary-800 dark:text-primary-200">
          Cargando...
        </p>
      )}

      {!loading && itemsFiltrados.length === 0 && (
        <p className="text-center text-primary-800 dark:text-primary-200 font-medium mt-12 bg-white/50 w-full max-w-lg mx-auto py-8 rounded-xl backdrop-blur-sm border border-neutral-200">
          {items.length === 0 ? "No tienes ítems en tu biblioteca." : "No se encontraron ítems para esta búsqueda."}
        </p>
      )}

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-7xl mx-auto"
        role="region"
        aria-label="Listado de ítems en biblioteca"
      >
        {itemsFiltrados.map((item) => (
          <article key={item.id_item} className="w-full flex justify-center">
            <CardBiblioteca item={item} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default Biblioteca;
