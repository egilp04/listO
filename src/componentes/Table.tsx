import { useEffect, useState } from "react";
import Button from "./Button";
import Dialog from "./Dialog";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import type { infoInterface } from "../interfaces/infoInterface";

interface TableInterface {
  tipoItem: string;
  valorFiltro: string;
}

const Table = ({ tipoItem, valorFiltro }: TableInterface) => {
  const [info, setInfo] = useState<infoInterface[]>([]);
  const obtenerUsuarios = async () => {
    try {
      const { data, error } = await supabase.from("usuario").select("*");
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
      if (tipoItem == "usuario") await obtenerUsuarios();
      else await obtenerGeneros();
    };
    getData();
  }, [tipoItem]);

  const datosAMostrar = info.filter((item) =>
    item.nombre.toLowerCase().includes(valorFiltro.toLowerCase()),
  );

  const [show, setShow] = useState(false);
  const deleteDialog = () => {
    setShow(!show);
  };

  const navigate = useNavigate();

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
          <label>Nombre</label>
        </div>
        <div className="flex flex-col">
          {datosAMostrar.map((inf, index) => (
            <div
              className={`rows-table ${index % 2 == 0 ? "bg-primary-100" : "bg-neutral-100"}`}
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
                <Button className="bg-danger-300" onClick={deleteDialog}>
                  <span className="text-black">Eliminar</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Dialog
        onClose={deleteDialog}
        titulo="Eliminar"
        descripcion="Vas a proceder a eliminar el género selccionado, estás seguro?"
        show={show}
        tipoItem={tipoItem}
      ></Dialog>
    </div>
  );
};
export default Table;
