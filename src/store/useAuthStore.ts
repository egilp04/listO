import { create } from 'zustand';
import { supabase } from '../utils/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';

interface UserProfile {
    id: number;
    nombre: string;
    email: string;
    // Add other fields from 'usuario' table as needed
}

interface AuthState {
    user: User | null;
    session: Session | null;
    role: string | null;
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
    initialize: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    session: null,
    role: null,
    profile: null,
    loading: true,
    error: null,

    initialize: async () => {
        set({ loading: true });
        try {
            const { data: { session } } = await supabase.auth.getSession();
            let role = null;
            let profile = null;

            if (session?.user?.email) {
                const { data: usuario } = await supabase
                    .from('usuario')
                    .select('*, rol(nombre)')
                    .ilike('email', session.user.email)
                    .single();

                role = usuario?.rol?.nombre ?? null;
                profile = usuario;
            }

            set({ session, user: session?.user ?? null, role, profile, loading: false });

            supabase.auth.onAuthStateChange(async (_event, session) => {
                let role = null;
                let profile = null;
                if (session?.user?.email) {
                    const { data: usuario } = await supabase
                        .from('usuario')
                        .select('*, rol(nombre)')
                        .ilike('email', session.user.email)
                        .single();

                    role = usuario?.rol?.nombre ?? null;
                    profile = usuario;
                }
                set({ session, user: session?.user ?? null, role, profile });
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
            let profile = null;
            if (data.user?.email) {
                const { data: usuario } = await supabase
                    .from('usuario')
                    .select('*, rol(nombre)')
                    .ilike('email', data.user.email)
                    .single();

                role = usuario?.rol?.nombre ?? null;
                profile = usuario;
            }

            set({ session: data.session, user: data.user, role, profile, loading: false });
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
            set({ session: null, user: null, role: null, profile: null, loading: false });
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },
}));
