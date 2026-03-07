import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import type { RegistroMensualItemsTipoUsuarios } from "../../interfaces/Charts";
import { useUserStatsStore } from "../../store/useUserStatsStore";
import { useThemeStore } from "../../store/useThemeStore";

const ComparacionItems = () => {
  const fetchRegistroTipoAnual = useUserStatsStore(
    (state) => state.fetchRegistroTipoAnual,
  );
  const [datos, setDatos] = useState<RegistroMensualItemsTipoUsuarios[]>();
  useEffect(() => {
    const getData = async () => {
      const data = await fetchRegistroTipoAnual();
      if (data.length != null && data.length > 0) setDatos(data);
    };
    getData();
  }, [fetchRegistroTipoAnual]);

  const tema = useThemeStore((state) => state.tema);
  const lineStrokeL = tema == "dark" ? "#f9fcff" : "#7b8ff7";
  const lineStrokeV = tema == "dark" ? "#ffe2d9" : "#ff5c2e";
  const GeneralStroke = tema == "dark" ? "#f9fcff" : "#645fd5";

  return (
    <figure
      className="charts flex flex-col gap-4"
      aria-labelledby="chart-title"
    >
      <figcaption>
        <h2
          id="chart-title"
          className="text-xl font-semibold text-center md:text-left"
        >
          Actividad Anual: Libros vs Videojuegos
        </h2>
      </figcaption>
      <div
        className="w-full"
        role="img"
        aria-label="Gráfico de barras que compara la cantidad de libros y videojuegos completados mes a mes durante el año actual."
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={datos}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
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
              itemStyle={{ color: tema === "dark" ? "#accbff" : "#261f60" }}
              cursor={{ fill: tema === "dark" ? "#ffffff20" : "#00000010" }}
            />
            <Bar
              dataKey="libros"
              name="Libros"
              fill={lineStrokeL}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="videojuegos"
              name="Videojuegos"
              fill={lineStrokeV}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
};

export default ComparacionItems;
