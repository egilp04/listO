import { useEffect, useState } from "react";
import Button from "./Button";
import Dialog from "./Dialog";

interface infoInterface {
  nombre: string;
  id: number;
}

const Table = () => {
  const [info, setInfo] = useState<infoInterface[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("src/mock/usuarios.json");
        const datos = await res.json();
        setInfo(datos);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const [show, setShow] = useState(false);

  const deleteDialog = () => {
    setShow(!show);
  };
  return (
    <div>
      <div className="table-admin">
        <div className="flex flex-row w-full">
          <label>Nombre</label>
        </div>
        <div className="flex flex-col">
          {info.map((inf, index) => (
            <div
              className={`rows-table ${index % 2 == 0 ? "bg-primary-100" : "bg-neutral-100"}`}
              key={inf.id}
            >
              <label className="w-full font-bold">{inf.nombre}</label>
              <div className="gap-4 flex flex-row justify-end pr-2">
                <Button>
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
      ></Dialog>
    </div>
  );
};
export default Table;
