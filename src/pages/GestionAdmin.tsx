import Button from "../componentes/Button";
import Inputs from "../componentes/Inputs/Inputs";
import Table from "../componentes/Table";

const GestionAdmin = () => {
  return (
    <div className="bg-primary-200 flex flex-col min-h-screen gap-4 lg:gap-12 2xl:gap-14 p-4">
      <div className="w-full">
        <span className="material-symbols-outlined">arrow_back</span>
      </div>
      <div className="flex flex-row gap-10 w-full justify-center items-center">
        <Button variant="secundario">
          <span>Usuario</span>
        </Button>
        <Button variant="secundario">
          {" "}
          <span>Usuario</span>
        </Button>
      </div>
      <div className="shadow-elevation-3 bg-primary-50 flex flex-col gap-6 max-h-125 overflow-hidden p-4 rounded-sm">
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
