import { create } from "zustand";
import { supabase } from "../utils/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";
import type { UsuarioBDInterface } from "../interfaces/UsuarioBDInterface";

interface AuthState {
  user: UsuarioBDInterface | null;
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

      if (session?.user) {
        const { data: usuario } = await supabase
          .from("usuario")
          .select("*, rol(nombre)")
          .ilike("email", session.user.email!)
          .single();

        const role = usuario?.rol?.nombre ?? null;
        set({
          session,
          user: usuario ? { ...session.user, ...usuario } : session.user,
          role,
        });
      }

      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session) {
          const { data: usuario } = await supabase
            .from("usuario")
            .select("*, rol(nombre)")
            .ilike("email", session.user.email!)
            .single();

          set({
            session,
            user: usuario ? { ...session.user, ...usuario } : session.user,
            role: usuario?.rol?.nombre ?? null,
            loading: false,
          });
        } else {
          set({ session: null, user: null, role: null, loading: false });
        }
      });
    } catch (error) {
      console.error("Error initializing auth:", error);
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
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

      if (data.user) {
        const { data: usuario } = await supabase
          .from("usuario")
          .select("*, rol(nombre)")
          .ilike("email", data.user.email!)
          .single();

        set({
          session: data.session,
          user: usuario ? { ...data.user, ...usuario } : data.user,
          role: usuario?.rol?.nombre ?? null,
          loading: false,
        });
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await supabase.auth.signOut();
      set({ session: null, user: null, role: null, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
