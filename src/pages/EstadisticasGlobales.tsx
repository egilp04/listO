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
    <div className="bg-primary-200 min-h-screen flex flex-col gap-20 md:gap-18 p-4">
      <div className="w-full">
        <span className="material-symbols-outlined">arrow_back</span>
      </div>
      <div className="shadow-elevation-3 bg-primary-50 flex flex-row gap-6 p-4 rounded-sm justify-between items-center">
        <label className="w-full text-primary-700">
          Usuarios registrados por mes {conteo}
        </label>
        <Select variant="primario" options={meses}></Select>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 md:gap-6 lg:gap-10">
        {infoTarjetaEstadistica.map(({ label, value }) => (
          <CardEstadisticaG texto={label} numero={value}></CardEstadisticaG>
        ))}
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex flex-col bg-primary-500 p-6 w-auto rounded-sm">
          <div className="flex flex-row gap-2">
            <div className="h-10 w-10 flex flex-row gap-2">
              {" "}
              <img src="src/assets/img/logo/logo.webp"></img>
            </div>
            <label className="text-primary-50">Generos Favoritos</label>
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
