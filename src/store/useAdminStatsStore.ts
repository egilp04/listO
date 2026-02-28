import { create } from "zustand";
import { supabase } from "../utils/supabaseClient";
import type {
  TarjetaEstadisticas,
  TarjetaEstadisticasTop,
} from "../interfaces/TarjetasEstadisticasGlobales";
import { meses } from "../utils/constants/Meses";
import type {
  DistribucionGenero,
  GeneroItemRelation,
  RegistroMensual,
} from "../interfaces/Charts";

interface AdminStatsState {
  loading: boolean;
  fetchTarjetasEstadisticas: () => Promise<TarjetaEstadisticas[]>;
  fetchTarjetasEstadisticasTop: () => Promise<TarjetaEstadisticasTop[]>;
  fetchUsuariosPorMes: (mes: string) => Promise<number>;
  fetchRegistroAnual: () => Promise<RegistroMensual[]>;
  fetchDistribucionGeneros: () => Promise<DistribucionGenero[]>;
}

export const useAdminStatsStore = create<AdminStatsState>((set) => ({
  loading: false,
  fetchTarjetasEstadisticas: async () => {
    set({ loading: true });
    try {
      const ahora = new Date();
      const inicioMes = new Date(
        ahora.getFullYear(),
        ahora.getMonth(),
        1,
      ).toISOString();
      const inicioAnio = new Date(ahora.getFullYear(), 0, 1).toISOString();

      const [librosAnio, librosMes, juegosAnio, juegosMes] = await Promise.all([
        supabase
          .from("items")
          .select("*, tipo!inner(nombre)", { count: "exact", head: true })
          .eq("tipo.nombre", "libro")
          .gte("created_at", inicioAnio),
        supabase
          .from("items")
          .select("*, tipo!inner(nombre)", { count: "exact", head: true })
          .eq("tipo.nombre", "libro")
          .gte("created_at", inicioMes),
        supabase
          .from("items")
          .select("*, tipo!inner(nombre)", { count: "exact", head: true })
          .eq("tipo.nombre", "videojuego")
          .gte("created_at", inicioAnio),
        supabase
          .from("items")
          .select("*, tipo!inner(nombre)", { count: "exact", head: true })
          .eq("tipo.nombre", "videojuego")
          .gte("created_at", inicioMes),
      ]);

      return [
        {
          id: 1,
          label: "Libros subidos este año",
          value: librosAnio.count || 0,
        },
        {
          id: 2,
          label: "Libros subidos este mes",
          value: librosMes.count || 0,
        },
        {
          id: 3,
          label: "Videojuegos subidos este año",
          value: juegosAnio.count || 0,
        },
        {
          id: 4,
          label: "Videojuegos subidos este mes",
          value: juegosMes.count || 0,
        },
      ];
    } catch (error) {
      console.error("Error al recuperar contadores de ítems:");
      if (error instanceof Error) console.log(error.stack);
      return [];
    } finally {
      set({ loading: false });
    }
  },

  fetchUsuariosPorMes: async (mes: string) => {
    if (!mes) return -1;
    set({ loading: true });
    try {
      const anioActual = new Date().getFullYear();
      const fechaInicio = `${anioActual}-${mes}-01`;
      const fechaFin = new Date(anioActual, parseInt(mes), 0)
        .toISOString()
        .split("T")[0];

      const { count, error } = await supabase
        .from("usuario")
        .select("*", { count: "exact", head: true })
        .gte("created_at", fechaInicio)
        .lte("created_at", fechaFin);

      if (error) throw error;
      console.log(count);
      return count || 0;
    } catch (error) {
      console.error("Error en fetchUsuariosPorMes:", error);
      return 0;
    } finally {
      set({ loading: false });
    }
  },

  fetchTarjetasEstadisticasTop: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.from("items").select(`
        genero_item (
          genero (
            nombre
          )
        )
      `);

      if (error) throw error;
      const conteo: { [key: string]: number } = {};

      data.forEach((item: any) => {
        const nombre = item.genero_item[0]?.genero?.nombre || "Otros";
        conteo[nombre] = (conteo[nombre] || 0) + 1;
      });

      const topGeneros = Object.entries(conteo)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([nombre]) => nombre);

      return [
        {
          id: 1,
          label: "Géneros más comunes",
          value: topGeneros,
        },
      ];
    } catch (error) {
      console.error("Error al calcular el Top Géneros:");
      if (error instanceof Error) console.log(error.stack);
      return [];
    } finally {
      set({ loading: false });
    }
  },

  fetchRegistroAnual: async () => {
    set({ loading: true });
    try {
      const anioActual = new Date().getFullYear();

      const { data, error } = await supabase
        .from("usuario")
        .select("created_at")
        .gte("created_at", `${anioActual}-01-01`)
        .lte("created_at", `${anioActual}-12-31`);
      if (error) throw error;

      const conteoMeses: { [mes: string]: number } = {};
      meses.forEach((m) => {
        conteoMeses[m.label] = 0;
      });

      data?.forEach((user) => {
        const fecha = new Date(user.created_at);
        const nombreMes = meses[fecha.getMonth()].label;
        conteoMeses[nombreMes]++;
      });

      return meses.map((m) => ({
        name: m.label,
        usuarios: conteoMeses[m.label],
      }));
    } catch (error) {
      console.error("Error en fetchRegistroAnual:");
      if (error instanceof Error) console.log(error.stack);
      return [];
    } finally {
      set({ loading: false });
    }
  },

  fetchDistribucionGeneros: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.from("items").select(`
        genero_item (
          genero (
            nombre
          )
        )
      `);
      if (error) throw error;
      if (!data) return [];

      const conteo: Record<string, number> = {};

      data.forEach((item: any) => {
        const generos = item.genero_item || [];
        generos.forEach((gi: GeneroItemRelation) => {
          const nombre = gi.genero?.nombre || "Sin Género";
          conteo[nombre] = (conteo[nombre] || 0) + 1;
        });
      });

      return Object.entries(conteo).map(([name, value]) => ({
        name,
        value,
      }));
    } catch (error) {
      console.error("Error al recuperar distribución de géneros:");
      if (error instanceof Error) console.log(error.stack);
      return [];
    } finally {
      set({ loading: false });
    }
  },
}));
