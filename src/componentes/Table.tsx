import { useEffect, useState } from "react";
import Button from "./Button";
import Dialog from "./Dialog";
import { useNavigate } from "react-router-dom";

interface infoInterface {
  nombre: string;
  id: number;
}

interface TableInterface {
  tipoItem: string;
  valorFiltro: string;
}

const Table = ({ tipoItem, valorFiltro }: TableInterface) => {
  const [info, setInfo] = useState<infoInterface[]>([]);
  useEffect(() => {
    const getData = async () => {
      const ruta =
        tipoItem == "usuario"
          ? "src/mock/usuarios.json"
          : "src/mock/generos.json";
      console.log(ruta);
      try {
        const res = await fetch(ruta);
        if (!res.ok) throw new Error(res.statusText);
        const datos = await res.json();
        setInfo(datos);
      } catch (error) {
        console.log(error);
      }
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

  const handleClick = () => {
    if (tipoItem == "usuario") navigate("/miperfil");
    else navigate("/genero", { state: { crear: false } });
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
              <div className="gap-4 flex flex-row justify-end pr-2">
                <Button onClick={handleClick}>
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
