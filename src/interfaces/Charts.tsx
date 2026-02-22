export interface RegistroMensual {
  name: string;
  usuarios: number;
}

export interface RegistroMensualItemsUsuarios {
  name: string;
  items: number;
}

export interface DistribucionGenero {
  name: string;
  value: number;
}

export interface GeneroData {
  nombre: string;
}
export interface GeneroItemRelation {
  genero: GeneroData | null;
}
export interface ItemConGeneros {
  genero_item: GeneroItemRelation[];
}
