import { useEffect, useState } from "react";

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
    <div className="flex flex-col">
      <div className="flex flex-row">
        <label>Nombre:</label>
      </div>
      <div className="flex flex-col">
        {info.map((inf, index) => (
          <div
            className={`border border-neutral-50 ${index % 2 == 0 ? "bg-primary-100" : "bg-neutral-100"}`}
          >
            <label>{inf.nombre}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Table;
