/**
 * Store de estadísticas de usuario con integración de Auth y Supabase.
 * @author Evelia Gil Paredes
 */
import { create } from "zustand";
import { supabase } from "../utils/supabaseClient";

import type {
  TarjetaEstadisticas,
  TarjetaEstadisticasTop,
} from "../interfaces/TarjetasEstadisticasGlobales";
import { useAuthStore } from "./useAuthStore";

interface UserStatsState {
  loading: boolean;
  fetchTarjetasEstadisticas: () => Promise<TarjetaEstadisticas[]>;
  fetchTarjetasEstadisticasTop: () => Promise<TarjetaEstadisticasTop[]>;
  fetchItemsPorMes: (mes: string) => Promise<number>;
  fetchItemsTotales: () => Promise<number>;
  fetchTopPorTipo: (tipoNombre: string) => Promise<TarjetaEstadisticasTop[]>;
}

export const useUserStatsStore = create<UserStatsState>((set) => ({
  loading: false,

  fetchTarjetasEstadisticas: async () => {
    const usuarioId = useAuthStore.getState().user?.id;
    if (!usuarioId) return [];

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
          .eq("id_usuario", usuarioId)
          .eq("tipo.nombre", "libro")
          .gte("created_at", inicioAnio),
        supabase
          .from("items")
          .select("*, tipo!inner(nombre)", { count: "exact", head: true })
          .eq("id_usuario", usuarioId)
          .eq("tipo.nombre", "libro")
          .gte("created_at", inicioMes),
        supabase
          .from("items")
          .select("*, tipo!inner(nombre)", { count: "exact", head: true })
          .eq("id_usuario", usuarioId)
          .eq("tipo.nombre", "videojuego")
          .gte("created_at", inicioAnio),
        supabase
          .from("items")
          .select("*, tipo!inner(nombre)", { count: "exact", head: true })
          .eq("id_usuario", usuarioId)
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

  fetchItemsPorMes: async (mes: string) => {
    const usuarioId = useAuthStore.getState().user?.id;
    if (!mes || !usuarioId) return 0;

    set({ loading: true });
    try {
      const anioActual = new Date().getFullYear();
      const fechaInicio = `${anioActual}-${mes}-01`;
      const fechaFin = new Date(anioActual, parseInt(mes), 0)
        .toISOString()
        .split("T")[0];

      const { count, error } = await supabase
        .from("items")
        .select("*", { count: "exact", head: true })
        .eq("id_usuario", usuarioId)
        .gte("created_at", fechaInicio)
        .lte("created_at", fechaFin);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error("Error en fetchItemsPorMes:");
      if (error instanceof Error) console.log(error.stack);
      return 0;
    } finally {
      set({ loading: false });
    }
  },

  fetchItemsTotales: async () => {
    const usuarioId = useAuthStore.getState().user?.id;
    console.log(usuarioId);
    if (!usuarioId) return 0;

    set({ loading: true });
    try {
      const { count, error } = await supabase
        .from("items")
        .select("*", { count: "exact", head: true })
        .eq("id_usuario", usuarioId);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error("Error al calcular ítems totales:");
      if (error instanceof Error) console.log(error.stack);
      return 0;
    } finally {
      set({ loading: false });
    }
  },

  fetchTarjetasEstadisticasTop: async () => {
    const usuarioId = useAuthStore.getState().user?.id;
    if (!usuarioId) return [];

    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from("items")
        .select(
          `
          genero_item (
            genero (
              nombre
            )
          )
        `,
        )
        .eq("id_usuario", usuarioId);

      if (error) throw error;

      const conteo: { [key: string]: number } = {};

      data?.forEach((item: any) => {
        const generos = item.genero_item || [];
        generos.forEach((g: any) => {
          const nombre = g.genero?.nombre || "Otros";
          conteo[nombre] = (conteo[nombre] || 0) + 1;
        });
      });

      // const topGeneros = Object.entries(conteo)
      //   .sort(([, a], [, b]) => b - a)
      //   .slice(0, 3)
      //   .map(([nombre]) => nombre);
      const topGeneros = Object.entries(conteo)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([nombre]) => nombre);

      return [
        {
          id: 1,
          label: "Géneros más comunes",
          value: topGeneros.length > 0 ? topGeneros : ["Sin datos"],
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
  fetchTopPorTipo: async (tipoNombre: string) => {
    const usuarioId = useAuthStore.getState().user?.id;
    if (!usuarioId) return [];

    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from("items")
        .select(
          `
        id_item,
        titulo,        
        valoracion,
        tipo (nombre)
      `,
        )
        .eq("id_usuario", usuarioId)
        .eq("tipo.nombre", tipoNombre)
        .order("valoracion", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;

      return [
        {
          id: 1,
          label: `Top 3 ${tipoNombre}s mejor valorados`,
          value: data?.map((item) => item.titulo) || [],
        },
      ];
    } catch (error) {
      console.error("Error al obtener los mejores valorados:");
      if (error instanceof Error) console.log(error.stack);
      return [];
    } finally {
      set({ loading: false });
    }
  },
}));
