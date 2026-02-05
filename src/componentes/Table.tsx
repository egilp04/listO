import { useEffect, useState } from "react";
import Button from "./Button";

const Table = () => {
  const [info, setInfo] = useState<string[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("src/mock/usuarios.json");
      const datos = await res.json();
      setInfo(datos);
    };
    getData();
  }, []);
  return (
    <div className="flex flex-col gap-2 md:gap-6 max-h-100 overflow-auto  p-6">
      <div className="flex flex-row w-full">
        <label>Nombre</label>
      </div>
      <div className="flex flex-col">
        {info.map((inf, index) => (
          <div
            className={`items-center pt-4 pb-4 border border-neutral-50 flex flex-row ${index % 2 == 0 ? "bg-primary-100" : "bg-neutral-100"}`}
          >
            <label className="w-full font-bold">{inf.nombre}</label>
            <div className="gap-4 flex flex-row justify-end pr-2">
              <Button>
                <span>Editar</span>
              </Button>
              <Button className="bg-danger-300">
                <span className="text-black">Eliminar</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Table;
