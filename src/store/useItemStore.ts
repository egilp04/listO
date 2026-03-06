import { create } from "zustand";
import { supabase } from "../utils/supabaseClient";
import type { Tipo, Genero, ItemBiblioteca } from "../interfaces/ItemInterfaces";

interface ItemState {
    tipos: Tipo[];
    generos: Genero[];
    items: ItemBiblioteca[];
    loading: boolean;
    guardando: boolean;
    fetchTipos: () => Promise<void>;
    fetchGeneros: () => Promise<void>;
    fetchItems: (idUsuario: string) => Promise<void>;
    subirImagen: (archivo: File) => Promise<string | null>;
    eliminarItem: (idItem: string, imagenUrl: string | null) => Promise<boolean>;
    guardarItem: (
        datos: {
            titulo: string;
            informacion: string;
            valoracion: number;
            id_tipo: string;
        },
        generosSeleccionados: string[],
        archivo: File | null,
        idUsuario: string,
        idItemEditando?: string
    ) => Promise<boolean>;
    idUltimoItemAñadido: string | null;
    setIdUltimoItemAñadido: (id: string | null) => void;
}

export const useItemStore = create<ItemState>((set, get) => ({
    tipos: [],
    generos: [],
    items: [],
    loading: false,
    guardando: false,
    idUltimoItemAñadido: null,

    setIdUltimoItemAñadido: (id) => set({ idUltimoItemAñadido: id }),

    fetchTipos: async () => {
        set({ loading: true });
        try {
            const { data, error } = await supabase.from("tipo").select("*");
            if (error) throw error;
            set({ tipos: data || [] });
        } catch (error) {
            console.error(error);
        } finally {
            set({ loading: false });
        }
    },

    fetchGeneros: async () => {
        set({ loading: true });
        try {
            const { data, error } = await supabase.from("genero").select("*");
            if (error) throw error;
            set({ generos: data || [] });
        } catch (error) {
            console.error(error);
        } finally {
            set({ loading: false });
        }
    },

    fetchItems: async (idUsuario: string) => {
        set({ loading: true });
        try {
            const { data, error } = await supabase
                .from("items")
                .select("*, tipo(nombre), genero_item(genero(id_genero, nombre))")
                .eq("id_usuario", idUsuario);

            if (error) throw error;

            const itemsMapeados: ItemBiblioteca[] = (data || []).map((item: any) => ({
                id_item: item.id_item,
                imagen: item.imagen_url || "",
                id_tipo: item.id_tipo || "",
                tipo: item.tipo?.nombre || "",
                generosIds: (item.genero_item || []).map((gi: any) => gi.genero?.id_genero).filter(Boolean),
                generos: (item.genero_item || []).map((gi: any) => gi.genero?.nombre).filter(Boolean),
                informacion: item.titulo || "",
                descripcion: item.informacion || "",
                valoracion: item.valoracion || 0,
            }));

            set({ items: itemsMapeados });
        } catch (error) {
            console.error(error);
        } finally {
            set({ loading: false });
        }
    },

    subirImagen: async (archivo: File) => {
        const nombreArchivo = `${Date.now()}_${archivo.name}`;
        const { error } = await supabase.storage
            .from("portadas")
            .upload(nombreArchivo, archivo);

        if (error) throw error;

        const { data: urlData } = supabase.storage
            .from("portadas")
            .getPublicUrl(nombreArchivo);

        return urlData?.publicUrl || null;
    },

    eliminarItem: async (idItem: string, imagenUrl: string | null) => {
        set({ guardando: true });
        try {
            const { error: errorGeneros } = await supabase
                .from("genero_item")
                .delete()
                .eq("id_item", idItem);

            if (errorGeneros) throw errorGeneros;

            if (imagenUrl && imagenUrl.includes("portadas/")) {
                const nombreArchivo = imagenUrl.split("portadas/")[1];
                if (nombreArchivo) {
                    await supabase.storage.from("portadas").remove([nombreArchivo]);
                }
            }

            const { error: errorItem } = await supabase.from("items").delete().eq("id_item", idItem);

            if (errorItem) throw errorItem;

            set((state) => ({ items: state.items.filter((i) => i.id_item !== idItem) }));
            return true;
        } catch (error) {
            console.error("Error al eliminar item:", error);
            return false;
        } finally {
            set({ guardando: false });
        }
    },

    guardarItem: async (datos, generosSeleccionados, archivo, idUsuario, idItemEditando) => {
        set({ guardando: true });
        try {
            let imagenUrl: string | undefined = undefined;

            if (idItemEditando && archivo) {
                const { data: itemAntiguo } = await supabase
                    .from("items")
                    .select("imagen_url")
                    .eq("id_item", idItemEditando)
                    .single();

                if (itemAntiguo?.imagen_url && itemAntiguo.imagen_url.includes("portadas/")) {
                    const nombreArchivoAntiguo = itemAntiguo.imagen_url.split("portadas/")[1];
                    if (nombreArchivoAntiguo) {
                        await supabase.storage.from("portadas").remove([nombreArchivoAntiguo]);
                    }
                }
            }

            if (archivo) {
                const url = await get().subirImagen(archivo);
                if (url) imagenUrl = url;
            }

            let idDelItem = idItemEditando;

            const datosAEscribir: any = {
                titulo: datos.titulo,
                informacion: datos.informacion,
                valoracion: datos.valoracion,
                id_tipo: datos.id_tipo,
                id_usuario: idUsuario,
            };

            if (imagenUrl !== undefined) {
                datosAEscribir.imagen_url = imagenUrl;
            }

            if (idItemEditando) {
                const { error: errorItem } = await supabase
                    .from("items")
                    .update(datosAEscribir)
                    .eq("id_item", idItemEditando);

                if (errorItem) throw errorItem;

                const { error: errorBorrado } = await supabase
                    .from("genero_item")
                    .delete()
                    .eq("id_item", idItemEditando);

                if (errorBorrado) throw errorBorrado;
            } else {
                const { data: item, error: errorItem } = await supabase
                    .from("items")
                    .insert(datosAEscribir)
                    .select("id_item")
                    .single();

                if (errorItem) throw errorItem;
                idDelItem = item.id_item;
                get().setIdUltimoItemAñadido(idDelItem ?? null);
            }

            const relaciones = generosSeleccionados.map((id_genero) => ({
                id_item: idDelItem,
                id_genero,
            }));

            const { error: errorGenero } = await supabase
                .from("genero_item")
                .insert(relaciones);

            if (errorGenero) throw errorGenero;

            await get().fetchItems(idUsuario);

            return true;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            set({ guardando: false });
        }
    },
}));
