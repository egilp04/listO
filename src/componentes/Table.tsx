import { lazy, useState, Suspense } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import type { infoInterface } from "../interfaces/infoInterface";
import { useNotificationStore } from "../store/useNotificationStore";
import { useGestionAdminStore } from "../store/useGestionAdminStore";
import { useTranslation } from "react-i18next";
const Dialog = lazy(() => import("./Dialog"));

interface TableInterface {
  tipoItem: string;
  valorFiltro: string;
}

const Table = ({ tipoItem, valorFiltro }: TableInterface) => {
  const { t } = useTranslation();
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
      setNotificacion(t("gestionAdmin.notifGeneroEliminado"), "exito");
      await fetchGeneros();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al borrar el género:", error.message);
      } else {
        console.error("Ocurrió un error inesperado:", error);
      }
      setNotificacion(t("gestionAdmin.notifErrorEliminarGenero"), "error");
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
      setNotificacion(t("gestionAdmin.notifUsuarioDesactivado"), "exito");
      await fetchUsuarios();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al borrar el usuario:", error.message);
      } else {
        console.error("Ocurrió un error inesperado:", error);
      }
      setNotificacion(t("gestionAdmin.notifErrorEliminarUsuario"), "error");
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
    <section className="w-full">
      <table className="table-admin">
        <thead className="flex flex-row w-full pl-2 md:pl-6">
          <tr>
            <th>
              <label className="dark:text-primary-50">
                {t("gestionAdmin.tablaColumna")}
              </label>
            </th>
          </tr>
        </thead>

        <tbody className="flex flex-col">
          {datosAMostrar.map((inf, index) => (
            <tr
              className="justify-between rows-table odd:bg-primary-100 dark:odd:bg-primary-1000 even:bg-neutral-100 dark:even:bg-primary-850 dark:even:text-primary-1100 dark:text-primary-50"
              key={`${inf.id}-${index}`}
            >
              <td className="flex-1 min-w-0 pr-4">
                <label
                  aria-label={inf.nombre}
                  className="block w-full font-bold truncate"
                  title={inf.nombre}
                >
                  {inf.nombre}
                </label>
              </td>

              {tipoItem == "genero" && (
                <td className="flex-1 flex justify-center min-w-0 pr-4">
                  <label
                    title={inf.tipo?.nombre || t("gestionAdmin.sinTipo")}
                    aria-label={inf.tipo?.nombre || t("gestionAdmin.sinTipo")}
                    className="block max-w-full font-bold truncate"
                  >
                    {inf.tipo?.nombre || t("gestionAdmin.sinTipo")}
                  </label>
                </td>
              )}

              <td className="gap-4 flex flex-1 flex-col md:flex-row justify-end">
                <Button
                  className="dark:bg-primary-950"
                  onClick={() => {
                    handleClick(inf);
                  }}
                >
                  <span className="dark:text-primary-50">
                    {t("gestionAdmin.botonEditar")}
                  </span>
                </Button>
                <Button
                  variant="secundario"
                  onClick={() => {
                    openDialog(inf);
                  }}
                >
                  <span className="text-black">
                    {t("gestionAdmin.botonEliminar")}
                  </span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Suspense
        fallback={
          <div className="text-primary-1100 dark:text-primary-50 text-center">
            <span>{t("gestionAdmin.cargandoModal")}</span>
          </div>
        }
      >
        {show && (
          <Dialog
            onClose={deleteItem}
            titulo={t("gestionAdmin.dialogTituloEliminar")}
            descripcion={t("gestionAdmin.dialogDescripcionEliminar", {
              tipo: tipoItem,
            })}
            textoConfirmar={t("dialog.botonEliminar")}
            show={show}
          />
        )}
      </Suspense>
    </section>
  );
};
export default Table;
