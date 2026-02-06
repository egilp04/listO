interface CardEstadisticasInterface {
  conteo?: string | number;
  label: string;
  variante: "total" | "individual" | "topUser" | "topAdmin";
  imagen?: string;
  totalTop?: string[];
}

const CardEstadisticas = ({
  conteo,
  label,
  imagen,
  variante,
  totalTop = [],
}: CardEstadisticasInterface) => {
  console.log(totalTop);
  if (variante === "individual") {
    return (
      <div className="tarjeta-estadisticas tarjeta-individual-estadisticas">
        <div className="flex flex-row justify-between">
          <div className="numero-estadistica-individual">
            <span>{conteo}</span>
          </div>
          <div className="numero-estadistica-individual h-10 w-10">
            <img src={imagen} className="w-full h-full"></img>
          </div>
        </div>
        <label className="flex py-3 w-full">{label}</label>
      </div>
    );
  }

  if (variante == "topUser") {
    return (
      <div className="tarjeta-estadisticas tarjeta-estadisticas-top tarjeta-estadisticas-top-user">
        <div className="flex flex-row gap-4 items-center p-2">
          <div className="h-8 w-8 md:h-10 md:w-10 lg:h-14 lg:w-14 flex justify-center items-center bg-primary-700 rounded-sm p-1.5">
            <img src={imagen}></img>
          </div>
          <label className="font-bold">{label}</label>
        </div>
        <div className="flex flex-col gap-2">
          {totalTop.map((total, index) => (
            <div className="flex flex-row gap-2 bg-primary-50 border border-primary-50 w-full items-center pl-2 rounded-xl">
              <div className="numero-estadisticas-top p-2.5 flex justify-center items-center">
                <span>{index}</span>
              </div>
              <div className="text-primary-700 justify-center items-center text-center">
                <label> {total}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variante == "topAdmin") {
    return (
      <div className="tarjeta-estadisticas tarjeta-estadisticas-top tarjeta-estadisticas-top-admin">
        <div className="flex flex-row gap-4 items-center p-2">
          <div className="h-6 w-6 md:h-10 md:w-10 lg:h-14 lg:w-14 flex justify-center items-center">
            <img src={imagen}></img>
          </div>
          <label className="font-bold">{label}</label>
        </div>
        <div className="flex flex-col gap-2 p-2">
          {totalTop.map((total, index) => (
            <div className="flex flex-row gap-2 bg-primary-50 border border-primary-50 w-full items-center pl-2 rounded-xl">
              <div className="numero-estadisticas-top p-2.5 flex justify-center items-center">
                <span>{index}</span>
              </div>
              <div className="text-primary-700 justify-center items-center text-center">
                <label>{total}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (variante == "total") {
    return (
      <div className="tarjeta-estadisticas tarjeta-total-estadisticas">
        <div>
          <label>{label}</label>
        </div>
        <div className="numero-estadisticas-total">{conteo}</div>
      </div>
    );
  }
};

export default CardEstadisticas;
