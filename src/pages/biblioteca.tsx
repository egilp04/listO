import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../componentes/Button";
import Input from "../componentes/Inputs/Inputs";
import CardBiblioteca from "../componentes/tarjetas/cardBiblioteca";
import { useItemStore } from "../store/useItemStore";
import { useAuthStore } from "../store/useAuthStore";
import { useTranslation } from "react-i18next";

const Biblioteca = () => {
  const { t } = useTranslation();
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
        <h1 className="text-center">{t('biblioteca.titulo')}</h1>
      </header>
      <nav
        className="flex justify-center mb-8"
        aria-label={t('biblioteca.accionesLabel')}
      >
        <Button onClick={() => navigate("/admin/items")}>
          {t('biblioteca.añadirItem')}
        </Button>
      </nav>
      <aside
        className="bg-white dark:bg-primary-900 rounded-2xl shadow-sm p-4 md:p-6 mb-8 flex flex-col gap-6 max-w-5xl mx-auto"
        aria-labelledby="filtro-title"
      >
        <h2 id="filtro-title" className="sr-only">
          {t('biblioteca.buscadorFiltroH2')}
        </h2>

        <div className="w-full">
          <label htmlFor="search-biblioteca" className="sr-only">
            {t('biblioteca.buscadorLabel')}
          </label>
          <Input
            id="search-biblioteca"
            type="text"
            placeholder={t('biblioteca.buscadorPlaceholder')}
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
          aria-label={t('biblioteca.filtroLabel')}
        >
          <Button
            variant={tipoFiltro === "Todos" ? "primario" : "secundario"}
            onClick={() => setTipoFiltro("Todos")}
            aria-pressed={tipoFiltro === "Todos"}
          >
            {t('comun.todos')}
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
          {t('comun.cargando')}
        </p>
      )}

      {!loading && itemsFiltrados.length === 0 && (
        <p className="text-center text-primary-800 dark:text-primary-200 font-medium mt-12 bg-white/50 w-full max-w-lg mx-auto py-8 rounded-xl backdrop-blur-sm border border-neutral-200">
          {items.length === 0 ? t('biblioteca.sinItems') : t('biblioteca.sinResultados')}
        </p>
      )}

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-7xl mx-auto"
        role="region"
        aria-label={t('biblioteca.listadoLabel')}
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
