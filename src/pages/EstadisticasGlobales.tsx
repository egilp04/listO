import { useEffect, useState } from "react";
import Select from "../componentes/Inputs/Select";
import { meses } from "../utils/constants/Meses";
import CardEstadisticaG from "../componentes/tarjetas/cardEstadisticaG";
import CardEstadisticaT from "../componentes/tarjetas/cardEstadisticaT";
import { useAdminStatsStore } from "../store/useAdminStatsStore";
import type {
  TarjetaEstadisticas,
  TarjetaEstadisticasTop,
} from "../interfaces/TarjetasEstadisticasGlobales";
import { lazy, Suspense } from "react";
const RegistroUsuarios = lazy(
  () => import("../componentes/Charts/RegistroUsuarios"),
);
const DistribucionGeneros = lazy(
  () => import("../componentes/Charts/DistribucionGenero"),
);

const EstadisticasGlobales = () => {
  const fetchTarjetasEstadisticas = useAdminStatsStore(
    (state) => state.fetchTarjetasEstadisticas,
  );

  const fetchUsuariosPorMes = useAdminStatsStore(
    (state) => state.fetchUsuariosPorMes,
  );
  const fetchTarjetasEstadisticasTop = useAdminStatsStore(
    (state) => state.fetchTarjetasEstadisticasTop,
  );

  const [infoTarjetaEstadistica, setInfoTarjetaEstadistica] = useState<
    TarjetaEstadisticas[]
  >([]);
  const [infoEstadisticasTop, setInfoEstadisticasTop] = useState<
    TarjetaEstadisticasTop[]
  >([]);

  //Usuarios por mes
  const [mesSeleccionado, setMesSeleccionado] = useState("");
  const [conteoUsuario, setConteoUsuario] = useState(0);

  useEffect(() => {
    const cargarTarjetas = async () => {
      const data = await fetchTarjetasEstadisticas();
      setInfoTarjetaEstadistica(data);
    };
    cargarTarjetas();
  }, [fetchTarjetasEstadisticas]);

  useEffect(() => {
    const cargarTarjetas = async () => {
      const data = await fetchTarjetasEstadisticasTop();
      setInfoEstadisticasTop(data);
    };
    cargarTarjetas();
  }, [fetchTarjetasEstadisticasTop]);

  useEffect(() => {
    const cargarUsuarios = async () => {
      if (mesSeleccionado) {
        const count = await fetchUsuariosPorMes(mesSeleccionado);
        setConteoUsuario(count);
      }
    };
    cargarUsuarios();
  }, [mesSeleccionado, fetchUsuariosPorMes]);

  return (
    <section
      className="flex flex-col items-center mb-6 gap-10 md:gap-12 2xl:gap-18 2xl:items-stretch"
      aria-labelledby="global-stats-title"
    >
      <header className="flex justify-center">
        <h1 id="global-stats-title">Estadísticas Globales</h1>
      </header>
      <article className="shadow-elevation-1 transition-shadow duration-500 hover:shadow-elevation-3 bg-primary-50 dark:bg-primary-850 flex flex-col md:flex-row gap-4 md:gap-6 p-4 rounded-sm justify-between items-center w-full">
        <h2 className="w-full text-center md:text-left text-primary-900 dark:text-primary-50 text-xl">
          Usuarios registrados por mes:{" "}
          <span className="font-bold">{conteoUsuario}</span>
        </h2>
        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <label htmlFor="select-mes" className="sr-only">
            Seleccionar mes para filtrar usuarios
          </label>
          <Select
            id="select-mes"
            variant="primario"
            options={meses}
            value={mesSeleccionado}
            manejarambio={(e) => setMesSeleccionado(e.target.value)}
          />
        </div>
      </article>
      <section
        className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 md:gap-6 lg:gap-10"
        aria-label="Resumen numérico de actividad"
      >
        {infoTarjetaEstadistica.map(({ label, value, id }) => (
          <CardEstadisticaG
            key={`est-num-${id}`}
            texto={label}
            numero={value}
          />
        ))}
      </section>
      <article className="w-full flex flex-col items-center justify-center px-4 md:px-28">
        <div className="flex flex-col bg-primary-975 p-6 w-full rounded-sm shadow-lg">
          <header className="flex flex-row gap-6 justify-center items-center mb-6 md:mb-0">
            <figure className="w-28">
              <img
                className="hover:scale-110 transition-transform duration-700"
                src="/logo.webp"
                alt="Logo de ListO"
              />
            </figure>
            <h3 className="text-primary-50 text-shimmer text-2xl font-semibold">
              Géneros Favoritos
            </h3>
          </header>

          <ol className="flex flex-col gap-2 mt-4">
            {infoEstadisticasTop.map((info) =>
              info.value.map((nombreGenero, index) => (
                <li key={`${info.id}-${index}`}>
                  <CardEstadisticaT numero={index + 1} texto={nombreGenero} />
                </li>
              )),
            )}
          </ol>
        </div>
      </article>

      <section
        className="w-full flex flex-col gap-10"
        aria-label="Visualizaciones gráficas de datos"
      >
        <figure className="w-full min-h-75">
          <Suspense
            fallback={
              <div className="text-center py-10 dark:text-primary-50">
                Cargando gráfico de registros...
              </div>
            }
          >
            <RegistroUsuarios />
          </Suspense>
        </figure>

        <figure className="w-full min-h-75">
          <Suspense
            fallback={
              <div className="text-center py-10 dark:text-primary-50">
                Cargando gráfico de distribución...
              </div>
            }
          >
            <DistribucionGeneros />
          </Suspense>
        </figure>
      </section>
    </section>
  );
};

export default EstadisticasGlobales;
