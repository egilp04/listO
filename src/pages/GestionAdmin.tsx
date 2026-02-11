import { useNavigate } from "react-router-dom";
import Button from "../componentes/Button";
import Inputs from "../componentes/Inputs/Inputs";
import Table from "../componentes/Table";
import { useState } from "react";

const GestionAdmin = () => {
  const [selected, setSelected] = useState("usuario");
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSelected(e.currentTarget.name);
  };
  const crearItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const nombre = e.currentTarget.name;
    if (nombre == "usuario") {
      navigate("/registro", { state: { atras: true } });
    } else {
      navigate("/Genero", { state: { crear: true } });
    }
  };

  const handleFiltrar = () => {};

  return (
    <div className="flex flex-col gap-8 md:p-6 mg:gap-14 mb-12 2xl:gap-18">
      <h2 className="flex justify-center">Gestión</h2>
      <div className="flex flex-row gap-10 w-full justify-center items-center">
        <Button
          variant={selected == "usuario" ? "primario" : "secundario"}
          name="usuario"
          onClick={handleClick}
        >
          <span>Usuario</span>
        </Button>
        <Button
          variant={selected == "genero" ? "primario" : "secundario"}
          onClick={handleClick}
          name="genero"
        >
          <span>Género</span>
        </Button>
      </div>
      <div className="shadow-elevation-3 bg-primary-50 flex flex-col gap-6 max-h-150 overflow-hidden p-4 rounded-sm">
        <div className="flex flex-col justify-around md:flex-row w-full">
          <div className="w-1/2">
            <Inputs
              variant="primario"
              label=""
              placeholder="Busca por nombre o autor"
              onChange={handleFiltrar}
            ></Inputs>
          </div>
          <div>
            <Button variant="primario" onClick={crearItem} name={selected}>
              <span>
                {selected == "usuario" ? "Crear Usuario" : "Crear Género"}
              </span>
            </Button>
          </div>
        </div>
        <Table tipoItem={selected == "usuario" ? "usuario" : "genero"}></Table>
      </div>
    </div>
  );
};

export default GestionAdmin;
