import { useEffect, useState } from "react";
import Select from "../componentes/Inputs/Select";
import { meses } from "../utils/constants/Meses";
import CardEstadisticaG from "../componentes/tarjetas/cardEstadisticaG";
import CardEstadisticaT from "../componentes/tarjetas/cardEstadisticaT";

interface EstadisticaTop {
  value: string[];
}

const EstadisticasGlobales = () => {
  const [infoTarjetaEstadistica, setInfoTarjetaEstadistica] = useState([]);
  const [infoEstadisticasTop, setInfoEstadisticasTop] = useState<
    EstadisticaTop[]
  >([]);

  useEffect(() => {
    const getDataEstadistica = async () => {
      const res = await fetch("src/mock/cardsAdminStats.json");
      const data = await res.json();
      setInfoTarjetaEstadistica(data);
    };
    getDataEstadistica();
  }, []);

  useEffect(() => {
    const getDataTop = async () => {
      const res = await fetch("src/mock/cardTopStatsAdmin.json");
      const data = await res.json();
      console.log(data);
      setInfoEstadisticasTop(data);
    };
    getDataTop();
  }, []);
  const conteo = 10;
  return (
    <div className=" flex flex-col items-center gap-10 md:gap-12 2xl:gap-18">
      <h2 className="flex justify-center">Estadísticas Globales</h2>
      <div className="shadow-elevation-3 bg-primary-50 flex flex-row gap-6 p-4 rounded-sm justify-between items-center">
        <h3 className="w-full text-primary-700">
          Usuarios registrados por mes: {conteo}
        </h3>
        <Select variant="primario" options={meses}></Select>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 md:gap-6 lg:gap-10">
        {infoTarjetaEstadistica.map(({ label, value }) => (
          <CardEstadisticaG texto={label} numero={value}></CardEstadisticaG>
        ))}
      </div>
      <div className="w-full flex flex-col items-center justify-center pr-10 pl-10 md:pr-28 md:pl-28 mb-10">
        <div className="flex flex-col bg-primary-500 p-6 w-full rounded-sm">
          <div className="flex flex-row gap-6  justify-center items-center mb-6 md:mb-0">
            <div className=" w-28 flex flex-row gap-2 h-full">
              {" "}
              <img src="src/assets/img/logo/logo.webp"></img>
            </div>
            <h3 className="text-primary-50">Generos Favoritos</h3>
          </div>
          <div className="flex flex-col gap-2">
            {infoEstadisticasTop.map(({ value }, index) =>
              value.map((val) => (
                <CardEstadisticaT numero={index} texto={val} />
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasGlobales;
