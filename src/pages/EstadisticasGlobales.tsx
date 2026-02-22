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
    <div className=" flex flex-col items-center gap-10 md:gap-12 2xl:gap-18 2xl:items-stretch">
      <h2 className="flex justify-center">Estadísticas Globales</h2>
      <div className="shadow-elevation-3 bg-primary-50 flex flex-row gap-6 p-4 rounded-sm justify-between items-center w-full">
        <h3 className="w-full text-primary-700">
          Usuarios registrados por mes: {conteoUsuario}
        </h3>
        <Select
          variant="primario"
          options={meses}
          value={mesSeleccionado}
          manejarambio={(e) => setMesSeleccionado(e.target.value)}
        />{" "}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 md:gap-6 lg:gap-10">
        {infoTarjetaEstadistica.map(({ label, value, id }) => (
          <CardEstadisticaG
            key={`est-num-${id}`}
            texto={label}
            numero={value}
          ></CardEstadisticaG>
        ))}
      </div>
      <div className="w-full flex flex-col items-center justify-center pr-6 pl-6 md:pr-28 md:pl-28 mb-10">
        <div className="flex flex-col bg-primary-500 p-6 w-full rounded-sm">
          <div className="flex flex-row gap-6  justify-center items-center mb-6 md:mb-0">
            <div className=" w-28 flex flex-row gap-2 h-full">
              <img src="/src/assets/img/logo/logo.webp" alt="logo" />
            </div>
            <h3 className="text-primary-50">Generos Favoritos</h3>
          </div>
          <div className="flex flex-col gap-2">
            {infoEstadisticasTop.map((info) =>
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
  );
};

export default EstadisticasGlobales;
