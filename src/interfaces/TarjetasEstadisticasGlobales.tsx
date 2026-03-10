export interface TarjetaEstadisticas {
  id: number;
  label: string;
  value: number;
}

export interface TarjetaEstadisticasTop {
  id: number;
  label: string;
  value: string[];
}

interface GeneroObjeto {
  nombre: string;
}

export interface ItemGenero {
  genero: GeneroObjeto | GeneroObjeto[] | null;
}
