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
import type { RegistroMensual } from "../../interfaces/ChartsAdmin";

export default function RegistroUsuarios() {
  const { fetchRegistroAnual } = useAdminStatsStore();
  const [datosRegistroUser, setDatosRegistroUser] = useState<RegistroMensual[]>(
    [],
  );

  useEffect(() => {
    const cargarDatosAnuales = async () => {
      try {
        const data = await fetchRegistroAnual();
        setDatosRegistroUser(data);
        console.log(data);
      } catch (e) {
        console.error("Error al cargar datos del gráfico:");
        if (e instanceof Error) console.log(e.stack);
      }
    };
    cargarDatosAnuales();
  }, [fetchRegistroAnual]);

  return (
    <div className="p-10 bg-white rounded-sm shadow-elevation-3 flex flex-col gap-10">
      <h2 className="text-primary-700">Registro anual de Usuarios</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={datosRegistroUser}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="usuarios"
            stroke="#7b8ff7"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
