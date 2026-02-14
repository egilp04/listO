import { useEffect, useState } from "react";
import Button from "./Button";
import Dialog from "./Dialog";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import type { infoInterface } from "../interfaces/infoInterface";
import { useNotificationStore } from "../store/useNotificationStore";

interface TableInterface {
  tipoItem: string;
  valorFiltro: string;
}

const Table = ({ tipoItem, valorFiltro }: TableInterface) => {
  const { setNotificacion } = useNotificationStore();
  const [info, setInfo] = useState<infoInterface[]>([]);
  const [itemEliminar, setItemEliminar] = useState<infoInterface>();
  const obtenerUsuarios = async () => {
    try {
      const { data, error } = await supabase
        .from("usuario")
        .select("*, rol!inner(nombre)")
        .eq("estado", "activo")
        .neq("rol.nombre", "administrador");
      if (error) throw error;
      setInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerGeneros = async () => {
    try {
      const { data, error } = await supabase
        .from("genero")
        .select("*, tipo(nombre, id_tipo)");

      if (error) throw error;
      setInfo(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en la csonsulta:", error.message);
      } else {
        console.error("Ocurrió un error inesperado:", error);
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      setInfo([]);
      if (tipoItem === "usuario") {
        await obtenerUsuarios();
      } else {
        await obtenerGeneros();
      }
    };

    getData();
  }, [tipoItem]);

  const datosAMostrar = info.filter((item) =>
    item.nombre.toLowerCase().includes(valorFiltro.toLowerCase()),
  );

  const [show, setShow] = useState(false);
  const deleteItem = async (borrar: boolean) => {
    console.log(borrar);
    setShow(false);
    if (!borrar) {
      setNotificacion("Acción cancelada", "exito");
      return;
    }
    if (!itemEliminar) {
      setNotificacion("Error: No se ha seleccionado ningún elemento", "error");
      return;
    }
    if (tipoItem === "usuario") {
      await desactivarUsuario();
      await obtenerUsuarios();
    } else {
      await borrarGenero();
      await obtenerGeneros();
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

      await obtenerUsuarios();
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

  const navigate = useNavigate();

  const handleClick = (item: infoInterface) => {
    console.log(item);
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
          <label>Nombre</label>
        </div>
        <div className="flex flex-col">
          {datosAMostrar.map((inf) => (
            <div
              className="rows-table odd:bg-primary-100 even:bg-neutral-100"
              key={inf.id}
            >
              <label className="w-full font-bold">{inf.nombre}</label>
              {tipoItem == "genero" && (
                <label className="w-full font-bold">
                  {inf.tipo?.nombre || "Sin tipo"}
                </label>
              )}
              <div className="gap-4 flex flex-row justify-end pr-2">
                <Button
                  onClick={() => {
                    handleClick(inf);
                  }}
                >
                  <span>Editar</span>
                </Button>
                <Button
                  className="bg-danger-300"
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
