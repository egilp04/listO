import { useState, useEffect } from 'react';
import CardEstadistica from '../componentes/tarjetas/cardEstadistica';
import CardEstadisticaG from '../componentes/tarjetas/cardEstadisticaG';
import CardEstadisticaT from '../componentes/tarjetas/cardEstadisticaT';

interface CardData {
  id: number;
  label: string;
  value: number;
  icon: string;
  color?: string;
}

const Estadisticas = () => {
  const [infoTarjetaEstadistica, setInfoTarjetaEstadistica] = useState<CardData[]>([]);

  useEffect(() => {
    const getDataEstadistica = async () => {
      try {
        const res = await fetch("src/mock/cardsAdminStats.json");
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
      <div className="w-full px-4 py-4 md:px-8">
          <span className="material-symbols-outlined text-4xl">
            arrow_back
          </span>
      </div>

      <div className="flex-grow w-full max-w-7xl mx-auto px-4 pb-8 space-y-8">
        <h1 >Estadísticas</h1>

        {/* Grid de Tarjetas Superiores */}
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
            <p className="col-span-full text-center text-gray-500">Cargando estadísticas...</p>
          )}
        </div>

        {/* Barra Total Items */}
        <CardEstadisticaG
          texto="Total de items completados"
          numero={4}
        />

        {/* Completados por mes */}
        <div className="bg-white rounded-xl p-6 shadow-sm flex justify-between items-center cursor-pointer">
          <h2 className="text-primary-600 text-2xl font-bold">Completados por mes (2026)</h2>
          <span className="material-symbols-outlined text-black text-5xl">expand_more</span>
        </div>

        {/* Grid de Top Lists */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Libros */}
          <div className="bg-primary-50 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-warning-400 p-1 rounded-md">
                <span className="material-symbols-outlined icon-filled text-white">star</span>
              </div>
              <h3 className="text-primary-600 text-2xl font-bold">Top Libros</h3>
            </div>
            <div className="space-y-3">
              {[1, 1, 1].map((item, index) => (
                <CardEstadisticaT key={index} numero={item} texto="El código Da Vinci" />
              ))}
            </div>
          </div>

          {/* Top Juego */}
          <div className="bg-primary-50 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-warning-400 p-1 rounded-md">
                <span className="material-symbols-outlined icon-filled text-white">star</span>
              </div>
              <h3 className="text-primary-600 text-2xl font-bold">Top Juego</h3>
            </div>
            <div className="space-y-3">
              {[1, 1, 1].map((item, index) => (
                <CardEstadisticaT key={index} numero={item} texto="El código Da Vinci" />
              ))}
            </div>
          </div>

          {/* Top Generos */}
          <div className="bg-primary-50 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-warning-400 p-1 rounded-md">
                <span className="material-symbols-outlined icon-filled text-white">star</span>
              </div>
              <h3 className="text-primary-600 text-2xl font-bold">Top Generos</h3>
            </div>
            <div className="space-y-3">
              {[1, 1, 1].map((item, index) => (
                <CardEstadisticaT key={index} numero={item} texto="El código Da Vinci" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Estadisticas;
