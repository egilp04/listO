import { useEffect, useState } from "react";
import Select from "../componentes/Inputs/Select";
import { meses } from "../utils/constants/Meses";
import CardEstadisticaG from "../componentes/tarjetas/cardEstadisticaG";

const EstadisticasGlobales = () => {
  const [infoTarjetaEstadistica, setInfoTarjetaEstadistica] = useState([]);
  useEffect(() => {
    const getDataTarjetaEstadistica = async () => {
      const res = await fetch("src/mock/cardsAdminStats.json");
      const data = await res.json();
      console.log(data);
      setInfoTarjetaEstadistica(data);
    };
    getDataTarjetaEstadistica();
  }, []);
  const conteo = 10;
  return (
    <div className="bg-primary-200 flex flex-col h-screen gap-2 lg:gap-12 2xl:gap-14 p-4">
      <div className="w-full">
        <span className="material-symbols-outlined">arrow_back</span>
      </div>
      <div className="shadow-elevation-3 bg-primary-50 flex flex-row gap-6 overflow-hidden p-4 rounded-sm justify-between items-center">
        <label className="w-full text-primary-700">
          Usuarios registrados por mes {conteo}
        </label>
        <Select variant="primario" options={meses}></Select>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        {infoTarjetaEstadistica.map(({ label, value }) => (
          <CardEstadisticaG texto={label} numero={value}></CardEstadisticaG>
        ))}
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default EstadisticasGlobales;
