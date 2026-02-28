import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAdminStatsStore } from "../../store/useAdminStatsStore";
import { useEffect, useState } from "react";
import type { RegistroMensual } from "../../interfaces/Charts";
import { useThemeStore } from "../../store/useThemeStore";

export default function RegistroUsuarios() {
  const tema = useThemeStore((state) => state.tema);

  const fetchRegistroAnual = useAdminStatsStore(
    (state) => state.fetchRegistroAnual,
  );
  const [datosRegistroUser, setDatosRegistroUser] = useState<RegistroMensual[]>(
    [],
  );

  useEffect(() => {
    const cargarDatosAnuales = async () => {
      try {
        const data = await fetchRegistroAnual();
        setDatosRegistroUser(data);
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
    <div className="p-10 bg-white dark:bg-primary-1000 rounded-sm shadow-elevation-3 flex flex-col gap-10 w-full">
      <h2 className="text-primary-700 dark:text-primary-50">
        Registro anual de Usuarios
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={datosRegistroUser}>
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
            cursor={{ stroke: GeneralStroke, strokeWidth: 1 }}
          />
          <Line
            type="monotone"
            dataKey="usuarios"
            stroke={lineStroke}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
