import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useUserStatsStore } from "../../store/useUserStatsStore";
import { useEffect, useState } from "react";
import type { RegistroMensualItemsUsuarios } from "../../interfaces/Charts";
import { useThemeStore } from "../../store/useThemeStore";

const RegistroItems = () => {
  const tema = useThemeStore((state) => state.tema);

  const fetchRegistroAnual = useUserStatsStore(
    (state) => state.fetchRegistroAnual,
  );
  const [datosRegistroItems, setDatosRegistroItems] = useState<
    RegistroMensualItemsUsuarios[]
  >([]);

  useEffect(() => {
    const cargarDatosAnuales = async () => {
      try {
        const data = await fetchRegistroAnual();
        setDatosRegistroItems(data);
      } catch (e) {
        console.error("Error al cargar datos del gráfico:");
        if (e instanceof Error) console.log(e.stack);
      }
    };
    cargarDatosAnuales();
  }, [fetchRegistroAnual]);

  // console.log(datosRegistroItems);
  const lineStroke = tema == "dark" ? "#f9fcff" : "#7b8ff7";

  return (
    <div className="p-10 bg-white dark:bg-primary-1000 rounded-sm shadow-elevation-3 flex flex-col gap-10 w-full">
      <h2 className="text-primary-700 dark:text-primary-50">
        Registro anual de Items
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={datosRegistroItems}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="items"
            stroke={lineStroke}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RegistroItems;
