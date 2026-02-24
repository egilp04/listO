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

const Estadisticas = () => {
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

  //Funciones fetch store
  const fetchItemsPorMes = useUserStatsStore((state) => state.fetchItemsPorMes);
  const fetchTarjetasEstadisticasTop = useUserStatsStore(
    (state) => state.fetchTarjetasEstadisticasTop,
  );
  const fetchTarjetasEstadisticas = useUserStatsStore(
    (state) => state.fetchTarjetasEstadisticas,
  );
  //Libros y videojuegos
  const fetchTopPorTipo = useUserStatsStore((state) => state.fetchTopPorTipo);
  const fetchItemsTotales = useUserStatsStore(
    (state) => state.fetchItemsTotales,
  );

  //Estadisticas normales
  useEffect(() => {
    const cargarTarjetas = async () => {
      const data = await fetchTarjetasEstadisticas();
      setInfoTarjetaEstadistica(data);
    };
    cargarTarjetas();
  }, [fetchTarjetasEstadisticas]);

  //top generos
  useEffect(() => {
    const cargarTarjetas = async () => {
      const data = await fetchTarjetasEstadisticasTop();
      setInfoEstadisticasTopGenero(data);
    };
    cargarTarjetas();
  }, [fetchTarjetasEstadisticasTop]);

  //Top libros y videojueogs
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
  }, [fetchTopPorTipo]);

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
    const cargatItems = async () => {
      const count = await fetchItemsTotales();
      setItemsTotales(count);
    };
    cargatItems();
  }, [fetchItemsTotales]);

  return (
    <>
      <div className="flex flex-col gap-6 md:gap-10 lg:gap-12 2xl:gap-20 mb-10 w-full mx-auto">
        <h2 className="flex justify-center">Estadísticas</h2>
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
            <p className="col-span-full text-center text-gray-500">
              Cargando estadísticas...
            </p>
          )}
        </div>

        <CardEstadisticaG
          texto="Total de items completados"
          numero={itemsTotales}
        />

        <div className="bg-white rounded-xl p-6 shadow-sm flex justify-between items-center cursor-pointer">
          <h2 className="text-primary-600 text-2xl font-bold">
            Completados por mes (2026) {conteoItems}
          </h2>
          <Select
            variant="primario"
            options={meses}
            value={mesSeleccionado}
            manejarambio={(e) => setMesSeleccionado(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary-50 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-warning-400 p-1 rounded-md">
                <span className="material-symbols-outlined icon-filled text-white">
                  star
                </span>
              </div>
              <h3 className="text-primary-600 text-2xl font-bold">
                Top Libros
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              {topLibros.map((info) =>
                info.value.map((nombreGenero, index) => (
                  <CardEstadisticaT
                    key={`${info.id}-${index}`}
                    numero={index + 1}
                    texto={nombreGenero}
                  />
                )),
              )}
            </div>
          </div>

          <div className="bg-primary-50 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-warning-400 p-1 rounded-md">
                <span className="material-symbols-outlined icon-filled text-white">
                  star
                </span>
              </div>
              <h3 className="text-primary-600 text-2xl font-bold">Top Juego</h3>
            </div>
            <div className="flex flex-col gap-2">
              {topVideojuegos.map((info) =>
                info.value.map((nombreGenero, index) => (
                  <CardEstadisticaT
                    key={`${info.id}-${index}`}
                    numero={index + 1}
                    texto={nombreGenero}
                  />
                )),
              )}
            </div>
          </div>

          <div className="bg-primary-50 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-warning-400 p-1 rounded-md">
                <span className="material-symbols-outlined icon-filled text-white">
                  star
                </span>
              </div>
              <h3 className="text-primary-600 text-2xl font-bold">
                Top Generos
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              {infoEstadisticasTopGenero.map((info) =>
                info.value.map((nombreGenero, index) => (
                  <CardEstadisticaT
                    key={`${info.id}-${index}`}
                    numero={index + 1}
                    texto={nombreGenero}
                  />
                )),
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Estadisticas;
