import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useAdminStatsStore } from "../../store/useAdminStatsStore";
import { useEffect, useState } from "react";
import { useThemeStore } from "../../store/useThemeStore";

export default function DistribucionGeneros() {
  const fetchDistribucionGeneros = useAdminStatsStore(
    (state) => state.fetchDistribucionGeneros,
  );
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const tema = useThemeStore((state) => state.tema);

  const COLORS =
    tema === "dark"
      ? ["#f0f7ff", "#8efad4", "#ffe6a5", "#ffb3b3", "#d1b3ff", "#ffb3e6"]
      : ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

  useEffect(() => {
    const cargar = async () => {
      const res = await fetchDistribucionGeneros();
      setData(res);
    };
    cargar();
  }, [fetchDistribucionGeneros]);

  return (
    <figure
      className="charts flex flex-col gap-4"
      aria-labelledby="genero-chart-title"
    >
      <figcaption>
        <h2
          id="genero-chart-title"
          className="text-xl font-semibold text-center md:text-left"
        >
          Distribución por Género
        </h2>
      </figcaption>
      <div
        className="h-75 w-full"
        role="img"
        aria-label="Gráfico circular tipo donut que muestra la proporción de cada género en la biblioteca del usuario."
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  tabIndex={-1}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              formatter={(
                value: number | undefined,
                name: string | undefined,
              ) => {
                if (value === undefined || name === undefined) {
                  return ["0", name ?? "Desconocido"];
                }
                const total = data.reduce((acc, curr) => acc + curr.value, 0);
                const percent =
                  total > 0 ? ((value / total) * 100).toFixed(1) : "0";
                return [`${value} elementos (${percent}%)`, name];
              }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}
