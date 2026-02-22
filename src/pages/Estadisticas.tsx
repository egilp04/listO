import { useState, useEffect } from "react";
import CardEstadistica from "../componentes/tarjetas/cardEstadistica";
import CardEstadisticaG from "../componentes/tarjetas/cardEstadisticaG";
import CardEstadisticaT from "../componentes/tarjetas/cardEstadisticaT";
import RegistroItems from "../componentes/Charts/RegistroItems";

interface CardData {
  id: number;
  label: string;
  value: number;
  icon: string;
  color?: string;
}

const Estadisticas = () => {
  const [infoTarjetaEstadistica, setInfoTarjetaEstadistica] = useState<
    CardData[]
  >([]);

  useEffect(() => {
    const getDataEstadistica = async () => {
      try {
        const res = await fetch("/src/mock/cardsAdminStats.json");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        setInfoTarjetaEstadistica(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getDataEstadistica();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-6 md:gap-10 lg:gap-12 2xl:gap-20 mb-10 w-full mx-auto">
        <h2 className="flex justify-center">Estadísticas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {infoTarjetaEstadistica.length > 0 ? (
            infoTarjetaEstadistica.map((card) => (
              <CardEstadistica
                key={card.id}
                imagen={card.icon}
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

        <CardEstadisticaG texto="Total de items completados" numero={4} />

        <div className="bg-white rounded-xl p-6 shadow-sm flex justify-between items-center cursor-pointer">
          <RegistroItems></RegistroItems>
          <span className="material-symbols-outlined text-black text-5xl">
            expand_more
          </span>
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
            <div className="space-y-3">
              {[1, 1, 1].map((item, index) => (
                <CardEstadisticaT
                  key={index}
                  numero={item}
                  texto="El código Da Vinci"
                />
              ))}
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
            <div className="space-y-3">
              {[1, 1, 1].map((item, index) => (
                <CardEstadisticaT
                  key={index}
                  numero={item}
                  texto="El código Da Vinci"
                />
              ))}
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
            <div className="space-y-3">
              {[1, 1, 1].map((item, index) => (
                <CardEstadisticaT
                  key={index}
                  numero={item}
                  texto="El código Da Vinci"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Estadisticas;
