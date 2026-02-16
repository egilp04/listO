import { create } from "zustand";
import { supabase } from "../utils/supabaseClient";
import type {
  TarjetaEstadisticas,
  TarjetaEstadisticasTop,
} from "../interfaces/TarjetasEstadisticasGlobales";

interface AdminStatsState {
  loading: boolean;
  fetchTarjetasEstadisticas: () => Promise<TarjetaEstadisticas[]>;
  fetchTarjetasEstadisticasTop: () => Promise<TarjetaEstadisticasTop[]>;
  fetchUsuariosPorMes: (mes: string) => Promise<number>;
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
    if (!mes) return 0;
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
      const { data, error } = await supabase
        .from("items")
        .select("genero(nombre)");

      if (error) throw error;
      const conteo: Record<string, number> = {};

      data.forEach((item: any) => {
        const nombre = item.genero?.nombre || "Otros";
        conteo[nombre] = (conteo[nombre] || 0) + 1;
      });

      const topGeneros = Object.entries(conteo)
        .sort(([, a], [, b]) => b - a)
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
}));
