// import Dialog from "./componentes/Dialog";
// import Table from "./componentes/Table";

import { useEffect, useState } from "react";
import CardEstadisticas from "./componentes/CardEstadisticas";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        // const res = await fetch("src/mock/cardsAdminStats.json");
        // const res = await fetch("src/mock/cardsIndividualStats.json");
        // const res = await fetch("src/mock/cardsTotalStats.json");
        const res = await fetch("src/mock/cardTopStatsAdmin.json");
        const info = await res.json();
        setData(info);
        console.log(info);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      {/* <Dialog titulo="Hola" descripcion="hola"></Dialog>
      <Table></Table> */}
      {/* <div className="flex flex-col gap-10">
        {data.map(({ label, value }) => (
          <CardEstadisticas
            label={label}
            variante="total"
            conteo={value}
          ></CardEstadisticas>
        ))}
      </div> */}
      {/* {
        <div className="flex flex-col gap-10">
          {data.map(({ label, value }) => (
            <CardEstadisticas
              label={label}
              conteo={value}
              variante="individual"
              imagen="src/assets/img/estrella.png"
            ></CardEstadisticas>
          ))}
        </div>
      } */}
      {/* {
        <div className="flex flex-col gap-10">
          {data.map(({ label, value }) => (
            <CardEstadisticas
              label={label}
              variante="topAdmin"
              imagen="src/assets/img/estrella.png"
              totalTop={value}
            ></CardEstadisticas>
          ))}
        </div>
      } */}
      {
        <div className="flex flex-col gap-10">
          {data.map(({ label, value }) => (
            <CardEstadisticas
              label={label}
              variante="topUser"
              imagen="src/assets/img/estrella.png"
              totalTop={value}
            ></CardEstadisticas>
          ))}
        </div>
      }
    </>
  );
}

export default App;
