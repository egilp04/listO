import { lazy, Suspense } from "react";
import { useState, useEffect } from "react";
import CardEstadistica from "../componentes/tarjetas/cardEstadistica";
import CardEstadisticaG from "../componentes/tarjetas/cardEstadisticaG";
import CardEstadisticaT from "../componentes/tarjetas/cardEstadisticaT";
import { meses } from "../utils/constants/Meses";
import { useUserStatsStore } from "../store/useUserStatsStore";
import type {
  TarjetaEstadisticas,
  TarjetaEstadisticasTop,
} from "../interfaces/TarjetasEstadisticasGlobales";
import Select from "../componentes/Inputs/Select";
import { useTranslation } from "react-i18next";
const RegistroItems = lazy(() => import("../componentes/Charts/RegistroItems"));
const ComparacionItems = lazy(
  () => import("../componentes/Charts/ComparacionItems"),
);

const Estadisticas = () => {
  const { t, i18n } = useTranslation();
  const [infoTarjetaEstadistica, setInfoTarjetaEstadistica] = useState<
    TarjetaEstadisticas[]
  >([]);
  const [infoEstadisticasTopGenero, setInfoEstadisticasTopGenero] = useState<
    TarjetaEstadisticasTop[]
  >([]);

  const [topLibros, setTopoLibros] = useState<TarjetaEstadisticasTop[]>([]);
  const [topVideojuegos, setTopVideojuegos] = useState<
    TarjetaEstadisticasTop[]
  >([]);
  const [itemsTotales, setItemsTotales] = useState<number>(0);
  const [mesSeleccionado, setMesSeleccionado] = useState("");
  const [conteoItems, setConteoItems] = useState(0);

  const fetchItemsPorMes = useUserStatsStore((state) => state.fetchItemsPorMes);
  const fetchTarjetasEstadisticasTop = useUserStatsStore(
    (state) => state.fetchTarjetasEstadisticasTop,
  );
  const fetchTarjetasEstadisticas = useUserStatsStore(
    (state) => state.fetchTarjetasEstadisticas,
  );
  const fetchTopPorTipo = useUserStatsStore((state) => state.fetchTopPorTipo);
  const fetchItemsTotales = useUserStatsStore(
    (state) => state.fetchItemsTotales,
  );

  useEffect(() => {
    const cargarTarjetas = async () => {
      const data = await fetchTarjetasEstadisticas();
      setInfoTarjetaEstadistica(data);
    };
    cargarTarjetas();
  }, [fetchTarjetasEstadisticas, i18n.language]);

  useEffect(() => {
    const cargarTarjetas = async () => {
      const data = await fetchTarjetasEstadisticasTop();
      setInfoEstadisticasTopGenero(data);
    };
    cargarTarjetas();
  }, [fetchTarjetasEstadisticasTop, i18n.language]);

  useEffect(() => {
    const cargarLibros = async () => {
      const data = await fetchTopPorTipo("libro");
      setTopoLibros(data);
    };
    const cargarVideojuegos = async () => {
      const data = await fetchTopPorTipo("videojuego");
      setTopVideojuegos(data);
    };
    cargarLibros();
    cargarVideojuegos();
  }, [fetchTopPorTipo, i18n.language]);

  useEffect(() => {
    const cargarItems = async () => {
      if (mesSeleccionado) {
        const count = await fetchItemsPorMes(mesSeleccionado);
        setConteoItems(count);
      }
    };
    cargarItems();
  }, [mesSeleccionado, fetchItemsPorMes]);

  useEffect(() => {
    const cargarItems = async () => {
      const count = await fetchItemsTotales();
      setItemsTotales(count);
    };
    cargarItems();
  }, [fetchItemsTotales]);

  return (
    <section
      className="flex flex-col gap-6 md:gap-10 2xl:gap-14 mb-10 w-full mx-auto"
      aria-labelledby="stats-user-title"
    >
      <header>
        <h1 id="stats-user-title" className="flex justify-center text-center">
          {t("estadisticas.titulo")}
        </h1>
      </header>

      <nav aria-label={t("estadisticas.resumenLabel")}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {infoTarjetaEstadistica.length > 0 ? (
            infoTarjetaEstadistica.map((card) => (
              <CardEstadistica
                key={card.id}
                numero={card.value}
                texto={card.label}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-primary-50">
              {t("estadisticas.cargandoEstadisticas")}
            </p>
          )}
        </div>
      </nav>

      <article aria-label={t("estadisticas.totalCompletados")}>
        <CardEstadisticaG
          texto={t("estadisticas.totalCompletados")}
          numero={itemsTotales}
        />
      </article>

      <article className="shadow-md transition-shadow duration-500 hover:shadow-elevation-3 bg-primary-50 dark:bg-primary-850 flex flex-col md:flex-row gap-4 md:gap-6 p-4 rounded-sm justify-between items-center w-full">
        <h2 className="text-xl">
          {t("estadisticas.completadosPorMes")} <strong>{conteoItems}</strong>
        </h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="mes-selector" className="sr-only">
            {t("estadisticas.cambiaMesLabel")}
          </label>
          <Select
            id="mes-selector"
            variant="primario"
            options={meses}
            value={mesSeleccionado}
            manejarambio={(e) => setMesSeleccionado(e.target.value)}
          />
        </div>
      </article>

      <section
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        aria-label={t("estadisticas.rankingsLabel")}
      >
        <article className="bg-primary-50 dark:bg-primary-850 rounded-sm p-6 shadow-sm space-y-4">
          <header className="flex items-center gap-3 mb-4">
            <div className="bg-warning-400 p-1 rounded-md" aria-hidden="true">
              <span className="material-symbols-outlined icon-filled text-white animate-spin-lento">
                star
              </span>
            </div>
            <h3 className="font-bold">{t("estadisticas.topLibros")}</h3>
          </header>
          <ol className="flex flex-col gap-2">
            {topLibros.map((info) =>
              info.value.map((nombreGenero, index) => (
                <li key={`${info.id}-${index}`}>
                  <CardEstadisticaT numero={index + 1} texto={nombreGenero} />
                </li>
              )),
            )}
          </ol>
        </article>

        <article className="bg-primary-50 dark:bg-primary-850 rounded-sm p-6 shadow-sm space-y-4">
          <header className="flex items-center gap-3 mb-4">
            <div className="bg-warning-400 p-1 rounded-md" aria-hidden="true">
              <span className="material-symbols-outlined icon-filled text-white animate-spin-lento">
                star
              </span>
            </div>
            <h3 className="font-bold">{t("estadisticas.topJuegos")}</h3>
          </header>
          <ol className="flex flex-col gap-2">
            {topVideojuegos.map((info) =>
              info.value.map((nombreGenero, index) => (
                <li key={`${info.id}-${index}`}>
                  <CardEstadisticaT numero={index + 1} texto={nombreGenero} />
                </li>
              )),
            )}
          </ol>
        </article>

        <article className="bg-primary-50 dark:bg-primary-850 rounded-sm p-6 shadow-sm space-y-4">
          <header className="flex items-center gap-3 mb-4">
            <div className="bg-warning-400 p-1 rounded-sm" aria-hidden="true">
              <span className="material-symbols-outlined icon-filled text-white animate-spin-lento">
                star
              </span>
            </div>
            <h3 className="font-bold">{t("estadisticas.topGeneros")}</h3>
          </header>
          <ol className="flex flex-col gap-2">
            {infoEstadisticasTopGenero.map((info) =>
              info.value.map((nombreGenero, index) => (
                <li key={`${info.id}-${index}`}>
                  <CardEstadisticaT numero={index + 1} texto={nombreGenero} />
                </li>
              )),
            )}
          </ol>
        </article>
      </section>

      <section
        className="flex flex-col gap-8"
        aria-label={t("estadisticas.graficosLabel")}
      >
        <figure className="w-full min-h-75">
          <Suspense
            fallback={
              <div className="text-primary-1100 dark:text-primary-50 text-center">
                <span>{t("estadisticas.cargandoGraficoRegistros")}</span>
              </div>
            }
          >
            <RegistroItems />
          </Suspense>
        </figure>
        <figure className="w-full min-h-[300px]">
          <Suspense
            fallback={
              <div className="text-primary-1100 dark:text-primary-50 text-center">
                <span>{t("estadisticas.cargandoGraficoComparativa")}</span>
              </div>
            }
          >
            <ComparacionItems />
          </Suspense>
        </figure>
      </section>
    </section>
  );
};

export default Estadisticas;
