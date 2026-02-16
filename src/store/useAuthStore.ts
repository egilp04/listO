import { create } from "zustand";
import { supabase } from "../utils/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  role: string | null;
  loading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  role: null,
  loading: true,
  error: null,
  setUser: (user) => set({ user }),

  initialize: async () => {
    set({ loading: true });
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      let role = null;
      let datosCompletosUsuario = null;

      if (session?.user?.email) {
        const { data: usuario } = await supabase
          .from("usuario")
          .select("*, rol(nombre)")
          .ilike("email", session.user.email)
          .single();

        // @ts-ignore

        role = usuario?.rol?.nombre ?? null;
        datosCompletosUsuario = {
          ...session.user,
          ...usuario,
        };
      }

      set({
        session,
        user: datosCompletosUsuario || session?.user || null,
        role,
        loading: false,
      });

      supabase.auth.onAuthStateChange(async (_event, session) => {
        let role = null;
        let datosCompletosUsuario = null;

        if (session?.user?.email) {
          const { data: usuario } = await supabase
            .from("usuario")
            .select("*, rol(nombre)")
            .ilike("email", session.user.email)
            .single();

          // @ts-ignore
          role = usuario?.rol?.nombre ?? null;
          datosCompletosUsuario = {
            ...session.user,
            ...usuario,
          };
        }
        set({
          session,
          user: datosCompletosUsuario || session?.user || null,
          role,
        });
      });
    } catch (error) {
      console.error("Error initializing auth:", error);
      set({ loading: false, error: (error as Error).message });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      let role = null;
      let datosCompletosUsuario = null;

      if (data.user?.email) {
        const { data: usuario } = await supabase
          .from("usuario")
          .select("*, rol(nombre)")
          .ilike("email", data.user.email)
          .single();

        // @ts-ignore
        role = usuario?.rol?.nombre ?? null;
        datosCompletosUsuario = {
          ...data.user,
          ...usuario,
        };
      }

      console.log(datosCompletosUsuario);

      set({
        session: data.session,
        user: datosCompletosUsuario || data.user,
        role,
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ session: null, user: null, role: null, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
