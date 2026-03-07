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
  const lineStroke = tema == "dark" ? "#f9fcff" : "#7b8ff7";
  const GeneralStroke = tema == "dark" ? "#f9fcff" : "#645fd5";

  return (
    <figure
      className="charts flex flex-col gap-4"
      aria-labelledby="registro-items-title"
    >
      <figcaption>
        <h2
          id="registro-items-title"
          className="text-xl font-semibold text-center md:text-left"
        >
          Registro anual de Items
        </h2>
      </figcaption>
      <div
        className="w-full"
        role="img"
        aria-label="Gráfico de líneas que muestra la progresión mensual de nuevos elementos añadidos a la biblioteca durante el año."
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={datosRegistroItems}
            margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={GeneralStroke} />
            <XAxis
              dataKey="name"
              stroke={GeneralStroke}
              tick={{ fontSize: 12 }}
            />
            <YAxis stroke={GeneralStroke} tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: tema === "dark" ? "#302976" : "#f9fcff",
                borderColor: GeneralStroke,
                color: tema === "dark" ? "#f9fcff" : "#302976",
                borderRadius: "4px",
              }}
              itemStyle={{ color: tema === "dark" ? "#accbff" : "#302976" }}
              cursor={{ stroke: GeneralStroke, strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="items"
              name="Nuevos Items"
              stroke={lineStroke}
              strokeWidth={3}
              dot={{ r: 4, fill: lineStroke }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
};

export default RegistroItems;
