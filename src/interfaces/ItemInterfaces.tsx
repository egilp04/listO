export interface Tipo {
    id_tipo: string;
    nombre: string;
}

export interface Genero {
    id_genero: string;
    nombre: string;
    descripcion: string;
    id_tipo: string | null;
}

export interface ItemBiblioteca {
    id_item: string;
    imagen: string;
    tipo: string;
    generosIds: string[];
    generos: string[];
    informacion: string;
    descripcion: string;
    valoracion: number;
}
