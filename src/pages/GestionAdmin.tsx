import { useNavigate } from "react-router-dom";
import Button from "../componentes/Button";
import Inputs from "../componentes/Inputs/Inputs";
import Table from "../componentes/Table";

const GestionAdmin = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/genero");
  };
  return (
    <div className="flex flex-col min-h-screen gap-20 p-4 md:p-6">
      <div className="flex flex-row gap-10 w-full justify-center items-center">
        <Button variant="secundario">
          <span>Usuario</span>
        </Button>
        <Button variant="secundario" onClick={handleClick}>
          {" "}
          <span>Género</span>
        </Button>
      </div>
      <div className="shadow-elevation-3 bg-primary-50 flex flex-col gap-6 max-h-150 overflow-hidden p-4 rounded-sm">
        <Inputs
          variant="primario"
          label=""
          placeholder="Busca por nombre o autor"
        ></Inputs>
        <Table></Table>
      </div>
    </div>
  );
};

export default GestionAdmin;
