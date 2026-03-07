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
    <figure
      className="charts flex flex-col gap-4"
      aria-labelledby="registro-usuarios-title"
    >
      <figcaption>
        <h2
          id="registro-usuarios-title"
          className="text-xl font-bold text-center md:text-left"
        >
          Registro anual de Usuarios
        </h2>
      </figcaption>

      <div
        className="w-full h-[300px]"
        role="img"
        aria-label="Gráfico de líneas que muestra la evolución mensual de nuevos usuarios registrados durante el año."
      >
        <ResponsiveContainer width="100%" height="100%">
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
              name="Usuarios Registrados"
              stroke={lineStroke}
              strokeWidth={3}
              dot={{ r: 4, fill: lineStroke }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}
