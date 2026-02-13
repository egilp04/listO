export interface infoInterface {
  id: number;
  nombre: string;
  id_usuario?: string;
  apellidos?: string;
  fechanacimiento?: string;
  estado?: boolean;
  id_rol?: string;
  email?: string;
  id_genero?: string;
  descripcion?: string;
  tipo?: {
    nombre: string;
    id_tipo: string;
  };
}
