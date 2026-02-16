import { create } from "zustand";
import { supabase } from "../utils/supabaseClient";
import type { infoInterface } from "../interfaces/infoInterface";

interface DataState {
  usuarios: infoInterface[];
  generos: infoInterface[];
  loading: boolean;
  fetchUsuarios: () => Promise<void>;
  fetchGeneros: () => Promise<void>;
  clearData: () => void;
}

export const useGestionAdminStore = create<DataState>((set) => ({
  usuarios: [],
  generos: [],
  loading: false,

  fetchUsuarios: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("usuario")
      .select("*, rol!inner(nombre)")
      .eq("estado", "activo")
      .neq("rol.nombre", "administrador");

    if (!error) set({ usuarios: data || [], loading: false });
    else set({ loading: false });
  },

  fetchGeneros: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("genero")
      .select("*, tipo!inner(nombre, id_tipo)");

    if (!error) set({ generos: data || [], loading: false });
    else set({ loading: false });
  },

  clearData: () => set({ usuarios: [], generos: [] }),
}));
