import { useState } from "react";
import Button from "./Button";
import Dialog from "./Dialog";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import type { infoInterface } from "../interfaces/infoInterface";
import { useNotificationStore } from "../store/useNotificationStore";
import { useGestionAdminStore } from "../store/useGestionAdminStore";

interface TableInterface {
  tipoItem: string;
  valorFiltro: string;
}

const Table = ({ tipoItem, valorFiltro }: TableInterface) => {
  const setNotificacion = useNotificationStore(
    (state) => state.setNotificacion,
  );
  const { usuarios, generos, fetchGeneros, fetchUsuarios } =
    useGestionAdminStore();

  const [itemEliminar, setItemEliminar] = useState<infoInterface>();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const datos = tipoItem == "usuario" ? usuarios : generos;
  const datosAMostrar = datos.filter((item) =>
    item.nombre.toLowerCase().includes(valorFiltro.toLowerCase()),
  );

  const deleteItem = async (borrar: boolean) => {
    setShow(false);
    if (!borrar || !itemEliminar) return;
    try {
      if (tipoItem === "usuario") {
        await desactivarUsuario();
      } else {
        await borrarGenero();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const borrarGenero = async () => {
    console.log("item eliminar", itemEliminar);
    try {
      const { error } = await supabase
        .from("genero")
        .delete()
        .eq("id_genero", itemEliminar?.id_genero);
      if (error) throw error;
      setNotificacion("Género eliminado correctamente", "exito");
      await fetchGeneros();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al borrar el génro:", error.message);
      } else {
        console.error("Ocurrió un error inesperado:", error);
      }
      setNotificacion("No se pudo eliminar el género", "error");
    }
  };

  const desactivarUsuario = async () => {
    console.log("item eliminar", itemEliminar);
    try {
      const { error } = await supabase
        .from("usuario")
        .update({ estado: "inactivo" })
        .eq("id_usuario", itemEliminar?.id_usuario);

      if (error) throw error;
      setNotificacion("Usuario desactivado correctamente", "exito");
      await fetchUsuarios();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al borrar el usuario:", error.message);
      } else {
        console.error("Ocurrió un error inesperado:", error);
      }
      setNotificacion("No se pudo eliminar al usuario", "error");
    }
  };

  const openDialog = (inf: infoInterface) => {
    setItemEliminar(inf);
    setShow(!show);
  };

  const handleClick = (item: infoInterface) => {
    if (tipoItem == "usuario") navigate("/miperfil", { state: { item: item } });
    else
      navigate("/genero", {
        state: { crear: false, item: item },
      });
  };

  return (
    <div>
      <div className="table-admin">
        <div className="flex flex-row w-full">
          <label className="dark:text-primary-50">Nombre</label>
        </div>
        <div className="flex flex-col">
          {datosAMostrar.map((inf) => (
            <div
              className="rows-table odd:bg-primary-100 dark:odd:bg-primary-1000 even:bg-neutral-100 dark:even:bg-primary-850 dark:even:text-primary-1100 dark:text-primary-50"
              key={inf.id}
            >
              <label className="w-full font-bold ">{inf.nombre}</label>
              {tipoItem == "genero" && (
                <label className="w-full font-bold ">
                  {inf.tipo?.nombre || "Sin tipo"}
                </label>
              )}
              <div className="gap-4 flex flex-row justify-end pr-2">
                <Button
                  className="dark:bg-primary-950"
                  onClick={() => {
                    handleClick(inf);
                  }}
                >
                  <span className="dark:text-primary-50">Editar</span>
                </Button>
                <Button
                  className="bg-danger-500"
                  onClick={() => {
                    openDialog(inf);
                  }}
                >
                  <span className="text-black">Eliminar</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Dialog
        onClose={deleteItem}
        titulo="Eliminar"
        descripcion="Vas a proceder a eliminar el género selccionado, estás seguro?"
        show={show}
      ></Dialog>
    </div>
  );
};
export default Table;
