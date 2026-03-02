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
    <div className="charts">
      <h2>Actividad Anual: Libros vs Videojuegos</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={datos}>
          <CartesianGrid strokeDasharray="3 3" stroke={GeneralStroke} />
          <XAxis dataKey="name" stroke={GeneralStroke} />
          <YAxis stroke={GeneralStroke} />
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
          <Bar dataKey="libros" fill={lineStrokeL} />
          <Bar dataKey="videojuegos" fill={lineStrokeV} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparacionItems;
