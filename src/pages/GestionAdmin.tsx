import { useNavigate } from "react-router-dom";
import Button from "../componentes/Button";
import { useEffect, useState } from "react";
import { useGestionAdminStore } from "../store/useGestionAdminStore";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
const Table = lazy(() => import("../componentes/Table"));

const GestionAdmin = () => {
  const { t } = useTranslation();
  const fetchGeneros = useGestionAdminStore((state) => state.fetchGeneros);
  const fetchUsuarios = useGestionAdminStore((state) => state.fetchUsuarios);
  const [selected, setSelected] = useState("usuario");
  const [valorFiltro, setValorFiltro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuarios();
    fetchGeneros();
  }, [fetchUsuarios, fetchGeneros]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSelected(e.currentTarget.name);
  };

  const crearItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const nombre = e.currentTarget.name;
    if (nombre == "usuario") {
      navigate("/registro", { state: { atras: true } });
    } else {
      navigate("/genero", { state: { crear: true } });
    }
  };

  const handleFiltrar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValorFiltro(e.currentTarget.value);
  };

  return (
    <section
      className="flex flex-col gap-8 md:p-6 mg:gap-14 mb-12 2xl:gap-18"
      aria-labelledby="gestion-admin-title"
    >
      <header>
        <h1 id="gestion-admin-title" className="flex justify-center">
          {t('gestionAdmin.titulo')}
        </h1>
      </header>
      <nav
        className="flex flex-row gap-10 w-full justify-center items-center"
        aria-label={t('gestionAdmin.seleccionLabel')}
      >
        <Button
          variant={selected === "usuario" ? "primario" : "secundario"}
          name="usuario"
          onClick={handleClick}
          aria-pressed={selected === "usuario"}
        >
          <span>{t('gestionAdmin.botonUsuarios')}</span>
        </Button>
        <Button
          variant={selected === "genero" ? "primario" : "secundario"}
          onClick={handleClick}
          name="genero"
          aria-pressed={selected === "genero"}
        >
          <span>{t('gestionAdmin.botonGeneros')}</span>
        </Button>
      </nav>
      <article className="shadow-elevation-3 bg-primary-50 dark:bg-primary-975 flex flex-col gap-6 max-h-150 overflow-hidden p-10 rounded-sm">
        <div className="flex flex-col gap-4 justify-center items-center md:justify-around md:flex-row w-full">
          <div className="w-1/2">
            <label htmlFor="buscador-admin" className="sr-only">
              {t('gestionAdmin.filtrarLabel', { tipo: selected === "usuario" ? t('gestionAdmin.botonUsuarios').toLowerCase() : t('gestionAdmin.botonGeneros').toLowerCase() })}
            </label>
            <input
              id="buscador-admin"
              className="input-style-comun input-border-primario dark:border-primary-50 input-responsive dark:text-primary-50"
              placeholder={t('gestionAdmin.buscadorPlaceholder', { tipo: selected })}
              onChange={handleFiltrar}
            />
          </div>

          <div className="flex items-center">
            <Button variant="primario" onClick={crearItem} name={selected}>
              <span>
                {selected === "usuario" ? t('gestionAdmin.crearUsuario') : t('gestionAdmin.crearGenero')}
              </span>
            </Button>
          </div>
        </div>
        <div className="relative min-h-50" aria-live="polite">
          <Suspense
            fallback={
              <div className="text-primary-1100 dark:text-primary-50 flex justify-center py-10">
                <span className="sr-only">{t('gestionAdmin.cargandoDatos')}</span>
                <div className="animate-pulse">
                  {t('gestionAdmin.cargandoTabla', { tipo: selected })}
                </div>
              </div>
            }
          >
            {" "}
            <Table tipoItem={selected} valorFiltro={valorFiltro} />
          </Suspense>
        </div>
      </article>
    </section>
  );
};

export default GestionAdmin;
