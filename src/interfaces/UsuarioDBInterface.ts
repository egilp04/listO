import type { User } from "@supabase/supabase-js";

export interface UsuarioDBInterface extends User {
    nombre?: string;
    apellidos?: string;
    fechanacimiento?: string;
    estado?: string;
    id_rol?: string;
    id_usuario?: string;
}
